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
    setResults(null); // Clear previous results
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending file to API:', file.name, file.type);
      
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.error) {
        alert('Error: ' + data.error);
        return;
      }
      
      setResults(data);
    } catch (error) {
      console.error('Error analyzing document:', error);
      alert('Failed to analyze document. Check console for details.');
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32 flex flex-col items-center"
          style={{ marginBottom: '24px' }}
        >
          <h2 className="text-4xl md:text-6xl font-extralight tracking-widest text-white mb-12" style={{ marginBottom: '12px' }}>
            AI ANALYSIS
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 400, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-[#C9A55A] to-transparent mb-12"
            style={{ marginBottom: '12px' }}
          />
          <p className="text-gray-400 tracking-wider uppercase mb-16" style={{ marginBottom: '0px' }}>
            Document Intelligence Powered by AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full bg-[#0f0f0f]/50 backdrop-blur-sm border-2 border-[#C9A55A]/40 p-12 md:p-20 min-h-[600px] flex flex-col"
        >
          {/* Upload Area */}
          <motion.div
            className="relative bg-transparent transition-all duration-500 overflow-hidden group cursor-pointer flex-1 flex items-center justify-center"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-linear-to-br from-[#C9A55A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-center relative z-10 flex items-center justify-center" style={{ padding: '100px 60px', minHeight: '280px' }}>
              {!file ? (
                <>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer block w-full">
                    <div className="text-[#C9A55A]/50 group-hover:text-[#C9A55A] transition-colors duration-500 flex justify-center">
                      <UploadCloud size={48} className="mb-6" strokeWidth={0.5} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-400 text-base tracking-[0.2em] uppercase mb-4 font-light text-center"
                    >
                      Drop file or click to upload
                    </motion.div>
                    <div className="text-gray-600 text-sm tracking-wider text-center">
                      PDF • JPG • PNG
                    </div>
                  </label>
                </>
              ) : (
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12 w-full flex flex-col items-center"
                >
                  <div className="flex items-center justify-center space-x-5 w-full">
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
                    className="group relative px-12 py-5 sm:px-20 sm:py-7 md:px-24 md:py-8 bg-[#C9A55A] text-black text-base sm:text-lg md:text-xl font-bold tracking-[0.15em] sm:tracking-[0.2em] overflow-hidden hover:shadow-[0_0_40px_rgba(201,165,90,0.8)] hover:brightness-110 transition-all duration-300 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] inline-flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
              className="mt-24 border-2 border-[#C9A55A] bg-black/40 backdrop-blur-sm"
              style={{ padding: '12px 12px' }}
            >
              <h3 className="text-4xl font-light tracking-wider text-white mb-20">ANALYSIS RESULTS</h3>
              
              <div className="space-y-32">
                {results.summary && (
                  <div>
                    <h4 className="text-lg tracking-widest text-[#C9A55A] uppercase mb-8">Summary</h4>
                    <p className="text-gray-300 text-xl leading-relaxed">{results.summary}</p>
                  </div>
                )}

                {results.keywords && results.keywords.length > 0 && (
                  <div>
                    <h4 className="text-lg tracking-widest text-[#C9A55A] uppercase mb-8">Key Words</h4>
                    <div className="flex flex-wrap gap-5">
                      {results.keywords.map((keyword: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-6 py-3 border border-[#C9A55A]/30 text-[#C9A55A] text-lg tracking-wide bg-black/20 hover:bg-[#C9A55A]/10 transition-colors"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {results.keyInsights && results.keyInsights.length > 0 && (
                  <div>
                    <h4 className="text-lg tracking-widest text-[#C9A55A] uppercase mb-8">Key Insights</h4>
                    <ul className="space-y-5">
                      {results.keyInsights.map((insight: string, idx: number) => (
                        <li key={idx} className="text-gray-300 text-lg flex items-start leading-relaxed">
                          <span className="text-[#C9A55A] mr-3">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
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
