import { NextResponse } from 'next/server';
import { rateLimit } from '../../../lib/server-utils';

export async function GET() {
  try {
    await rateLimit(new Request(''), 'list-models');
    const apiKey = process.env.MODEL_API_KEY;
    
    if (!apiKey) {
      // If no model key is configured, return an empty list rather than exposing provider details
      return NextResponse.json({ models: [] });
    }

    // If a provider base URL is configured, use it. Otherwise return empty list to avoid exposing vendor.
    const base = process.env.MODEL_API_BASE;
    if (!base) {
      return NextResponse.json({ models: [] });
    }

    // Call the configured model provider to list models
    const response = await fetch(`${base}/models?key=${apiKey}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({ 
      models: data.models?.map((model: any) => ({
        name: model.name,
        displayName: model.displayName,
        description: model.description,
        supportedMethods: model.supportedGenerationMethods
      })) || []
    });
  } catch (error: any) {
    console.error('Error listing models:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
