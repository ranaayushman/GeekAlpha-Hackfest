"use client";
import { useState } from "react";
import { IconBrandProducthunt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
  Zap,
  LineChart,
  Brain,
  TrendingUp,
  Shield,
  Users,
  AlertTriangle,
} from "lucide-react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
} from "recharts";
import { BuySellModal } from "./BuySellModal"; // Import the modal component
import Cookies from "js-cookie";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4800 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "One-Tap Investments",
    description: "Instantly buy & sell stocks/mutual funds in one click.",
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Real-Time Performance Tracking",
    description: "Monitor portfolio growth dynamically with live AI updates.",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Smart Portfolio Optimization",
    description: "AI-driven strategies to maximize returns & reduce risks.",
  },
];

const filters = ["Stocks", "Mutual Funds", "ETFs", "Fixed Deposits"];

export const Market = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("buy");

  const openBuyModal = () => {
    // Check if user is logged in
    const token = Cookies.get("authToken");
    if (!token) {
      alert("Please login to continue");
      // Redirect to login page or open login modal
      // window.location.href = "/login";
      return;
    }

    setActionType("buy");
    setModalOpen(true);
  };

  const openSellModal = () => {
    // Check if user is logged in
    const token = Cookies.get("authToken");
    if (!token) {
      alert("Please login to continue");
      // Redirect to login page or open login modal
      // window.location.href = "/login";
      return;
    }

    setActionType("sell");
    setModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform rotate-12 scale-150" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Invest & Grow Effortlessly
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Buy & sell stocks or mutual funds with a single tap, track
              real-time performance & optimize your portfolio seamlessly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openBuyModal}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-yellow-500/50 transition-all"
            >
              Start Investing
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-6 h-6 text-yellow-400" />
              <span className="text-lg">Total Users: 100K+</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
              <span className="text-lg">Transactions: ₹500 Cr+</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-6 h-6 text-yellow-400" />
              <span className="text-lg">AI Accuracy: 92%</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all"
              >
                <div className="text-yellow-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex space-x-4 mb-6">
              {filters.map((filter, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 transition-all"
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Portfolio Performance
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#EAB308"
                      strokeWidth={2}
                      dot={{ fill: "#EAB308" }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <h4 className="text-gray-400 mb-2">Total Investment</h4>
                <p className="text-2xl font-bold text-white">₹12,50,000</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <h4 className="text-gray-400 mb-2">Today's Gain/Loss</h4>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-500" />
                  <p className="text-2xl font-bold text-green-500">+4.2%</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <h4 className="text-gray-400 mb-2">Risk Level</h4>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-yellow-400" />
                  <p className="text-xl font-bold text-yellow-400">Medium</p>
                </div>
              </motion.div>

              {/* Buy/Sell Button Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <h4 className="text-gray-400 mb-2">Stocks/Mutual Funds</h4>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openBuyModal}
                    className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Buy Stock
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openSellModal}
                    className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Sell Stock
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy/Sell Modal */}
      <BuySellModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        action={actionType}
      />
    </>
  );
};
