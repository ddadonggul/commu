"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AirdropCard } from "@/components/airdrops/airdrop-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, TrendingUp, Coins, Calendar, ExternalLink } from "lucide-react"

function AirdropsPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")
  const [activeMainTab, setActiveMainTab] = useState("airdrops")

  // Read tab from URL query parameter
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "binance-alpha" || tab === "profit-calendar" || tab === "airdrops") {
      setActiveMainTab(tab)
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value)
    router.push(`/airdrops?tab=${value}`, { scroll: false })
  }

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
      title: "Uniswap 에어드랍",
      description: "Uniswap V4 출시를 기념하여 초기 유동성 공급자와 거래자를 대상으로 UNI 토큰을 에어드랍합니다.",
      reward: "최대 400 UNI",
      endDate: "2024.11.30",
      participants: 89450,
      status: "active" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/12504/small/uni.jpg",
      tokenSymbol: "UNI",
    },
    {
      id: 3,
      title: "Avalanche 에어드랍",
      description: "Avalanche Subnet을 배포하거나 개발에 기여한 개발자들을 위한 특별 AVAX 에어드랍 프로그램입니다.",
      reward: "500 AVAX",
      endDate: "2024.10.25",
      participants: 12890,
      status: "active" as const,
      thumbnail: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
      tokenSymbol: "AVAX",
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
                에어드랍 & 수익 관리
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                최신 에어드랍 정보와 바이낸스 알파, 수익 관리까지 한눈에
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
            <TabsTrigger value="airdrops" className="text-sm sm:text-base">
              <Sparkles className="h-4 w-4 mr-2" />
              에어드랍
            </TabsTrigger>
            <TabsTrigger value="binance-alpha" className="text-sm sm:text-base">
              <TrendingUp className="h-4 w-4 mr-2" />
              바이낸스 알파
            </TabsTrigger>
            <TabsTrigger value="profit-calendar" className="text-sm sm:text-base">
              <Calendar className="h-4 w-4 mr-2" />
              수익 캘린더
            </TabsTrigger>
          </TabsList>

          {/* Airdrops Tab */}
          <TabsContent value="airdrops" className="mt-0">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide mb-6">
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
          </TabsContent>

          {/* Binance Alpha Tab */}
          <TabsContent value="binance-alpha" className="mt-0">
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent border-2 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
                      <Coins className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">바이낸스 알파 프로젝트</h2>
                      <p className="text-muted-foreground mb-4">
                        바이낸스에서 선정한 유망 프로젝트들을 확인하고 조기 투자 기회를 잡으세요
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-yellow-500" />
                          <span>이번 주: <strong>5개 프로젝트</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-yellow-500" />
                          <span>평균 ROI: <strong>+245%</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alpha Projects Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">신규</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">AI</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Render Network (RNDR)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        분산형 GPU 렌더링 네트워크. AI 학습과 3D 렌더링에 특화
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$8.45</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+12.5%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">HOT</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">DeFi</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Pendle Finance (PENDLE)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        수익률 토큰화 프로토콜. 미래 수익을 거래 가능하게 만듦
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$6.23</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+8.7%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">신규</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">GameFi</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Pixels (PIXEL)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        오픈월드 농장 게임. Ronin 체인 기반 Web3 게임
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$0.45</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+15.3%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">추천</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">Layer2</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Manta Network (MANTA)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        모듈형 Layer 2 솔루션. ZK 기술 기반 프라이버시 보호
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$2.87</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+6.2%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">HOT</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">Meme</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Bonk (BONK)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        솔라나 기반 밈코인. 강력한 커뮤니티와 유틸리티 확장
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$0.000032</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+23.4%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-2 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">신규</Badge>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">SocialFi</Badge>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-bold text-lg mb-2">Friend.tech (FRIEND)</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        소셜 토큰 거래 플랫폼. 크리에이터 경제의 새로운 패러다임
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">현재가: </span>
                          <span className="font-semibold">$1.23</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">24h: </span>
                          <span className="text-positive font-semibold">+18.9%</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      자세히 보기
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Info Card */}
              <Card className="bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold mb-2 text-foreground">💡 바이낸스 알파 투자 팁</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• 프로젝트의 백서와 팀 구성을 반드시 확인하세요</li>
                        <li>• 커뮤니티 활동과 개발 진척도를 모니터링하세요</li>
                        <li>• 초기 투자는 소액으로 시작하고 분산 투자하세요</li>
                        <li>• 단기 펌프보다는 장기 가치에 집중하세요</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profit Calendar Tab */}
          <TabsContent value="profit-calendar" className="mt-0">
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-2 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                      <Calendar className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">수익 캘린더</h2>
                      <p className="text-muted-foreground mb-4">
                        에어드랍 및 투자 수익을 기록하고 관리하세요
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span>이번 달 수익: <strong className="text-green-500">$2,345</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-green-500" />
                          <span>총 수익: <strong className="text-green-500">$18,760</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">이번 주 수익</span>
                      <Badge variant="outline" className="text-green-500 border-green-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12%
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-500">$567</p>
                    <p className="text-xs text-muted-foreground mt-1">3건의 에어드랍</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">이번 달 수익</span>
                      <Badge variant="outline" className="text-green-500 border-green-500/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8%
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-500">$2,345</p>
                    <p className="text-xs text-muted-foreground mt-1">12건의 에어드랍</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">평균 수익</span>
                      <Badge variant="outline" className="text-muted-foreground border-border">
                        월간
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">$1,897</p>
                    <p className="text-xs text-muted-foreground mt-1">최근 6개월</p>
                  </CardContent>
                </Card>

                <Card className="border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">성공률</span>
                      <Badge variant="outline" className="text-green-500 border-green-500/30">
                        우수
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-green-500">87%</p>
                    <p className="text-xs text-muted-foreground mt-1">67/77 성공</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Profits Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="font-bold text-lg">최근 수익 내역</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr className="text-xs font-semibold text-muted-foreground">
                          <th className="text-left px-4 py-3">날짜</th>
                          <th className="text-left px-4 py-3">프로젝트</th>
                          <th className="text-left px-4 py-3">종류</th>
                          <th className="text-right px-4 py-3">수량</th>
                          <th className="text-right px-4 py-3">가치</th>
                          <th className="text-center px-4 py-3">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">2025.10.23</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">Arbitrum</div>
                            <div className="text-xs text-muted-foreground">ARB</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">에어드랍</Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">1,250 ARB</td>
                          <td className="px-4 py-3 text-right font-semibold text-green-500">$456</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">2025.10.22</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">Starknet</div>
                            <div className="text-xs text-muted-foreground">STRK</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">에어드랍</Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">3,420 STRK</td>
                          <td className="px-4 py-3 text-right font-semibold text-green-500">$892</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">2025.10.20</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">Pendle</div>
                            <div className="text-xs text-muted-foreground">PENDLE</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">스테이킹</Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">45 PENDLE</td>
                          <td className="px-4 py-3 text-right font-semibold text-green-500">$234</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">2025.10.18</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">zkSync</div>
                            <div className="text-xs text-muted-foreground">ZK</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">에어드랍</Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">2,890 ZK</td>
                          <td className="px-4 py-3 text-right font-semibold text-green-500">$1,234</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-green-500 hover:bg-green-600">완료</Badge>
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm">2025.10.15</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">LayerZero</div>
                            <div className="text-xs text-muted-foreground">ZRO</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">에어드랍</Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-mono">-</td>
                          <td className="px-4 py-3 text-right font-semibold text-muted-foreground">-</td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="outline">대기중</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Chart Placeholder */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">월별 수익 추이</h3>
                  <div className="h-64 bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl flex items-center justify-center border-2 border-dashed border-green-500/20">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-green-500/40 mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">수익 차트는 곧 추가됩니다</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold mb-2 text-foreground">💡 수익 관리 팁</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• 에어드랍 수익은 받은 즉시 기록하여 세금 신고에 활용하세요</li>
                        <li>• 토큰 가격이 변동하므로 받은 시점의 USD 가치를 함께 기록하세요</li>
                        <li>• 스테이킹이나 LP 보상도 정기적으로 기록하여 총 수익을 추적하세요</li>
                        <li>• 월별/분기별 수익 목표를 설정하고 달성률을 모니터링하세요</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default function AirdropsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AirdropsPageContent />
    </Suspense>
  )
}
