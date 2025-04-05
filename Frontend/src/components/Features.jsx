import { motion } from "framer-motion";
import { LineChart, Brain } from "lucide-react";
import GrowthChart from "./GrowthChart";
import { IconLayoutDashboardFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom"; // ✅ Import Link

const features = [
  {
    icon: <LineChart className="w-12 h-12 text-primary mb-4" />,
    title: "Automatic Portfolio Tracking",
    description: "Aggregate your investments from multiple platforms effortlessly.",
    link: "/portfolio", // ✅ Route to /portfolio
  },
  {
    icon: <Brain className="w-12 h-12 text-primary mb-4" />,
    title: "Smart AI Comparison",
    description: "Compare mutual funds & stocks with graphical representation.",
    link: "/charts",
  },
  {
    icon: <IconLayoutDashboardFilled className="w-12 h-12 text-primary mb-4" />,
    title: "Unified Dashboard",
    description: "Track and execute trades from one centralised location.",
    link: "/portfolio/details", // ✅ Route to PortfolioDetails
  },
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-gold text-transparent bg-clip-text"
        >
          What Makes Us Special?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const CardContent = (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
              >
                {feature.icon}
                <h3 id={`feature-title-${index}`} className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p aria-labelledby={`feature-title-${index}`} className="text-light/70">
                  {feature.description}
                </p>
              </motion.div>
            );

            return feature.link ? (
              <Link to={feature.link} key={index}>
                {CardContent}
              </Link>
            ) : (
              <div key={index}>{CardContent}</div>
            );
          })}
        </div>

        <div className="h-[400px] w-full max-w-[800px] mx-auto">
          <GrowthChart />
        </div>
      </div>
    </section>
  );
}



