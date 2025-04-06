import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const platformInvestmentData = [
  { platform: "MF Central", value: 40000 },
  { platform: "Angel One", value: 35000 },
  { platform: "Zerodha", value: 49000 },
];

const stockInvestmentData = [
  { company: "AAPL", value: 15000 },
  { company: "GOOGL", value: 12000 },
  { company: "MSFT", value: 18000 },
  { company: "AMZN", value: 22000 },
  { company: "TSLA", value: 16000 },
];

const PortfolioDetails = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 p-8 overflow-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Portfolio Details</h1>

      {/* Overview Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <p className="text-gray-400">Total Value</p>
          <h2 className="text-2xl font-bold text-yellow-400">$124,500</h2>
          <p className="text-green-400">+15.4%</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <p className="text-gray-400">Total Return</p>
          <h2 className="text-2xl font-bold text-yellow-400">$7,850</h2>
          <p className="text-green-400">+6.3%</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <p className="text-gray-400">Total Invested</p>
          <h2 className="text-2xl font-bold text-yellow-400">$98,000</h2>
          <p className="text-blue-400">78.7% of total</p>
        </div>
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <p className="text-gray-400">Risk Level</p>
          <h2 className="text-lg font-semibold text-yellow-400">Moderate to High</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Platform-wise Investment Chart */}
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Platform-wise Investment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={platformInvestmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="platform" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" fill="#FFD700" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock-wise Investment Chart */}
        <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Stock-wise Investment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stockInvestmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="company" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="value" fill="#FFD700" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#111827] p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-[#1f2937] text-gray-400">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Units</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2024-03-01", type: "Buy", stock: "AAPL", amount: "$5000", units: 25 },
                { date: "2024-02-28", type: "Sell", stock: "GOOGL", amount: "$3200", units: 12 },
                { date: "2024-02-25", type: "Buy", stock: "MSFT", amount: "$4500", units: 18 },
                { date: "2024-02-20", type: "Buy", stock: "AMZN", amount: "$6000", units: 30 },
                { date: "2024-02-15", type: "Sell", stock: "TSLA", amount: "$2800", units: 14 },
              ].map((tx, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="px-4 py-3">{tx.date}</td>
                  <td className={`px-4 py-3 ${tx.type === "Buy" ? "text-green-400" : "text-red-400"}`}>
                    {tx.type === "Buy" ? "📈 Buy" : "📉 Sell"}
                  </td>
                  <td className="px-4 py-3">{tx.stock}</td>
                  <td className="px-4 py-3">{tx.amount}</td>
                  <td className="px-4 py-3">{tx.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;



