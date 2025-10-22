"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChannelCard } from "@/components/telegram/channel-card"
import { MindshareStats } from "@/components/telegram/mindshare-stats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight, Eye, MessageCircle, ThumbsUp, ExternalLink } from "lucide-react"

type Period = "7d" | "30d" | "90d"

function TelegramPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activePeriod, setPeriod] = useState<Period>("7d")
  const [activeCategory, setCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("mindshare")

  // Read tab from URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "posts" || tab === "mindshare") {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/telegram?tab=${value}`, { scroll: false })
  }

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
      scoreChange: -450,
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
      scoreChange: -120,
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
      scoreChange: -680,
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
      scoreChange: -1600,
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

  // 텔레그램 포스팅 데이터 (사진 참고)
  const telegramPosts = [
    {
      id: 1,
      channel: "Four Pillars Research (KR)",
      channelHandle: "@FourPillarsKR",
      avatar: "🏛️",
      content: ":: [레퍼럴] 서울역3가역/디파이/디에엑스 프리미엄가 스캘피트코인 전략 세비나를 개최합니다.",
      timestamp: "10-22 11:11",
      views: 6020,
      reactions: 35,
      comments: 1,
      category: "공지",
    },
    {
      id: 2,
      channel: "평민의 암경필",
      channelHandle: "@pm_nocoing",
      avatar: "👤",
      content: "오르시면 전력 투자로 정답21 100억 이상을 고침하고 트가 긁을 획득시 안판고 있다",
      timestamp: "10-22 10:58",
      views: 2898,
      reactions: 47,
      comments: 1,
      category: "시장분석",
    },
    {
      id: 3,
      channel: "토스페이",
      channelHandle: "@investgoldm",
      avatar: "🪙",
      content: "Keycard 앱라이센스등록\n\nAl 에이전트 전용 신앱 발급 타인의 인프라 Keycard가 A16Z, AcrlwrS에서 투자받은건 이.",
      timestamp: "10-22 09:43",
      views: 4823,
      reactions: 133,
      comments: 1,
      category: "정보",
    },
    {
      id: 4,
      channel: "슬기로운 HODL생활",
      channelHandle: "@GLdL1ur_hodl_life",
      avatar: "💎",
      content: "아직 토르멜든틀 은년나 이행하는 관계 얄박한 보건 김창하턱면 관배릉을 인나보고 내기토르모는 트는어담.",
      timestamp: "10-22 10:43",
      views: 1814,
      reactions: 13,
      comments: 1,
      category: "커뮤니티",
    },
    {
      id: 5,
      channel: "Mrn onchain",
      channelHandle: "@mrmonchain",
      avatar: "⛓️",
      content: "The BTC whale shorted more and is now short 2000 BTC ($225M).",
      timestamp: "10-22 02:07",
      views: 14485,
      reactions: 196,
      comments: 0,
      category: "온체인",
    },
    {
      id: 6,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "https://t.me/+618LFwI02M4ZGZI\n\n송금만 시키고 살아 침출으로 공개 캐릭팅 인들웹시고라닙다",
      timestamp: "10-22 02:10",
      views: 80,
      reactions: 0,
      comments: 0,
      category: "링크",
    },
    {
      id: 7,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "다음주께지는 먹냉 먹은대까지 대에에서 아예 가중 응앤냩 사기가 약냉 합니다",
      timestamp: "10-22 02:04",
      views: 79,
      reactions: 0,
      comments: 0,
      category: "일반",
    },
    {
      id: 8,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "먼동성 수준이 리토스텔시 감각 물고끔 로위기눈 아년기 깐습니다",
      timestamp: "10-22 02:03",
      views: 79,
      reactions: 0,
      comments: 0,
      category: "일반",
    },
    {
      id: 9,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "4시간복 팍두까는 먹 텀경게기 검열라곤나",
      timestamp: "10-22 05:27",
      views: 77,
      reactions: 0,
      comments: 0,
      category: "일반",
    },
    {
      id: 10,
      channel: "비나나유물 밀기정",
      channelHandle: "@nanamankkuch",
      avatar: "🍌",
      content: "오프풋낯 저작력 바이액, 으토도7!\n\n오프풋낯의 가접 수준 기관 $OPEN 토르 바이액 프르그램은 저작력의 진저웨다간 먹수이었느납다.",
      timestamp: "10-22 15:13",
      views: 5206,
      reactions: 2,
      comments: 1,
      category: "에어드랍",
    },
    {
      id: 11,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "초을 분펀 억웹 생각저 자리에 도트겁씀니다러니다",
      timestamp: "10-22 09:37",
      views: 70,
      reactions: 0,
      comments: 0,
      category: "일반",
    },
    {
      id: 12,
      channel: "HBOX",
      channelHandle: "@hbooxxx",
      avatar: "📦",
      content: "어건 으뢰 감은 사금 갈기웹 급뇹니다",
      timestamp: "10-22 08:37",
      views: 70,
      reactions: 0,
      comments: 0,
      category: "일반",
    },
  ]

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

  // 색상 함수 (Top Gainers/Losers 스타일)
  const getColor = (change: number) => {
    if (change > 1500) return "hsl(158, 64%, 42%)" // 진한 상승
    if (change > 500) return "hsl(158, 64%, 52%)" // 상승
    if (change > 0) return "hsl(158, 64%, 62%)" // 약한 상승
    if (change < -1500) return "hsl(0, 84%, 50%)" // 진한 하락
    if (change < -500) return "hsl(0, 84%, 60%)" // 하락
    if (change < 0) return "hsl(0, 84%, 70%)" // 약한 하락
    return "hsl(215, 20%, 60%)" // 보합
  }

  // Custom Treemap Content
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, percentage, change } = props
    
    if (width < 70 || height < 50) return <g />

    // 텍스트 길이를 박스 너비에 맞게 조정
    const getDisplayName = (text: string, boxWidth: number) => {
      const maxChars = boxWidth > 150 ? 15 : boxWidth > 100 ? 10 : 8
      return text.length > maxChars ? text.substring(0, maxChars - 1) + "..." : text
    }

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
        {/* 채널명 */}
        <text
          x={x + width / 2}
          y={y + height / 2 - 10}
          textAnchor="middle"
          fill="white"
          fontSize={width > 150 ? 16 : width > 100 ? 14 : 12}
          fontWeight="700"
          className="pointer-events-none"
          style={{
            paintOrder: "stroke",
            stroke: "rgba(0, 0, 0, 0.6)",
            strokeWidth: "4px",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        >
          {getDisplayName(name, width)}
        </text>
        {/* 점유율 */}
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="white"
          fontSize={width > 150 ? 15 : width > 100 ? 13 : 11}
          fontWeight="700"
          className="pointer-events-none"
          style={{
            paintOrder: "stroke",
            stroke: "rgba(0, 0, 0, 0.6)",
            strokeWidth: "3px",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }}
        >
          {percentage}%
        </text>
        {/* 변화량 */}
        {width > 100 && height > 70 && (
          <text
            x={x + width / 2}
            y={y + height / 2 + 28}
            textAnchor="middle"
            fill="white"
            fontSize={width > 150 ? 13 : 11}
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
    <main className="min-h-screen pb-20 no-horizontal-scroll">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                텔레그램 인사이트
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                실시간 텔레그램 채널 영향력 측정 및 최신 포스팅
              </p>
            </div>
            
            {/* Period Filter */}
            {activeTab === "mindshare" && (
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-muted-foreground whitespace-nowrap">기간:</span>
                <div className="inline-flex rounded-xl bg-secondary/10 border border-secondary/20 p-1">
                  {(["7d", "30d", "90d"] as Period[]).map((period) => (
                    <Button
                      key={period}
                      variant="ghost"
                      size="sm"
                      onClick={() => setPeriod(period)}
                      className={`rounded-lg text-xs sm:text-sm font-bold transition-all touch-target ${
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
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="mindshare" className="text-sm sm:text-base">
              마인드쉐어
            </TabsTrigger>
            <TabsTrigger value="posts" className="text-sm sm:text-base">
              포스팅
            </TabsTrigger>
          </TabsList>

          {/* Mindshare Tab */}
          <TabsContent value="mindshare" className="mt-0">

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Tables */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Top Gainers */}
            <Card className="border-positive/20 bg-positive/5">
              <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-positive" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[280px] overflow-y-auto mobile-table-wrapper scrollbar-hide">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-card border-b z-10">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left p-2 sm:p-3 font-semibold">Name</th>
                        <th className="text-right p-2 sm:p-3 font-semibold">Score</th>
                        <th className="text-right p-2 sm:p-3 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topGainers.map((channel, idx) => (
                        <tr
                          key={channel.id}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors touch-target"
                        >
                          <td className="p-2 sm:p-3">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="text-xs text-muted-foreground font-mono w-4 sm:w-5">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-medium truncate">
                                {channel.name.length > (window.innerWidth < 640 ? 8 : 12)
                                  ? channel.name.substring(0, window.innerWidth < 640 ? 8 : 12) + "..."
                                  : channel.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-right p-2 sm:p-3 text-xs sm:text-sm font-semibold">
                            {channel.score.toLocaleString()}
                          </td>
                          <td className="text-right p-2 sm:p-3">
                            <Badge variant="outline" className="bg-positive/10 text-positive border-positive/20 text-xs">
                              <ArrowUpRight className="h-3 w-3 mr-0.5 sm:mr-1" />
                              <span className="hidden sm:inline">+</span>{channel.scoreChange}
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
              <CardHeader className="pb-3 px-3 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-negative" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[280px] overflow-y-auto mobile-table-wrapper scrollbar-hide">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-card border-b z-10">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left p-2 sm:p-3 font-semibold">Name</th>
                        <th className="text-right p-2 sm:p-3 font-semibold">Score</th>
                        <th className="text-right p-2 sm:p-3 font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topLosers.map((channel, idx) => (
                        <tr
                          key={channel.id}
                          className="border-b border-border/50 hover:bg-muted/50 transition-colors touch-target"
                        >
                          <td className="p-2 sm:p-3">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="text-xs text-muted-foreground font-mono w-4 sm:w-5">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-medium truncate">
                                {channel.name.length > (window.innerWidth < 640 ? 8 : 12)
                                  ? channel.name.substring(0, window.innerWidth < 640 ? 8 : 12) + "..."
                                  : channel.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-right p-2 sm:p-3 text-xs sm:text-sm font-semibold">
                            {channel.score.toLocaleString()}
                          </td>
                          <td className="text-right p-2 sm:p-3">
                            <Badge variant="outline" className="bg-negative/10 text-negative border-negative/20 text-xs">
                              <ArrowDownRight className="h-3 w-3 mr-0.5 sm:mr-1" />
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
              <CardHeader className="px-3 sm:px-6 pt-4 sm:pt-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-base sm:text-lg">마인드쉐어 시각화</span>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-positive"></div>
                      <span>상승</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-negative"></div>
                      <span>하락</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
                <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 400 : 600}>
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
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">전체 채널 목록</h2>
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide mb-3 sm:mb-4">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.value)}
                className="rounded-xl whitespace-nowrap touch-target text-xs sm:text-sm"
              >
                {cat.label}
                <Badge
                  variant="secondary"
                  className="ml-1.5 sm:ml-2 bg-primary-50 text-primary text-xs"
                >
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
          <div className="md:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {filteredChannels.map((channel) => (
              <div key={channel.id} className="min-w-[85vw] max-w-[85vw] snap-start">
                <ChannelCard {...channel} />
              </div>
            ))}
          </div>
          <div className="hidden md:block space-y-2 sm:space-y-3">
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} {...channel} />
            ))}
          </div>
        </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold">실시간 포스팅</h2>
                <Badge variant="secondary">최신순</Badge>
              </div>

              {/* Mobile: Horizontal scroll, Desktop: Grid */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {telegramPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="min-w-[85vw] max-w-[85vw] snap-start hover:shadow-lg transition-shadow border-2"
                  >
                    <CardHeader className="pb-3 px-4 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{post.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm line-clamp-1">{post.channel}</h3>
                          <p className="text-xs text-muted-foreground">{post.channelHandle}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {post.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-3">
                      <p className="text-sm leading-relaxed line-clamp-4">{post.content}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{post.reactions}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        텔레그램에서 보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop: Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {telegramPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-lg transition-shadow border-2 flex flex-col"
                  >
                    <CardHeader className="pb-3 px-4 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{post.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm line-clamp-1">{post.channel}</h3>
                          <p className="text-xs text-muted-foreground">{post.channelHandle}</p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {post.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-3 flex-1 flex flex-col">
                      <p className="text-sm leading-relaxed line-clamp-4 flex-1">{post.content}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{post.reactions}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        텔레그램에서 보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default function TelegramPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <TelegramPageContent />
    </Suspense>
  )
}
