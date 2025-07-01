"use client";

import { useState } from "react";
import { clearKnowledgeBase } from "@/utils/api";
import { ClearResponse } from "@/types";

export default function KnowledgeBaseManager() {
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [clearResult, setClearResult] = useState<ClearResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClearRequest = () => {
    setShowConfirmDialog(true);
    setClearResult(null);
    setError(null);
  };

  const handleConfirmClear = async () => {
    try {
      setIsClearing(true);
      setError(null);
      setShowConfirmDialog(false);

      const result = await clearKnowledgeBase(true);
      setClearResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to clear knowledge base"
      );
    } finally {
      setIsClearing(false);
    }
  };

  const handleCancelClear = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="p-4 border border-default rounded-lg surface">
      <h3 className="text-sm font-medium text-primary mb-3 flex items-center">
        <svg
          className="w-4 h-4 mr-2 text-red-500"
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
        Knowledge Base Management
      </h3>

      <div className="space-y-4">
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Danger Zone
              </h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                Clearing the knowledge base will permanently delete all
                documents and vectorstore data. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Result */}
        {clearResult && (
          <div
            className={`p-3 rounded-lg border ${
              clearResult.success
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
            }`}
          >
            <div className="flex items-start">
              <svg
                className={`w-5 h-5 mt-0.5 mr-2 ${
                  clearResult.success
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {clearResult.success ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
              <div>
                <h4
                  className={`text-sm font-medium ${
                    clearResult.success
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {clearResult.success
                    ? "Knowledge Base Cleared"
                    : "Clear Failed"}
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    clearResult.success
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {clearResult.message}
                </p>
                {clearResult.success && (
                  <div className="text-xs text-green-700 dark:text-green-300 mt-2">
                    <p>Documents cleared: {clearResult.documents_cleared}</p>
                    {clearResult.files_deleted.length > 0 && (
                      <p>Files deleted: {clearResult.files_deleted.length}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Clear Button */}
        <button
          onClick={handleClearRequest}
          disabled={isClearing}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
        >
          {isClearing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Clearing Knowledge Base...
            </>
          ) : (
            <>
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear All Knowledge Base
            </>
          )}
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Clear Knowledge Base
                </h3>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    Are you absolutely sure you want to clear the entire
                    knowledge base?
                  </p>
                  <p className="mt-2 font-medium text-red-600 dark:text-red-400">
                    This will permanently delete:
                  </p>
                  <ul className="mt-1 list-disc list-inside text-red-600 dark:text-red-400">
                    <li>All uploaded documents</li>
                    <li>All scraped web content</li>
                    <li>The entire vectorstore index</li>
                  </ul>
                  <p className="mt-2 font-bold text-red-600 dark:text-red-400">
                    This action cannot be undone!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleConfirmClear}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Yes, Clear Everything
              </button>
              <button
                onClick={handleCancelClear}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
