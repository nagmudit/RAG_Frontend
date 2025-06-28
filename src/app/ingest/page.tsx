"use client";

import { useState } from "react";
import UrlIngest from "@/components/UrlIngest";
import DocumentUpload from "@/components/DocumentUpload";
import Navigation from "@/components/Navigation";

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState<"urls" | "documents">("urls");

  return (
    <div className="h-full flex flex-col">
      <Navigation showClearChat={false} />
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-6">
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
