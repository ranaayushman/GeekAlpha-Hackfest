'use client';

import { motion } from "framer-motion";
import { Target, Shield, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Democratizing financial intelligence for everyone to make smarter, data-driven investment decisions with confidence and ease.",
    link: "#features",
  },
  {
    icon: Shield,
    title: "Our Values",
    description:
      "Transparency, security, and user-first thinking. Your financial success is our top priority.",
    link: "#testimonials",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A powerhouse team of AI and fintech innovators, shaping the future of personal finance through smart technology.",
    link: "/team",
  },
];

export default function About() {
  const router = useRouter();

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="about">
      <div className="container mx-auto px-4">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-yellow-400 tracking-tight"
        >
          About Us
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} delay={index * 0.2} router={router} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function ValueCard({ value, delay, router }) {
  const handleClick = () => {
    if (value.link.startsWith("#")) {
      const section = document.querySelector(value.link);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(value.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      onClick={handleClick}
      className="group bg-black p-8 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300 shadow-md hover:shadow-yellow-400/10 cursor-pointer"
    >
      <div className="flex justify-center mb-6">
        <div className="bg-yellow-400 rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform">
          {React.createElement(value.icon, { className: "w-8 h-8 text-black" })}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center text-white mb-3 group-hover:text-yellow-400 transition-colors">
        {value.title}
      </h3>
      <p className="text-center text-gray-400 text-sm leading-relaxed">
        {value.description}
      </p>
    </motion.div>
  );
}
