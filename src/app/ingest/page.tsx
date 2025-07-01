"use client";

import { useState } from "react";
import Link from "next/link";
import UrlIngest from "@/components/UrlIngest";
import DocumentUpload from "@/components/DocumentUpload";
import Navigation from "@/components/Navigation";
import HealthCheck from "@/components/HealthCheck";
import StatsDisplay from "@/components/StatsDisplay";

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState<"urls" | "documents">("urls");

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

          {/* Stats Display */}
          <div className="mb-6">
            <StatsDisplay />
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
          </div>

          {/* Tab Content */}
          {activeTab === "urls" && <UrlIngest />}
          {activeTab === "documents" && <DocumentUpload />}
        </div>
      </div>
    </div>
  );
}
