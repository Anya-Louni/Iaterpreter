# IATERPRETER - AI-Powered Translation Platform

A stunning, modern website for translation and interpretation services featuring a 3D interactive globe and multiple AI-powered translation tools with Google Gemini AI.

## Features

- **3D Interactive Globe**: Beautiful Three.js globe with rotating language indicators
- **Voice Translator**: Record French audio → transcribe → translate to English → speak translation (with Web Speech API)
- **Image Translator**: Capture/upload images → OCR text extraction → instant translation
- **Expert Prompt Generator**: Generate field-specific expert translation prompts (Legal, Medical, Technical, Literary, etc.)
- **AI Document Analysis**: Upload PDF and image files for instant keyword extraction, summarization, and key insights
- **Modern UI/UX**: Elegant gold accents, smooth animations, and premium design
- **Fully Responsive**: Optimized for all devices with mobile-first approach
- **Premium Styling**: Sophisticated gold color scheme with luxury feel

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animations

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## AI Integration

The website uses **Google Gemini AI** for multiple translation and analysis features:

### Voice Translation
- **Audio Transcription**: Gemini transcribes French audio to text
- **Translation**: Automatic French to English translation
- **Speech Synthesis**: Web Speech API speaks the English translation
- **Real-time Processing**: Fast transcription and translation

### Image Translation
- **OCR Text Extraction**: Gemini Vision API extracts text from images
- **Language Detection**: Automatically detects source language
- **Translation**: Translates extracted text to English
- **Camera Support**: Capture photos directly or upload images

### Expert Prompt Generation
- **Field-Specific Prompts**: Generate expert translation prompts for 8+ fields
- **Customized Instructions**: Tailored prompts for Legal, Medical, Technical, Literary, Business, Scientific, Marketing, and Website localization
- **AI-Optimized**: Gemini optimizes prompts for maximum translation quality

### Document Analysis
- **PDF Analysis**: Extract keywords, summary, and key insights from PDF documents
- **Image Analysis**: Analyze images containing text or documents
- **Comprehensive Results**: Organized output with summaries, keywords, and insights
- **Real-time Processing**: Fast analysis using Gemini 2.5 Flash model

### Setup Gemini API

1. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. Add to `.env.local`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. For production deployment, add the environment variable in your hosting platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site configuration → Environment variables
   - **Cloudflare Pages**: Settings → Environment Variables

## Customization

- Colors: Edit gold color values in components (`#FFD700`)
- 3D Globe: Modify `components/Globe.tsx`
- Animations: Adjust Framer Motion settings
- Content: Update text in component files

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

```bash
npm run build
vercel deploy
```

### Environment Variables Required

- `GEMINI_API_KEY` - Your Google Gemini API key

## Project Structure

```
├── app/
│   ├── api/analyze-document/  # Gemini AI integration
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── Header.tsx             # Navigation with hover effects
│   ├── Hero.tsx               # Landing section
│   ├── Globe.tsx              # 3D rotating globe
│   ├── Services.tsx           # Services section
│   ├── AIDocumentAnalyzer.tsx # AI document upload and analysis
│   └── Contact.tsx            # Contact form
└── public/                    # Static assets
```

## License

Private - All rights reserved
