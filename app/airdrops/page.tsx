"use client"

import { useState } from "react"
import { AirdropCard } from "@/components/airdrops/airdrop-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    },
    {
      id: 2,
      title: "zkSync Era 에어드랍",
      description: "zkSync 네트워크 활성 사용자 대상 에어드랍 프로그램. 거래 빈도와 볼륨에 따라 차등 지급됩니다.",
      reward: "최대 5,000 ZK",
      endDate: "2024.11.30",
      participants: 89450,
      status: "active" as const,
    },
    {
      id: 3,
      title: "LayerZero 크로스체인 에어드랍",
      description: "LayerZero 프로토콜을 활용한 크로스체인 거래 사용자 대상 에어드랍입니다.",
      reward: "500 LZ",
      endDate: "2024.10.25",
      participants: 123890,
      status: "active" as const,
    },
    {
      id: 4,
      title: "Starknet 메인넷 에어드랍",
      description: "Starknet 메인넷 출시 기념 조기 참여자 보상 프로그램입니다.",
      reward: "2,000 STRK",
      endDate: "2025.01.15",
      participants: 12450,
      status: "upcoming" as const,
    },
    {
      id: 5,
      title: "Optimism Season 4",
      description: "Optimism 네트워크 시즌 4 참여 보상 프로그램. NFT 민팅 및 DeFi 활동 필요.",
      reward: "750 OP",
      endDate: "2025.02.28",
      participants: 8930,
      status: "upcoming" as const,
    },
    {
      id: 6,
      title: "Polygon zkEVM 파일럿",
      description: "Polygon zkEVM 테스트넷 파일럿 프로그램 참여자 에어드랍.",
      reward: "300 MATIC",
      endDate: "2024.09.30",
      participants: 67840,
      status: "ended" as const,
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
    <main className="min-h-screen pb-20">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              최신 에어드랍 정보
            </h1>
            <p className="text-sm text-muted-foreground">
              진행 중인 에어드랍과 예정된 이벤트를 확인하고 참여하세요
            </p>
          </div>
            
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-positive">
                  {activeAirdrops.length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">진행중</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary-foreground">
                  {upcomingAirdrops.length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">예정</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-muted-foreground">
                  {endedAirdrops.length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">종료</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tab Filter - Sticky */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {Object.entries(tabConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={activeTab === key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(key)}
                className="rounded-xl whitespace-nowrap"
              >
                {config.label}
                <Badge
                  variant={config.variant}
                  className="ml-2"
                >
                  {config.data.length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Airdrops List */}
      <section className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tabConfig[activeTab as keyof typeof tabConfig].data.map((airdrop) => (
            <AirdropCard key={airdrop.id} {...airdrop} />
          ))}
        </div>

        {/* Tips Card */}
        <Card className="mt-8 bg-secondary/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-3">💡 에어드랍 참여 팁</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 프로젝트의 공식 채널(트위터, 디스코드)에서 정보를 확인하세요</li>
              <li>• 개인키나 시드 문구를 절대 공유하지 마세요</li>
              <li>• 테스트넷 활동도 종종 에어드랍 자격 요건에 포함됩니다</li>
              <li>• 가스비를 고려하여 참여를 결정하세요</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
