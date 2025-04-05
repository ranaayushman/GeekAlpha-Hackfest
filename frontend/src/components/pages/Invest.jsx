import React from 'react';
import { 
  TrendingUp, 
  LineChart, 
  Brain, 
  Shield, 
  BarChart2, 
  Briefcase, 
  Building2, 
  PiggyBank,
  Star,
  Lock,
  ChevronRight
} from 'lucide-react';

function Invest() {
  const investmentCategories = [
    {
      title: 'Stocks',
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      description: 'Invest in top companies and grow with the market'
    },
    {
      title: 'Mutual Funds',
      icon: <BarChart2 className="w-8 h-8 text-yellow-400" />,
      description: 'Professionally managed funds for diversified investment'
    },
    {
      title: 'ETFs',
      icon: <LineChart className="w-8 h-8 text-yellow-400" />,
      description: 'Trade exchange-traded funds with real-time pricing'
    },
    {
      title: 'Fixed Deposits',
      icon: <Building2 className="w-8 h-8 text-yellow-400" />,
      description: 'Secure returns with guaranteed interest rates'
    },
    {
      title: 'Bonds',
      icon: <PiggyBank className="w-8 h-8 text-yellow-400" />,
      description: 'Government and corporate bonds for stable returns'
    }
  ];

  const features = [
    {
      icon: <Briefcase className="w-8 h-8 text-yellow-400" />,
      title: 'One-Tap Investments',
      description: 'Instantly buy & sell stocks/mutual funds'
    },
    {
      icon: <LineChart className="w-8 h-8 text-yellow-400" />,
      title: 'Real-Time Performance',
      description: 'Monitor portfolio growth dynamically'
    },
    {
      icon: <Brain className="w-8 h-8 text-yellow-400" />,
      title: 'Smart Optimization',
      description: 'AI-driven investment strategies'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Tech Investor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      quote: 'The AI-powered insights have transformed my investment strategy completely.'
    },
    {
      name: 'Michael Chen',
      role: 'Portfolio Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      quote: 'Best platform for both beginners and experienced investors.'
    },
    {
      name: 'Emma Davis',
      role: 'Retail Investor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      quote: 'The one-tap investment feature saves me so much time.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-6">
              Invest & Grow Effortlessly
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Buy & sell stocks or mutual funds with a single tap, track real-time performance & optimize your portfolio seamlessly.
            </p>
            <button className="inline-flex items-center px-8 py-4 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-lg transition-all duration-300 hover:bg-yellow-300 hover:scale-105">
              Start Investing
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.15),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,204,0,0.1),transparent_50%)]"></div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-6 lg:px-8 py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="ml-3 text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Portfolio Section */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Portfolio Performance</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="h-64 relative">
                <LineChart className="w-full h-full text-gray-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-medium">Stocks</button>
                <button className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">Mutual Funds</button>
                <button className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">ETFs</button>
              </div>
              <div className="space-y-2">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Total Returns</span>
                    <span className="text-green-400">+24.5%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '24.5%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="px-6 lg:px-8 py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Investment Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentCategories.map((category, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-800 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="ml-3 text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <p className="text-gray-400">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What Our Investors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.quote}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="px-6 lg:px-8 py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-yellow-400" />
            <Lock className="w-12 h-12 text-yellow-400 -ml-4" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">100% Secure & Trusted by Experts</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Your investments are protected by bank-grade security and encryption. We're registered with major regulatory bodies and trusted by thousands of investors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {['256-bit SSL', 'Two-Factor Auth', 'SEBI Registered', 'ISO 27001'].map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                <p className="text-gray-300 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Social</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-400">© 2025 Fin.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Invest;