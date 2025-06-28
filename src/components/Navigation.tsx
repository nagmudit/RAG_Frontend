"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  onClearChat?: () => void;
  showClearChat?: boolean;
}

export default function Navigation({
  onClearChat,
  showClearChat,
}: NavigationProps) {
  return (
    <nav className="surface-elevated border-b border-default shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">
                  RAG Assistant
                </span>
                <span className="text-xs text-muted">
                  Enterprise AI Platform
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {showClearChat && onClearChat && (
              <button
                onClick={onClearChat}
                className="btn-secondary px-3 py-2 text-sm rounded-lg flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Clear Chat</span>
              </button>
            )}

            <div className="w-px h-6 bg-border mx-2"></div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
