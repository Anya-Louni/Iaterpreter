import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimit, enforceMaxOutputTokens, maxFileBytes, maxInputChars } from '../../../lib/server-utils';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.MODEL_API_KEY;
    
    if (!apiKey) {
      console.error('[Image Translate API] Model API key not configured');
      return NextResponse.json(
        { error: 'Service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    await rateLimit(request, 'image-translate');

    const formData = await request.formData();
    const imageFile = formData.get('image') as Blob;
    const sourceLanguage = formData.get('sourceLanguage') as string || 'fr';
    const targetLanguage = formData.get('targetLanguage') as string || 'en';

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Enforce file size limit
    const maxBytes = maxFileBytes(5 * 1024 * 1024); // default 5MB for images
    try {
      const imageSize = (imageFile as any).size || 0;
      if (imageSize > maxBytes) {
        return NextResponse.json({ error: `Image too large. Max ${Math.round(maxBytes / 1024)} KB` }, { status: 400 });
      }
    } catch (e) {
      // ignore size check if not available
    }

    console.log('[Image Translate] Processing image...');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.MODEL_NAME || 'default-model';
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: enforceMaxOutputTokens(512),
      },
    });

    // Convert image to base64
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageFile.type || 'image/jpeg';

    console.log('[Image Translate] Extracting text from image...');

    const ocrPrompt = `Extract ALL text from this image. Output ONLY the extracted text.`;

    const ocrResult = await model.generateContent([
      ocrPrompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64,
        },
      },
    ]);

    const extractedText = ocrResult.response.text().trim();
    console.log('[Image Translate] Extracted text:', extractedText);

    if (!extractedText) {
      return NextResponse.json(
        { error: 'No text found in image. Please try another image.' },
        { status: 400 }
      );
    }

    // Enforce input length limits before translation
    const maxChars = maxInputChars(5000);
    if (extractedText.length > maxChars) {
      return NextResponse.json({ error: `Extracted text too long. Max ${maxChars} characters` }, { status: 400 });
    }

    console.log('[Image Translate] Translating text...');
    const translationPrompt = `Translate this text to ${targetLanguage}. Output ONLY the translation:\n\n"${extractedText}"`;

    const translationResult = await model.generateContent(translationPrompt);
    const translatedText = translationResult.response.text().trim();
    
    console.log('[Image Translate] Translation:', translatedText);

    return NextResponse.json({
      extractedText,
      translatedText,
      sourceLanguage,
      targetLanguage,
    });

  } catch (error: any) {
    if (error?.status === 429) {
      return NextResponse.json({ error: 'Too many requests, please slow down.' }, { status: 429, headers: { 'Retry-After': String(error.retryAfter || 60) } });
    }
    console.error('[Image Translate] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process image',
        details: 'An error occurred while processing your image. Please try again.'
      },
      { status: 500 }
    );
  }
}
