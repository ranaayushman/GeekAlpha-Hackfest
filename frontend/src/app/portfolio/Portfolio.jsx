import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const portfolioData = {
  totalInvestment: 250000,
  brokerages: [
    {
      name: 'Zerodha',
      stocks: [
        { name: 'HDFC Bank', invested: 50000, current: 55000, returns: 10 },
        { name: 'TCS', invested: 45000, current: 48000, returns: 6.67 },
      ]
    },
    {
      name: 'Angel One',
      stocks: [
        { name: 'Reliance', invested: 60000, current: 65000, returns: 8.33 },
        { name: 'Infosys', invested: 40000, current: 38000, returns: -5 },
      ]
    },
    {
      name: 'MF Central',
      stocks: [
        { name: 'SBI Mutual Fund', invested: 30000, current: 32000, returns: 6.67 },
        { name: 'ICICI Prudential', invested: 25000, current: 27000, returns: 8 },
      ]
    }
  ]
};

const RiskMeter = ({ risk }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-yellow-400 mb-2 text-lg font-semibold">Risk Assessment</h3>
    <div className="h-2 bg-gray-700 rounded-full">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
        style={{ width: `${risk}%` }}
      />
    </div>
    <div className="mt-2 text-sm text-gray-400">
      Risk Level: {risk < 30 ? 'Low' : risk < 70 ? 'Moderate' : 'High'}
    </div>
  </div>
);

const StockChart = () => (
  <div className="h-24 bg-gray-800 rounded-lg flex items-center justify-center">
    <BarChart3 className="text-yellow-400 w-16 h-16 opacity-50" />
  </div>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-6 flex justify-between items-center flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">Portfolio Tracking</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleString()}</p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-sm text-gray-400">Total Investment</p>
          <p className="text-3xl font-bold text-yellow-400">
            ₹{portfolioData.totalInvestment.toLocaleString()}
          </p>
        </div>
      </header>

      {/* Controls */}
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: <TrendingUp />, label: 'Performance Insights' },
            { icon: <AlertTriangle />, label: 'Risk Analysis' },
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

        {/* Risk Meter */}
        <div className="mb-10">
          <RiskMeter risk={65} />
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4 border-b border-gray-700 w-max">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-2 px-4 text-sm whitespace-nowrap ${
                activeTab === 'all'
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-400'
              }`}
            >
              All Holdings
            </button>
            {portfolioData.brokerages.map(b => (
              <button
                key={b.name}
                onClick={() => setActiveTab(b.name)}
                className={`pb-2 px-4 text-sm whitespace-nowrap ${
                  activeTab === b.name
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Stock</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Invested</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Current</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Returns</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {portfolioData.brokerages
                .filter(b => activeTab === 'all' || b.name === activeTab)
                .flatMap(b =>
                  b.stocks.map(stock => (
                    <tr key={`${b.name}-${stock.name}`} className="hover:bg-gray-750">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-2">
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <StockChart />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">₹{stock.invested.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">₹{stock.current.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`flex items-center justify-end ${
                            stock.returns >= 0 ? 'text-green-400' : 'text-red-400'
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

