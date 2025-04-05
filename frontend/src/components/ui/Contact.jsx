"use client";
import { motion } from "framer-motion";


import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-gold text-transparent bg-clip-text"
        >
          Have Questions? We’d Love to Help!
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <ContactItem icon={<Mail className="w-6 h-6" />} text="contact@finai.com" />
            <ContactItem icon={<Phone className="w-6 h-6" />} text="+1 (555) 123-4567" />
            <ContactItem icon={<MapPin className="w-6 h-6" />} text="ICARE Complex, HIT Campus, Haldia - 721657" />
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <FormField id="name" label="Name" type="text" placeholder="Enter your name" />
            <FormField id="email" label="Email" type="email" placeholder="Enter your email" />
            <FormTextArea id="message" label="Message" placeholder="Type your message here..." />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-lg bg-gradient-gold text-dark font-semibold transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// Contact Info Item
function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-primary">{icon}</div>
      <p className="text-light/70">{text}</p>
    </div>
  );
}

// Single Input Field
function FormField({ id, label, type, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-primary/30 focus:border-primary focus:outline-none transition-all"
      />
    </div>
  );
}

// Textarea Field
function FormTextArea({ id, label, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-primary/30 focus:border-primary focus:outline-none transition-all"
      ></textarea>
    </div>
  );
}

