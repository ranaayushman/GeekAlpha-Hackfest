import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import riyaImage from '../assets/riya.jpeg';
import gurdImage from '../assets/gurd.jpeg';
import ayusImage from '../assets/ayus.jpeg';
import abhiImage from '../assets/abhi.jpeg';
import rjImage from '../assets/rj.jpeg';

const teamMembers = [
  {
    id: 1,
    name: 'Riya Singh',
    role: 'UI/UX Designer',
    image: riyaImage,
   // bio: 'Former Goldman Sachs executive with 15+ years of experience in fintech and algorithmic trading.',
    quote: 'Simple, intuitive design is the key to making finance accessible to everyone.',
  },
  {
    id: 2,
    name: 'Gurdeep Singh',
    role: 'Machine Learning Expert',
    image: gurdImage,
   // bio: 'Ex-Google AI researcher specializing in machine learning and financial forecasting models.',
    quote: "We're engineering the future of finance, where every algorithm is a step toward smarter investing.",
  },
  {
    id: 3,
    name: 'Abhishek Kumar',
    role: 'Backend Developer',
    image: abhiImage,
   // bio: 'Product veteran from Stripe with deep expertise in fintech UX and customer experience.',
   quote: 'Our code doesn’t just run servers; it powers experiences, scales ideas, and keeps the digital world in motion.', 
  },
  {
    id: 4,
    name: 'Ayushman Rana',
    role: 'Backend Developer',
    image: ayusImage,
   // bio: 'Product veteran from Stripe with deep expertise in fintech UX and customer experience.',
   quote: 'Great backends are like great foundations—you don’t see them, but they hold everything together.', 
  },
  {
    id: 5,
    name: 'Prem Ranjan',
    role: 'Frontend Developer',
    image: rjImage,
   // bio: 'Ex-Google AI researcher specializing in machine learning and financial forecasting models.',
    quote: "A great frontend isn’t just code—it’s the art of making complexity look effortless.",
  },
];

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text mb-16"
        >
          Meet Our Amazing Team
        </motion.h1>

        <div className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/50 border border-[#FFD700]/20 text-[#FFD700]"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/50 border border-[#FFD700]/20 text-[#FFD700]"
              onClick={() => paginate(1)}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 200, damping: 40 }, opacity: { duration: 1.0 } }}
              className="absolute w-full max-w-4xl"
            >
              <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-[#FFD700]/10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-white mb-2">{teamMembers[currentIndex].name}</h2>
                    <p className="text-[#FFD700] mb-4">{teamMembers[currentIndex].role}</p>
                    <p className="text-gray-400 mb-6">{teamMembers[currentIndex].bio}</p>
                    <blockquote className="border-l-2 border-[#FFD700] pl-4 italic text-white">"{teamMembers[currentIndex].quote}"</blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Team;
