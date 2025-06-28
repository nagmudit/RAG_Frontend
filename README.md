# RAG Chat Frontend

A modern, responsive chat interface for a Retrieval-Augmented Generation (RAG) application built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Clean Chat Interface**: Interactive chat with user messages and AI responses
- **Citation Support**: AI responses display up to 5 clickable citation links
- **Content Ingestion**: Add URLs to the knowledge base through a dedicated interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Automatic theme detection with system preferences
- **Error Handling**: Graceful error states and loading indicators
- **Real-time Updates**: Smooth message updates with scroll-to-bottom behavior

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── ask/route.ts          # API route for chat questions
│   │   └── ingest/route.ts       # API route for URL ingestion
│   ├── ingest/
│   │   └── page.tsx              # URL ingestion page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Main chat page
├── components/
│   ├── Chat.tsx                  # Main chat container
│   ├── ChatInput.tsx             # Message input component
│   ├── ChatMessage.tsx           # Individual message display
│   ├── LoadingMessage.tsx        # Loading indicator
│   ├── Navigation.tsx            # Top navigation bar
│   └── UrlIngest.tsx             # URL ingestion form
├── types/
│   └── index.ts                  # TypeScript type definitions
└── utils/
    └── api.ts                    # API utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A RAG backend service running on port 8000 (or configure BACKEND_URL)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your backend URL:
```
BACKEND_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
