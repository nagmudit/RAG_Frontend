export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  title: string;
  url: string;
  snippet?: string;
}

export interface ChatResponse {
  answer: string;
  citations: Citation[];
}

export interface IngestRequest {
  urls: string[];
}

export interface IngestResponse {
  success: boolean;
  message: string;
  processed_urls?: string[];
  failed_urls?: string[];
}

export interface ApiError {
  error: string;
  details?: string;
}
