"use client";

import { useState, useEffect } from "react";
import { checkHealth, getRootInfo } from "@/utils/api";
import { HealthResponse, RootResponse } from "@/types";

export default function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [rootInfo, setRootInfo] = useState<RootResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both health and root info
        const [healthData, rootData] = await Promise.allSettled([
          checkHealth(),
          getRootInfo(),
        ]);

        if (healthData.status === "fulfilled") {
          setHealth(healthData.value);
        }

        if (rootData.status === "fulfilled") {
          setRootInfo(rootData.value);
        }

        // If both failed, show error
        if (
          healthData.status === "rejected" &&
          rootData.status === "rejected"
        ) {
          throw new Error(
            healthData.reason instanceof Error
              ? healthData.reason.message
              : "Failed to check backend health"
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to check backend health"
        );
      } finally {
        setLoading(false);
      }
    };

    checkBackendHealth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        <span>Checking backend status...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span>Backend offline: {error}</span>
      </div>
    );
  }

  if (health) {
    const isHealthy = health.status === "healthy";
    return (
      <div className="space-y-2">
        <div
          className={`flex items-center space-x-2 text-sm ${
            isHealthy
              ? "text-green-600 dark:text-green-400"
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isHealthy ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></div>
          <span>
            Backend: {health.status}
            {health.faiss_index_exists ? " (FAISS ready)" : " (No FAISS index)"}
          </span>
        </div>

        {/* Show root info if available */}
        {rootInfo && Object.keys(rootInfo).length > 0 && (
          <div className="text-xs text-muted pl-4">
            {Object.entries(rootInfo).map(([key, value]) => (
              <div key={key}>
                {key}:{" "}
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
