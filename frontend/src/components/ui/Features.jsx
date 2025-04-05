'use client';

import { motion } from 'framer-motion';
import { LineChart, Brain } from 'lucide-react';
import { IconLayoutDashboardFilled } from '@tabler/icons-react';
import Link from 'next/link';

const features = [
  {
    icon: <LineChart className="w-6 h-6 text-black"  />,
    title: 'Automatic Portfolio Tracking',
    description: 'Aggregate your investments from multiple platforms effortlessly.',
    link: '/portfolio',
  },
  {
    icon: <Brain className="w-6 h-6 text-black" />,
    title: 'Smart AI Comparison',
    description: 'Compare mutual funds & stocks with graphical representation.',
    link: '/charts',
  },
  {
    icon: <IconLayoutDashboardFilled className="w-6 h-6 text-black" />,
    title: 'Unified Dashboard',
    description: 'Track and execute trades from one centralized location.',
    link: '/portfolio/details',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-black" id="features">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-yellow-500"
        >
          What Makes Us Special?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const CardContent = (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="group flex flex-col p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-300 bg-black shadow-md hover:shadow-lg h-full cursor-pointer"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-yellow-500 rounded-full p-4 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-center text-white mb-3 group-hover:text-yellow-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-400 flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            );

            return feature.link ? (
              <Link href={feature.link} key={index} className="h-full">
                {CardContent}
              </Link>
            ) : (
              <div key={index} className="h-full">
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





