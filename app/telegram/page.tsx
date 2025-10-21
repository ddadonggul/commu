"use client"

import { useState } from "react"
import { ChannelCard } from "@/components/telegram/channel-card"
import { MindshareStats } from "@/components/telegram/mindshare-stats"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Period = "7d" | "30d" | "90d"

export default function TelegramPage() {
  const [activePeriod, setPeriod] = useState<Period>("7d")
  const [activeCategory, setCategory] = useState("all")

  // 임시 텔레그램 채널 데이터 (DeSpread 스타일)
  const channelsData = [
    {
      id: 1,
      rank: 1,
      name: "마인부우의 크립토볼",
      channelUrl: "https://t.me/minebuu_cryptoball",
      score: 35339,
      subscribers: 12500,
      category: "종합",
      scoreChange: 2340,
      rankChange: 0,
    },
    {
      id: 2,
      rank: 2,
      name: "브라이언홍",
      channelUrl: "https://t.me/BrianAitch",
      score: 34831,
      subscribers: 11200,
      category: "시장분석",
      scoreChange: 1890,
      rankChange: 1,
    },
    {
      id: 3,
      rank: 3,
      name: "라오니",
      channelUrl: "https://t.me/Raoni1",
      score: 25858,
      subscribers: 9800,
      category: "에어드랍",
      scoreChange: 1560,
      rankChange: -1,
    },
    {
      id: 4,
      rank: 4,
      name: "젠티 디파이 정보방",
      channelUrl: "https://t.me/Jenti_DeFi",
      score: 25522,
      subscribers: 8900,
      category: "DeFi",
      scoreChange: 1120,
      rankChange: 2,
    },
    {
      id: 5,
      rank: 5,
      name: "매실남과 당신은 반드시 승리할것",
      channelUrl: "https://t.me/waitstudy",
      score: 20206,
      subscribers: 7600,
      category: "종합",
      scoreChange: 980,
      rankChange: -1,
    },
    {
      id: 6,
      rank: 6,
      name: "잼민123🐙",
      channelUrl: "https://t.me/mujammin123",
      score: 19117,
      subscribers: 6800,
      category: "에어드랍",
      scoreChange: 1450,
      rankChange: 3,
    },
    {
      id: 7,
      rank: 7,
      name: "캘빈의 감금원",
      channelUrl: "https://t.me/c4lvinlocked",
      score: 18271,
      subscribers: 6200,
      category: "종합",
      scoreChange: 890,
      rankChange: -2,
    },
    {
      id: 8,
      rank: 8,
      name: "머니스택 공지방 - Season 1",
      channelUrl: "https://t.me/money0stack9Notice",
      score: 18153,
      subscribers: 5900,
      category: "공지",
      scoreChange: 760,
      rankChange: 1,
    },
    {
      id: 9,
      rank: 9,
      name: "🐷따돈꿀",
      channelUrl: "https://t.me/DDaDon_INFO",
      score: 11619,
      subscribers: 5400,
      category: "정보",
      scoreChange: 650,
      rankChange: 0,
    },
    {
      id: 10,
      rank: 10,
      name: "폐지줍기 연구소",
      channelUrl: "https://t.me/airdr0p_lab",
      score: 9739,
      subscribers: 4800,
      category: "에어드랍",
      scoreChange: 520,
      rankChange: -1,
    },
    {
      id: 11,
      rank: 11,
      name: "큐브의 유기농 크립토 쌀농장",
      channelUrl: "https://t.me/cubestudy1557",
      score: 9149,
      subscribers: 4200,
      category: "학습",
      scoreChange: 480,
      rankChange: 2,
    },
    {
      id: 12,
      rank: 12,
      name: "강복순의 앱스! 앱스! 앱스!",
      channelUrl: "https://t.me/Titanium_SPOON",
      score: 8289,
      subscribers: 3900,
      category: "에어드랍",
      scoreChange: 420,
      rankChange: 1,
    },
  ]

  const categories = [
    { value: "all", label: "전체", count: channelsData.length },
    { value: "종합", label: "종합", count: 3 },
    { value: "에어드랍", label: "에어드랍", count: 4 },
    { value: "시장분석", label: "시장분석", count: 1 },
    { value: "DeFi", label: "DeFi", count: 1 },
  ]

  const filteredChannels =
    activeCategory === "all"
      ? channelsData
      : channelsData.filter((ch) => ch.category === activeCategory)

  const totalScore = channelsData.reduce((sum, ch) => sum + ch.score, 0)
  const avgScore = Math.round(totalScore / channelsData.length)
  const topGainer = channelsData.reduce((prev, current) =>
    (current.scoreChange || 0) > (prev.scoreChange || 0) ? current : prev
  )

  return (
    <main className="min-h-screen pb-20">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                텔레그램 마인드쉐어
              </h1>
              <p className="text-sm text-muted-foreground">
                한국 크립토 커뮤니티의 영향력 있는 텔레그램 채널들을 한눈에 확인하세요
              </p>
            </div>
            
            {/* Period Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">기간:</span>
              <div className="inline-flex rounded-xl bg-secondary p-1">
                {(["7d", "30d", "90d"] as Period[]).map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod(period)}
                    className={`rounded-lg text-xs font-semibold transition-smooth ${
                      activePeriod === period
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {period === "7d" && "7일"}
                    {period === "30d" && "30일"}
                    {period === "90d" && "90일"}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <MindshareStats
            totalChannels={channelsData.length}
            totalScore={totalScore}
            avgScore={avgScore}
            topGainer={{
              name: topGainer.name,
              scoreChange: topGainer.scoreChange || 0,
            }}
          />
        </div>
      </section>

      {/* Category Filter - Sticky */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.value)}
                className="rounded-xl whitespace-nowrap"
              >
                {cat.label}
                <Badge
                  variant="secondary"
                  className="ml-2 bg-primary-50 text-primary"
                >
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Channel List */}
      <section className="container max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} {...channel} />
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="bg-secondary/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-3">💡 마인드쉐어란?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 텔레그램 채널의 영향력을 측정하는 지표입니다</p>
                <p>• 구독자 수, 활동량, 콘텐츠 품질 등을 종합 평가합니다</p>
                <p>• 순위 변동으로 트렌드를 파악할 수 있습니다</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">🔥 실시간 트렌딩 토픽</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Abstract",
                  "zkSync",
                  "Arbitrum",
                  "LayerZero",
                  "Starknet",
                  "Optimism",
                  "DeFi",
                  "NFT",
                ].map((topic) => (
                  <Badge key={topic} variant="outline" className="text-sm">
                    #{topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
