import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "服模AI - 服装换模特生成工具",
  description: "面向工厂老板的AI换模特工具，上传服装图自动生成商品图+短视频",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-bg-page`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
