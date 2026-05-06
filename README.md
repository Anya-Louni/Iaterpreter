# IATERPRETER - Translation Platform

A modern website for translation and interpretation services featuring a 3D interactive globe and multiple cloud-powered translation tools.

## Overview

- **3D Interactive Globe**: Beautiful Three.js globe with rotating language indicators
- **Voice Translator**: Record French audio → transcribe → translate to English → speak translation (with Web Speech API)
- **Image Translator**: Capture/upload images → OCR text extraction → instant translation
- **Expert Prompt Generator**: Generate field-specific translation prompts (Legal, Medical, Technical, Literary, etc.)
- **Document Analysis**: Upload PDF and image files for keyword extraction, summarization, and key insights
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

## Service integration

This project integrates with external cloud translation and analysis services. To run the project you'll need to provide an API key for the provider you choose. Configure credentials using environment variables as described in `.env.example`.

For local development copy `.env.example` to `.env.local` and add your provider key. In production set environment variables using your hosting provider's secret management.
## Customization

- Colors: Edit gold color values in components (`#FFD700`)
- 3D Globe: Modify `components/Globe.tsx`
- Animations: Adjust Framer Motion settings
- Content: Update text in component files

## Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `MODEL_API_KEY`
4. Deploy

```bash
npm run build
vercel deploy
```

### Environment Variables Required

- `MODEL_API_KEY` - Your provider API key

### Recommended environment variables and safe defaults

For safety and cost control the server enforces conservative defaults. Copy `.env.example` to `.env.local` and set your key and any values you want to adjust.

- `MAX_OUTPUT_TOKENS` (default 512) - Maximum tokens requested from the model per generation
- `MAX_INPUT_CHARS` (default 20000) - Maximum input text length the server will accept
- `MAX_FILE_BYTES` (default 10485760) - Maximum bytes for uploaded files
- `RATE_LIMIT_WINDOW_MS` (default 60000) - Rate limit window in milliseconds
- `RATE_LIMIT_MAX` (default 30) - Maximum requests per window per client

Security note: In production, set environment variables using your hosting provider's secret management (Vercel, Netlify, Cloudflare Pages, etc.) and keep `.env.local` out of git.

## Project Structure

```
├── app/
│   ├── api/analyze-document/  # model integration
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── Header.tsx             # Navigation with hover effects
│   ├── Hero.tsx               # Landing section
│   ├── Globe.tsx              # 3D rotating globe
│   ├── Services.tsx           # Services section
│   ├── AIDocumentAnalyzer.tsx # document upload and analysis
│   └── Contact.tsx            # Contact form
└── public/                    # Static assets
```

## License

Private - All rights reserved
