const Investment = require("../models/investment.models");
const yahooFinance = require("yahoo-finance2").default;
const mongoose = require("mongoose");

// Helper function
const sendResponse = (
  res,
  status,
  success,
  message,
  data = null,
  error = null
) => {
  res
    .status(status)
    .json({ success, message, ...(data && { data }), ...(error && { error }) });
};

// Validate userId
const isValidUserId = (res, userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    sendResponse(res, 400, false, "Invalid or missing userId");
    return false;
  }
  return true;
};

exports.getUserInvestments = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const investments = await Investment.find({ userId })
      .lean()
      .select("-__v")
      .sort({ createdAt: -1 });

    if (!investments.length) {
      return sendResponse(
        res,
        200,
        true,
        "No investments found for this user",
        []
      );
    }

    const enrichedInvestments = await Promise.all(
      investments.map(async (inv) => {
        if (inv.type === "Stock" && inv.ticker) {
          try {
            const quote = await yahooFinance.quote(inv.ticker);
            inv.livePrice =
              quote?.regularMarketPrice ||
              inv.purchasePrice ||
              inv.currentValue;
            inv.currentValue = inv.quantity
              ? inv.quantity * inv.livePrice
              : inv.currentValue;
          } catch (yahooErr) {
            console.error(
              `Error fetching live price for ${inv.ticker}:`,
              yahooErr
            );
          }
        }
        return inv;
      })
    );

    sendResponse(
      res,
      200,
      true,
      "Investments fetched successfully",
      enrichedInvestments
    );
  } catch (err) {
    console.error(
      `Error fetching investments for user ${req.params.userId}:`,
      err
    );
    sendResponse(
      res,
      500,
      false,
      "Error fetching investments",
      null,
      err.message
    );
  }
};

exports.addInvestment = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const {
      platform,
      type,
      name,
      amountInvested,
      currentValue,
      quantity,
      ticker,
      purchasePrice,
    } = req.body;

    if (!platform || !type || !name || amountInvested <= 0) {
      return sendResponse(
        res,
        400,
        false,
        "Missing or invalid required fields"
      );
    }

    const newInvestment = new Investment({
      userId,
      platform,
      type,
      name,
      amountInvested: Number(amountInvested),
      currentValue: currentValue || amountInvested,
      quantity: quantity || 1,
      ticker: ticker || null,
      purchasePrice: purchasePrice || null,
    });

    await newInvestment.save();
    sendResponse(
      res,
      201,
      true,
      "Investment added successfully",
      newInvestment
    );
  } catch (err) {
    sendResponse(res, 500, false, "Error adding investment", null, err.message);
  }
};

exports.getAggregatedHoldings = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const investments = await Investment.find({ userId }).lean();

    if (!investments.length) {
      return sendResponse(res, 200, true, "No holdings found", {});
    }

    const summary = investments.reduce((acc, inv) => {
      if (!acc[inv.platform]) acc[inv.platform] = { total: 0, assets: [] };
      acc[inv.platform].total += inv.currentValue;
      acc[inv.platform].assets.push(`${inv.name}: ₹${inv.currentValue}`);
      return acc;
    }, {});

    sendResponse(
      res,
      200,
      true,
      "Aggregated holdings fetched successfully",
      summary
    );
  } catch (err) {
    sendResponse(res, 500, false, "Error fetching holdings", null, err.message);
  }
};

exports.connectInvestmentAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const { platform, accountId } = req.body;

    if (!platform || !accountId) {
      return sendResponse(
        res,
        400,
        false,
        "Platform and accountId are required"
      );
    }

    console.log(`User ${userId} linked ${platform} account: ${accountId}`);
    sendResponse(res, 200, true, `${platform} account linked successfully`);
  } catch (err) {
    sendResponse(
      res,
      500,
      false,
      "Error connecting investment account",
      null,
      err.message
    );
  }
};

exports.fetchPlatformHoldings = async (req, res) => {
  try {
    const { userId, platformId } = req.params;
    if (!isValidUserId(res, userId)) return;

    if (!platformId) {
      return sendResponse(res, 400, false, "Platform ID is required");
    }

    const investments = await Investment.find({
      userId,
      platform: platformId,
    }).lean();

    if (!investments.length) {
      return sendResponse(
        res,
        200,
        true,
        `No holdings found for platform ${platformId}`,
        []
      );
    }

    sendResponse(
      res,
      200,
      true,
      "Platform holdings fetched successfully",
      investments
    );
  } catch (err) {
    sendResponse(
      res,
      500,
      false,
      "Error fetching platform holdings",
      null,
      err.message
    );
  }
};

exports.removeInvestment = async (req, res) => {
  try {
    const { userId, investmentId } = req.params;
    if (!isValidUserId(res, userId)) return;

    if (!investmentId) {
      return sendResponse(res, 400, false, "Investment ID is required");
    }

    const deleted = await Investment.findOneAndDelete({
      _id: investmentId,
      userId,
    });

    if (!deleted) {
      return sendResponse(
        res,
        404,
        false,
        "Investment not found or not owned by user"
      );
    }

    sendResponse(res, 200, true, "Investment removed successfully");
  } catch (err) {
    sendResponse(
      res,
      500,
      false,
      "Error removing investment",
      null,
      err.message
    );
  }
};

exports.getPortfolioSummary = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const investments = await Investment.find({ userId }).lean();

    if (!investments.length) {
      return sendResponse(
        res,
        200,
        true,
        "No investments found for portfolio summary",
        {
          totalValue: 0,
          detailedSummary: [],
        }
      );
    }

    let totalPortfolioValue = 0;
    const detailedSummary = await Promise.all(
      investments.map(async (inv) => {
        let livePrice = inv.currentValue;

        if (inv.type === "Stock" && inv.ticker) {
          try {
            const quote = await yahooFinance.quote(inv.ticker);
            livePrice =
              quote?.regularMarketPrice ||
              inv.purchasePrice ||
              inv.currentValue;
          } catch (yahooErr) {
            console.error(`Error fetching data for ${inv.name}:`, yahooErr);
          }
        }

        const currentVal = inv.quantity
          ? inv.quantity * livePrice
          : inv.currentValue;
        totalPortfolioValue += currentVal;

        return {
          name: inv.name,
          platform: inv.platform,
          type: inv.type,
          quantity: inv.quantity || "N/A",
          livePrice,
          currentVal: Math.round(currentVal),
        };
      })
    );

    sendResponse(res, 200, true, "Portfolio summary fetched successfully", {
      totalValue: Math.round(totalPortfolioValue),
      detailedSummary,
    });
  } catch (err) {
    console.error("Error fetching portfolio summary:", err);
    sendResponse(
      res,
      500,
      false,
      "Error fetching portfolio summary",
      null,
      err.message
    );
  }
};

exports.getChartData = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidUserId(res, userId)) return;

    const investments = await Investment.find({ userId }).lean();

    if (!investments.length) {
      return sendResponse(res, 200, true, "No data available for charts", {
        byPlatform: {},
        byType: {},
        byAsset: [],
      });
    }

    const platformData = {};
    const typeData = {};
    const assetData = [];

    investments.forEach((inv) => {
      platformData[inv.platform] =
        (platformData[inv.platform] || 0) + inv.currentValue;
      typeData[inv.type] = (typeData[inv.type] || 0) + inv.currentValue;
      assetData.push({
        name: inv.name,
        value: inv.currentValue,
        platform: inv.platform,
        type: inv.type,
      });
    });

    sendResponse(res, 200, true, "Chart data generated successfully", {
      byPlatform: platformData,
      byType: typeData,
      byAsset: assetData,
    });
  } catch (err) {
    console.error("Error generating chart data:", err);
    sendResponse(
      res,
      500,
      false,
      "Error generating chart data",
      null,
      err.message
    );
  }
};
