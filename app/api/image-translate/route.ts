import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('[Image Translate API] GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
        { status: 500 }
      );
    }

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

    console.log('[Image Translate API] Processing image...');
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1000,
      },
    });

    // Convert image to base64
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageFile.type || 'image/jpeg';

    console.log('[Image Translate API] Extracting text from image...');

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
    console.log('[Image Translate API] Extracted text:', extractedText);

    if (!extractedText) {
      return NextResponse.json(
        { error: 'No text found in image. Please try another image.' },
        { status: 400 }
      );
    }

    console.log('[Image Translate API] Translating text...');
    const translationPrompt = `Translate this text to ${targetLanguage}. Output ONLY the translation:\n\n"${extractedText}"`;

    const translationResult = await model.generateContent(translationPrompt);
    const translatedText = translationResult.response.text().trim();
    
    console.log('[Image Translate API] Translation:', translatedText);

    return NextResponse.json({
      extractedText,
      translatedText,
      sourceLanguage,
      targetLanguage,
    });

  } catch (error) {
    console.error('[Image Translate API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process image',
        details: 'An error occurred while processing your image. Please try again.'
      },
      { status: 500 }
    );
  }
}
