"use client"

import { useState } from "react"
import { AirdropCard } from "@/components/airdrops/airdrop-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function AirdropsPage() {
  const [activeTab, setActiveTab] = useState("active")

  // 임시 에어드랍 데이터
  const airdropsData = [
    {
      id: 1,
      title: "Arbitrum 생태계 에어드랍",
      description: "Arbitrum 네트워크 초기 사용자를 위한 ARB 토큰 에어드랍입니다. 스냅샷 이전 활동이 있는 지갑에 자동 분배됩니다.",
      reward: "1,000 ARB",
      endDate: "2024.12.31",
      participants: 45230,
      status: "active" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
      tokenSymbol: "ARB",
    },
    {
      id: 2,
      title: "zkSync Era 에어드랍",
      description: "zkSync 네트워크 활성 사용자 대상 에어드랍 프로그램. 거래 빈도와 볼륨에 따라 차등 지급됩니다.",
      reward: "최대 5,000 ZK",
      endDate: "2024.11.30",
      participants: 89450,
      status: "active" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/35448/small/zksync.jpg",
      tokenSymbol: "ZK",
    },
    {
      id: 3,
      title: "LayerZero 크로스체인 에어드랍",
      description: "LayerZero 프로토콜을 활용한 크로스체인 거래 사용자 대상 에어드랍입니다.",
      reward: "500 LZ",
      endDate: "2024.10.25",
      participants: 123890,
      status: "active" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/30061/small/logo-transparent-bg-dark.png",
      tokenSymbol: "LZ",
    },
    {
      id: 4,
      title: "Starknet 메인넷 에어드랍",
      description: "Starknet 메인넷 출시 기념 조기 참여자 보상 프로그램입니다.",
      reward: "2,000 STRK",
      endDate: "2025.01.15",
      participants: 12450,
      status: "upcoming" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/26433/small/starknet.png",
      tokenSymbol: "STRK",
    },
    {
      id: 5,
      title: "Optimism Season 4",
      description: "Optimism 네트워크 시즌 4 참여 보상 프로그램. NFT 민팅 및 DeFi 활동 필요.",
      reward: "750 OP",
      endDate: "2025.02.28",
      participants: 8930,
      status: "upcoming" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png",
      tokenSymbol: "OP",
    },
    {
      id: 6,
      title: "Polygon zkEVM 파일럿",
      description: "Polygon zkEVM 테스트넷 파일럿 프로그램 참여자 에어드랍.",
      reward: "300 MATIC",
      endDate: "2024.09.30",
      participants: 67840,
      status: "ended" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
      tokenSymbol: "MATIC",
    },
  ]

  const activeAirdrops = airdropsData.filter((a) => a.status === "active")
  const upcomingAirdrops = airdropsData.filter((a) => a.status === "upcoming")
  const endedAirdrops = airdropsData.filter((a) => a.status === "ended")

  const tabConfig = {
    active: { data: activeAirdrops, label: "진행중", variant: "positive" as const },
    upcoming: { data: upcomingAirdrops, label: "예정", variant: "secondary" as const },
    ended: { data: endedAirdrops, label: "종료", variant: "outline" as const },
  }

  return (
    <main className="min-h-screen pb-20 no-horizontal-scroll">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                최신 에어드랍 정보
              </h1>
              <p className="text-sm text-muted-foreground">
                최신 암호화폐 에어드랍을 한눈에 확인하세요
              </p>
            </div>
            
            {/* Tab Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
              <div className="inline-flex rounded-xl bg-muted/50 p-1 min-w-max">
                {Object.entries(tabConfig).map(([key, config]) => (
                  <Button
                    key={key}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-lg text-xs sm:text-sm font-semibold transition-all touch-target ${
                      activeTab === key
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                  >
                    {config.label}
                    <Badge
                      variant={config.variant}
                      className="ml-1 sm:ml-1.5 px-1 sm:px-1.5 text-xs"
                    >
                      {config.data.length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Airdrops List with Animation */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {tabConfig[activeTab as keyof typeof tabConfig].data.map((airdrop, index) => (
            <div key={airdrop.id} className="min-w-[85vw] max-w-[85vw] snap-start">
              <AirdropCard {...airdrop} />
            </div>
          ))}
        </div>
        <div className="hidden md:grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tabConfig[activeTab as keyof typeof tabConfig].data.map((airdrop, index) => (
            <div
              key={airdrop.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <AirdropCard {...airdrop} />
            </div>
          ))}
        </div>

        {/* Enhanced Tips Card */}
        <Card className="mt-6 sm:mt-8 bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent border-2 border-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          <CardContent className="p-4 sm:p-6 md:p-8 relative z-10">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-secondary/20 border border-secondary/30 shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-foreground">💡 에어드랍 참여 팁</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3 text-sm text-muted-foreground">
                    <span className="text-secondary-foreground mt-0.5 font-bold shrink-0">•</span>
                    <span>프로젝트의 공식 채널(트위터, 디스코드)에서 정보를 확인하세요</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm text-muted-foreground">
                    <span className="text-secondary-foreground mt-0.5 font-bold shrink-0">•</span>
                    <span>개인키나 시드 문구를 절대 공유하지 마세요</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm text-muted-foreground">
                    <span className="text-secondary-foreground mt-0.5 font-bold shrink-0">•</span>
                    <span>테스트넷 활동도 종종 에어드랍 자격 요건에 포함됩니다</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 text-sm text-muted-foreground">
                    <span className="text-secondary-foreground mt-0.5 font-bold shrink-0">•</span>
                    <span>가스비를 고려하여 참여를 결정하세요</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
