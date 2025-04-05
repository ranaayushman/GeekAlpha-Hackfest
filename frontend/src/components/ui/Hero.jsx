'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';  // Next.js router for client-side navigation
import GoldenCoin from './GoldenCoin'; // assuming GoldenCoin is in the same folder

export default function Hero() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1)_0%,_rgba(0,0,0,0)_70%)]" />
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-col items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          className="flex-1 text-center lg:text-center z-10"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] py-4 text-transparent bg-clip-text cursor-pointer">
            Fin.ai
          </h1>
          <p className="text-xl md:text-xl text-white mb-8">
            Revolutionizing Finance with the Power of AI
          </p>
          <motion.button
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.75 }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold"
            onClick={() => router.push('/signup')} 
          >
            Get Started 
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 h-[400px] w-full max-w-[500px]"
        >
          {/* <GoldenCoin /> */}
        </motion.div>
      </div>
    </div>
  );
}
