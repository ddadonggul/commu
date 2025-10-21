"use client"

import { useState } from "react"
import { NewsCard } from "@/components/news/news-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all")

  // 임시 코인 시세 데이터
  const topCoins = [
    { name: "Bitcoin", symbol: "BTC", price: "$60,234", change: "+5.2%", isUp: true },
    { name: "Ethereum", symbol: "ETH", price: "$3,456", change: "+3.8%", isUp: true },
    { name: "Solana", symbol: "SOL", price: "$142", change: "+12.5%", isUp: true },
    { name: "XRP", symbol: "XRP", price: "$0.65", change: "-1.2%", isUp: false },
    { name: "Cardano", symbol: "ADA", price: "$0.45", change: "+2.1%", isUp: true },
  ]

  // 임시 뉴스 데이터
  const newsData = [
    {
      id: 1,
      title: "비트코인, 6만 달러 돌파하며 강세 지속",
      content: "비트코인이 오늘 오후 6만 달러를 돌파하며 강한 상승세를 보이고 있습니다. 전문가들은 ETF 승인 기대감이 주요 원인으로 분석하고 있습니다.",
      source: "CoinDesk",
      timestamp: "10분 전",
      category: "BTC",
      trend: "up" as const,
    },
    {
      id: 2,
      title: "이더리움 2.0 업그레이드 일정 발표",
      content: "이더리움 재단이 2.0 메인넷 최종 업그레이드 일정을 공식 발표했습니다. 스테이킹 보상률도 함께 상향 조정될 예정입니다.",
      source: "Ethereum Foundation",
      timestamp: "1시간 전",
      category: "ETH",
      trend: "up" as const,
    },
    {
      id: 3,
      title: "SEC, 주요 거래소 규제 방안 논의",
      content: "미국 증권거래위원회가 암호화폐 거래소에 대한 새로운 규제 프레임워크를 논의 중입니다.",
      source: "Bloomberg",
      timestamp: "2시간 전",
      category: "규제",
      trend: "down" as const,
    },
    {
      id: 4,
      title: "솔라나 네트워크 TPS 신기록 달성",
      content: "솔라나 블록체인이 초당 거래 처리량(TPS) 신기록을 달성하며 높은 확장성을 입증했습니다.",
      source: "The Block",
      timestamp: "3시간 전",
      category: "SOL",
      trend: "up" as const,
    },
    {
      id: 5,
      title: "리플-SEC 소송 최종 판결 임박",
      content: "3년간 지속된 리플과 SEC간 법적 분쟁이 최종 판결을 앞두고 있어 시장의 관심이 집중되고 있습니다.",
      source: "CoinTelegraph",
      timestamp: "4시간 전",
      category: "XRP",
    },
    {
      id: 6,
      title: "글로벌 기업들의 비트코인 채택 가속화",
      content: "포춘 500대 기업 중 15%가 비트코인을 재무 자산으로 보유하고 있는 것으로 조사됐습니다.",
      source: "Forbes",
      timestamp: "5시간 전",
      category: "기업",
      trend: "up" as const,
    },
  ]

  return (
    <main className="min-h-screen pb-20">
      {/* Compact Header Section - Coinness 스타일 */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                실시간 뉴스
              </h1>
              <p className="text-sm text-muted-foreground">
                가장 빠른 크립토 뉴스를 확인하세요
              </p>
            </div>
          </div>

          {/* Top Coins Ticker - 깔끔한 카드 형태 */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {topCoins.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border transition-smooth hover:shadow-md hover:scale-105 cursor-pointer whitespace-nowrap min-w-[140px]"
              >
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                  <span className="text-sm font-bold">{coin.symbol}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">{coin.price}</span>
                  <span
                    className={`text-xs font-medium ${
                      coin.isUp ? "text-positive" : "text-negative"
                    }`}
                  >
                    {coin.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section - Sticky */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="btc">BTC</TabsTrigger>
              <TabsTrigger value="eth">ETH</TabsTrigger>
              <TabsTrigger value="defi">DeFi</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* News Feed */}
      <section className="container max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsData.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="btc" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsData
                .filter((news) => news.category === "BTC")
                .map((news) => (
                  <NewsCard key={news.id} {...news} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="eth" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {newsData
                .filter((news) => news.category === "ETH")
                .map((news) => (
                  <NewsCard key={news.id} {...news} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="defi" className="mt-0">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">DeFi 뉴스 준비 중입니다</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nft" className="mt-0">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">NFT 뉴스 준비 중입니다</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
