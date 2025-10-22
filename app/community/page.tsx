"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PostCard } from "@/components/community/post-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { 
  PenSquare, 
  Shield, 
  Users, 
  TrendingUp, 
  Award,
  MessageSquare,
  Flame,
  ThumbsUp,
  Eye,
  Image as ImageIcon,
  Video,
  Link2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Post {
  id: number
  category: string
  title: string
  author: string
  authorLevel?: string
  views: number
  likes: number
  dislikes: number
  comments: number
  createdAt: string
  isHot?: boolean
  hasImage?: boolean
  hasVideo?: boolean
  hasLink?: boolean
  thumbnail?: string
  content?: string
  timestamp?: string
}

function CommunityPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("hot")
  const [activeMainTab, setActiveMainTab] = useState("mindshare")

  // Read tab from URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "community1" || tab === "community2" || tab === "mindshare") {
      setActiveMainTab(tab)
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value)
    router.push(`/community?tab=${value}`, { scroll: false })
  }

  // 마인드쉐어 사용자 데이터
  const userMindshare = [
    {
      id: 1,
      rank: 1,
      username: "블록체인러버",
      avatar: "💎",
      points: 8540,
      posts: 156,
      likes: 2341,
      comments: 892,
      level: 45,
      badge: "Legend",
      change: "+234",
    },
    {
      id: 2,
      rank: 2,
      username: "DeFi멘토",
      avatar: "🚀",
      points: 7230,
      posts: 134,
      likes: 1987,
      comments: 756,
      level: 42,
      badge: "Master",
      change: "+189",
    },
    {
      id: 3,
      rank: 3,
      username: "테크기버",
      avatar: "⚡",
      points: 6890,
      posts: 98,
      likes: 1876,
      comments: 643,
      level: 40,
      badge: "Expert",
      change: "-45",
    },
    {
      id: 4,
      rank: 4,
      username: "NFT컬렉터",
      avatar: "🎨",
      points: 5670,
      posts: 87,
      likes: 1543,
      comments: 534,
      level: 38,
      badge: "Expert",
      change: "+98",
    },
    {
      id: 5,
      rank: 5,
      username: "트렌드헌터",
      avatar: "🔍",
      points: 4890,
      posts: 76,
      likes: 1234,
      comments: 456,
      level: 35,
      badge: "Advanced",
      change: "+67",
    },
    {
      id: 6,
      rank: 6,
      username: "알트왕",
      avatar: "👑",
      points: 4320,
      posts: 69,
      likes: 1089,
      comments: 398,
      level: 33,
      badge: "Advanced",
      change: "-89",
    },
    {
      id: 7,
      rank: 7,
      username: "차트마스터",
      avatar: "📊",
      points: 3780,
      posts: 52,
      likes: 876,
      comments: 321,
      level: 31,
      badge: "Advanced",
      change: "+23",
    },
    {
      id: 8,
      rank: 8,
      username: "코인러버",
      avatar: "⭐",
      points: 3210,
      posts: 45,
      likes: 745,
      comments: 287,
      level: 29,
      badge: "Intermediate",
      change: "-12",
    },
    {
      id: 9,
      rank: 9,
      username: "스테이킹맨",
      avatar: "🎯",
      points: 2890,
      posts: 41,
      likes: 634,
      comments: 245,
      level: 27,
      badge: "Intermediate",
      change: "+156",
    },
    {
      id: 10,
      rank: 10,
      username: "비트홀더",
      avatar: "🔥",
      points: 2560,
      posts: 38,
      likes: 589,
      comments: 219,
      level: 25,
      badge: "Intermediate",
      change: "-67",
    },
  ]

  // 커뮤니티1 데이터 (기존 커뮤니티)
  const community1Posts = [
    {
      id: 1,
      title: "비트코인 ETF 승인, 시장에 미칠 영향 분석",
      content: "비트코인 ETF 승인이 임박한 것으로 보입니다. 이번 승인이 시장에 미칠 영향을 다각도로 분석해봤습니다.",
      author: "블록체인러버",
      timestamp: "30분 전",
      category: "시장분석",
      likes: 245,
      comments: 67,
      views: 1248,
      isHot: true,
    },
    {
      id: 2,
      title: "솔라나 vs 이더리움, 2024년 전망은?",
      content: "올해 L1 블록체인 경쟁 구도를 살펴보면, 솔라나와 이더리움의 대결이 주목됩니다.",
      author: "DeFi멘토",
      timestamp: "1시간 전",
      category: "기술토론",
      likes: 189,
      comments: 43,
      views: 876,
      isHot: true,
    },
    {
      id: 3,
      title: "초보자를 위한 DeFi 시작 가이드",
      content: "DeFi에 입문하는 분들을 위해 기초부터 차근차근 설명드립니다.",
      author: "테크기버",
      timestamp: "2시간 전",
      category: "초보가이드",
      likes: 156,
      comments: 28,
      views: 634,
    },
  ]

  // 커뮤니티2 데이터
  const community2Posts: Post[] = [
    {
      id: 1,
      category: "자유",
      title: "장 ㅈ같으니 뻘글 씀",
      author: "비탈릭",
      authorLevel: "Lv.28",
      views: 3421,
      likes: 19,
      dislikes: 2,
      comments: 24,
      createdAt: "01:07",
      isHot: false,
    },
    {
      id: 2,
      category: "자유",
      title: "리플) 15분봉",
      author: "으랴챳차",
      authorLevel: "Lv.42",
      views: 2841,
      likes: 15,
      dislikes: 3,
      comments: 4,
      createdAt: "23:53",
      hasImage: true,
    },
    {
      id: 3,
      category: "자유",
      title: "실시간 비트 청산맵",
      author: "속초너구리",
      authorLevel: "Lv.35",
      views: 5123,
      likes: 30,
      dislikes: 1,
      comments: 9,
      createdAt: "00:31",
      hasImage: true,
      isHot: true,
    },
    {
      id: 4,
      category: "자유",
      title: "오케이, 차트 분석완료",
      author: "닉넴짓기귀찮아",
      authorLevel: "Lv.31",
      views: 4523,
      likes: 29,
      dislikes: 2,
      comments: 8,
      createdAt: "20:35",
      hasImage: true,
    },
    {
      id: 5,
      category: "자유",
      title: "10.22 대충뉴스",
      author: "대충뉴스",
      authorLevel: "Lv.44",
      views: 3912,
      likes: 22,
      dislikes: 1,
      comments: 11,
      createdAt: "20:32",
    },
    {
      id: 6,
      category: "자유",
      title: "비트) 1시간봉",
      author: "으랴챳차",
      authorLevel: "Lv.42",
      views: 3234,
      likes: 18,
      dislikes: 2,
      comments: 14,
      createdAt: "19:55",
      hasImage: true,
    },
    {
      id: 7,
      category: "자유",
      title: "실패한 투자자의 저녁",
      author: "설렘덩크",
      authorLevel: "Lv.29",
      views: 8456,
      likes: 46,
      dislikes: 4,
      comments: 29,
      createdAt: "19:36",
      hasImage: true,
      isHot: true,
    },
    {
      id: 8,
      category: "자유",
      title: '에릭트럼프 "간과 신장을 팔더라도 BTC매수해라"',
      author: "BIGLONG",
      authorLevel: "Lv.38",
      views: 9823,
      likes: 33,
      dislikes: 7,
      comments: 37,
      createdAt: "18:31",
      isHot: true,
    },
    {
      id: 9,
      category: "자유",
      title: "나는 왜 주식하러 안가냐고?",
      author: "Bitcoin",
      authorLevel: "Lv.40",
      views: 5621,
      likes: 15,
      dislikes: 2,
      comments: 30,
      createdAt: "17:46",
    },
    {
      id: 10,
      category: "자유",
      title: "기분안좋을땐",
      author: "욜라뽕따르맨",
      authorLevel: "Lv.25",
      views: 2734,
      likes: 20,
      dislikes: 1,
      comments: 4,
      createdAt: "17:25",
    },
    {
      id: 11,
      category: "정보/뉴스",
      title: "어젯밤 상승은 바이낸스의 조작이었다?!",
      author: "animoc",
      authorLevel: "Lv.47",
      views: 12456,
      likes: 38,
      dislikes: 5,
      comments: 18,
      createdAt: "17:22",
      isHot: true,
    },
    {
      id: 12,
      category: "자유",
      title: "내부자 찌라시 관련 정보(10.18)",
      author: "mocoro",
      authorLevel: "Lv.36",
      views: 15823,
      likes: 53,
      dislikes: 8,
      comments: 20,
      createdAt: "16:50",
      isHot: true,
    },
    {
      id: 13,
      category: "자유",
      title: "1-30추 5명 메가아아",
      author: "온톨로지가스",
      authorLevel: "Lv.33",
      views: 4123,
      likes: 20,
      dislikes: 3,
      comments: 54,
      createdAt: "16:33",
      isHot: true,
    },
    {
      id: 14,
      category: "자유",
      title: "이더리움 차트분석 new",
      author: "고윤덩",
      authorLevel: "Lv.41",
      views: 7234,
      likes: 42,
      dislikes: 2,
      comments: 21,
      createdAt: "15:50",
      hasImage: true,
      isHot: true,
    },
    {
      id: 15,
      category: "자유",
      title: "트럼프 죽을 때 존나 고통스럽게 죽길",
      author: "majel",
      authorLevel: "Lv.22",
      views: 6789,
      likes: 32,
      dislikes: 18,
      comments: 12,
      createdAt: "14:59",
    },
    {
      id: 16,
      category: "자유",
      title: "올해 불장 안온다고 생각하는 사람 들어와보셈",
      author: "타시터스킬고어",
      authorLevel: "Lv.37",
      views: 8234,
      likes: 24,
      dislikes: 9,
      comments: 16,
      createdAt: "14:54",
    },
  ]

  return (
    <main className="min-h-screen pb-20 no-horizontal-scroll">
      {/* Header */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                커뮤니티
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                암호화폐 투자자들과 정보를 공유하고 소통하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
            <TabsTrigger value="mindshare" className="text-sm sm:text-base">
              <Award className="h-4 w-4 mr-2" />
              마인드쉐어
            </TabsTrigger>
            <TabsTrigger value="community1" className="text-sm sm:text-base">
              <MessageSquare className="h-4 w-4 mr-2" />
              커뮤니티1
            </TabsTrigger>
            <TabsTrigger value="community2" className="text-sm sm:text-base">
              <Flame className="h-4 w-4 mr-2" />
              커뮤니티2
            </TabsTrigger>
          </TabsList>

          {/* Mindshare Tab */}
          <TabsContent value="mindshare" className="mt-0">
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-2 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                      <Award className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">커뮤니티 마인드쉐어</h2>
                      <p className="text-muted-foreground mb-4">
                        사용자들의 활동 포인트를 기반으로 커뮤니티 기여도를 측정합니다
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-500" />
                          <span>활성 사용자: <strong>1,234명</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-500" />
                          <span>오늘 포스트: <strong>89개</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treemap Visualization */}
              <Card>
                <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-base sm:text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      마인드쉐어 트리맵
                    </span>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-positive"></div>
                        <span>상승</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded" style={{ backgroundColor: "hsl(215, 20%, 60%)" }}></div>
                        <span>보합</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-negative"></div>
                        <span>하락</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <ResponsiveContainer width="100%" height={500}>
                    <Treemap
                      data={userMindshare.map(user => ({
                        name: user.username,
                        size: user.points,
                        percentage: ((user.points / userMindshare.reduce((sum, u) => sum + u.points, 0)) * 100).toFixed(2),
                        change: parseInt(user.change.replace('+', '')),
                        badge: user.badge,
                        posts: user.posts,
                        likes: user.likes,
                        level: user.level,
                      }))}
                      dataKey="size"
                      aspectRatio={4 / 3}
                      stroke="hsl(var(--background))"
                      fill="hsl(var(--primary))"
                      content={(props: any) => {
                        const { x, y, width, height, name, percentage, change } = props
                        
                        if (width < 70 || height < 50) return <g />

                        // 텍스트 길이를 박스 너비에 맞게 조정
                        const getDisplayName = (text: string, boxWidth: number) => {
                          const maxChars = boxWidth > 150 ? 15 : boxWidth > 100 ? 10 : 8
                          return text.length > maxChars ? text.substring(0, maxChars - 1) + "..." : text
                        }

                        // 변화량에 따른 색상 (Top Gainers/Losers 스타일)
                        const getColor = (changeValue: number) => {
                          if (changeValue > 150) return "hsl(158, 64%, 42%)" // 진한 상승
                          if (changeValue > 50) return "hsl(158, 64%, 52%)" // 상승
                          if (changeValue > 0) return "hsl(158, 64%, 62%)" // 약한 상승
                          if (changeValue < -150) return "hsl(0, 84%, 50%)" // 진한 하락
                          if (changeValue < -50) return "hsl(0, 84%, 60%)" // 하락
                          if (changeValue < 0) return "hsl(0, 84%, 70%)" // 약한 하락
                          return "hsl(215, 20%, 60%)" // 보합
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
                            {/* 유저 이름 */}
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
                      }}
                    >
                      <Tooltip
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <Card className="p-4 shadow-lg">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="font-bold text-lg">{data.name}</p>
                                    <Badge className="text-xs">
                                      {data.badge}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1 text-sm">
                                    <p className="text-muted-foreground">
                                      <span className="font-semibold text-foreground">포인트:</span> {data.size.toLocaleString()}
                                    </p>
                                    <p className="text-muted-foreground">
                                      <span className="font-semibold text-foreground">점유율:</span> {data.percentage}%
                                    </p>
                                    <p className="text-muted-foreground">
                                      <span className="font-semibold text-foreground">레벨:</span> Lv.{data.level}
                                    </p>
                                    <p className="text-muted-foreground">
                                      <span className="font-semibold text-foreground">글:</span> {data.posts}개
                                    </p>
                                    <p className="text-muted-foreground">
                                      <span className="font-semibold text-foreground">좋아요:</span> {data.likes.toLocaleString()}
                                    </p>
                                    <p className={cn(
                                      "font-semibold",
                                      data.change > 0 ? "text-positive" : data.change < 0 ? "text-negative" : ""
                                    )}>
                                      변화: {data.change > 0 ? "+" : ""}{data.change}
                                    </p>
                                  </div>
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

              {/* Top Users Ranking */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b-2 border-border">
                        <tr className="text-xs font-semibold text-muted-foreground">
                          <th className="text-center px-3 py-3 w-16">순위</th>
                          <th className="text-left px-3 py-3">사용자</th>
                          <th className="text-center px-3 py-3">포인트</th>
                          <th className="text-center px-3 py-3">글</th>
                          <th className="text-center px-3 py-3">좋아요</th>
                          <th className="text-center px-3 py-3">댓글</th>
                          <th className="text-center px-3 py-3">변화</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userMindshare.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-border hover:bg-muted/50 transition-colors"
                          >
                            <td className="text-center px-3 py-4">
                              <div className="flex items-center justify-center">
                                {user.rank <= 3 ? (
                                  <Award className={cn(
                                    "h-5 w-5",
                                    user.rank === 1 && "text-yellow-500",
                                    user.rank === 2 && "text-gray-400",
                                    user.rank === 3 && "text-orange-700"
                                  )} />
                                ) : (
                                  <span className="text-sm font-semibold">{user.rank}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{user.avatar}</div>
                                <div>
                                  <div className="font-semibold">{user.username}</div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>Lv.{user.level}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {user.badge}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-center px-3 py-4">
                              <span className="font-bold text-purple-500">
                                {user.points.toLocaleString()}
                              </span>
                            </td>
                            <td className="text-center px-3 py-4 text-sm">
                              {user.posts}
                            </td>
                            <td className="text-center px-3 py-4 text-sm">
                              {user.likes.toLocaleString()}
                            </td>
                            <td className="text-center px-3 py-4 text-sm">
                              {user.comments}
                            </td>
                            <td className="text-center px-3 py-4">
                              <Badge variant="outline" className="bg-positive/10 text-positive border-positive/20">
                                {user.change}
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
          </TabsContent>

          {/* Community1 Tab */}
          <TabsContent value="community1" className="mt-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {Object.entries({
                  hot: "🔥 인기글",
                  recent: "최신글",
                }).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(key)}
                    className="text-xs sm:text-sm"
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <Button size="sm">
                <PenSquare className="w-4 h-4 mr-1.5" />
                글쓰기
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {community1Posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      {post.isHot && (
                        <Badge variant="destructive" className="text-xs">HOT</Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{post.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
            </div>
          </div>
        </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-2 border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">커뮤니티 가이드</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 투자 권유나 특정 코인 추천 게시글은 제한될 수 있습니다</li>
                      <li>• 상호 존중하는 대화 문화를 만들어주세요</li>
                      <li>• 근거 없는 루머나 허위 정보 유포는 삼가주세요</li>
                    </ul>
                  </div>
        </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community2 Tab */}
          <TabsContent value="community2" className="mt-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {Object.entries({
                  hot: "🔥 인기글",
                  recent: "최신글",
                }).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(key)}
                    className="text-xs sm:text-sm"
                  >
                    {label}
                  </Button>
                ))}
            </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <PenSquare className="w-4 h-4 mr-1.5" />
                글쓰기
              </Button>
        </div>

            {/* Desktop Table View */}
            <Card className="overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b-2 border-border">
                    <tr className="text-xs font-semibold text-muted-foreground">
                      <th className="text-center px-3 py-3 w-20">번호</th>
                      <th className="text-center px-3 py-3 w-24">분류</th>
                      <th className="text-left px-3 py-3">제목</th>
                      <th className="text-center px-3 py-3 w-28">글쓴이</th>
                      <th className="text-center px-3 py-3 w-20">조회</th>
                      <th className="text-center px-3 py-3 w-20">추천</th>
                      <th className="text-center px-3 py-3 w-32">작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {community2Posts
                      .filter((post) => activeTab === "hot" ? post.isHot : true)
                      .map((post, index) => (
                      <tr
                        key={post.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <td className="text-center px-3 py-3 text-sm text-muted-foreground">
                          {post.id}
                        </td>
                        <td className="text-center px-3 py-3">
                          <Badge variant="outline" className="text-xs font-semibold">
                            {post.category}
                          </Badge>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            {(post.hasImage || post.hasVideo) && (
                              <div className="w-10 h-10 shrink-0 rounded overflow-hidden bg-muted flex items-center justify-center border">
                                {post.hasImage && (
                                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                )}
                                {post.hasVideo && (
                                  <Video className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            )}
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {post.isHot && (
                                <Badge variant="destructive" className="text-xs px-1.5 py-0 shrink-0">
                                  HOT
                                </Badge>
                              )}
                              <span className="font-medium hover:underline line-clamp-1">
                                {post.title}
                              </span>
                              <span className="text-orange-500 font-semibold text-sm shrink-0">
                                [{post.comments}]
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-3 py-3">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-sm font-medium">{post.author}</span>
                            {post.authorLevel && (
                              <span className="text-xs text-muted-foreground">
                                {post.authorLevel}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="text-center px-3 py-3 text-sm text-muted-foreground">
                          {post.views.toLocaleString()}
                        </td>
                        <td className="text-center px-3 py-3">
                          <span className="text-sm font-semibold text-positive">
                            {post.likes}
                          </span>
                        </td>
                        <td className="text-center px-3 py-3 text-xs text-muted-foreground">
                          {post.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mobile List View */}
            <div className="md:hidden space-y-0">
              {community2Posts
                .filter((post) => activeTab === "hot" ? post.isHot : true)
                .map((post) => (
                <div
                  key={post.id}
                  className="bg-card border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="p-3">
                    <div className="flex gap-3">
                      {/* 썸네일 */}
                      {(post.hasImage || post.hasVideo) && (
                        <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-muted flex items-center justify-center border">
                          {post.hasImage && (
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          )}
                          {post.hasVideo && (
                            <Video className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                      )}
                      
                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        {/* 제목 + 댓글수 */}
                        <div className="flex items-start gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            {post.isHot && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0 shrink-0">
                                HOT
                              </Badge>
                            )}
                            <span className="font-medium text-sm line-clamp-2 break-all">
                              {post.title}
                            </span>
                          </div>
                          <span className="text-orange-500 font-semibold text-sm shrink-0">
                            [{post.comments}]
                          </span>
                        </div>
                        
                        {/* 작성시간 / 닉네임 / 추천 */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.createdAt}</span>
                          <span>·</span>
                          <span className="font-medium text-foreground">{post.author}</span>
                          <span>·</span>
                          <span className="text-positive font-semibold">추천 {post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Flame className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold mb-1">💡 커뮤니티 이용 안내</p>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• 비방, 욕설, 도배 등의 글은 통보 없이 삭제됩니다</li>
                      <li>• 저작권을 침해하는 게시물은 삭제 및 법적 조치가 취해질 수 있습니다</li>
                      <li>• 건전한 커뮤니티 문화를 위해 서로 배려해주세요</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CommunityPageContent />
    </Suspense>
  )
}
