'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-1 radial-overlay pointer-events-none"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A55A]/10 rounded-full blur-[150px] z-1 pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A55A]/10 rounded-full blur-[150px] z-1 pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10 w-full py-56 md:py-64">
        {/* Centered content */}
        <div className="text-center flex flex-col items-center justify-center">
          {/* Title with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '12px' }}
          >
            <motion.h1 
              className="text-[52px] sm:text-[90px] md:text-[130px] lg:text-[150px] font-extralight tracking-[0.1em] leading-none px-4"
              style={{
                backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #C9A55A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 100px rgba(201, 165, 90, 0.4)'
              }}
            >
              IATERPRETER
            </motion.h1>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A55A] to-transparent"
            style={{ marginBottom: '12px' }}
          />

          {/* Subtitle with fade up */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 font-light tracking-[0.2em] sm:tracking-[0.25em] max-w-4xl uppercase leading-relaxed px-4"
            style={{ marginBottom: '0px' }}
          >
            Excellence in Translation & Interpretation
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
            style={{ marginTop: '24px' }}
          >
            <motion.a
              href="#services"
              whileHover={{ 
                boxShadow: '0 0 30px rgba(201, 165, 90, 0.8), 0 0 60px rgba(201, 165, 90, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ paddingLeft: '70px', paddingRight: '70px' }}
              className="py-5 text-lg font-bold tracking-[0.2em] uppercase border-2 border-[#C9A55A] text-[#C9A55A] bg-transparent inline-block cursor-pointer"
            >
              GET STARTED
            </motion.a>
            <motion.a
              href="#voice-translator"
              whileHover={{ 
                boxShadow: '0 0 30px rgba(201, 165, 90, 0.9), 0 0 60px rgba(201, 165, 90, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ paddingLeft: '70px', paddingRight: '70px' }}
              className="py-5 text-lg font-bold tracking-[0.2em] uppercase bg-[#C9A55A] text-black inline-block cursor-pointer"
            >
              LIVE DEMO
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
