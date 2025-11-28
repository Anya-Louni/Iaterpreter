import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    console.log('API Key present:', !!process.env.GEMINI_API_KEY);
    
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
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

    console.log('File received:', file.name, file.type, file.size);

    // Check file type
    const fileType = file.type;
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      console.log('Invalid file type:', fileType);
      return NextResponse.json(
        { error: 'Only PDF and image files are supported' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    // Initialize Gemini with API key
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use Gemini 2.5 Flash - fast and intelligent model for document analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Analyze this document and provide:
1. A concise summary (2-3 sentences maximum)
2. 5-7 key keywords or main topics
3. 3-5 key insights or important points
4. Overall sentiment (Positive/Neutral/Negative)

Format your response as JSON with this exact structure:
{
  "summary": "brief summary here",
  "keywords": ["keyword1", "keyword2"],
  "keyInsights": ["insight1", "insight2"],
  "sentiment": "Positive"
}`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: fileType,
      },
    };

    console.log('Calling Gemini API...');
    const result = await model.generateContent([prompt, imagePart]);
    const response = result.response;
    const text = response.text();
    
    console.log('Gemini response:', text);

    // Parse JSON response from Gemini
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('No JSON found in response');
      throw new Error('Invalid response format from AI');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    console.log('Parsed analysis:', analysis);

    const responseData = {
      summary: analysis.summary || 'No summary available',
      keywords: analysis.keywords || [],
      keyInsights: analysis.keyInsights || [],
      sentiment: analysis.sentiment || 'Neutral',
    };
    
    console.log('Sending response:', responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to analyze document' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
