import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, FileText } from 'lucide-react';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [platform, setPlatform] = useState('');

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Investment Setup' },
  ];

  const platforms = ['Zerodha', 'Angel One', 'MF Central'];

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-[#FFD700]/10"
      >
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
          Create Account
        </h2>

        <div className="flex justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s.number ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black' : 'bg-white/10 text-white'
                }`}
              >
                {s.number}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{s.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-12 mx-4 ${step > s.number ? 'bg-[#FFD700]' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-10 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-10 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Age"
                  min="1"
                  max="100"
                  onChange={(e) => {
                    let value = parseInt(e.target.value, 10);
                    if (value < 1) value = 1;
                    if (value > 100) value = 100;
                    e.target.value = value;
                  }}
                  className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-4 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
                />
              </div>
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
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="relative">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-4 focus:outline-none focus:border-[#FFD700]/40 transition-colors appearance-none"
                >
                  <option value="" disabled>Select Platform</option>
                  {platforms.map((p) => (
                    <option key={p} value={p} className="bg-gray-900">{p}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Platform ID"
                  className="w-full bg-white/5 border border-[#FFD700]/20 rounded-lg py-3 px-10 focus:outline-none focus:border-[#FFD700]/40 transition-colors"
                />
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-lg border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
              >
                Back
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => step < 2 ? setStep(step + 1) : null}
              className={`px-6 py-3 rounded-lg ${
                step === 2
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold w-full'
                  : 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold ml-auto'
              }`}
            >
              {step === 2 ? 'Create Account' : 'Next'}
            </motion.button>
          </div>

          {step === 1 && (
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#FFD700] hover:text-[#FFA500] transition-colors">
                Login
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}