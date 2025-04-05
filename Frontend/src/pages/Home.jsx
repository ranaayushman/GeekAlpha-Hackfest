import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4 text-white">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text mb-4"
        >
          Welcome to Fin.ai
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400"
        >
          Your AI-powered financial companion
        </motion.p>
      </div>
    </div>
  );
}