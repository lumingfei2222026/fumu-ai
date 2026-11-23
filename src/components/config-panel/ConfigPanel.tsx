"use client";

import { useState } from "react";

interface ConfigPanelProps {
  modelId: string;
  onGenerate: (config: GenerationConfig) => void;
}

export interface GenerationConfig {
  modelId: string;
  poses: string[];
  backgrounds: string[];
  languages: string[];
  quantity: number;
}

const poses = [
  { id: "front", label: "正面站姿" },
  { id: "side", label: "侧身45°" },
  { id: "walking", label: "走路动态" },
  { id: "sitting", label: "坐姿" },
];

const backgrounds = [
  { id: "white", label: "纯白底" },
  { id: "indoor", label: "室内家居" },
  { id: "street", label: "街拍户外" },
  { id: "studio", label: "摄影棚" },
];

const languages = [
  { code: "en", label: "英语", flag: "🇺🇸" },
  { code: "ja", label: "日语", flag: "🇯🇵" },
  { code: "ko", label: "韩语", flag: "🇰🇷" },
  { code: "es", label: "西班牙语", flag: "🇪🇸" },
  { code: "ar", label: "阿拉伯语", flag: "🇸🇦" },
  { code: "fr", label: "法语", flag: "🇫🇷" },
  { code: "de", label: "德语", flag: "🇩🇪" },
  { code: "pt", label: "葡萄牙语", flag: "🇧🇷" },
  { code: "ru", label: "俄语", flag: "🇷🇺" },
  { code: "th", label: "泰语", flag: "🇹🇭" },
];

const quantities = [
  { value: 3, label: "3张（基础）" },
  { value: 6, label: "6张（推荐）" },
  { value: 9, label: "9张（全面）" },
];

export default function ConfigPanel({ modelId, onGenerate }: ConfigPanelProps) {
  const [selectedPoses, setSelectedPoses] = useState<string[]>(["front"]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>(["white"]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"]);
  const [quantity, setQuantity] = useState(6);
  const [selectAllLang, setSelectAllLang] = useState(false);

  const togglePoses = (id: string) => {
    setSelectedPoses(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleBackgrounds = (id: string) => {
    setSelectedBackgrounds(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleLanguage = (code: string) => {
    if (selectAllLang) return;
    setSelectedLanguages(prev => {
      const next = prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code];
      setSelectAllLang(next.length === languages.length);
      return next;
    });
  };

  const handleSelectAll = () => {
    const newState = !selectAllLang;
    setSelectAllLang(newState);
    setSelectedLanguages(newState ? languages.map(l => l.code) : []);
  };

  const calculateTotal = () => {
    return quantity * selectedPoses.length * selectedBackgrounds.length;
  };

  const totalPrice = calculateTotal() * 0.5; // ¥0.5 per image

  return (
    <div className="space-y-6">
      {/* Poses Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-ink-700">
          姿势选择
          <span className="ml-2 text-xs text-ink-400">选多个可同时生成多角度</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {poses.map((pose) => (
            <button
              key={pose.id}
              onClick={() => togglePoses(pose.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPoses.includes(pose.id)
                  ? "bg-primary text-white"
                  : "bg-white border border-ink-300 text-ink-600 hover:border-primary"
              }`}
            >
              {pose.label}
            </button>
          ))}
        </div>
      </div>

      {/* Background Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-ink-700">背景风格</label>
        <div className="grid grid-cols-4 gap-2">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => toggleBackgrounds(bg.id)}
              className={`aspect-square rounded-lg text-xs font-medium transition-all ${
                selectedBackgrounds.includes(bg.id)
                  ? "bg-primary text-white"
                  : "bg-white border border-ink-300 text-ink-600 hover:border-primary"
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language Translation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">多语言翻译</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAllLang}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-ink-300 text-primary focus:ring-primary"
            />
            <span className="text-xs text-ink-500">全选全部10种</span>
          </label>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                selectedLanguages.includes(lang.code)
                  ? "bg-primary text-white"
                  : "bg-white border border-ink-300 text-ink-600 hover:border-primary"
              }`}
            >
              {lang.flag}<br />{lang.label}
            </button>
          ))}
        </div>
        {selectedLanguages.length > 0 && (
          <p className="text-xs text-ink-500">
            将生成 {selectedLanguages.length} 个语言版本
          </p>
        )}
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-ink-700">每套生成张数</label>
        <div className="flex gap-2">
          {quantities.map((q) => (
            <button
              key={q.value}
              onClick={() => setQuantity(q.value)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                quantity === q.value
                  ? "bg-primary text-white"
                  : "bg-white border border-ink-300 text-ink-600 hover:border-primary"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-ink-100 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-ink-600">本次生成</span>
          <span className="font-medium">{calculateTotal()} 张</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-600">单价</span>
          <span>¥0.50/张</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-ink-300">
          <span>合计</span>
          <span className="text-primary">¥{totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-xs text-ink-500">免费额度不足时将自动扣费</p>
      </div>

      {/* Generate Button */}
      <button
        onClick={() => onGenerate({
          modelId,
          poses: selectedPoses,
          backgrounds: selectedBackgrounds,
          languages: selectedLanguages,
          quantity,
        })}
        className="w-full py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover active:scale-[0.98] transition-all"
      >
        立即生成 — {calculateTotal()}张
      </button>
    </div>
  );
}
