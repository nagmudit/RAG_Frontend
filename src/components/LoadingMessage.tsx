"use client";

export default function LoadingMessage() {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-3xl">
        <div className="inline-block p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-gray-500 text-sm">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
