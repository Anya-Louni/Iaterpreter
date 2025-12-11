'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, ArrowRight } from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', name: 'French', speechCode: 'fr-FR' },
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'es', name: 'Spanish', speechCode: 'es-ES' },
  { code: 'de', name: 'German', speechCode: 'de-DE' },
  { code: 'it', name: 'Italian', speechCode: 'it-IT' },
  { code: 'pt', name: 'Portuguese', speechCode: 'pt-PT' },
  { code: 'ar', name: 'Arabic', speechCode: 'ar-SA' },
  { code: 'zh', name: 'Chinese', speechCode: 'zh-CN' },
  { code: 'ja', name: 'Japanese', speechCode: 'ja-JP' },
];

export default function VoiceTranslator() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('fr');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const startRecording = async () => {
    try {
      // Clear previous results smoothly
      setOriginalText('');
      setTranslatedText('');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError('');
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('sourceLanguage', sourceLanguage);
    formData.append('targetLanguage', targetLanguage);

    try {
      const response = await fetch('/api/voice-translate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }

      setOriginalText(data.originalText);
      setTranslatedText(data.translatedText);
      
      setTimeout(() => speakTranslation(), 500);
    } catch (err) {
      setError('Failed to process audio. Please try again.');
      console.error('Error processing audio:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakTranslation = () => {
    if (!synthRef.current || !translatedText) return;

    synthRef.current.cancel();

    const targetLang = LANGUAGES.find(l => l.code === targetLanguage);
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang?.speechCode || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setError('Failed to speak translation. Please try again.');
    };

    synthRef.current.speak(utterance);
  };

  return (
    <section id="voice-translator" className="relative w-full py-56 md:py-64 bg-transparent flex justify-center">
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
          VOICE TRANSLATOR
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
          Speak, and the World Understands
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full bg-[#0f0f0f]/50 backdrop-blur-sm border-2 border-[#C9A55A]/40 p-12 md:p-20 min-h-[600px] flex flex-col"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12" style={{ paddingTop: '60px' }}>
          <div className="w-full md:w-80">
            <label htmlFor="source-lang" className="block text-base tracking-wider text-[#C9A55A] mb-3 uppercase">From</label>
            <select
              id="source-lang"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full px-5 py-5 bg-black/60 border-2 border-[#C9A55A]/50 text-white rounded-none focus:outline-none focus:border-[#C9A55A] text-lg cursor-pointer"
>
              {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
          </div>
          
          <ArrowRight className="w-8 h-8 text-[#C9A55A]/60 hidden md:block" />

          <div className="w-full md:w-80">
            <label htmlFor="target-lang" className="block text-base tracking-wider text-[#C9A55A] mb-3 uppercase">To</label>
            <select
              id="target-lang"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-5 py-5 bg-black/60 border-2 border-[#C9A55A]/50 text-white rounded-none focus:outline-none focus:border-[#C9A55A] text-lg cursor-pointer"
            >
              {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingTop: '40px' }}>
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 border-4 shadow-2xl cursor-pointer ${
              isRecording 
                ? 'bg-red-500/80 border-red-400 shadow-red-500/50' 
                : 'bg-[#C9A55A]/90 border-[#D4AF37] shadow-[#C9A55A]/30 hover:shadow-[#C9A55A]/50'
            }`}
          >
            {isRecording ? (
              <MicOff className="w-11 h-11 text-white" />
            ) : (
              <Mic className="w-11 h-11 text-black" />
            )}
          </motion.button>
          
          {isRecording && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 mt-6"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#C9A55A] rounded-full"
                  animate={{
                    height: [16, 32, 16],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
          
          {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
        </div>

        {(isProcessing || originalText || translatedText) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-40 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOriginalText('');
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
                    <h3 className="text-sm md:text-lg font-light text-[#C9A55A] tracking-[0.2em] md:tracking-[0.3em] uppercase">Original</h3>
                  </div>
                  <div className="bg-black/50 border border-[#C9A55A]/30 p-4 md:p-6 min-h-[120px] md:min-h-[180px] max-h-[200px] md:max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#C9A55A]/50 scrollbar-track-transparent">
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{isProcessing && !originalText ? 'Transcribing your voice...' : originalText}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#C9A55A] rotate-45"></div>
                      <h3 className="text-sm md:text-lg font-light text-[#C9A55A] tracking-[0.2em] md:tracking-[0.3em] uppercase">Translation</h3>
                    </div>
                    {translatedText && !isSpeaking && (
                      <motion.button
                        onClick={speakTranslation}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#C9A55A] hover:text-[#FFD700] transition-colors p-2"
                      >
                        <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.button>
                    )}
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
