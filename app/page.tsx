'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import VoiceTranslator from '@/components/VoiceTranslator';
import ImageTranslator from '@/components/ImageTranslator';
import AIDocumentAnalyzer from '@/components/AIDocumentAnalyzer';
import Contact from '@/components/Contact';
import Particles from '@/components/Particles';

const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Particles />
      <Header />
      
      {/* Hero Section with Globe Background */}
      <div className="relative pt-24 min-h-screen">
        {/* Globe - Background Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <Globe key="main-globe" />
        </div>
        
        {/* Hero Content - Foreground Layer */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Hero />
        </div>
      </div>
      
      <div className="relative w-full flex flex-col items-center" style={{ zIndex: 10 }}>
        <div className="h-24"></div>
        <Services />
        <div className="h-24"></div>
        <VoiceTranslator />
        <div className="h-24"></div>
        <ImageTranslator />
        <div className="h-24"></div>
        <AIDocumentAnalyzer />
        <div className="h-24"></div>
        <Contact />
        <div className="h-24"></div>
      </div>
      
      {/* Footer */}
      <footer className="relative bg-[#0a0a0a] border-t border-[#C9A55A]/20 w-full z-10" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="px-6 md:px-12 lg:px-24 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 w-full"
          >
            <h3 className="text-xl sm:text-2xl font-extralight tracking-[0.2em] sm:tracking-[0.3em] bg-linear-to-r from-[#D4AF37] to-[#C9A55A] bg-clip-text text-transparent">
              IATERPRETER
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-600 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              &copy; 2025 All Rights Reserved
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
