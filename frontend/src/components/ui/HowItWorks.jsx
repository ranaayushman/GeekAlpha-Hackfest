"use client";

import { motion } from "framer-motion";
import { Upload, Brain, BarChart as ChartBar, LogInIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: LogInIcon,
    title: "Sign Up & Get Started",
    description:
      "Create your account in minutes, verify details & securely link your brokerage for seamless investment experience.",
    link: "/login",
  },
  {
    icon: Brain,
    title: "Unlock AI-Powered Insights",
    description:
      "Get personalized stock & mutual fund recommendations, risk analysis & market trends — powered by cutting-edge AI.",
    link: "/insights",
  },
  {
    icon: ChartBar,
    title: "Invest & Grow Effortlessly",
    description:
      "Buy & sell stocks or mutual funds with a single tap, track real-time performance & optimize your portfolio seamlessly.",
    link: "/market",
  },
];

export default function HowItWorks({ userId }) {
  const router = useRouter();

  const getDynamicLink = (baseLink) => {
    return userId ? `${baseLink}/${userId}` : baseLink;
  };

  return (
    <section
      className="py-24 bg-black relative overflow-hidden"
      id="how-it-works"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-yellow-500"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => router.push(getDynamicLink(step.link))}
              className="group p-8 rounded-xl border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-300 bg-black shadow-md hover:shadow-lg cursor-pointer"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-yellow-500 rounded-full p-4 flex items-center justify-center">
                  {React.createElement(step.icon, {
                    className: "w-8 h-8 text-black",
                  })}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-3 group-hover:text-yellow-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-center text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
