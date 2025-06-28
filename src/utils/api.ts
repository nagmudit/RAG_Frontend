import { ChatResponse, IngestResponse, ApiError as ApiErrorType } from '@/types';

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const askQuestion = async (question: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData: ApiErrorType = await response.json();
      throw new ApiError(errorData.error || 'Failed to get response', response.status);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};

export const ingestUrls = async (urls: string[]): Promise<IngestResponse> => {
  try {
    const response = await fetch('/api/ingest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      const errorData: ApiErrorType = await response.json();
      throw new ApiError(errorData.error || 'Failed to ingest URLs', response.status);
    }

    const data: IngestResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};
