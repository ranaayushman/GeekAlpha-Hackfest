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
const mongoose = require("mongoose");

const router = express.Router();

router.get("/user/:userId", userMiddleware, getUserInvestments);

router.post("/", userMiddleware, addInvestment);
router.get("/holdings", userMiddleware, getAggregatedHoldings);
router.post("/connect", userMiddleware, connectInvestmentAccount);
router.get("/:platformId/holdings", userMiddleware, fetchPlatformHoldings);
router.delete("/:investmentId", userMiddleware, removeInvestment);
router.get("/summary/live", userMiddleware, getPortfolioSummary);
router.get("/chart-data", userMiddleware, getChartData);

module.exports = router;
