"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Message } from "@/types";
import { askQuestion, ApiError } from "@/utils/api";
import { useChatContext } from "@/contexts/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingMessage from "./LoadingMessage";

interface ChatProps {
  onClearChat?: (clearFunction: () => void) => void;
}

export default function Chat({ onClearChat }: ChatProps) {
  const { messages, setMessages, clearMessages } = useChatContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const clearChat = useCallback(() => {
    clearMessages();
    setError(null);
  }, [clearMessages]);

  useEffect(() => {
    // Pass the clearChat function to parent when component mounts
    if (onClearChat) {
      onClearChat(clearChat);
    }
  }, [onClearChat, clearChat]);

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await askQuestion(messageText);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        citations: response.citations,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "An unexpected error occurred"
      );

      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error while processing your question. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4 dark:bg-red-900/20 dark:border-red-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Container - Fixed height with scroll */}
      <div className="flex-1 overflow-y-auto surface">
        <div className="min-h-full flex flex-col">
          {/* Content Area */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto h-full">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-8 max-w-2xl">
                    <div className="animate-slide-in">
                      <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6">
                        <svg
                          className="w-8 h-8 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-primary mb-3">
                        Welcome to RAG Assistant
                      </h2>
                      <p className="text-secondary text-lg mb-8 max-w-md mx-auto">
                        Ask any question and get intelligent answers backed by
                        your knowledge base.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          icon: "🔍",
                          title: "Smart Search",
                          text: "Search through documents intelligently",
                        },
                        {
                          icon: "💡",
                          title: "Deep Insights",
                          text: "Get comprehensive analysis and insights",
                        },
                        {
                          icon: "📚",
                          title: "Knowledge Base",
                          text: "Access your curated knowledge repository",
                        },
                        {
                          icon: "⚡",
                          title: "Fast Responses",
                          text: "Lightning-fast AI-powered answers",
                        },
                      ].map((feature, index) => (
                        <div key={index} className="card p-4 text-left">
                          <div className="text-2xl mb-3">{feature.icon}</div>
                          <h3 className="font-medium text-primary mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-secondary">
                            {feature.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && <LoadingMessage />}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-default bg-surface">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
