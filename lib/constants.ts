// 애플리케이션 상수

export const APP_NAME = "CryptoHub"
export const APP_DESCRIPTION = "가상화폐 커뮤니티 플랫폼"

export const ROUTES = {
  HOME: "/",
  TELEGRAM: "/telegram",
  AIRDROPS: "/airdrops",
  COMMUNITY: "/community",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
} as const

export const API_ENDPOINTS = {
  HELLO: "/api/hello",
  USER: "/api/user",
  NEWS: "/api/news",
  TELEGRAM: "/api/telegram",
  AIRDROP: "/api/airdrop",
  POST: "/api/post",
  COMMENT: "/api/comment",
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

export const TELEGRAM_CATEGORIES = [
  "종합",
  "시장분석",
  "에어드랍",
  "DeFi",
  "NFT",
  "기술",
  "공지",
  "정보",
  "학습",
] as const

export const POST_CATEGORIES = [
  "시장분석",
  "기술토론",
  "초보가이드",
  "NFT",
  "DeFi",
  "규제",
  "트렌드",
  "보안",
] as const

export const PERIODS = ["7d", "30d", "90d"] as const

export const SENTIMENT_TYPES = ["positive", "negative", "neutral"] as const
