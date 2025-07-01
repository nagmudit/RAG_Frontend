"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="surface-elevated p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="input-default w-full resize-none rounded-lg px-4 py-3 h-12 focus-ring transition-all duration-200"
              disabled={isLoading}
              style={{
                minHeight: "48px",
                maxHeight: "128px",
                height: message.split("\n").length > 1 ? "auto" : "48px",
              }}
            />
          </div>

          <Link
            href="/ingest"
            className="btn-secondary px-4 py-3 rounded-lg flex items-center space-x-2 focus-ring"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Content</span>
          </Link>

          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="btn-primary px-6 py-3 rounded-lg flex items-center space-x-2 min-w-[80px] justify-center focus-ring"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : (
              <>
                <span className="font-medium">Send</span>
                <svg
                  className="w-4 h-4 rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Keyboard shortcuts */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-default text-xs font-mono mr-1">
                Enter
              </kbd>
              to send
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-default text-xs font-mono mr-1">
                Shift + Enter
              </kbd>
              for new line
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
