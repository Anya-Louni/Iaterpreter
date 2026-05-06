import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimit, enforceMaxOutputTokens, maxFileBytes } from '../../../lib/server-utils';

export async function POST(request: NextRequest) {
  try {
    await rateLimit(request, 'analyze-document');

    console.log('[Document Analysis] Request received');
    console.log('[Document Analysis] Service key present:', !!process.env.MODEL_API_KEY);
    
    // Check if API key is configured
    if (!process.env.MODEL_API_KEY) {
      console.error('MODEL_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Service not configured. Please contact support.' },
        { status: 500 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('[Document Analysis] File received:', file.name, file.type, file.size);

    // Enforce file size
    const maxBytes = maxFileBytes(10 * 1024 * 1024); // default 10MB
    try {
      const fsize = (file as any).size || 0;
      if (fsize > maxBytes) {
        return NextResponse.json({ error: `File too large. Max ${Math.round(maxBytes / 1024)} KB` }, { status: 400 });
      }
    } catch (e) {
      // ignore
    }

    // Check file type
    const fileType = file.type;
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      console.log('[Document Analysis] Invalid file type:', fileType);
      return NextResponse.json(
        { error: 'Only PDF and image files are supported' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Initialize model client
    const apiKey = process.env.MODEL_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.MODEL_NAME || 'default-model';
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: enforceMaxOutputTokens(512),
      }
    });

    const prompt = `Analyze this document and provide:
1. A concise summary (2-3 sentences maximum)
2. 5-7 key keywords or main topics
3. 3-5 key insights or important points

Format your response as JSON with this exact structure:
{
  "summary": "brief summary here",
  "keywords": ["keyword1", "keyword2"],
  "keyInsights": ["insight1", "insight2"]
}`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: fileType,
      },
    };

    console.log('[Document Analysis] Processing document...');
    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const responseText = response.text();
    
    console.log('[Document Analysis] Raw response:', responseText);

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('[Document Analysis] No JSON found in response');
      throw new Error('Invalid response format from the service');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    console.log('[Document Analysis] Parsed analysis:', analysis);

    const responseData = {
      summary: analysis.summary || 'No summary available',
      keywords: analysis.keywords || [],
      keyInsights: analysis.keyInsights || [],
    };
    
    console.log('[Document Analysis] Sending response:', responseData);

    return NextResponse.json(responseData);

  } catch (error: any) {
    if (error?.status === 429) {
      return NextResponse.json({ error: 'Too many requests, please slow down.' }, { status: 429, headers: { 'Retry-After': String(error.retryAfter || 60) } });
    }
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze document' },
      { status: 500 }
    );
  }
}
