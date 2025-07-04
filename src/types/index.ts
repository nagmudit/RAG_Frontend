export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  citations?: Citation[];
}

export interface Citation {
  url?: string | null;
  title?: string | null;
  relevance_score: number;
  source_type?: string | null;
}

// FastAPI Backend Types
export interface AskRequest {
  query: string;
}

export interface AskResponse {
  answer: string;
  citations: Citation[];
  query: string;
}

export interface ScrapeRequest {
  urls: string[];
}

export interface ScrapeResponse {
  success: boolean;
  message: string;
  processed_urls: string[];
  failed_urls: string[];
  documents_added: number;
}

export interface DocumentUploadResponse {
  success: boolean;
  message: string;
  filename: string;
  documents_added: number;
  file_type: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  faiss_index_exists: boolean;
}

// Legacy types for backward compatibility
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

// New FastAPI Backend Types (Added endpoints)
export interface ClearRequest {
  confirm?: boolean;
}

export interface ClearResponse {
  success: boolean;
  message: string;
  files_deleted: string[];
  documents_cleared: number;
}

export interface VectorstoreInfoResponse {
  document_count: number;
  vectorstore_loaded: boolean;
  index_exists_on_disk: boolean;
  index_path: string;
  error?: string | null;
}

export interface RateLimitStatsResponse {
  // The schema is empty in the API doc, so we'll use a flexible type
  [key: string]: unknown;
}

export interface RootResponse {
  // The schema is empty in the API doc, so we'll use a flexible type
  [key: string]: unknown;
}
