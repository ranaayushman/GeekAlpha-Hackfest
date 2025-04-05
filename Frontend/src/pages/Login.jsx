import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Apple } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-[#FFD700]/10"
      >
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-10 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-10 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-[#FFD700] hover:text-[#FFA500] transition-colors">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold shadow-lg shadow-[#FFD700]/20"
          >
            Login
          </motion.button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0A0A] text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" alt="Google" className="h-5" />
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors">
              <Apple className="h-5 w-5" />
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#FFD700] hover:text-[#FFA500] transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}