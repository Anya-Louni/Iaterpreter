'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Services', 'AI Analysis', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#C9A55A]/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto px-12 w-full flex justify-center"
      >
        <div className="flex items-center justify-between h-28 w-full max-w-7xl">
          {/* Logo */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 bg-gradient-to-r from-[#C9A55A] to-[#D4AF37] rounded-full"
            />
            <h1 className="text-3xl font-extralight tracking-[0.15em] bg-linear-to-r from-[#D4AF37] to-[#C9A55A] bg-clip-text text-transparent">
              IATERPRETER
            </h1>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-16">
            <motion.a
              href="#services"
              initial={{ opacity: 0, y: -10, filter: 'drop-shadow(0 0 0px transparent)' }}
              animate={{ opacity: 1, y: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
              transition={{ delay: 0, duration: 0.3 }}
              whileHover={{ 
                filter: 'drop-shadow(0 0 15px rgba(201, 165, 90, 1)) drop-shadow(0 0 30px rgba(201, 165, 90, 1)) drop-shadow(0 0 45px rgba(201, 165, 90, 0.8))'
              }}
              className="text-sm text-gray-300 tracking-[0.25em] uppercase font-light transition-all duration-300 hover:text-[#C9A55A] cursor-pointer"
            >
              Services
            </motion.a>
            <motion.a
              href="#voice-translator"
              initial={{ opacity: 0, y: -10, filter: 'drop-shadow(0 0 0px transparent)' }}
              animate={{ opacity: 1, y: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
              transition={{ delay: 0.1, duration: 0.3 }}
              whileHover={{ 
                filter: 'drop-shadow(0 0 15px rgba(201, 165, 90, 1)) drop-shadow(0 0 30px rgba(201, 165, 90, 1)) drop-shadow(0 0 45px rgba(201, 165, 90, 0.8))'
              }}
              className="text-sm text-gray-300 tracking-[0.25em] uppercase font-light transition-all duration-300 hover:text-[#C9A55A] cursor-pointer"
            >
              Voice
            </motion.a>
            <motion.a
              href="#image-translator"
              initial={{ opacity: 0, y: -10, filter: 'drop-shadow(0 0 0px transparent)' }}
              animate={{ opacity: 1, y: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
              transition={{ delay: 0.15, duration: 0.3 }}
              whileHover={{ 
                filter: 'drop-shadow(0 0 15px rgba(201, 165, 90, 1)) drop-shadow(0 0 30px rgba(201, 165, 90, 1)) drop-shadow(0 0 45px rgba(201, 165, 90, 0.8))'
              }}
              className="text-sm text-gray-300 tracking-[0.25em] uppercase font-light transition-all duration-300 hover:text-[#C9A55A] cursor-pointer"
            >
              Image
            </motion.a>
            <motion.a
              href="#ai-analysis"
              initial={{ opacity: 0, y: -10, filter: 'drop-shadow(0 0 0px transparent)' }}
              animate={{ opacity: 1, y: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ 
                filter: 'drop-shadow(0 0 15px rgba(201, 165, 90, 1)) drop-shadow(0 0 30px rgba(201, 165, 90, 1)) drop-shadow(0 0 45px rgba(201, 165, 90, 0.8))'
              }}
              className="text-sm text-gray-300 tracking-[0.25em] uppercase font-light transition-all duration-300 hover:text-[#C9A55A] cursor-pointer"
            >
              AI Analysis
            </motion.a>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: -10, filter: 'drop-shadow(0 0 0px transparent)' }}
              animate={{ opacity: 1, y: 0, filter: 'drop-shadow(0 0 0px transparent)' }}
              transition={{ delay: 0.25, duration: 0.3 }}
              whileHover={{ 
                filter: 'drop-shadow(0 0 15px rgba(201, 165, 90, 1)) drop-shadow(0 0 30px rgba(201, 165, 90, 1)) drop-shadow(0 0 45px rgba(201, 165, 90, 0.8))'
              }}
              className="text-sm text-gray-300 tracking-[0.25em] uppercase font-light transition-all duration-300 hover:text-[#C9A55A] cursor-pointer"
            >
              Contact
            </motion.a>
          </nav>

          {/* Get In Touch Button - Empty Style */}
          <motion.a
            href="#contact"
            whileHover={{ 
              boxShadow: '0 0 30px rgba(201, 165, 90, 0.9), 0 0 60px rgba(201, 165, 90, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            style={{ paddingLeft: '50px', paddingRight: '50px' }}
            className="hidden md:inline-block py-5 text-lg font-bold tracking-[0.2em] uppercase border-2 border-[#C9A55A] text-[#C9A55A] bg-transparent cursor-pointer"
          >
            GET IN TOUCH
          </motion.a>

          {/* Mobile Menu Button - Absolute Right */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#C9A55A] absolute right-6 z-50"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

      </motion.div>

      {/* Mobile Sidebar Navigation */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 h-screen w-80 bg-[#0a0a0a] border-l border-[#C9A55A]/20 md:hidden z-40 backdrop-blur-xl"
        style={{ width: '320px' }}
      >
        <div className="flex flex-col justify-between h-full" style={{ paddingTop: '160px', paddingBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }}>
          <nav className="flex flex-col" style={{ gap: '40px' }}>
            <motion.a
              href="#services"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 8 }}
              className="text-gray-400 tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:text-[#C9A55A] border-b border-[#C9A55A]/10"
              style={{ fontSize: '18px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              Services
            </motion.a>
            <motion.a
              href="#voice-translator"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 8 }}
              className="text-gray-400 tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:text-[#C9A55A] border-b border-[#C9A55A]/10"
              style={{ fontSize: '18px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              Voice
            </motion.a>
            <motion.a
              href="#image-translator"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 8 }}
              className="text-gray-400 tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:text-[#C9A55A] border-b border-[#C9A55A]/10"
              style={{ fontSize: '18px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              Image
            </motion.a>
            <motion.a
              href="#ai-analysis"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 8 }}
              className="text-gray-400 tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:text-[#C9A55A] border-b border-[#C9A55A]/10"
              style={{ fontSize: '18px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              AI Analysis
            </motion.a>
            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 8 }}
              className="text-gray-400 tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:text-[#C9A55A] border-b border-[#C9A55A]/10"
              style={{ fontSize: '18px', paddingTop: '16px', paddingBottom: '16px' }}
            >
              Contact
            </motion.a>
          </nav>
        </div>
      </motion.div>
    </header>
  );
}
