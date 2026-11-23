"use client";

import { useState, useRef } from "react";
import { Upload as UploadIcon, X, Check } from "lucide-react";

interface UploadPageProps {
  onUploadComplete: (file: File | null) => void;
}

export default function UploadPage({ onUploadComplete }: UploadPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadComplete(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onUploadComplete(file);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onUploadComplete(null);
  };

  return (
    <div className="container-mobile mx-auto px-4 py-6 space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {["上传", "配置", "生成"].map((step, idx) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              idx === 0 ? "bg-primary text-white" : "bg-ink-100 text-ink-500"
            }`}>
              {idx + 1}
            </div>
            <span className={`text-sm ${idx === 0 ? "text-primary font-medium" : "text-ink-500"}`}>
              {step}
            </span>
            {idx < 2 && <div className="w-8 h-px bg-ink-300" />}
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          uploadedFile ? "border-success bg-success/5" : "border-ink-300 hover:border-primary cursor-pointer"
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {uploadedFile ? (
          <div className="space-y-3">
            <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden bg-ink-100">
              <img
                src={previewUrl || ""}
                alt="预览"
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-success">
              <Check size={16} />
              <span className="text-sm font-medium">上传成功</span>
            </div>
            <p className="text-xs text-ink-500">{uploadedFile.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-ink-100 flex items-center justify-center">
              <UploadIcon size={28} className="text-ink-500" />
            </div>
            <div>
              <p className="text-base font-medium text-ink-700">点击或拖拽上传服装图</p>
              <p className="text-sm text-ink-500 mt-1">支持 JPG、PNG，建议尺寸 ≥ 800×1000px</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-ink-400">
              <span>✓ 支持平铺图</span>
              <span>✓ 支持人台图</span>
              <span>✓ 支持实拍图</span>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-ink-100 rounded-xl p-4 space-y-2">
        <p className="text-sm font-medium text-ink-700">拍摄建议</p>
        <ul className="text-xs text-ink-500 space-y-1">
          <li>• 使用纯色背景，避免复杂花纹干扰识别</li>
          <li>• 正面平整展示，确保服装完整入镜</li>
          <li>• 光线均匀，避免过强阴影</li>
          <li>• 去除模特或人台，仅保留服装本身</li>
        </ul>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => uploadedFile && console.log("Navigate to config")}
        disabled={!uploadedFile}
        className={`w-full py-3.5 rounded-lg font-medium transition-all ${
          uploadedFile
            ? "bg-primary text-white hover:bg-primary-hover active:scale-[0.98]"
            : "bg-ink-100 text-ink-400 cursor-not-allowed"
        }`}
      >
        {uploadedFile ? "下一步：选择虚拟模特" : "请先上传服装图"}
      </button>
    </div>
  );
}
