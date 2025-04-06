import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const links = {
  company: ['About', 'Careers', 'Press'],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  support: ['Help Center', 'Contact Us', 'Status'],
};

export default function Footer() {
  return (
    <footer className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Fin.ai</h3>
            <p className="text-white/70 mb-4">Finance, reimagined with AI.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/70 hover:text-yellow-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70">
          <p>© 2025 Fin.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
