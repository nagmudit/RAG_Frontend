"use client";

export default function LoadingMessage() {
  return (
    <div className="flex justify-start">
      <div className="max-w-3xl">
        <div className="surface-elevated border-default border shadow-card p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="text-secondary text-sm">AI is thinking...</div>
          </div>

          {/* Shimmer effect for text lines */}
          <div className="mt-3 space-y-2">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
