"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, TrendingUp, Sparkles, Check, ArrowRight, Send, MessageSquare, Newspaper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  // 실시간 인기 검색어
  const trendingKeywords = [
    "비트코인 ETF",
    "이더리움 2.0",
    "솔라나 상승",
    "리플 소송",
    "NFT 시장",
    "디파이 프로토콜",
    "스테이블코인 규제",
    "레이어2 솔루션",
    "메타버스 코인",
    "AI x 블록체인",
    "Arbitrum",
    "zkSync",
  ]

  // 키워드별 관련 콘텐츠 (실제로는 API에서 가져와야 함)
  const getRelatedContent = (keyword: string) => {
    return {
      news: [
        { id: 1, title: `${keyword} 관련 최신 뉴스`, source: "CoinDesk", time: "1시간 전" },
        { id: 2, title: `${keyword} 시장 분석 리포트`, source: "Bloomberg", time: "3시간 전" },
      ],
      telegram: [
        { id: 1, name: "마인부우의 크립토볼", topic: `${keyword} 논의 중` },
        { id: 2, name: "브라이언홍", topic: `${keyword} 분석` },
      ],
      community: [
        { id: 1, title: `${keyword}에 대한 의견 공유`, author: "zsdasd", replies: 45 },
        { id: 2, title: `${keyword} 전망 어떻게 보시나요?`, author: "블록체인러버", replies: 23 },
      ],
    }
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 검색 로직 추가
      console.log("검색:", searchQuery)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section - Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="flex aspect-square size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-white shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="size-8" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              코뮤니티
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            암호화폐의 모든 정보를 한곳에서
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="shadow-xl border-2">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="코인, 뉴스, 프로젝트를 검색해보세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-24 h-14 text-base rounded-xl border-2 focus:border-primary"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 h-10 px-6 rounded-lg"
                  >
                    검색
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trending Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">실시간 인기 검색어</h2>
            <Badge variant="secondary" className="ml-2">
              {selectedKeywords.length}개 선택
            </Badge>
          </div>
          
          <motion.div
            className="flex flex-wrap gap-3 overflow-visible justify-center"
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            {trendingKeywords.map((keyword, index) => {
              const isSelected = selectedKeywords.includes(keyword)
              return (
                <motion.button
                  key={keyword}
                  onClick={() => toggleKeyword(keyword)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    backgroundColor: isSelected 
                      ? "hsl(var(--primary))" 
                      : "hsl(var(--muted))",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: isSelected 
                      ? "hsl(var(--primary))" 
                      : "hsl(var(--accent))",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                    backgroundColor: { duration: 0.2 },
                    opacity: { delay: index * 0.05 },
                    scale: { delay: index * 0.05 },
                  }}
                  className={`
                    inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium
                    whitespace-nowrap overflow-hidden border-2 transition-colors
                    ${isSelected 
                      ? "text-primary-foreground border-primary" 
                      : "text-foreground border-border hover:border-primary/50"}
                  `}
                >
                  <motion.div
                    className="relative flex items-center"
                    animate={{
                      width: isSelected ? "auto" : "100%",
                      paddingRight: isSelected ? "1.75rem" : "0",
                    }}
                    transition={{
                      ease: [0.175, 0.885, 0.32, 1.275],
                      duration: 0.3,
                    }}
                  >
                    <span>{keyword}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 0.5,
                          }}
                          className="absolute right-0"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary-foreground flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                          </div>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Related Content */}
        <AnimatePresence mode="wait">
          {selectedKeywords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {selectedKeywords.map((keyword, idx) => {
                const content = getRelatedContent(keyword)
                return (
                  <motion.div
                    key={keyword}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">&ldquo;{keyword}&rdquo; 관련 콘텐츠</h3>
                      <Badge variant="outline">{keyword}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* News */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Newspaper className="h-4 w-4 text-primary" />
                            뉴스
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {content.news.map((news) => (
                            <Link
                              key={news.id}
                              href="/news"
                              className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                            >
                              <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                {news.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{news.source}</span>
                                <span>•</span>
                                <span>{news.time}</span>
                              </div>
                            </Link>
                          ))}
                          <Link href="/news">
                            <Button variant="ghost" size="sm" className="w-full">
                              더보기 <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>

                      {/* Telegram */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Send className="h-4 w-4 text-primary" />
                            텔레그램
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {content.telegram.map((channel) => (
                            <Link
                              key={channel.id}
                              href="/telegram"
                              className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                            >
                              <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                                {channel.name}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {channel.topic}
                              </p>
                            </Link>
                          ))}
                          <Link href="/telegram">
                            <Button variant="ghost" size="sm" className="w-full">
                              더보기 <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>

                      {/* Community */}
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <MessageSquare className="h-4 w-4 text-primary" />
                            커뮤니티
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {content.community.map((post) => (
                            <Link
                              key={post.id}
                              href="/community"
                              className="block p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                            >
                              <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{post.author}</span>
                                <span>•</span>
                                <span>댓글 {post.replies}</span>
                              </div>
                            </Link>
                          ))}
                          <Link href="/community">
                            <Button variant="ghost" size="sm" className="w-full">
                              더보기 <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
