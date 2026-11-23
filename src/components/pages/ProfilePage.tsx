"use client";

import { User, CreditCard, History, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const credits = 8;
  const packages = [
    { name: "体验版", price: 0, images: 10, videos: 2, features: ["有水印", "不可商用", "基础支持"] },
    { name: "个人版", price: 99, images: 200, videos: 20, features: ["无水印", "可商用", "专属模特", "优先队列"], recommended: true },
    { name: "店铺版", price: 299, images: 1000, videos: 100, features: ["全部功能", "3个专属模特", "API接入", "专属客服"] },
  ];

  return (
    <div className="container-mobile mx-auto px-4 py-6 space-y-6">
      {/* User Info */}
      <div className="flex items-center gap-4 pb-4 border-b border-ink-100">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-semibold">
          张
        </div>
        <div>
          <p className="font-semibold text-ink-900">张三服装厂</p>
          <p className="text-sm text-ink-500">普通会员</p>
        </div>
      </div>

      {/* Credits Card */}
      <div className="bg-primary rounded-xl p-5 text-white">
        <p className="text-sm opacity-80 mb-1">可用额度</p>
        <p className="text-3xl font-bold mb-2">{credits} 次</p>
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors border border-white/30">
          充值中心
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "已生成", value: "23" },
          { label: "本月使用", value: "18" },
          { label: "累计节省", value: "¥1,240" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-ink-100 text-center">
            <p className="text-xl font-bold text-ink-900">{stat.value}</p>
            <p className="text-xs text-ink-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Package Comparison */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-ink-900">选择套餐</h2>
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-xl p-4 border-2 transition-all ${
                pkg.recommended ? "border-primary shadow-md" : "border-ink-100"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink-900">{pkg.name}</h3>
                    {pkg.recommended && (
                      <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">推荐</span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-ink-900 mt-1">
                    ¥{pkg.price}
                    <span className="text-sm font-normal text-ink-500">/月</span>
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">图片生成</span>
                  <span className="font-medium">{pkg.images}张</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-500">视频生成</span>
                  <span className="font-medium">{pkg.videos}条</span>
                </div>
              </div>
              
              <ul className="space-y-1.5 mb-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-ink-600">
                    <CheckIcon size={12} className="text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pkg.recommended
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : "bg-ink-100 text-ink-700 hover:bg-ink-300"
                }`}
              >
                {pkg.price === 0 ? "当前方案" : "立即升级"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">最近记录</h2>
          <Link href="#" className="text-sm text-primary">查看全部</Link>
        </div>
        
        <div className="space-y-2">
          {[
            { date: "今天", item: "毛衣平铺图", status: "成功", count: "5张" },
            { date: "今天", item: "连衣裙套装", status: "失败", count: "2张" },
            { date: "昨天", item: "T恤系列", status: "成功", count: "12张" },
          ].map((record, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-ink-100">
              <div>
                <p className="text-sm font-medium text-ink-900">{record.item}</p>
                <p className="text-xs text-ink-500 mt-0.5">{record.date}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  record.status === "成功" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}>
                  {record.status}
                </span>
                <p className="text-xs text-ink-500 mt-1">{record.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {[
          { icon: Settings, label: "设置" },
          { icon: CreditCard, label: "支付记录" },
          { icon: History, label: "使用历史" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 p-4 bg-white rounded-lg border border-ink-100 hover:border-ink-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-ink-100 flex items-center justify-center">
                <Icon size={20} className="text-ink-600" />
              </div>
              <span className="font-medium text-ink-700">{item.label}</span>
              <svg className="ml-auto text-ink-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CheckIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`flex-shrink-0 ${className || ""}`}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
