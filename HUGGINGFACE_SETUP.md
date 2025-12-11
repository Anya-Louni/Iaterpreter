# Hugging Face Integration Setup

## Overview
Your application now uses Hugging Face models instead of Google Gemini for:
- **Voice Translation**: Speech recognition (Whisper) + Translation (Llama 3.2)
- **Image Translation**: OCR (TrOCR) + Translation (Llama 3.2)
- **Document Analysis**: OCR (TrOCR) + Analysis (Llama 3.2)

## Setup Instructions

### 1. Get Your Hugging Face API Key
1. Go to https://huggingface.co/settings/tokens
2. Create a new access token (Read permission is sufficient)
3. Copy the token

### 2. Configure Environment Variable
1. Create a file named `.env.local` in the root directory (`iaterpreter-website/`)
2. Add your API key:
```
HUGGINGFACE_API_KEY=hf_your_actual_token_here
```

### 3. Restart the Development Server
```bash
npm run dev
```

## Models Used

### Voice Translator
- **Speech Recognition**: `openai/whisper-large-v3` - State-of-the-art multilingual speech recognition
- **Translation**: `meta-llama/Llama-3.2-3B-Instruct` - Fast, accurate translation

### Image Translator
- **OCR**: `microsoft/trocr-large-printed` - Transformer-based OCR for printed text
- **Translation**: `meta-llama/Llama-3.2-3B-Instruct`

### Document Analyzer
- **OCR**: `microsoft/trocr-large-printed`
- **Analysis**: `meta-llama/Llama-3.2-3B-Instruct` - Summarization and insights

## Benefits of Hugging Face

✅ **Open Source**: Free community access
✅ **No Quota Limits**: Unlike Gemini's 20 requests/day limit
✅ **Specialized Models**: Purpose-built models for each task
✅ **Fast Performance**: Optimized inference
✅ **Privacy**: Your data isn't used for training

## Troubleshooting

### API Rate Limits
If you hit rate limits, you can:
1. Upgrade to Hugging Face Pro (unlimited requests)
2. Use your own inference endpoints
3. Deploy models locally

### Model Not Loading
- First request to a model may take 30-60 seconds (cold start)
- Subsequent requests are much faster

### Need Help?
Visit: https://huggingface.co/docs/api-inference/index
