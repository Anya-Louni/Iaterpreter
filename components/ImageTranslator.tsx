'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, ArrowRight } from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', name: 'French' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
];

export default function ImageTranslator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('fr');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clear previous results
      setExtractedText('');
      setTranslatedText('');
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      await processImage(file);
    }
  };

  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(blob);
            await processImage(blob);
          }
          stream.getTracks().forEach(track => track.stop());
        });
      }, 1000);
    } catch (err) {
      setError('Camera access denied. Please allow camera access.');
      console.error('Error accessing camera:', err);
    }
  };

  const processImage = async (imageFile: Blob) => {
    setIsProcessing(true);
    setError('');
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('sourceLanguage', sourceLanguage);
    formData.append('targetLanguage', targetLanguage);

    try {
      const response = await fetch('/api/image-translate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      setExtractedText(data.extractedText);
      setTranslatedText(data.translatedText);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Error processing image:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="image-translator" className="relative w-full py-56 md:py-64 bg-transparent flex justify-center">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-32 flex flex-col items-center"
        style={{ marginBottom: '24px' }}
      >
        <h2 className="text-4xl md:text-6xl font-extralight tracking-widest text-white mb-12" style={{ marginBottom: '12px' }}>
          IMAGE TRANSLATOR
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
          Snap, Scan, and Translate in Seconds
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full bg-[#0f0f0f]/50 backdrop-blur-sm border-2 border-[#C9A55A]/40 p-12 md:p-20 min-h-[600px] flex flex-col"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8" style={{ paddingTop: '40px' }}>
          <div className="w-full md:w-80">
            <label htmlFor="img-source-lang" className="block text-base tracking-wider text-[#C9A55A] mb-3 uppercase">From</label>
            <select
              id="img-source-lang"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full px-5 py-5 bg-black/60 border-2 border-[#C9A55A]/50 text-white rounded-none focus:outline-none focus:border-[#C9A55A] text-lg cursor-pointer"
            >
              {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
          </div>
          
          <ArrowRight className="w-8 h-8 text-[#C9A55A]/60 hidden md:block" />

          <div className="w-full md:w-80">
            <label htmlFor="img-target-lang" className="block text-base tracking-wider text-[#C9A55A] mb-3 uppercase">To</label>
            <select
              id="img-target-lang"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-5 py-5 bg-black/60 border-2 border-[#C9A55A]/50 text-white rounded-none focus:outline-none focus:border-[#C9A55A] text-lg cursor-pointer"
            >
              {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {!imagePreview ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8"
            >
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 800, damping: 12 }}
                className="flex flex-col items-center justify-center gap-4 bg-[#C9A55A]/10 border-2 border-[#C9A55A]/50 text-[#C9A55A] hover:bg-[#C9A55A]/20 hover:border-[#C9A55A]/80 transition-all duration-100 w-[280px] h-[280px] hover:shadow-[0_0_30px_rgba(201,165,90,0.3)] cursor-pointer"
              >
                <Upload className="w-16 h-16" />
                <span className="text-xl tracking-wider">Upload Image</span>
              </motion.button>
              <motion.button
                onClick={handleCamera}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 800, damping: 12 }}
                className="flex flex-col items-center justify-center gap-4 bg-[#C9A55A]/10 border-2 border-[#C9A55A]/50 text-[#C9A55A] hover:bg-[#C9A55A]/20 hover:border-[#C9A55A]/80 transition-all duration-100 w-[280px] h-[280px] hover:shadow-[0_0_30px_rgba(201,165,90,0.3)] cursor-pointer"
              >
                <Camera className="w-16 h-16" />
                <span className="text-xl tracking-wider">Take Photo</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <motion.img 
                src={imagePreview} 
                alt="Preview" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="max-w-md max-h-64 object-contain border-2 border-[#C9A55A]/30"
              />
              <motion.button
                onClick={() => {
                  setImagePreview(null);
                  setExtractedText('');
                  setTranslatedText('');
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 165, 90, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-[#C9A55A] border-2 border-[#C9A55A]/50 hover:border-[#C9A55A]/80 transition-all duration-300"
              >
                Choose Different Image
              </motion.button>
            </motion.div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />

          {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
        </div>

        {(isProcessing || extractedText || translatedText) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-40 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setExtractedText('');
                setTranslatedText('');
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: "spring", damping: 25 }}
              className="max-w-4xl w-full bg-[#0a0a0a] border-2 border-[#C9A55A]/60 p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-center mb-8">
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-[#C9A55A] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#C9A55A] rotate-45"></div>
                    <h3 className="text-sm md:text-lg font-light text-[#C9A55A] tracking-[0.2em] md:tracking-[0.3em] uppercase">Extracted</h3>
                  </div>
                  <div className="bg-black/50 border border-[#C9A55A]/30 p-4 md:p-6 min-h-[120px] md:min-h-[180px] max-h-[200px] md:max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9A55A]/50 scrollbar-track-transparent">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{isProcessing && !extractedText ? 'Extracting text from image...' : extractedText}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#C9A55A] rotate-45"></div>
                    <h3 className="text-sm md:text-lg font-light text-[#C9A55A] tracking-[0.2em] md:tracking-[0.3em] uppercase">Translation</h3>
                  </div>
                  <div className="bg-black/50 border border-[#C9A55A]/30 p-4 md:p-6 min-h-[120px] md:min-h-[180px] max-h-[200px] md:max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9A55A]/50 scrollbar-track-transparent">
                    <p className="text-white text-sm md:text-base leading-relaxed">{isProcessing && !translatedText ? 'Translating...' : translatedText}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center mt-8"
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-[#C9A55A] to-transparent w-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      </div>
    </section>
  );
}
