const express = require("express");
const {
  getUserInvestments,
  addInvestment,
  getAggregatedHoldings,
  connectInvestmentAccount,
  fetchPlatformHoldings,
  removeInvestment,
  getPortfolioSummary,
  getChartData,
} = require("../controllers/investment.controller");

const { userMiddleware } = require("../middlewares/user.middlewares");

const router = express.Router();

// All routes include :userId as the first param
router.get("/:userId", userMiddleware, getUserInvestments);

router.post("/:userId", userMiddleware, addInvestment);

router.get("/:userId/holdings", userMiddleware, getAggregatedHoldings);

router.post("/:userId/connect", userMiddleware, connectInvestmentAccount);

router.get(
  "/:userId/holdings/:platformId",
  userMiddleware,
  fetchPlatformHoldings
);

router.delete(
  "/:userId/investments/:investmentId",
  userMiddleware,
  removeInvestment
);

router.get("/:userId/summary/live", userMiddleware, getPortfolioSummary);

router.get("/:userId/chart-data", userMiddleware, getChartData);

module.exports = router;
