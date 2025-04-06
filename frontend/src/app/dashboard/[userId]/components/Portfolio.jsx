"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_INVESTMENTS_URL;

const RiskMeter = ({ risk }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-yellow-400 mb-2 text-lg font-semibold">
      Risk Assessment
    </h3>
    <div className="h-2 bg-gray-700 rounded-full">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
        style={{ width: `${risk}%` }}
      />
    </div>
    <div className="mt-2 text-sm text-gray-400">
      Risk Level: {risk < 30 ? "Low" : risk < 70 ? "Moderate" : "High"}
    </div>
  </div>
);

const StockChart = () => (
  <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center">
    <BarChart3 className="text-yellow-400 w-16 h-16 opacity-50" />
  </div>
);

export default function Portfolio({ userId }) {
  const [activeTab, setActiveTab] = useState("all");  
  const [portfolioData, setPortfolioData] = useState({
    totalInvestment: 0,
    totalCurrentValue: 0, // Added to store total current value
    brokerages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get(`${BASE_URL}/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const investments = response.data.data;

        // Calculate total investment and total current value
        const totalInvestment = investments.reduce(
          (sum, inv) => sum + inv.amountInvested,
          0
        );
        const totalCurrentValue = investments.reduce(
          (sum, inv) => sum + inv.currentValue,
          0
        );

        // Group and aggregate investments by platform and stock name
        const groupedByPlatform = investments.reduce((acc, inv) => {
          const platform = inv.platform;
          if (!acc[platform]) {
            acc[platform] = {};
          }

          const stockKey = inv.name;
          if (!acc[platform][stockKey]) {
            acc[platform][stockKey] = {
              name: inv.name,
              invested: 0,
              current: 0,
            };
          }

          acc[platform][stockKey].invested += inv.amountInvested;
          acc[platform][stockKey].current += inv.currentValue;

          return acc;
        }, {});

        // Convert to brokerages array format with calculated returns
        const brokerages = Object.entries(groupedByPlatform).map(
          ([name, stocksObj]) => ({
            name,
            stocks: Object.values(stocksObj).map((stock) => {
              const returns =
                stock.invested > 0
                  ? (
                      ((stock.current - stock.invested) / stock.invested) *
                      100
                    ).toFixed(2)
                  : 0;
              return {
                ...stock,
                returns: parseFloat(returns),
              };
            }),
          })
        );

        setPortfolioData({
          totalInvestment,
          totalCurrentValue,
          brokerages,
        });
      } catch (error) {
        console.error("Error fetching investments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-6 flex justify-between items-center flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">
            Portfolio Tracking
          </h1>
          <p className="text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-400">
            Total Investment / Current Value
          </p>
          <p className="text-3xl font-bold text-yellow-400">
            ₹{portfolioData.totalInvestment.toLocaleString()} / ₹
            {portfolioData.totalCurrentValue.toLocaleString()}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: <TrendingUp />, label: "Performance Insights" },
            { icon: <AlertTriangle />, label: "Risk Analysis" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition text-center w-full"
            >
              <div className="flex flex-col items-center">
                <div className="text-yellow-400 mb-2">{item.icon}</div>
                <span className="text-sm">{item.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-10">
          <RiskMeter risk={65} />
        </div>

        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4 border-b border-gray-700 w-max">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 px-4 text-sm whitespace-nowrap ${
                activeTab === "all"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              }`}
            >
              All Holdings
            </button>
            {portfolioData.brokerages.map((b) => (
              <button
                key={b.name}
                onClick={() => setActiveTab(b.name)}
                className={`pb-2bund px-4 text-sm whitespace-nowrap ${
                  activeTab === b.name
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">
                  Invested
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">
                  Current
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">
                  Returns
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                  Platform
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {portfolioData.brokerages
                .filter((b) => activeTab === "all" || b.name === activeTab)
                .flatMap((b) =>
                  b.stocks.map((stock, index) => (
                    <tr
                      key={`${b.name}-${stock.name}-${index}`}
                      className="hover:bg-gray-750"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-2">
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <StockChart />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        ₹{stock.invested.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        ₹{stock.current.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`flex items-center justify-end ${
                            stock.returns >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {stock.returns >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {stock.returns}%
                        </span>
                      </td>
                      <td className="px-6 py-4">{b.name}</td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
