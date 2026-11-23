export interface Model {
  id: string;
  name: string;
  avatar: string;
  style: string;
  description: string;
}

export const models: Model[] = [
  {
    id: "xiaoya",
    name: "小雅",
    avatar: "/models/xiaoya.png",
    style: "休闲时尚",
    description: "年轻亚洲女性，适合日常休闲装展示",
  },
  {
    id: "annie",
    name: "安娜",
    avatar: "/models/annie.png",
    style: "商务干练",
    description: "职业女性形象，适合正装商务场景",
  },
  {
    id: "lisa",
    name: "Lisa",
    avatar: "/models/lisa.png",
    style: "优雅气质",
    description: "轻熟风格，适合连衣裙、礼服等品类",
  },
  {
    id: "sisi",
    name: "思思",
    avatar: "/models/sisi.png",
    style: "甜美清新",
    description: "邻家女孩感，适合少女装、学院风",
  },
];
