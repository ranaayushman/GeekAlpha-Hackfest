import { motion } from 'framer-motion';
import { Upload, Brain, BarChart as ChartBar, LogInIcon } from 'lucide-react';
import React from "react";
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: LogInIcon,
    title: 'Sign Up & Get Started',
    description: 'Create your account in minutes, verify details & securely link your brokerage for seamless investment experience.',
    link: '/signup',
  },
  {
    icon: Brain,
    title: 'Unlock AI-Powered Insights',
    description: 'Get personalized stock & mutual fund recommendations, risk analysis & market trends — powered by cutting-edge AI.',
    link: '/insights',
  },
  {
    icon: ChartBar,
    title: 'Invest & Grow Effortlessly',
    description: 'Buy & sell stocks or mutual funds with a single tap, track real-time performance & optimize your portfolio seamlessly.',
    link: '/market', // ✅ updated to correctly route to the Market component
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-black/30 relative overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-gold text-transparent bg-clip-text"
        >
          How It Works!!
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => navigate(step.link)}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center">
                {React.createElement(step.icon, { className: 'w-10 h-10 text-dark' })}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-light/70 ">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

