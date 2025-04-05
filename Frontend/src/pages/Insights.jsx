import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, ShieldCheck, ArrowRight, BarChart3 } from 'lucide-react';

const Insights = () => {
  const [isHovered, setIsHovered] = useState('');

  const features = [
    { id: 'personalized', icon: <Brain className="w-8 h-8 text-yellow-400" />, title: 'Personalized Recommendations', description: 'AI-driven stock & fund suggestions based on your risk profile and goals' },
    { id: 'risk', icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />, title: 'Risk Analysis', description: 'Advanced risk assessment with real-time market correlation analysis' },
    { id: 'trends', icon: <TrendingUp className="w-8 h-8 text-yellow-400" />, title: 'Market Trends', description: 'Real-time market insights powered by advanced AI algorithms' },
    { id: 'comparison', icon: <BarChart3 className="w-8 h-8 text-yellow-400" />, title: 'Smart Comparisons', description: 'Intelligent fund comparison with performance predictions' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="text-center px-6 lg:px-8 py-24 lg:py-32">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
          Unlock AI-Powered Insights
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Get personalized stock & mutual fund recommendations, risk analysis & market trends — powered by AI.
        </p>
        <Link to="/Insights"> 
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-lg hover:bg-yellow-300 hover:scale-105">
            Try AI Recommendations <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      </section>

      <section className="px-6 lg:px-8 py-16 lg:py-24 bg-gray-800/50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-6 rounded-xl bg-gray-800 border border-gray-700 transition-all duration-300 ${isHovered === feature.id ? 'transform scale-105 border-yellow-400/50' : ''}`}
              onMouseEnter={() => setIsHovered(feature.id)}
              onMouseLeave={() => setIsHovered('')}
            >
              <div className="flex items-center mb-4">{feature.icon}<h3 className="ml-3 text-xl font-semibold">{feature.title}</h3></div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insights;




