"use client";

import Image from "next/image";
import { Camera, Users, Palette, Zap } from "lucide-react";

interface HomePageProps {
  onUpload: () => void;
  onGenerate: () => void;
}

export default function HomePage({ onUpload, onGenerate }: HomePageProps) {
  const credits = 8;
  const generatedCount = 23;
  const savedAmount = "¥1,240";

  return (
    <div className="container-mobile mx-auto px-4 py-6 space-y-6">
      {/* Credits Card */}
      <div className="bg-primary rounded-xl p-5 text-white relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm opacity-80 mb-1">剩余可用次数</p>
          <p className="text-4xl font-bold mb-2">{credits}</p>
          <p className="text-xs opacity-70">免费体验次数 · 每次生成约消耗 1 次</p>
          <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors border border-white/30">
            充值中心
          </button>
        </div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onUpload}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-ink-300 hover:border-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Camera size={20} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-ink-700">上传服装</span>
          <span className="text-xs text-ink-500">平铺 / 人台</span>
        </button>
        
        <button
          onClick={onGenerate}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-ink-300 hover:border-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users size={20} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-ink-700">选择模特</span>
          <span className="text-xs text-ink-500">15位虚拟模特</span>
        </button>
        
        <button
          onClick={onGenerate}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-ink-300 hover:border-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap size={20} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-ink-700">生成图</span>
          <span className="text-xs text-ink-500">AI自动换装</span>
        </button>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-ink-900">核心功能</h2>
        <div className="space-y-2">
          {[
            { icon: Camera, title: "智能换模特", desc: "上传服装图，AI自动生成多种姿势商品图" },
            { icon: Palette, title: "多语言翻译", desc: "一键生成英文、日文、阿拉伯语等多语言版本" },
            { icon: Zap, title: "批量生成", desc: "支持多件服装同时处理，效率提升10倍" },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-ink-100"
              >
                <div className="w-10 h-10 rounded-lg bg-ink-100 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-ink-700" />
                </div>
                <div>
                  <h3 className="font-medium text-ink-900">{feature.title}</h3>
                  <p className="text-sm text-ink-500 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Works */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">最近作品</h2>
          <button className="text-sm text-primary font-medium">查看全部</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] bg-white rounded-xl border border-ink-100 overflow-hidden">
              <div className="w-full h-full bg-ink-100 flex items-center justify-center">
                <span className="text-ink-500 text-sm">示例图片</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around py-4 bg-white rounded-xl border border-ink-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-ink-900">{generatedCount}</p>
          <p className="text-xs text-ink-500 mt-1">已生成</p>
        </div>
        <div className="w-px h-10 bg-ink-100" />
        <div className="text-center">
          <p className="text-2xl font-bold text-success">18</p>
          <p className="text-xs text-ink-500 mt-1">今日可用</p>
        </div>
        <div className="w-px h-10 bg-ink-100" />
        <div className="text-center">
          <p className="text-2xl font-bold text-ink-900">{savedAmount}</p>
          <p className="text-xs text-ink-500 mt-1">累计节省</p>
        </div>
      </div>
    </div>
  );
}
