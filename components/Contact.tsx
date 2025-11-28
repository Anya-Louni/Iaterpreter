'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-56 md:py-64 bg-transparent w-full flex justify-center">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center w-full flex flex-col items-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] sm:tracking-[0.2em] text-white" style={{ marginBottom: '4px' }}>
            GET IN TOUCH
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-px bg-linear-to-r from-transparent via-[#C9A55A] to-transparent"
            style={{ marginTop: '4px', marginBottom: '4px' }}
          />
          <p className="text-gray-500 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase" style={{ marginTop: '2px', marginBottom: '16px' }}>
            Professional Aviation Language Services
          </p>
        </motion.div>

        <div className="w-full">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-white mb-16" style={{ marginBottom: '16px' }}>SEND A MESSAGE</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] text-[#C9A55A] mb-3 sm:mb-4">
                  FULL NAME *
                </label>
                <input
                  style={{ marginBottom: '8px' }}
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 bg-black/60 border border-[#C9A55A]/20 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-[#C9A55A] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] text-[#C9A55A] mb-3 sm:mb-4">
                  EMAIL ADDRESS *
                </label>
                <input
                  style={{ marginBottom: '8px' }}
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 bg-black/60 border border-[#C9A55A]/20 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-[#C9A55A] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] text-[#C9A55A] mb-3 sm:mb-4">
                  SUBJECT *
                </label>
                <input
                  style={{ marginBottom: '8px' }}
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 bg-black/60 border border-[#C9A55A]/20 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-[#C9A55A] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] text-[#C9A55A] mb-3 sm:mb-4">
                  MESSAGE *
                </label>
                <textarea
                  style={{ marginBottom: '8px' }}
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 bg-black/60 border border-[#C9A55A]/20 text-white text-sm sm:text-base md:text-lg focus:outline-none focus:border-[#C9A55A] transition-colors resize-none"
                  required
                />
              </div>

              <button
                style={{ marginBottom: '16px' }}
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-12 py-5 sm:px-20 sm:py-7 md:px-24 md:py-8 bg-transparent border-2 border-[#C9A55A] text-[#C9A55A] overflow-hidden transition-all duration-300 hover:shadow-[0_0_10px_rgba(201,165,90,0.6)] hover:brightness-110 text-base sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] min-w-[200px] sm:min-w-[240px] md:min-w-[280px] flex items-center justify-center mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
            style={{ marginBottom: '8px' }}
          >
            {/* Email */}
            <div className="p-8 sm:p-12 md:p-16 border border-[#C9A55A]/10 bg-[#0a0a0a] hover:border-[#C9A55A]/30 transition-all duration-300">
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 md:p-5 bg-[#C9A55A]/10">
                  <Mail size={32} className="text-[#C9A55A] w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <div className="text-[#C9A55A] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold mb-1 sm:mb-2">Email</div>
                  <div className="text-gray-400 text-xs sm:text-sm md:text-base">Primary Contact</div>
                </div>
              </div>
              <a href="mailto:contact@iaterpreter.com" className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-light hover:text-[#C9A55A] transition-colors duration-300 block break-all">
                contact@iaterpreter.com
              </a>
            </div>

            {/* Phone */}
            <div className="p-8 sm:p-12 md:p-16 border border-[#C9A55A]/10 bg-[#0a0a0a] hover:border-[#C9A55A]/30 transition-all duration-300">
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="p-3 sm:p-4 md:p-5 bg-[#C9A55A]/10">
                  <Phone size={32} className="text-[#C9A55A] w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <div className="text-[#C9A55A] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold mb-1 sm:mb-2">Phone</div>
                  <div className="text-gray-400 text-xs sm:text-sm md:text-base">Available 24/7</div>
                </div>
              </div>
              <a href="tel:+15551234567" className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-light hover:text-[#C9A55A] transition-colors duration-300 block" >
                +1 (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
