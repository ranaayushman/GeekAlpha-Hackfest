"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { XCircle, ArrowRight, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";

export const BuySellModal = ({ isOpen, onClose, action = "buy" }) => {
  const [formData, setFormData] = useState({
    platform: "",
    type: "Stock",
    name: "",
    ticker: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const platforms = ["Zerodha", "Groww", "Angel One"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value) || "" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get token from js-cookie
      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Get user ID from cookies or state management
      // You might store this in a cookie or extract it from the JWT
      const userId = Cookies.get("userId");
      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      const response = await fetch(
        `http://localhost:8000/api/investments/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process transaction");
      }

      setSuccess(data.message || "Transaction processed successfully");
      setTimeout(() => {
        onClose();
        setSuccess(null);
        setFormData({
          platform: "",
          type: "Stock",
          name: "",
          ticker: "",
          quantity: 1,
        });
      }, 2000);
    } catch (err) {
      console.error("Transaction error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-yellow-500/20"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {action === "buy" ? "Buy Stock" : "Sell Stock"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-2 text-red-200">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg flex items-center gap-2 text-green-200">
            <AlertCircle className="h-5 w-5" />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">
                Choose a Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Stock Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Apple Inc."
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Stock Ticker</label>
              <input
                type="text"
                name="ticker"
                placeholder="e.g. AAPL"
                value={formData.ticker}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Current Price</label>
              <p className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white">
                {/* In a real app, this would be fetched dynamically */}₹{" "}
                {(Math.random() * 1000 + 500).toFixed(2)} per share
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg text-black font-bold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {action === "buy" ? "Buy Now" : "Sell Now"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
