# IATERPRETER - AI-Powered Flight Attendant Website

A stunning, modern website for flight attendant interpretation services featuring a 3D interactive globe and AI-powered document analysis.

## Features

- **3D Interactive Globe**: Beautiful Three.js globe with floating language indicators
- **AI Document Analysis**: Upload documents for instant keyword extraction
- **Modern UI/UX**: Glassmorphism, gradients, and smooth animations
- **Responsive Design**: Optimized for all devices
- **Premium Styling**: Gold accents and luxury feel

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

The website includes a document analysis feature. To integrate a real AI API:

### Option 1: OpenAI API (Recommended)

```bash
npm install openai
```

Add to `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

### Option 2: Azure AI Document Intelligence

```bash
npm install @azure/ai-form-recognizer
```

Add to `.env.local`:
```
AZURE_DOCUMENT_ENDPOINT=your_endpoint
AZURE_DOCUMENT_KEY=your_key
```

### Option 3: Google Cloud Vision

```bash
npm install @google-cloud/vision
```

### Option 4: AWS Textract

```bash
npm install @aws-sdk/client-textract
```

## Customization

- Colors: Edit gold color values in components (`#FFD700`)
- 3D Globe: Modify `components/Globe.tsx`
- Animations: Adjust Framer Motion settings
- Content: Update text in component files

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

## License

Private - All rights reserved
