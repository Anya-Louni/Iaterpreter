import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimit, enforceMaxOutputTokens, maxFileBytes } from '../../../lib/server-utils';

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
    const apiKey = process.env.MODEL_API_KEY;
    
    if (!apiKey) {
      console.error('[Voice Translate API] Model API key not configured');
      return NextResponse.json(
        { error: 'Service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    await rateLimit(request, 'voice-translate');

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

    // enforce audio file size
    const maxBytes = maxFileBytes(5 * 1024 * 1024);
    try {
      const asize = (audioFile as any).size || 0;
      if (asize > maxBytes) {
        return NextResponse.json({ error: `Audio too large. Max ${Math.round(maxBytes / 1024)} KB` }, { status: 400 });
      }
    } catch (e) {
      // ignore
    }

    const sourceLangName = LANGUAGE_NAMES[sourceLanguage] || 'French';
    const targetLangName = LANGUAGE_NAMES[targetLanguage] || 'English';

    console.log(`[Voice Translate] Processing audio: ${sourceLangName} → ${targetLangName}`);
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.MODEL_NAME || 'default-model';
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: enforceMaxOutputTokens(512),
      },
    });

    // Convert audio to base64
    const audioBuffer = await audioFile.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    const mimeType = audioFile.type || 'audio/webm';

    console.log(`[Voice Translate] Transcribing ${sourceLangName} audio...`);

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
    console.log(`[Voice Translate] ${sourceLangName} transcription:`, originalText);

    if (!originalText) {
      return NextResponse.json(
        { error: 'Could not transcribe audio. Please try again.' },
        { status: 400 }
      );
    }

    console.log(`[Voice Translate] Translating to ${targetLangName}...`);
    const translationPrompt = `Translate this ${sourceLangName} text to ${targetLangName}. Output ONLY the translation:\n\n"${originalText}"`;

    const translationResult = await model.generateContent(translationPrompt);
    const translatedText = translationResult.response.text().trim();
    
    console.log(`[Voice Translate] ${targetLangName} translation:`, translatedText);

    return NextResponse.json({
      originalText,
      translatedText,
      originalLanguage: sourceLangName,
      targetLanguage: targetLangName,
    });

  } catch (error: any) {
    if (error?.status === 429) {
      return NextResponse.json({ error: 'Too many requests, please slow down.' }, { status: 429, headers: { 'Retry-After': String(error.retryAfter || 60) } });
    }
    console.error('[Voice Translate] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process audio',
        details: 'An error occurred while processing your audio. Please try again.'
      },
      { status: 500 }
    );
  }
}
