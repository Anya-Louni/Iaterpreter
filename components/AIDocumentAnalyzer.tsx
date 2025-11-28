'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { UploadCloud, File, X, Loader } from 'lucide-react';

export default function AIDocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="ai-analysis" className="relative py-40 md:py-48 bg-transparent w-full flex justify-center">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"></div>
      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-32 flex flex-col items-center"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.15em] sm:tracking-[0.2em] mb-20 text-white"
            style={{ marginBottom: '8px' }}
          >
            AI ANALYSIS
          </motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 200, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-px bg-linear-to-r from-transparent via-[#C9A55A] to-transparent mb-24"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-500 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
            style={{ marginTop: '8px', marginBottom: '16px' }}
          >
            Document Intelligence Powered by AI
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full"
        >
          {/* Upload Area */}
          <motion.div
            className="relative border border-[#C9A55A]/10 bg-[#0a0a0a] backdrop-blur-sm transition-all duration-500 hover:border-[#C9A55A]/60 overflow-hidden group cursor-pointer"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#C9A55A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-center relative z-10" style={{ padding: '60px 20px' }}>
              {!file ? (
                <>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer block">
                    <div className="text-[#C9A55A]/50 group-hover:text-[#C9A55A] transition-colors duration-500">
                      <UploadCloud size={100} className="mx-auto mb-8 sm:mb-12 md:mb-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48" strokeWidth={0.5} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 text-base sm:text-xl md:text-2xl lg:text-3xl tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-6 sm:mb-8 md:mb-12 font-light"
                    >
                      Drop file or click to upload
                    </motion.div>
                    <div className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-2xl tracking-wider">
                      PDF • JPG • PNG
                    </div>
                  </label>
                </>
              ) : (
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-20"
                >
                  <div className="flex items-center justify-center space-x-5">
                    <File size={28} className="text-[#C9A55A]" />
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-white text-xl tracking-wide"
                    >
                      {file.name}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFile(null)}
                      className="text-[#C9A55A]/50 hover:text-[#C9A55A] text-xl transition-colors"
                    >
                      <X size={28} />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    onClick={analyzeDocument}
                    disabled={analyzing}
                    className="group relative px-12 py-5 sm:px-20 sm:py-7 md:px-24 md:py-8 bg-[#C9A55A] text-black text-base sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] overflow-hidden hover:shadow-[0_0_40px_rgba(201,165,90,0.8)] hover:brightness-110 transition-all duration-300 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] inline-flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <motion.span
                      className="absolute inset-0 bg-linear-to-r from-[#D4AF37] to-[#FFD700]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    {analyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="relative z-10"
                        >
                          <Loader size={24} />
                        </motion.div>
                        <span className="relative z-10">ANALYZING...</span>
                      </>
                    ) : (
                      <span className="relative z-10">ANALYZE</span>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-24 border border-[#C9A55A]/20 bg-black/40 backdrop-blur-sm p-20"
            >
              <h3 className="text-4xl font-light tracking-wider text-white mb-12">RESULTS</h3>
              
              <div className="space-y-12">
                {results.keywords && (
                  <div>
                    <h4 className="text-lg tracking-widest text-gray-500 uppercase mb-5">Keywords</h4>
                    <div className="flex flex-wrap gap-5">
                      {results.keywords.map((keyword: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-6 py-3 border border-[#C9A55A]/30 text-[#C9A55A] text-lg tracking-wide bg-black/20"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-lg tracking-widest text-gray-500 uppercase mb-3">Document Type</h4>
                    <p className="text-white text-xl">{results.type}</p>
                  </div>

                  <div>
                    <h4 className="text-lg tracking-widest text-gray-500 uppercase mb-3">Language</h4>
                    <p className="text-white text-xl">{results.language}</p>
                  </div>
                </div>

                {results.summary && (
                  <div>
                    <h4 className="text-lg tracking-widest text-gray-500 uppercase mb-5">Summary</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{results.summary}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
