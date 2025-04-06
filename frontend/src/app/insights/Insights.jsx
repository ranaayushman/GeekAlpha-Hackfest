"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { Brain, TrendingUp, ShieldCheck, ArrowRight, BarChart3, Search } from "lucide-react";
import dynamic from "next/dynamic";

// Use dynamic import for Plotly since it requires browser APIs
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const BASE_URL = process.env.NEXT_PUBLIC_API_MARKET_URL;

const Insights = () => {
  const [isHovered, setIsHovered] = useState("");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For personalized insights
  const [companySymbol, setCompanySymbol] = useState("");
  const [searchedCompany, setSearchedCompany] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState(null);

  const features = [
    {
      id: "personalized",
      icon: <Brain className="w-8 h-8 text-yellow-400" />,
      title: "Personalized Insights",
      description: "AI-driven stock & fund suggestions based on your risk profile and goals",
    },
    {
      id: "risk",
      icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
      title: "Risk Analysis",
      description: "Advanced risk assessment with real-time market correlation analysis",
    },
    {
      id: "trends",
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      title: "Market Trends",
      description: "Real-time market insights powered by advanced AI algorithms",
    },
    {
      id: "comparison",
      icon: <BarChart3 className="w-8 h-8 text-yellow-400" />,
      title: "Smart Comparisons",
      description: "Intelligent fund comparison with performance predictions",
    },
  ];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const response = await axios.get(`${BASE_URL}/stocks`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setStocks(response.data.stocks);
      } catch (err) {
        setError("Failed to fetch stock data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Sample data for charts to simulate API response
  const generateSampleData = (symbol) => {
    // Generate dates from 2021 to now
    const dates = [];
    const prices = [];
    const sma20 = [];
    const sma50 = [];
    const volatility = [];
    const momentum = [];
    
    const startDate = new Date(2021, 0, 1);
    const endDate = new Date(2025, 3, 1); // April 2025
    
    // Base price and trend
    let price = 100;
    
    // Generate daily data
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
      
      // Add some randomness to price with an upward trend
      const change = (Math.random() - 0.45) * 2;
      price = Math.max(50, price + change);
      prices.push(price);
      
      // Calculate SMA by averaging past prices
      if (prices.length >= 20) {
        const last20 = prices.slice(-20);
        sma20.push(last20.reduce((sum, p) => sum + p, 0) / 20);
      } else {
        sma20.push(price);
      }
      
      if (prices.length >= 50) {
        const last50 = prices.slice(-50);
        sma50.push(last50.reduce((sum, p) => sum + p, 0) / 50);
      } else {
        sma50.push(price);
      }
      
      // Volatility - varies between 0.005 and 0.035
      const vol = 0.005 + Math.random() * 0.03;
      volatility.push(vol);
      
      // Momentum - varies between -3 and 2
      const mom = -3 + Math.random() * 5;
      momentum.push(mom);
    }
    
    // Return formatted data for each chart
    return {
      symbol,
      closingPrice: prices[prices.length - 1].toFixed(2),
      sma20: sma20[sma20.length - 1].toFixed(2),
      sma50: sma50[sma50.length - 1].toFixed(2),
      volatility: volatility[volatility.length - 1].toFixed(2),
      momentum: momentum[momentum.length - 1].toFixed(2),
      rsi: (30 + Math.random() * 40).toFixed(2),
      recommendedStocks: ["GOOGL", "NVDA", "AMZN", "MSFT", "TSLA"],
      priceChartData: {
        dates,
        prices,
        sma20,
        sma50
      },
      volatilityChartData: {
        dates,
        volatility
      },
      momentumChartData: {
        dates,
        momentum
      }
    };
  };

  const handleCompanySearch = (e) => {
    e.preventDefault();
    
    if (!companySymbol.trim()) return;
    
    setCompanyLoading(true);
    setCompanyError(null);
    setSearchedCompany(companySymbol);
    
    // In a real app, this would be an API call
    // For this example, we'll use sample data
    try {
      setTimeout(() => {
        const data = generateSampleData(companySymbol.toUpperCase());
        setCompanyData(data);
        setCompanyLoading(false);
      }, 800); // Simulate API delay
    } catch (err) {
      setCompanyError("Failed to fetch company data. Please try again.");
      setCompanyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Section */}
      <section className="text-center px-6 lg:px-8 py-24 lg:py-32">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
          Unlock AI-Powered Insights
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Get personalized stock & mutual fund recommendations, risk analysis & market trends — powered by AI.
        </p>
        <Link href="/Insights">
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-lg hover:bg-yellow-300 hover:scale-105 transition-transform">
            Try AI Recommendations <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-gray-800/50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-6 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 ${
                isHovered === feature.id ? "transform scale-105 border-yellow-400/50" : ""
              }`}
              onMouseEnter={() => setIsHovered(feature.id)}
              onMouseLeave={() => setIsHovered("")}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-3 text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Stock Data Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Real-Time Market Insights
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading stock data...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="p-6 rounded-xl bg-gray-800 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stock.name} ({stock.symbol})
                </h3>
                <p className="text-gray-400 mb-1">
                  Price: ${stock.price.toLocaleString()}
                </p>
                <p
                  className={`mb-1 ${
                    stock.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  Change: {stock.change.toFixed(2)}%
                </p>
                <p className="text-gray-400">
                  Market Cap: ${(stock.marketCap / 1e9).toFixed(2)}B
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PERSONALIZED INSIGHTS Section */}
      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-gray-800/50">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Personalized Insights
        </h2>
        
        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleCompanySearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={companySymbol}
              onChange={(e) => setCompanySymbol(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold flex items-center hover:bg-yellow-300 transition-colors"
              disabled={companyLoading}
            >
              {companyLoading ? "Loading..." : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>
        
        {companyError && (
          <p className="text-center text-red-400 mb-6">{companyError}</p>
        )}
        
        {/* Company Data */}
        {companyData && (
          <div className="max-w-7xl mx-auto">
            {/* Stock Info */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">
                Stock Insights for {companyData.symbol}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="text-gray-400">Closing Price:</span>
                      <span className="font-semibold">${companyData.closingPrice}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">20-day SMA:</span>
                      <span className="font-semibold">${companyData.sma20}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">50-day SMA:</span>
                      <span className="font-semibold">${companyData.sma50}</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="text-gray-400">Volatility:</span>
                      <span className="font-semibold">{companyData.volatility}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">Momentum:</span>
                      <span className={`font-semibold ${parseFloat(companyData.momentum) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {companyData.momentum}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">RSI:</span>
                      <span className={`font-semibold ${
                        parseFloat(companyData.rsi) > 70 ? 'text-red-400' : 
                        parseFloat(companyData.rsi) < 30 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {companyData.rsi}
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-3">Recommended Similar Stocks</h4>
                  <div className="flex flex-wrap gap-2">
                    {companyData.recommendedStocks.map(stock => (
                      <span key={stock} className="px-2 py-1 bg-gray-700 rounded text-yellow-400">
                        {stock}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Trend Chart */}
            <div className="mb-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Stock Price Trend</h3>
              <div className="h-64 w-full">
                <Plot
                  data={[
                    {
                      x: companyData.priceChartData.dates,
                      y: companyData.priceChartData.prices,
                      type: 'scatter',
                      mode: 'lines',
                      name: 'Close',
                      line: { color: 'white' }
                    },
                    {
                      x: companyData.priceChartData.dates,
                      y: companyData.priceChartData.sma20,
                      type: 'scatter',
                      mode: 'lines',
                      name: 'SMA20',
                      line: { color: '#3B82F6' }
                    },
                    {
                      x: companyData.priceChartData.dates,
                      y: companyData.priceChartData.sma50,
                      type: 'scatter',
                      mode: 'lines',
                      name: 'SMA50',
                      line: { color: '#EF4444' }
                    }
                  ]}
                  layout={{
                    plot_bgcolor: 'transparent',
                    paper_bgcolor: 'transparent',
                    font: { color: '#9CA3AF' },
                    margin: { l: 50, r: 20, t: 20, b: 50 },
                    xaxis: { 
                      gridcolor: '#374151',
                      title: 'Date'
                    },
                    yaxis: { 
                      gridcolor: '#374151',
                      title: 'Price ($)'
                    },
                    legend: { 
                      orientation: 'h',
                      y: -0.2
                    },
                    autosize: true
                  }}
                  useResizeHandler={true}
                  style={{ width: '100%', height: '100%' }}
                  config={{ responsive: true }}
                />
              </div>
            </div>
            
            {/* Volatility Chart */}
            <div className="mb-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Stock Volatility Over Time</h3>
              <div className="h-64 w-full">
                <Plot
                  data={[
                    {
                      x: companyData.volatilityChartData.dates,
                      y: companyData.volatilityChartData.volatility,
                      type: 'scatter',
                      mode: 'lines',
                      line: { color: '#38BDF8' }
                    }
                  ]}
                  layout={{
                    plot_bgcolor: 'transparent',
                    paper_bgcolor: 'transparent',
                    font: { color: '#9CA3AF' },
                    margin: { l: 50, r: 20, t: 20, b: 50 },
                    xaxis: { 
                      gridcolor: '#374151',
                      title: 'Date'
                    },
                    yaxis: { 
                      gridcolor: '#374151',
                      title: 'Volatility Level'
                    },
                    autosize: true
                  }}
                  useResizeHandler={true}
                  style={{ width: '100%', height: '100%' }}
                  config={{ responsive: true }}
                />
              </div>
            </div>
            
            {/* Momentum Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Momentum Indicator</h3>
              <div className="h-64 w-full">
                <Plot
                  data={[
                    {
                      x: companyData.momentumChartData.dates,
                      y: companyData.momentumChartData.momentum,
                      type: 'scatter',
                      mode: 'lines',
                      line: { color: '#38BDF8' }
                    }
                  ]}
                  layout={{
                    plot_bgcolor: 'transparent',
                    paper_bgcolor: 'transparent',
                    font: { color: '#9CA3AF' },
                    margin: { l: 50, r: 20, t: 20, b: 50 },
                    xaxis: { 
                      gridcolor: '#374151',
                      title: 'Date'
                    },
                    yaxis: { 
                      gridcolor: '#374151',
                      title: 'Momentum'
                    },
                    autosize: true
                  }}
                  useResizeHandler={true}
                  style={{ width: '100%', height: '100%' }}
                  config={{ responsive: true }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Insights;