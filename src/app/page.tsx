"use client";

import { useState, useCallback } from "react";
import Chat from "@/components/Chat";
import Navigation from "@/components/Navigation";
import HealthCheck from "@/components/HealthCheck";

export default function Home() {
  const [clearChatFunction, setClearChatFunction] = useState<
    (() => void) | null
  >(null);

  const handleClearChatRef = useCallback((clearFunction: () => void) => {
    setClearChatFunction(() => clearFunction);
  }, []);

  const handleClearChat = () => {
    if (clearChatFunction) {
      clearChatFunction();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Navigation onClearChat={handleClearChat} showClearChat={true} />
      <div className="flex-1 flex flex-col">
        {/* Backend health status */}
        <div className="px-6 py-2 border-b border-default bg-surface">
          <HealthCheck />
        </div>
        <Chat onClearChat={handleClearChatRef} />
      </div>
    </div>
  );
}
