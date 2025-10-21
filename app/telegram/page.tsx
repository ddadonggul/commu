"use client"

import { useState } from "react"
import { ChannelCard } from "@/components/telegram/channel-card"
import { MindshareStats } from "@/components/telegram/mindshare-stats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react"

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
      name: "🐷따돈꿀메롱",
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

  // Top Gainers and Losers
  const sortedByChange = [...channelsData].sort((a, b) => (b.scoreChange || 0) - (a.scoreChange || 0))
  const topGainers = sortedByChange.slice(0, 10)
  const topLosers = sortedByChange.slice(-10).reverse()

  // Treemap 데이터 준비
  const treemapData = channelsData.map((ch) => ({
    name: ch.name,
    size: ch.score,
    percentage: ((ch.score / totalScore) * 100).toFixed(2),
    change: ch.scoreChange || 0,
    category: ch.category,
  }))

  // 색상 함수
  const getColor = (change: number) => {
    if (change > 1000) return "hsl(142, 76%, 36%)" // positive (green)
    if (change > 0) return "hsl(142, 76%, 56%)" // light positive
    if (change < -1000) return "hsl(346, 87%, 43%)" // negative (red)
    if (change < 0) return "hsl(346, 87%, 63%)" // light negative
    return "hsl(215, 20%, 65%)" // neutral
  }

  // Custom Treemap Content
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, percentage, change } = props
    
    if (width < 60 || height < 40) return null

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getColor(change),
            stroke: "hsl(var(--background))",
            strokeWidth: 2,
            opacity: 0.9,
          }}
          className="transition-all hover:opacity-100"
        />
        {/* Text shadow for better readability */}
        <text
          x={x + width / 2}
          y={y + height / 2 - 8}
          textAnchor="middle"
          fill="white"
          fontSize={width > 120 ? 14 : 11}
          fontWeight="700"
          className="pointer-events-none"
          style={{
            paintOrder: "stroke",
            stroke: "rgba(0, 0, 0, 0.5)",
            strokeWidth: "3px",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        >
          {name.length > 15 ? name.substring(0, 12) + "..." : name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="white"
          fontSize={width > 120 ? 18 : 14}
          fontWeight="900"
          className="pointer-events-none"
          style={{
            paintOrder: "stroke",
            stroke: "rgba(0, 0, 0, 0.6)",
            strokeWidth: "4px",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        >
          {percentage}%
        </text>
        {width > 100 && height > 60 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 28}
            textAnchor="middle"
            fill="white"
            fontSize={11}
            fontWeight="600"
            className="pointer-events-none"
            style={{
              paintOrder: "stroke",
              stroke: "rgba(0, 0, 0, 0.5)",
              strokeWidth: "2.5px",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          >
            {change > 0 ? "+" : ""}{change}
          </text>
        )}
      </g>
    )
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                텔레그램 마인드쉐어 아레나
              </h1>
              <p className="text-sm text-muted-foreground">
                실시간 텔레그램 채널 영향력 측정 및 순위
              </p>
            </div>
            
            {/* Period Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">기간:</span>
              <div className="inline-flex rounded-xl bg-secondary/10 border border-secondary/20 p-1">
                {(["7d", "30d", "90d"] as Period[]).map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod(period)}
                    className={`rounded-lg text-xs font-bold transition-all ${
                      activePeriod === period
                        ? "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
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
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Tables */}
          <div className="lg:col-span-4 space-y-6">
            {/* Top Gainers */}
            <Card className="border-positive/20 bg-positive/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-positive" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-card border-b">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-right p-3 font-semibold">Score</th>
                        <th className="text-right p-3 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGainers.map((channel, idx) => (
                        <tr
                          key={channel.id}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground font-mono w-5">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-medium truncate">
                                {channel.name.length > 12
                                  ? channel.name.substring(0, 12) + "..."
                                  : channel.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-right p-3 text-sm font-semibold">
                            {channel.score.toLocaleString()}
                          </td>
                          <td className="text-right p-3">
                            <Badge variant="outline" className="bg-positive/10 text-positive border-positive/20">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              +{channel.scoreChange}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Losers */}
            <Card className="border-negative/20 bg-negative/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingDown className="h-5 w-5 text-negative" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-card border-b">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-right p-3 font-semibold">Score</th>
                        <th className="text-right p-3 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topLosers.map((channel, idx) => (
                        <tr
                          key={channel.id}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground font-mono w-5">
                                {idx + 1}
                              </span>
                              <span className="text-sm font-medium truncate">
                                {channel.name.length > 12
                                  ? channel.name.substring(0, 12) + "..."
                                  : channel.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-right p-3 text-sm font-semibold">
                            {channel.score.toLocaleString()}
                          </td>
                          <td className="text-right p-3">
                            <Badge variant="outline" className="bg-negative/10 text-negative border-negative/20">
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                              {channel.scoreChange}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Treemap Visualization */}
          <div className="lg:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>마인드쉐어 시각화</span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-positive"></div>
                      <span>상승</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-negative"></div>
                      <span>하락</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={600}>
                  <Treemap
                    data={treemapData}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="hsl(var(--background))"
                    fill="hsl(var(--primary))"
                    content={<CustomizedContent />}
                  >
                    <Tooltip
                      content={({ active, payload }: any) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <Card className="p-3 shadow-lg">
                              <div className="space-y-1">
                                <p className="font-semibold">{data.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Score: {data.size.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Share: {data.percentage}%
                                </p>
                                <p className={`text-sm font-semibold ${
                                  data.change > 0 ? "text-positive" : data.change < 0 ? "text-negative" : ""
                                }`}>
                                  Change: {data.change > 0 ? "+" : ""}{data.change}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {data.category}
                                </Badge>
                              </div>
                            </Card>
                          )
                        }
                        return null
                      }}
                    />
                  </Treemap>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Channel List Below */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">전체 채널 목록</h2>
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
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

        <div className="space-y-3">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} {...channel} />
          ))}
        </div>
        </div>
      </section>
    </main>
  )
}
