"use client";

import UrlIngest from "@/components/UrlIngest";
import Navigation from "@/components/Navigation";

export default function IngestPage() {
  return (
    <div className="h-full flex flex-col">
      <Navigation showClearChat={false} />
      <div className="flex-1 py-8">
        <UrlIngest />
      </div>
    </div>
  );
}
