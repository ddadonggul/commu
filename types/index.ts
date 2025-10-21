// 공통 타입 정의

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface News {
  id: number
  title: string
  content: string
  source: string
  timestamp: string
  category?: string
  trend?: "up" | "down"
  imageUrl?: string
}

export interface Airdrop {
  id: number
  title: string
  description: string
  reward: string
  endDate: string
  participants?: number
  status: "active" | "upcoming" | "ended"
  requirements?: string[]
  projectUrl?: string
}

export interface Post {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  category: string
  likes: number
  comments: number
  isHot?: boolean
  quotedSource?: TelegramChannel | News // 인용된 출처
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  sentiment?: "positive" | "negative" | "neutral" // 긍정/부정 반응
  createdAt: Date
  updatedAt: Date
}

export interface TelegramChannel {
  id: number
  rank: number
  name: string
  channelUrl: string
  score: number
  subscribers?: number
  category?: string
  description?: string
  avatar?: string
  scoreChange?: number // 점수 변화량
  rankChange?: number // 순위 변화
}

export interface TelegramPost {
  id: number
  channelId: number
  channelName: string
  content: string
  timestamp: string
  views?: number
  reactions?: number
  category?: string
}

export interface MindshareData {
  period: "7d" | "30d" | "90d"
  channels: TelegramChannel[]
  totalScore: number
  topGainers: TelegramChannel[]
  trending: string[]
}

export interface CryptoCoin {
  name: string
  symbol: string
  price: string
  change: string
  marketCap?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
