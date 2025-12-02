# IATERPRETER - AI-Powered Document Analyzer

A website for translation and interpretation services featuring an AI-powered document analysis with Gemini AI.

## Features

- **AI Document Analysis**: Upload PDF and image files for instant keyword extraction, summarization, and key insights powered by Google Gemini AI
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

The website uses **Google Gemini AI** for document analysis with the following features:

- **PDF Analysis**: Extract keywords, summary, and key insights from PDF documents
- **Image Analysis**: Analyze images containing text or documents
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

## License

Private - All rights reserved
