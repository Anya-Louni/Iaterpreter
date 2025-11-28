'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 z-1 radial-overlay"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A55A]/10 rounded-full blur-[100px] z-1"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#C9A55A]/10 rounded-full blur-[100px] z-1"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Centered content */}
        <div className="text-center flex flex-col items-center justify-center min-h-screen">
          {/* Title with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-40"
            style={{ marginBottom: '16px' }}
          >
            <motion.h1 
              className="text-[48px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-extralight tracking-[0.15em] leading-none px-4"
              style={{
                backgroundImage: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #C9A55A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(201, 165, 90, 0.3)'
              }}
            >
              IATERPRETER
            </motion.h1>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-linear-to-r from-transparent via-[#C9A55A] to-transparent mb-40"
            style={{ marginTop: '8px', marginBottom: '16px' }}
          />

          {/* Subtitle with fade up */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-light tracking-[0.15em] sm:tracking-[0.2em] mb-64 max-w-3xl uppercase leading-loose px-4"
            style={{ marginTop: '8px', marginBottom: '16px' }}
          >
            Aviation Language Excellence
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-64 w-full px-4"
            style={{ marginTop: '8px', marginBottom: '16px' }}
          >
            <motion.a
              href="#contact"
              className="group relative px-12 py-5 sm:px-24 sm:py-8 bg-[#C9A55A] text-black text-base sm:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] overflow-hidden hover:shadow-[0_0_10px_rgba(201,165,90,0.8)] hover:brightness-110 transition-all duration-300 w-full sm:w-auto min-w-[240px] sm:min-w-[280px] flex items-center justify-center"
            >
              <motion.span
                className="absolute inset-0 bg-linear-to-r from-[#D4AF37] to-[#FFD700]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">GET STARTED</span>
            </motion.a>
            <motion.a
              href="#services"
              className="px-12 py-5 sm:px-24 sm:py-8 border-2 border-[#C9A55A]/50 text-[#C9A55A] text-base sm:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-[#C9A55A]/20 hover:border-[#C9A55A] hover:shadow-[0_0_10px_rgba(201,165,90,0.5)] transition-all duration-300 w-full sm:w-auto min-w-[240px] sm:min-w-[280px] flex items-center justify-center"
            >
              VIEW SERVICES
            </motion.a>
          </motion.div>

          {/* Animated stats with individual animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center items-center gap-8 sm:gap-16 md:gap-28 px-4"
          >
            {[
              { number: '50+', label: 'Languages' },
              { number: '24/7', label: 'Support' },
              { number: 'AI', label: 'Powered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                style={{ marginTop: '8px', marginBottom: '16px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="text-center group cursor-default"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight text-[#C9A55A] mb-4 sm:mb-8 md:mb-12 group-hover:text-[#FFD700] transition-colors duration-300"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-500 uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
