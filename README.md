# RAG Chat Frontend

A comprehensive, modern web interface for a Retrieval-Augmented Generation (RAG) application built with Next.js 15, TypeScript, and TailwindCSS. This frontend provides complete integration with a FastAPI backend, offering powerful document ingestion, chat capabilities, and knowledge base management.

## 🚀 Features

### 💬 **Chat Interface**
- **Interactive Chat**: Real-time conversation with AI using RAG technology
- **Citation Support**: AI responses include clickable citations with relevance scores
- **Persistent Chat History**: Chat conversations persist across navigation
- **Real-time Timestamps**: Message timestamps update in real-time
- **Layout Stability**: Non-shifting chat interface for better UX

### 📚 **Knowledge Base Management**
- **URL Ingestion**: Add web content to the knowledge base via URL scraping
- **Document Upload**: Support for PDF, DOCX, XLSX, and MD files
- **Knowledge Base Clear**: Complete knowledge base reset with confirmation
- **Vectorstore Monitoring**: Real-time vectorstore information and statistics

### 📊 **Analytics & Monitoring**
- **Backend Health Check**: Real-time backend status monitoring
- **Enhanced Statistics**: Comprehensive stats dashboard with multiple metrics
- **Rate Limiting Stats**: Monitor API rate limiting and usage
- **Vectorstore Info**: Document count, index status, and storage details

### 🎨 **User Experience**
- **Dark/Light Mode**: Automatic theme detection with system preferences
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: Graceful error states with retry mechanisms
- **Navigation**: Intuitive navigation between chat and management interfaces

## 🏗️ Architecture

### Frontend (Next.js 15)
- **App Router**: Modern Next.js app directory structure
- **TypeScript**: Full type safety with comprehensive interfaces
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Context**: Global state management for chat persistence
- **Server Components**: Optimized rendering with React Server Components

### Backend Integration (FastAPI)
- **Complete API Coverage**: All 9 FastAPI endpoints integrated
- **Direct API Calls**: Client-side calls to FastAPI for real-time updates
- **Fallback Support**: Next.js API routes for backward compatibility
- **Error Handling**: Comprehensive error handling with custom ApiError class

## 🔌 API Endpoints Integrated

| Endpoint | Method | Purpose | Frontend Component |
|----------|---------|---------|-------------------|
| `/` | GET | Backend information | HealthCheck, EnhancedStatsDisplay |
| `/api/v1/health` | GET | Health check | HealthCheck |
| `/api/v1/ask` | POST | RAG questions | Chat, ChatInput |
| `/api/v1/scrape` | POST | URL ingestion | UrlIngest |
| `/api/v1/upload` | POST | Document upload | DocumentUpload |
| `/api/v1/stats` | GET | General statistics | EnhancedStatsDisplay |
| `/api/v1/rate-limit-stats` | GET | Rate limiting | EnhancedStatsDisplay |
| `/api/v1/vectorstore-info` | GET | Vectorstore details | EnhancedStatsDisplay |
| `/api/v1/clear` | POST | Clear knowledge base | KnowledgeBaseManager |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                      # Next.js API routes (backward compatibility)
│   │   ├── ask/route.ts         # Chat API proxy
│   │   ├── ingest/route.ts      # URL ingestion proxy
│   │   └── upload-doc/route.ts  # Document upload proxy
│   ├── ingest/
│   │   └── page.tsx             # Knowledge base management page
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Main chat interface
├── components/
│   ├── Chat.tsx                 # Main chat container with stable layout
│   ├── ChatInput.tsx            # Message input with real-time features
│   ├── ChatMessage.tsx          # Individual message with live timestamps
│   ├── DocumentUpload.tsx       # File upload with drag & drop
│   ├── EnhancedStatsDisplay.tsx # Comprehensive statistics dashboard
│   ├── HealthCheck.tsx          # Backend health monitoring
│   ├── KnowledgeBaseManager.tsx # Knowledge base management tools
│   ├── LoadingMessage.tsx       # Loading states and skeletons
│   ├── Navigation.tsx           # Navigation bar with theme toggle
│   ├── StatsDisplay.tsx         # Basic statistics display
│   ├── ThemeProvider.tsx        # Theme context and management
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   └── UrlIngest.tsx            # URL ingestion form
├── contexts/
│   └── ChatContext.tsx          # Global chat state management
├── types/
│   └── index.ts                 # Comprehensive TypeScript definitions
└── utils/
    └── api.ts                   # API utilities with full backend integration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **FastAPI Backend** running (see environment configuration)

### Installation

1. **Clone and install dependencies:**
```bash
cd rag_frontend
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env.local
```

3. **Edit `.env.local` with your backend configuration:**
```bash
# Backend URL for Next.js API routes (server-side)
BACKEND_URL=https://rag-backend-bqd7.onrender.com

# Public API URL for direct frontend calls (client-side)
NEXT_PUBLIC_BACKEND_URL=https://rag-backend-bqd7.onrender.com
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `BACKEND_URL` | Server-side API calls via Next.js routes | Yes |
| `NEXT_PUBLIC_BACKEND_URL` | Client-side direct API calls | Yes |

## 🎮 Usage

### Chat Interface
1. Navigate to the main page at `/`
2. Type your questions in the chat input
3. View AI responses with citations
4. Citations are clickable and show relevance scores

### Knowledge Base Management
1. Navigate to `/ingest` for knowledge base management
2. **URL Ingestion**: Add web content by entering URLs
3. **Document Upload**: Upload PDF, DOCX, XLSX, or MD files
4. **Statistics**: View comprehensive backend statistics
5. **Management**: Clear knowledge base with confirmation

### Theme Management
- Click the theme toggle in the navigation bar
- System preference detection automatically sets initial theme
- Theme persists across sessions

## 🔧 Development Features

### Type Safety
- Full TypeScript coverage with comprehensive interfaces
- API response types match FastAPI schemas exactly
- Error types for better error handling

### Performance Optimizations
- React Server Components for optimal rendering
- Parallel API calls for faster data fetching
- Optimized re-renders with proper dependency management

### Developer Experience
- Hot reload with Next.js Turbopack
- Comprehensive error messages and logging
- Development-only console logging
- Backend configuration validation

## 🛠️ Build and Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📚 Documentation

- **[API Integration Guide](FASTAPI_INTEGRATION.md)** - Complete backend integration details
- **[Chat Persistence](CHAT_PERSISTENCE_TEST.md)** - Chat state management implementation
- **[Layout Stability](LAYOUT_STABILITY_IMPROVEMENTS.md)** - UI stability improvements
- **[Real-time Features](REALTIME_TIMESTAMPS.md)** - Real-time timestamp implementation
- **[Environment Setup](ENV_VARIABLE_FIX.md)** - Environment variable configuration
- **[Complete Integration](API_INTEGRATION_COMPLETE.md)** - Full API integration summary

## 🎯 Key Improvements

### From Basic Chat to Comprehensive RAG Interface
- ✅ **9/9 Backend Endpoints** - Complete FastAPI integration
- ✅ **Real-time Features** - Live timestamps and updates
- ✅ **Persistent State** - Chat history and user preferences
- ✅ **Advanced UI** - Stable layouts and modern design
- ✅ **Error Resilience** - Comprehensive error handling
- ✅ **Performance** - Optimized rendering and API calls

### Enterprise-Ready Features
- ✅ **Health Monitoring** - Backend status and validation
- ✅ **Statistics Dashboard** - Comprehensive analytics
- ✅ **Knowledge Management** - Complete CRUD operations
- ✅ **Rate Limiting** - Usage monitoring and limits
- ✅ **Security** - Proper error handling and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Test thoroughly with the backend integration
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

Built with modern React patterns, Next.js 15 features, and comprehensive FastAPI integration for a production-ready RAG application.
