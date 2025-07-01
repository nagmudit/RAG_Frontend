# RAG Frontend - FastAPI Integration

This Next.js frontend has been integrated with your FastAPI backend. The integration includes support for all your API endpoints and provides both direct FastAPI calls and Next.js API route proxies.

## 🔗 Backend Integration

### API Endpoints Integrated

Your FastAPI backend endpoints are now fully integrated:

- **Health Check**: `GET /api/v1/health`
- **Ask Question**: `POST /api/v1/ask`
- **Scrape URLs**: `POST /api/v1/scrape`
- **Upload Document**: `POST /api/v1/upload`
- **Get Stats**: `GET /api/v1/stats`

### Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update your environment variables in `.env.local`:
   ```bash
   # Backend URL for Next.js API routes
   BACKEND_URL=http://localhost:8000
   
   # Public API URL for direct frontend calls (optional)
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

## 🚀 Getting Started

### Prerequisites

1. **FastAPI Backend**: Ensure your FastAPI server is running on `http://localhost:8000`
2. **Node.js**: Version 18 or higher

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture

### Dual API Approach

The frontend supports two ways to communicate with your FastAPI backend:

1. **Direct Calls** (Recommended for production):
   - Functions like `askQuestionDirect()`, `scrapeUrlsDirect()`, `uploadDocumentDirect()`
   - Call FastAPI endpoints directly from the frontend
   - Better for performance and debugging

2. **Next.js API Routes** (For compatibility):
   - Traditional approach using Next.js API routes as proxies
   - Functions like `askQuestion()`, `ingestUrls()`, `uploadDocuments()`
   - Useful for server-side processing or authentication

### Type Safety

Full TypeScript integration with your FastAPI schema:

```typescript
// Request/Response types match your FastAPI models
interface AskRequest {
  query: string;
}

interface AskResponse {
  answer: string;
  citations: Citation[];
  query: string;
}

interface Citation {
  url?: string | null;
  title?: string | null;
  relevance_score: number;
  source_type?: string | null;
}
```

## 🎯 Features

### ✅ Chat Interface
- Real-time messaging with your RAG system
- Citation display with relevance scores
- Source type indicators

### ✅ Document Upload
- Support for PDF, DOCX, XLSX, MD files
- Individual file processing
- Upload progress and status

### ✅ URL Ingestion
- Web scraping and content ingestion
- Batch URL processing
- Failed URL tracking

### ✅ Health Monitoring
- Backend connectivity status
- FAISS index availability
- Real-time health checks

### ✅ Statistics Dashboard
- Vectorstore statistics
- Document counts and metrics
- Refreshable stats display

## 🛠️ API Integration Details

### Error Handling

The frontend handles FastAPI error responses properly:

```typescript
// FastAPI returns errors in 'detail' field
if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  throw new ApiError(errorData.detail || 'Request failed', response.status);
}
```

### File Upload

Document upload is handled according to your FastAPI schema:

```typescript
// Single file upload to match FastAPI endpoint
const formData = new FormData();
formData.append('file', file);

const response = await fetch(`${backendUrl}/api/v1/upload`, {
  method: 'POST',
  body: formData,
});
```

### Citation Handling

Citations display relevance scores and source types from your FastAPI response:

```typescript
// Display relevance as percentage
<span>Relevance: {(citation.relevance_score * 100).toFixed(1)}%</span>

// Show source type badge
{citation.source_type && (
  <span className="badge">{citation.source_type}</span>
)}
```

## 🔧 Customization

### Adding New Endpoints

To integrate additional FastAPI endpoints:

1. Add types to `src/types/index.ts`
2. Add API functions to `src/utils/api.ts`
3. Create components or update existing ones
4. Add Next.js API routes if needed

### Environment Variables

Available environment variables:

- `BACKEND_URL`: Used by Next.js API routes (server-side)
- `NEXT_PUBLIC_BACKEND_URL`: Used by direct frontend calls (client-side)

## 🧪 Testing the Integration

1. **Start your FastAPI backend** on `http://localhost:8000`
2. **Start the frontend** with `npm run dev`
3. **Check the health indicator** on the main page (should show green)
4. **Test features**:
   - Ask questions in the chat
   - Upload documents in the ingest page
   - Add URLs for scraping
   - View statistics

## 📊 Monitoring

The frontend includes several monitoring features:

- **Health Check Component**: Shows backend status and FAISS availability
- **Stats Display**: Shows vectorstore statistics
- **Error Handling**: Displays meaningful error messages
- **Loading States**: Visual feedback during operations

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**:
   - Check if FastAPI server is running
   - Verify `BACKEND_URL` in `.env.local`
   - Check CORS settings in FastAPI

2. **File Upload Fails**:
   - Ensure file types are supported (PDF, DOCX, XLSX, MD)
   - Check file size limits
   - Verify FastAPI upload endpoint

3. **Citations Not Displaying**:
   - Check that `relevance_score` is provided
   - Verify citation URLs are valid
   - Check console for TypeScript errors

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```bash
NODE_ENV=development
```

This will show detailed API call logs in the browser console.

## 🔒 Security Notes

- Environment variables with `NEXT_PUBLIC_` prefix are exposed to the client
- Use `BACKEND_URL` (without NEXT_PUBLIC_) for sensitive server-side calls
- Consider implementing authentication if needed
- Validate all user inputs before sending to FastAPI

## 📈 Performance Tips

1. Use direct API calls for better performance
2. Implement request caching for stats and health checks
3. Use React.memo for expensive components
4. Consider implementing virtual scrolling for large citation lists

---

Your FastAPI backend is now fully integrated with this Next.js frontend! 🎉
