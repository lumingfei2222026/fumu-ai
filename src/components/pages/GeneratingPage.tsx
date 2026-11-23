"use client";

import Image from "next/image";
import { Download, Share2, RotateCcw, Film } from "lucide-react";
import { useState, useEffect } from "react";

interface ResultCard {
  id: string;
  type: "主图" | "场景" | "细节";
  label: string;
}

interface GeneratingPageProps {
  onComplete: () => void;
}

const mockResults: ResultCard[] = [
  { id: "1", type: "主图", label: "白底主图" },
  { id: "2", type: "场景", label: "室内场景" },
  { id: "3", type: "场景", label: "街拍外景" },
  { id: "4", type: "细节", label: "面料细节" },
  { id: "5", type: "场景", label: "工作室" },
  { id: "6", type: "主图", label: "白底主图" },
];

export default function GeneratingPage({ onComplete }: GeneratingPageProps) {
  const [progress, setProgress] = useState(0);
  const [completedImages, setCompletedImages] = useState<ResultCard[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { pct: 20, text: "正在识别服装款式、颜色和面料..." },
    { pct: 40, text: "匹配虚拟模特，调整姿势..." },
    { pct: 60, text: "生成白底主图和场景图..." },
    { pct: 80, text: "渲染细节图和角度变体..." },
    { pct: 100, text: "全部完成！共生成 6 张商品图" },
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
        return;
      }
      setProgress(steps[i].pct);
      setCurrentStep(i + 1);
      
      // Add completed images progressively
      const newImages = mockResults.slice(0, Math.ceil((i + 1) / 2));
      setCompletedImages(newImages);
      
      i++;
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-mobile mx-auto px-4 py-6 space-y-6">
      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-500">正在生成中...</span>
          <span className="font-medium text-primary">{progress}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Current Step */}
        <p className="text-sm text-ink-600 min-h-[20px]">
          {steps[currentStep - 1]?.text || "准备开始..."}
        </p>
      </div>

      {/* Completed Results Preview */}
      {completedImages.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-700">
              已生成 {completedImages.length}/{mockResults.length}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {completedImages.map((img) => (
              <div key={img.id} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-ink-100 group">
                <Image
                  src="/placeholder-model.jpg"
                  alt={img.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 rounded text-xs text-white">
                  {img.type}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-ink-100 transition-colors">
                      <Download size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-ink-100 transition-colors">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steps Indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-ink-100">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx < currentStep ? "bg-primary w-6" : idx === currentStep ? "bg-primary" : "bg-ink-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
