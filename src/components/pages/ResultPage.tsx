"use client";

import Image from "next/image";
import { Download, Share2, RotateCcw, Film, ArrowLeft } from "lucide-react";

interface ResultPageProps {
  onNewGeneration: () => void;
  onViewProfile: () => void;
}

const results = [
  { id: "1", type: "主图", label: "白底主图", variant: "" },
  { id: "2", type: "场景", label: "室内场景", variant: "" },
  { id: "3", type: "场景", label: "街拍外景", variant: "" },
  { id: "4", type: "细节", label: "面料细节", variant: "" },
  { id: "5", type: "主图", label: "侧面展示", variant: "" },
  { id: "6", type: "场景", label: "工作室", variant: "" },
];

export default function ResultPage({ onNewGeneration, onViewProfile }: ResultPageProps) {
  return (
    <div className="container-mobile mx-auto px-4 py-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onNewGeneration}
          className="flex items-center gap-2 text-sm text-ink-500 hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          重新生成
        </button>
        <button 
          onClick={onViewProfile}
          className="text-sm text-ink-500 hover:text-primary transition-colors"
        >
          我的作品
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-success">生成成功！</p>
          <p className="text-sm text-success/80 mt-0.5">共生成 6 张商品图，可用于电商上架</p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">生成结果</h2>
          <span className="text-xs text-ink-500">第 1 页，共 1 页</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {results.map((result) => (
            <div key={result.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-ink-100">
              <Image
                src="/placeholder-result.jpg"
                alt={result.label}
                fill
                className="object-cover"
              />
              
              {/* Type Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
                {result.type}
              </div>
              
              {/* Action Buttons */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/90 rounded-lg text-xs font-medium hover:bg-white transition-colors">
                    <Download size={12} />
                    下载
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/90 rounded-lg text-xs font-medium hover:bg-white transition-colors">
                    <Share2 size={12} />
                    分享
                  </button>
                </div>
              </div>
              
              {/* Retake Button */}
              <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                <RotateCcw size={12} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video CTA */}
      <div className="bg-ink-100 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-ink-900">生成短视频</p>
            <p className="text-sm text-ink-500 mt-0.5">一键生成5-15秒换模特短视频</p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <Film size={16} className="inline mr-1 mb-0.5" />
            生成视频
          </button>
        </div>
      </div>

      {/* Batch Actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-3 border border-ink-300 rounded-lg font-medium text-ink-700 hover:border-primary hover:text-primary transition-colors">
          批量下载
        </button>
        <button className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors">
          分享朋友圈
        </button>
      </div>
    </div>
  );
}
