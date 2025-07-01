"use client";

import { useState, useEffect } from "react";
import { checkHealth } from "@/utils/api";
import { HealthResponse } from "@/types";

export default function HealthCheck() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        setLoading(true);
        setError(null);
        const healthData = await checkHealth();
        setHealth(healthData);
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
    );
  }

  return null;
}
