"use client";

import { Upload, Sparkles, Video, User } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ink-300">
      <div className="container-mobile mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-ink-900">服模AI</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <button
            onClick={() => onPageChange("home")}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              currentPage === "home" 
                ? "bg-primary text-white" 
                : "text-ink-500 hover:text-ink-700"
            }`}
          >
            首页
          </button>
          <button
            onClick={() => onPageChange("profile")}
            className={`p-2 rounded-full transition-all ${
              currentPage === "profile" 
                ? "bg-primary/10" 
                : "hover:bg-ink-100"
            }`}
          >
            <User size={20} className="text-ink-700" />
          </button>
        </nav>
      </div>
    </header>
  );
}
