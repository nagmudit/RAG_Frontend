"use client";

import { useState, useEffect } from "react";
import {
  getStats,
  getVectorstoreInfo,
  getRateLimitStats,
  getRootInfo,
} from "@/utils/api";
import {
  VectorstoreInfoResponse,
  RateLimitStatsResponse,
  RootResponse,
} from "@/types";

export default function EnhancedStatsDisplay() {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [vectorstoreInfo, setVectorstoreInfo] =
    useState<VectorstoreInfoResponse | null>(null);
  const [rateLimitStats, setRateLimitStats] =
    useState<RateLimitStatsResponse | null>(null);
  const [rootInfo, setRootInfo] = useState<RootResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all stats in parallel
      const [statsData, vectorstoreData, rateLimitData, rootData] =
        await Promise.allSettled([
          getStats(),
          getVectorstoreInfo(),
          getRateLimitStats(),
          getRootInfo(),
        ]);

      // Handle stats
      if (statsData.status === "fulfilled") {
        setStats(statsData.value);
      }

      // Handle vectorstore info
      if (vectorstoreData.status === "fulfilled") {
        setVectorstoreInfo(vectorstoreData.value);
      }

      // Handle rate limit stats
      if (rateLimitData.status === "fulfilled") {
        setRateLimitStats(rateLimitData.value);
      }

      // Handle root info
      if (rootData.status === "fulfilled") {
        setRootInfo(rootData.value);
      }

      // Check if all failed
      const allFailed = [
        statsData,
        vectorstoreData,
        rateLimitData,
        rootData,
      ].every((result) => result.status === "rejected");

      if (allFailed) {
        setError("Failed to fetch stats from backend");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border border-default rounded-lg animate-pulse"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error && !stats && !vectorstoreInfo && !rateLimitStats && !rootInfo) {
    return (
      <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
        <p className="text-sm text-red-600 dark:text-red-400">
          Failed to load stats: {error}
        </p>
        <button
          onClick={fetchAllStats}
          className="mt-2 text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Vectorstore Information */}
      {vectorstoreInfo && (
        <div className="p-4 border border-default rounded-lg surface">
          <h3 className="text-sm font-medium text-primary mb-3 flex items-center">
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
                d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7m16 0L12 11 4 7"
              />
            </svg>
            Vectorstore Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Documents:</span>
              <span className="text-primary font-medium">
                {vectorstoreInfo.document_count}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Index Status:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  vectorstoreInfo.vectorstore_loaded
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {vectorstoreInfo.vectorstore_loaded ? "Loaded" : "Not Loaded"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Index on Disk:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  vectorstoreInfo.index_exists_on_disk
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
                }`}
              >
                {vectorstoreInfo.index_exists_on_disk ? "Exists" : "Missing"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary">Index Path:</span>
              <span
                className="text-primary font-mono text-xs truncate max-w-48"
                title={vectorstoreInfo.index_path}
              >
                {vectorstoreInfo.index_path}
              </span>
            </div>
            {vectorstoreInfo.error && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-2 rounded">
                Error: {vectorstoreInfo.error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* General Stats */}
      {/* {stats && (
        <div className="p-4 border border-default rounded-lg surface">
          <h3 className="text-sm font-medium text-primary mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            General Statistics
          </h3>
          <div className="space-y-2">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-secondary capitalize">
                  {key.replace(/_/g, ' ')}:
                </span>
                <span className="text-primary font-medium">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Rate Limit Stats */}
      {rateLimitStats && Object.keys(rateLimitStats).length > 0 && (
        <div className="p-4 border border-default rounded-lg surface">
          <h3 className="text-sm font-medium text-primary mb-3 flex items-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Rate Limiting
          </h3>
          <div className="space-y-2">
            {Object.entries(rateLimitStats).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-secondary capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="text-primary font-medium">
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={fetchAllStats}
        className="w-full text-xs text-blue-600 dark:text-blue-400 hover:underline py-2"
      >
        Refresh All Stats
      </button>
    </div>
  );
}
