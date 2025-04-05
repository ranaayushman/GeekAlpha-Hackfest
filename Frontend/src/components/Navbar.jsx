

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-[#FFD700]/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text cursor-pointer" 
              onClick={() => navigate('/')}
            >
              Fin.ai
            </h1>
            
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]/60 transition-colors text-white"
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;