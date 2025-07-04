import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    
    // Call FastAPI backend with the correct endpoint and payload structure
    const response = await fetch(`${backendUrl}/api/v1/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: question }), // FastAPI expects 'query' not 'question'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || 'Backend service error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform FastAPI response to match frontend expectations
    const transformedResponse = {
      answer: data.answer,
      citations: data.citations || []
    };
    
    return NextResponse.json(transformedResponse);
  } catch (error) {
    console.error('Error in /api/ask:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
