"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-yellow-400"
        >
          Contact Us
        </motion.h2>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

            <ContactItem
              icon={<Mail className="w-6 h-6 text-yellow-400" />}
              text="contact@finai.com"
            />
            <ContactItem
              icon={<Phone className="w-6 h-6 text-yellow-400" />}
              text="+1 (555) 123-4567"
            />
            <ContactItem
              icon={<MapPin className="w-6 h-6 text-yellow-400" />}
              text="ICARE Complex, HIT Campus, Haldia - 721657"
            />
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <FormField id="name" placeholder="Name" />
            <FormField id="email" placeholder="Email" />
            <FormTextArea id="message" placeholder="Message" />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// Reusable Contact Info Item
function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <div>{icon}</div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}

// Input Field
function FormField({ id, placeholder }) {
  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 rounded-md bg-black border border-yellow-400/30 focus:border-yellow-400 focus:outline-none transition-all placeholder:text-yellow-400 text-yellow-400"
      />
    </div>
  );
}

// Textarea Field
function FormTextArea({ id, placeholder }) {
  return (
    <div>
      <textarea
        id={id}
        rows={5}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 rounded-md bg-black border border-yellow-400/30 focus:border-yellow-400 focus:outline-none transition-all placeholder:text-yellow-400 text-yellow-400"
      ></textarea>
    </div>
  );
}

