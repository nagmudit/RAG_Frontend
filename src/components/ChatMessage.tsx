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
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div className={`max-w-3xl ${message.isUser ? "order-2" : "order-1"}`}>
        <div
          className={`inline-block p-4 rounded-lg ${
            message.isUser
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>

          {/* Citations for AI responses */}
          {!message.isUser &&
            message.citations &&
            message.citations.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Sources:
                </p>
                <div className="space-y-1">
                  {message.citations.slice(0, 5).map((citation, index) => (
                    <a
                      key={index}
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                    >
                      {index + 1}. {citation.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-gray-500 mt-1 ${
            message.isUser ? "text-right" : "text-left"
          }`}
        >
          {formatTimeAgo(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
