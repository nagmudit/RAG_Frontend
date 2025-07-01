import { 
  ChatResponse, 
  IngestResponse, 
  ApiError as ApiErrorType,
  AskResponse,
  ScrapeResponse,
  DocumentUploadResponse,
  HealthResponse 
} from '@/types';

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base URL for your FastAPI backend
const getBackendUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
};

// Health check endpoint
export const checkHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await fetch(`${getBackendUrl()}/api/v1/health`);
    
    if (!response.ok) {
      throw new ApiError('Health check failed', response.status);
    }

    const data: HealthResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};

// Ask question endpoint (FastAPI)
export const askQuestionDirect = async (query: string): Promise<AskResponse> => {
  try {
    const response = await fetch(`${getBackendUrl()}/api/v1/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData.detail || 'Failed to get response', response.status);
    }

    const data: AskResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};

// Ask question via Next.js API route (for backward compatibility)
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

// Scrape URLs endpoint (FastAPI)
export const scrapeUrlsDirect = async (urls: string[]): Promise<ScrapeResponse> => {
  try {
    const response = await fetch(`${getBackendUrl()}/api/v1/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData.detail || 'Failed to scrape URLs', response.status);
    }

    const data: ScrapeResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};

// Ingest URLs via Next.js API route (for backward compatibility)
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

// Upload document endpoint (FastAPI)
export const uploadDocumentDirect = async (file: File): Promise<DocumentUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${getBackendUrl()}/api/v1/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData.detail || 'Failed to upload document', response.status);
    }

    const data: DocumentUploadResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};

// Upload documents via Next.js API route (for backward compatibility)
export const uploadDocuments = async (files: File[]): Promise<IngestResponse> => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('documents', file);
    });

    const response = await fetch('/api/upload-doc', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: ApiErrorType = await response.json();
      throw new ApiError(errorData.error || 'Failed to upload documents', response.status);
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

// Get stats from FastAPI
export const getStats = async (): Promise<Record<string, unknown>> => {
  try {
    const response = await fetch(`${getBackendUrl()}/api/v1/stats`);
    
    if (!response.ok) {
      throw new ApiError('Failed to get stats', response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error: Unable to connect to the server');
  }
};
