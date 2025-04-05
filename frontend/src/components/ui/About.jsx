import { motion } from "framer-motion";
import { Target, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize financial intelligence, empowering everyone to make smarter, data-backed investment decisions with confidence and ease.",
    link: "#features",
  },
  {
    icon: Shield,
    title: "Our Values",
    description:
      "We believe in transparency, security, and putting our users first. Your financial success is our top priority.",
    link: "#testimonials",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A dynamic team of AI and fintech innovators, transforming personal finance with smart, data-driven investment solutions.",
    link: "/team",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-black/30" id="about">
      <div className="container mx-auto px-4">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-gold text-transparent bg-clip-text"
        >
          About Us
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} delay={index * 0.2} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function ValueCard({ value, delay, navigate }) {
  const handleClick = () => {
    if (value.link.startsWith("#")) {
      const section = document.querySelector(value.link);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(value.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mb-6"
        aria-hidden="true"
      >
        <value.icon className="w-8 h-8 text-dark" />
      </div>
      <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
      <p className="text-light/70">{value.description}</p>
    </motion.div>
  );
}