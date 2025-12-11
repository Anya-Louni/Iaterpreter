'use client';

import { motion } from 'framer-motion';
import { Globe, FileScan, Languages, Zap } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Real-Time Interpretation',
    description: 'Instant professional interpretation for in-flight communications',
    icon: Globe
  },
  {
    number: '02',
    title: 'Document Analysis',
    description: 'AI-powered scanning and keyword extraction',
    icon: FileScan
  },
  {
    number: '03',
    title: 'Cultural Consultation',
    description: 'Expert guidance on international customs and nuances',
    icon: Languages
  },
  {
    number: '04',
    title: 'Emergency Support',
    description: '24/7 critical interpretation services',
    icon: Zap
  }
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-56 md:py-64 bg-transparent overflow-hidden flex justify-center">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 grid-pattern"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center flex flex-col items-center mb-24"
          style={{ marginBottom: '24px' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] sm:tracking-[0.2em] mb-8 text-white" style={{ marginBottom: '12px' }}>
              SERVICES
            </h2>
          </motion.div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A55A] to-transparent mb-10"
            style={{ marginBottom: '12px' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-500 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-16"
            style={{ marginBottom: '0px' }}
          >
            Excellence in Every Interaction
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 gap-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-[#0a0a0a] p-12 sm:p-20 md:p-28 lg:p-32 group relative overflow-hidden border border-[#C9A55A]/10"
                style={{
                  opacity: 0,
                  transform: 'translateY(40px)',
                  animation: `fadeInUp 0.7s ease-out ${index * 0.15}s forwards`
                }}
              >
                {/* Permanent gradient from right */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#C9A55A]/40 via-[#C9A55A]/10 to-transparent pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-12 sm:mb-20 md:mb-28">
                    <motion.div
                      className="text-[#C9A55A]/50 group-hover:text-[#C9A55A] transition-colors duration-500"
                    >
                      <Icon size={36} className="sm:w-12 sm:h-12" strokeWidth={0.5} />
                    </motion.div>
                    <div className="text-[#C9A55A]/30 text-4xl sm:text-5xl md:text-6xl font-extralight group-hover:text-[#C9A55A]/50 transition-colors duration-500">
                      {service.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight text-white mb-8 sm:mb-12 md:mb-16 tracking-wide group-hover:text-[#C9A55A] transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-12 sm:mb-16 md:mb-20">
                    {service.description}
                  </p>
                  
                  <motion.div
                    className="flex items-center justify-end text-[#C9A55A] text-sm sm:text-base tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                  >
                    <motion.span
                      className="mr-2 sm:mr-3"
                    >
                      DISCOVER MORE
                    </motion.span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
