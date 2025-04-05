const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Added index for faster queries by userId
  },
  platform: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  type: {
    type: String,
    enum: ["Stock", "Mutual Fund", "ETF", "Bond", "Other"], // Expanded enum for flexibility
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticker: {
    type: String,
    required: function () {
      return this.type === "Stock" || this.type === "ETF"; // Extended to ETFs
    },
    uppercase: true, // Standardize ticker format
    trim: true,
  },
  quantity: {
    type: Number,
    required: function () {
      return this.type === "Stock" || this.type === "ETF"; // Extended to ETFs
    },
    min: [0, "Quantity cannot be negative"], // Validation
  },
  amountInvested: {
    type: Number,
    required: true,
    min: [0, "Amount invested cannot be negative"],
  },
  currentValue: {
    type: Number,
    required: true,
    min: [0, "Current value cannot be negative"],
  },
  purchasePrice: {
    type: Number,
    min: [0, "Purchase price cannot be negative"],
    required: function () {
      return this.type === "Stock" || this.type === "ETF"; // Required for Stocks and ETFs
    },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Prevent modification after creation
  },
  currency: {
    type: String,
    enum: ["INR", "USD", "EUR"], // Support multiple currencies
    default: "INR",
  },
  status: {
    type: String,
    enum: ["Active", "Sold", "Pending"],
    default: "Active", // Track investment status
  },
});

// Add compound index for common queries
investmentSchema.index({ userId: 1, platform: 1 });

// Pre-save hook to update lastUpdated
investmentSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("Investment", investmentSchema);
