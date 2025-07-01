"use client";

import { useState } from "react";
import Link from "next/link";
import UrlIngest from "@/components/UrlIngest";
import DocumentUpload from "@/components/DocumentUpload";
import Navigation from "@/components/Navigation";
import HealthCheck from "@/components/HealthCheck";
import EnhancedStatsDisplay from "@/components/EnhancedStatsDisplay";
import KnowledgeBaseManager from "@/components/KnowledgeBaseManager";

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState<"urls" | "documents" | "manage">(
    "urls"
  );

  return (
    <div className="h-full flex flex-col">
      <Navigation showClearChat={false} />
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Knowledge Base Management
            </h1>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </Link>
          </div>

          {/* Backend Health Status */}
          <div className="mb-6 p-4 border border-default rounded-lg bg-surface">
            <HealthCheck />
          </div>

          {/* Enhanced Stats Display */}
          <div className="mb-6">
            <EnhancedStatsDisplay />
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("urls")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "urls"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              URL Ingest
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "documents"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Document Upload
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "manage"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
                Manage
              </span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "urls" && <UrlIngest />}
          {activeTab === "documents" && <DocumentUpload />}
          {activeTab === "manage" && <KnowledgeBaseManager />}
        </div>
      </div>
    </div>
  );
}
