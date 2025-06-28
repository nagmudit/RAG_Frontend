"use client";

import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-3xl ${message.isUser ? "order-2" : "order-1"}`}>
        <div
          className={`p-4 rounded-lg transition-all duration-200 ${
            message.isUser
              ? "bg-blue-600 text-white ml-12"
              : "surface-elevated border-default border shadow-card"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {message.text}
          </p>

          {/* Citations for AI responses */}
          {!message.isUser &&
            message.citations &&
            message.citations.length > 0 && (
              <div className="mt-4 pt-4 border-t border-default">
                <p className="text-sm font-medium text-secondary mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m0 0l4-4a4 4 0 105.656-5.656l-1.102 1.102m-2.554 2.554L12 13"
                    />
                  </svg>
                  Sources:
                </p>
                <div className="space-y-2">
                  {message.citations.slice(0, 5).map((citation, index) => (
                    <a
                      key={index}
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-lg border border-subtle hover:border-default transition-all duration-200 group surface hover:shadow-card"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                            {citation.title}
                          </div>
                          {citation.snippet && (
                            <div className="text-xs text-muted mt-1 line-clamp-2">
                              {citation.snippet}
                            </div>
                          )}
                        </div>
                        <svg
                          className="w-4 h-4 text-muted group-hover:text-secondary transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-muted mt-2 flex items-center ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatTimeAgo(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
