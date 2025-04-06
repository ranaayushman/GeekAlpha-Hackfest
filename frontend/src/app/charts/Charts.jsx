import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const timeRangeOptions = [
  { value: '1yr', label: '1 Year' },
  { value: '2yr', label: '2 Years' },
  { value: '3yr', label: '3 Years' },
  { value: '5yr', label: '5 Years' },
  { value: '10yr', label: '10 Years' }
];

// Sample data - this would come from your backend
const initialStocks = [
  { name: 'AMZN', value: 45 },
  { name: 'GOOGL', value: 95 },
  { name: 'MSFT', value: 85 },
  { name: 'NVDA', value: 809 },
  { name: 'TSLA', value: 150 }
];

// Mock risk analysis data - will be fetched from backend in actual implementation
const mockRiskAnalysis = {
  'AAPL': { trustScore: 4.5, riskLevel: 'LOW', investmentAdvice: 'Good' },
  'MSFT': { trustScore: 4.2, riskLevel: 'LOW', investmentAdvice: 'Good' },
  'GOOGL': { trustScore: 4.0, riskLevel: 'MEDIUM', investmentAdvice: 'Good' },
  'AMZN': { trustScore: 3.8, riskLevel: 'MEDIUM', investmentAdvice: 'Good' },
  'TSLA': { trustScore: 2.5, riskLevel: 'HIGH', investmentAdvice: 'Bad' },
  'NVDA': { trustScore: 4.3, riskLevel: 'LOW', investmentAdvice: 'Good' },
  'META': { trustScore: 3.0, riskLevel: 'HIGH', investmentAdvice: 'Bad' },
  'NFLX': { trustScore: 3.5, riskLevel: 'MEDIUM', investmentAdvice: 'Good' }
};

const generateTimeSeriesData = (timeRange) => {
  const data = [];
  const endDate = new Date();
  let startDate;
  
  // Set start date based on selected time range
  switch(timeRange) {
    case '1yr':
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case '2yr':
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 2);
      break;
    case '3yr':
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 3);
      break;
    case '5yr':
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
    case '10yr':
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 10);
      break;
    default:
      startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 1);
  }
  
  // Generate dates between start and end
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  // Generate data for each date
  const stocks = ['NFLX', 'MSFT', 'META', 'AMZN', 'TSLA', 'AAPL'];
  const baseValues = {
    'NFLX': 500,
    'MSFT': 300,
    'META': 300,
    'AMZN': 150,
    'TSLA': 200,
    'AAPL': 180
  };
  
  // Create realistic-looking time series with some trends
  let values = {...baseValues};
  
  dateArray.forEach((date, i) => {
    const dataPoint = {
      date: date.toISOString().split('T')[0]
    };
    
    stocks.forEach(stock => {
      // Add some randomness but keep a trend
      const randomFactor = Math.random() * 0.1 - 0.05; // -5% to +5%
      const trendFactor = Math.sin(i/10) * 0.2; // Cyclical trend
      
      // Update value with some momentum
      values[stock] = values[stock] * (1 + randomFactor + trendFactor);
      dataPoint[stock] = values[stock];
    });
    
    data.push(dataPoint);
  });
  
  return data;
};

// Helper function to render trust score as stars
const renderStars = (score) => {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      ))}
      {halfStar && <span className="text-yellow-400">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-400">★</span>
      ))}
    </div>
  );
};

// Helper function to render risk level indicator
const renderRiskLevel = (level) => {
  let color = "bg-green-500";
  if (level === "MEDIUM") color = "bg-yellow-500";
  if (level === "HIGH") color = "bg-red-500";
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span>{level}</span>
    </div>
  );
};

const Charts = () => {
  const [stocks, setStocks] = useState(initialStocks);
  const [recommendedStocks, setRecommendedStocks] = useState(initialStocks);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1yr');
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [companyToAnalyze, setCompanyToAnalyze] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState(null);

  // Generate time series data when time range changes
  useEffect(() => {
    const data = generateTimeSeriesData(selectedTimeRange);
    setTimeSeriesData(data);
  }, [selectedTimeRange]);

  // This would fetch data from your backend in a real implementation
  useEffect(() => {
    // Simulating backend fetch
    const fetchRecommendedStocks = () => {
      // In a real implementation, this would be an API call
      console.log(`Fetching stocks data for ${selectedTimeRange} time range`);
      // For now, just using our initial data
      setRecommendedStocks(initialStocks);
    };
    
    fetchRecommendedStocks();
  }, [selectedTimeRange]);

  const handleToggleStock = (stockName) => {
    const stockExists = stocks.some(stock => stock.name === stockName);
    
    if (stockExists) {
      setStocks(stocks.filter(stock => stock.name !== stockName));
    } else {
      const stockToAdd = recommendedStocks.find(stock => stock.name === stockName);
      if (stockToAdd) {
        setStocks([...stocks, stockToAdd]);
      }
    }
  };

  const handleShow = () => {
    // This would fetch updated data based on selection
    console.log('Showing data for selected stocks:', stocks);
    console.log('With time range:', selectedTimeRange);
    
    // Regenerate time series data for the selected time range
    const data = generateTimeSeriesData(selectedTimeRange);
    setTimeSeriesData(data);
  };

  const handleRiskAnalysis = () => {
    // In a real implementation, this would fetch data from your backend
    if (companyToAnalyze && companyToAnalyze.trim() !== '') {
      const ticker = companyToAnalyze.toUpperCase();
      
      // Simulate API call delay
      setTimeout(() => {
        // Check if we have mock data for this company
        if (mockRiskAnalysis[ticker]) {
          setRiskAnalysis({
            company: ticker,
            ...mockRiskAnalysis[ticker]
          });
        } else {
          // Default to a random risk analysis if company not found
          const randomScore = (Math.random() * 4 + 1).toFixed(1);
          const levels = ['LOW', 'MEDIUM', 'HIGH'];
          const randomLevel = levels[Math.floor(Math.random() * levels.length)];
          
          setRiskAnalysis({
            company: ticker,
            trustScore: parseFloat(randomScore),
            riskLevel: randomLevel,
            investmentAdvice: parseFloat(randomScore) > 3 ? 'Good' : 'Bad'
          });
        }
      }, 500);
    }
  };

  const topPerformer = stocks.reduce((max, stock) => 
    stock.value > max.value ? stock : max, 
    { name: 'N/A', value: 0 }
  );

  // Prepare data for Plotly chart
  const plotlyData = recommendedStocks.map(stock => {
    const stockData = timeSeriesData.map(dataPoint => ({
      x: dataPoint.date,
      y: dataPoint[stock.name] || 0
    }));
    
    return {
      x: stockData.map(point => point.x),
      y: stockData.map(point => point.y),
      type: 'scatter',
      mode: 'lines',
      name: stock.name
    };
  });
  
  const plotlyLayout = {
    title: '',
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    autosize: true,
    height: 400,
    margin: { l: 50, r: 30, t: 30, b: 70 },
    xaxis: {
      showgrid: false,
      color: '#fff',
      title: { text: '', font: { color: '#fff' } },
      tickfont: { color: '#fff' },
      rangeslider: { visible: false }
    },
    yaxis: {
      showgrid: true,
      gridcolor: 'rgba(255,255,255,0.1)',
      color: '#fff',
      title: { text: '', font: { color: '#fff' } },
      tickfont: { color: '#fff' }
    },
    legend: {
      font: { color: '#fff' },
      orientation: 'h',
      y: -0.2
    },
    hovermode: 'closest',
    hoverlabel: { bgcolor: '#1f2937', font: { color: '#fff' } }
  };

  // Plotly configuration for interactive features
  const plotlyConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToAdd: ['v1hovermode', 'toggleSpikelines'],
    modeBarButtonsToRemove: [],
    toImageButtonOptions: {
      format: 'png',
      filename: 'stock_performance_comparison'
    }
  };

  return (
    <div className="space-y-12">
      {/* Risk Analysis Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Risk Analysis</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-1">
                Company for which you need recommendation
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={companyToAnalyze}
                  onChange={(e) => setCompanyToAnalyze(e.target.value)}
                  placeholder="Enter stock ticker (e.g., AAPL)"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg flex-1"
                  maxLength={5}
                />
                <button
                  onClick={handleRiskAnalysis}
                  className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300"
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {riskAnalysis ? (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">{riskAnalysis.company} Analysis</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Trust Score:</span>
                    {renderStars(riskAnalysis.trustScore)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Risk Level:</span>
                    {renderRiskLevel(riskAnalysis.riskLevel)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Investment Advice:</span>
                    <span className={`font-medium ${riskAnalysis.investmentAdvice === 'Good' ? 'text-green-400' : 'text-red-400'}`}>
                      {riskAnalysis.investmentAdvice}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-700 rounded-lg">
                <p className="text-gray-400">Enter a company ticker to see risk analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Stocks Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">RECOMMENDED STOCKS</h2>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="w-full">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full md:w-48"
                >
                  {timeRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendedStocks.map(stock => (
                <div 
                  key={stock.name}
                  onClick={() => handleToggleStock(stock.name)}
                  className={`px-3 py-1 rounded-full flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
                    stocks.some(s => s.name === stock.name) 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  <span>{stock.name}</span>
                </div>
              ))}
            </div>
            
            <div>
              <button
                onClick={handleShow}
                className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Show
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Performance Comparison</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stocks}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-900/20 rounded-lg">
            <p className="text-black font-medium">
              🏆 Top Performer: {topPerformer.name} ({topPerformer.value.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      {/* Stock Performance Comparison Section */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Stock Performance Comparison</h2>
        <div className="h-[400px] w-full">
          <Plot
            data={plotlyData}
            layout={plotlyLayout}
            config={plotlyConfig}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
