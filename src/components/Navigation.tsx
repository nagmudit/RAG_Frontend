"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Chat", icon: "💬" },
    { href: "/ingest", label: "Add Content", icon: "�" },
  ];

  return (
    <nav className="surface-elevated border-b border-default shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">
                  RAG Assistant
                </span>
                <span className="text-xs text-muted">
                  Enterprise AI Platform
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800"
                    : "text-secondary hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="w-px h-6 bg-border mx-2"></div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
