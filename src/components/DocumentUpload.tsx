"use client";

import { useState, useRef, useCallback } from "react";
import { uploadDocuments, ApiError } from "@/utils/api";

interface UploadedFile {
  file: File;
  id: string;
  status: "pending" | "uploading" | "success" | "error" | "duplicate";
  error?: string;
}

const SUPPORTED_FORMATS = [".md", ".docx", ".pdf", ".xlsx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!SUPPORTED_FORMATS.includes(extension)) {
      return `Unsupported file format. Please upload ${SUPPORTED_FORMATS.join(
        ", "
      )} files.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size too large. Maximum size is 10MB.";
    }
    return null;
  }, []);

  const generateFileId = useCallback((file: File): string => {
    return `${file.name}-${file.size}-${file.lastModified}`;
  }, []);

  const checkForDuplicates = useCallback(
    (newFiles: File[]): UploadedFile[] => {
      const existingFileIds = new Set(uploadedFiles.map((f) => f.id));

      return newFiles.map((file) => {
        const id = generateFileId(file);
        const validationError = validateFile(file);

        if (validationError) {
          return {
            file,
            id,
            status: "error" as const,
            error: validationError,
          };
        }

        if (existingFileIds.has(id)) {
          return {
            file,
            id,
            status: "duplicate" as const,
            error: "File already uploaded",
          };
        }

        return {
          file,
          id,
          status: "pending" as const,
        };
      });
    },
    [uploadedFiles, validateFile, generateFileId]
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newUploadedFiles = checkForDuplicates(fileArray);

      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    },
    [checkForDuplicates]
  );

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const retryFile = (id: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, status: "pending", error: undefined } : file
      )
    );
  };

  const uploadFiles = async () => {
    const filesToUpload = uploadedFiles.filter((f) => f.status === "pending");

    if (filesToUpload.length === 0) {
      return;
    }

    setIsUploading(true);

    for (const uploadedFile of filesToUpload) {
      try {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, status: "uploading" } : f
          )
        );

        await uploadDocuments([uploadedFile.file]);

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id ? { ...f, status: "success" } : f
          )
        );
      } catch (error) {
        let errorMessage = "Upload failed";

        if (error instanceof ApiError) {
          errorMessage = error.message;
          if (
            error.message.toLowerCase().includes("duplicate") ||
            error.message.toLowerCase().includes("already exists")
          ) {
            setUploadedFiles((prev) =>
              prev.map((f) =>
                f.id === uploadedFile.id
                  ? { ...f, status: "duplicate", error: errorMessage }
                  : f
              )
            );
            continue;
          }
        }

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadedFile.id
              ? { ...f, status: "error", error: errorMessage }
              : f
          )
        );
      }
    }

    setIsUploading(false);
  };

  const clearAll = () => {
    setUploadedFiles([]);
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "pending":
        return "📄";
      case "uploading":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "duplicate":
        return "⚠️";
      default:
        return "📄";
    }
  };

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "pending":
        return "text-gray-600 dark:text-gray-400";
      case "uploading":
        return "text-blue-600 dark:text-blue-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      case "duplicate":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const pendingCount = uploadedFiles.filter(
    (f) => f.status === "pending"
  ).length;
  const hasFiles = uploadedFiles.length > 0;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Document Upload
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload documents to your knowledge base. Supported formats:{" "}
          {SUPPORTED_FORMATS.join(", ")}
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={SUPPORTED_FORMATS.join(",")}
          onChange={onFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          <div className="text-6xl">📁</div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Drop your documents here
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              or click to browse files
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Maximum file size: 10MB
          </div>
        </div>
      </div>

      {/* File List */}
      {hasFiles && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Uploaded Files ({uploadedFiles.length})
            </h2>
            <div className="space-x-2">
              {pendingCount > 0 && (
                <button
                  onClick={uploadFiles}
                  disabled={isUploading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading
                    ? "Uploading..."
                    : `Upload ${pendingCount} file${
                        pendingCount > 1 ? "s" : ""
                      }`}
                </button>
              )}
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-2xl">
                    {getStatusIcon(uploadedFile.status)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {uploadedFile.file.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <span className={getStatusColor(uploadedFile.status)}>
                        {uploadedFile.status === "pending" && "Ready to upload"}
                        {uploadedFile.status === "uploading" && "Uploading..."}
                        {uploadedFile.status === "success" &&
                          "Uploaded successfully"}
                        {uploadedFile.status === "error" && uploadedFile.error}
                        {uploadedFile.status === "duplicate" &&
                          "Duplicate file"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {uploadedFile.status === "error" && (
                    <button
                      onClick={() => retryFile(uploadedFile.id)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
