"use client";

import Image from "next/image";
import { useState } from "react";
import { models } from "@/lib/models";

interface ModelSelectorProps {
  onSelect: (modelId: string) => void;
}

export default function ModelSelector({ onSelect }: ModelSelectorProps) {
  const [selectedId, setSelectedId] = useState(models[0].id);

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-ink-900">选择虚拟模特</h2>
      
      {/* Model Grid */}
      <div className="grid grid-cols-2 gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => {
              setSelectedId(model.id);
              onSelect(model.id);
            }}
            className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
              selectedId === model.id ? "border-primary shadow-md" : "border-transparent hover:border-ink-300"
            }`}
          >
            <Image
              src={model.avatar}
              alt={model.name}
              fill
              className="object-cover"
            />
            {selectedId === model.id && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm font-medium">{model.name}</p>
              <p className="text-white/80 text-xs">{model.style}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-ink-100 rounded-lg p-3">
        <p className="text-sm text-ink-700">
          <span className="font-medium">{models.find(m => m.id === selectedId)?.name}</span> 
          {" "}· {models.find(m => m.id === selectedId)?.description}
        </p>
      </div>
    </div>
  );
}
