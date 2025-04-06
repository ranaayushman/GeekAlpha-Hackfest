import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const initialStocks = [
  { name: 'AMZN', value: 45 },
  { name: 'GOOGL', value: 95 },
  { name: 'MSFT', value: 85 },
  { name: 'NVDA', value: 809 },
  { name: 'TSLA', value: 150 }
];

const generateTimeSeriesData = () => {
  const data = [];
  const startDate = new Date(2021, 0, 1);
  for (let i = 0; i < 50; i++) {
    const date = new Date(startDate.getTime() + i * 30 * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split('T')[0],
      NFLX: Math.random() * 400 + 400,
      MSFT: Math.random() * 200 + 200,
      META: Math.random() * 300 + 200,
      AMZN: Math.random() * 100 + 100,
      TSLA: Math.random() * 200 + 200,
      AAPL: Math.random() * 100 + 150,
    });
  }
  return data;
};

export const Charts = () => {
  const [stocks, setStocks] = useState(initialStocks);
  const [newStock, setNewStock] = useState({ name: '', value: '' });
  const [timeSeriesData] = useState(generateTimeSeriesData());

  const handleAddStock = (e) => {
    e.preventDefault();
    if (newStock.name && newStock.value) {
      setStocks([...stocks, { 
        name: newStock.name.toUpperCase(), 
        value: Number(newStock.value) 
      }]);
      setNewStock({ name: '', value: '' });
    }
  };

  const handleRemoveStock = (stockName) => {
    setStocks(stocks.filter(stock => stock.name !== stockName));
  };

  const topPerformer = stocks.reduce((max, stock) => 
    stock.value > max.value ? stock : max
  );

  return (
    <div className="space-y-12">
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Add Stock for Comparison</h2>
          <form onSubmit={handleAddStock} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Stock Symbol (e.g., AAPL)"
              value={newStock.name}
              onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex-1"
              maxLength={5}
            />
            <input
              type="number"
              placeholder="Return %"
              value={newStock.value}
              onChange={(e) => setNewStock({ ...newStock, value: e.target.value })}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-32"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300"
            >
              Add
            </button>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {stocks.map(stock => (
              <div 
                key={stock.name}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{stock.name}</span>
                <button
                  onClick={() => handleRemoveStock(stock.name)}
                  className="text-gray-400 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
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
            <p className="text-green-400">
              🏆 Top Performer: {topPerformer.name} ({topPerformer.value.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Stock Performance Trends</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="NFLX" stroke="#60a5fa" dot={false} strokeWidth={2.5} />
              <Line type="monotone" dataKey="MSFT" stroke="#34d399" dot={false} strokeWidth={2.5} />
              <Line type="monotone" dataKey="META" stroke="#f87171" dot={false} strokeWidth={2.5} />
              <Line type="monotone" dataKey="AMZN" stroke="#fbbf24" dot={false} strokeWidth={2.5} />
              <Line type="monotone" dataKey="TSLA" stroke="#a78bfa" dot={false} strokeWidth={2.5} />
              <Line type="monotone" dataKey="AAPL" stroke="#ec4899" dot={false} strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default Charts;
