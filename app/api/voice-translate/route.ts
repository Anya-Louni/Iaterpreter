import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LANGUAGE_NAMES: Record<string, string> = {
  fr: 'French',
  en: 'English',
  es: 'Spanish',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ar: 'Arabic',
  zh: 'Chinese',
  ja: 'Japanese',
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('[Voice Translate API] GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;
    const sourceLanguage = formData.get('sourceLanguage') as string || 'fr';
    const targetLanguage = formData.get('targetLanguage') as string || 'en';

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const sourceLangName = LANGUAGE_NAMES[sourceLanguage] || 'French';
    const targetLangName = LANGUAGE_NAMES[targetLanguage] || 'English';

    console.log(`[Voice Translate API] Processing audio: ${sourceLangName} → ${targetLangName}`);
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 500,
      },
    });

    // Convert audio to base64
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    const mimeType = audioFile.type || 'audio/webm';

    console.log(`[Voice Translate API] Transcribing ${sourceLangName} audio...`);

    const transcriptionPrompt = `Transcribe this ${sourceLangName} audio. Output ONLY the transcribed text.`;

    const transcriptionResult = await model.generateContent([
      transcriptionPrompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: audioBase64,
        },
      },
    ]);

    const originalText = transcriptionResult.response.text().trim();
    console.log(`[Voice Translate API] ${sourceLangName} transcription:`, originalText);

    if (!originalText) {
      return NextResponse.json(
        { error: 'Could not transcribe audio. Please try again.' },
        { status: 400 }
      );
    }

    console.log(`[Voice Translate API] Translating to ${targetLangName}...`);
    const translationPrompt = `Translate this ${sourceLangName} text to ${targetLangName}. Output ONLY the translation:\n\n"${originalText}"`;

    const translationResult = await model.generateContent(translationPrompt);
    const translatedText = translationResult.response.text().trim();
    
    console.log(`[Voice Translate API] ${targetLangName} translation:`, translatedText);

    return NextResponse.json({
      originalText,
      translatedText,
      originalLanguage: sourceLangName,
      targetLanguage: targetLangName,
    });

  } catch (error) {
    console.error('[Voice Translate API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process audio',
        details: 'An error occurred while processing your audio. Please try again.'
      },
      { status: 500 }
    );
  }
}
