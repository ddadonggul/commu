"use client"

import { useState } from "react"
import { PostCard } from "@/components/community/post-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PenSquare, Shield } from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("hot")

  const postsData = [
    {
      id: 1,
      title: "비트코인 ETF 승인, 시장에 미칠 영향 분석",
      content: "비트코인 ETF 승인이 임박한 것으로 보입니다. 이번 승인이 시장에 미칠 영향을 다각도로 분석해봤습니다. 기관 투자자들의 대규모 유입이 예상되며...",
      author: "zsdasd",
      timestamp: "30분 전",
      category: "시장분석",
      likes: 245,
      comments: 67,
      views: 1248,
      isHot: true,
      hasQuote: true,
      quoteSource: {
        type: "telegram" as const,
        source: "브라이언홍",
        content: "비트코인 ETF 승인 관련 SEC 내부 소식통에 따르면 이번 주 내 긍정적인 발표가 있을 것으로 예상됩니다. 기관 투자자들의 대규모 유입 준비 중.",
        timestamp: "1시간 전",
        channelUrl: "https://t.me/BrianAitch",
      },
    },
    {
      id: 2,
      title: "솔라나 vs 이더리움, 2024년 전망은?",
      content: "올해 L1 블록체인 경쟁 구도를 살펴보면, 솔라나와 이더리움의 대결이 주목됩니다. 각 체인의 장단점과 향후 전망을 정리해봤습니다.",
      author: "블록체인러버",
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
      content: "DeFi에 입문하는 분들을 위해 기초부터 차근차근 설명드립니다. 지갑 설정부터 첫 스왑까지 단계별로 알려드려요.",
      author: "DeFi멘토",
      timestamp: "2시간 전",
      category: "초보가이드",
      likes: 156,
      comments: 28,
      views: 634,
    },
    {
      id: 4,
      title: "NFT 시장 부활의 신호들",
      content: "최근 NFT 거래량이 다시 증가하고 있습니다. 새로운 유틸리티 중심의 프로젝트들이 주목받고 있는데요, 흥미로운 프로젝트들을 소개합니다.",
      author: "NFT컬렉터",
      timestamp: "3시간 전",
      category: "NFT",
      likes: 98,
      comments: 19,
      views: 542,
      isHot: true,
      hasQuote: true,
      quoteSource: {
        type: "news" as const,
        source: "CoinDesk",
        content: "NFT 거래량이 전월 대비 40% 증가하며 시장 회복 신호를 보이고 있습니다. 유틸리티 중심의 새로운 프로젝트들이 주목받고 있습니다.",
        timestamp: "4시간 전",
      },
    },
    {
      id: 5,
      title: "레이어2 솔루션 비교 분석",
      content: "Arbitrum, Optimism, zkSync, Polygon zkEVM 등 주요 레이어2 솔루션들을 속도, 비용, 보안 측면에서 비교 분석했습니다.",
      author: "테크기버",
      timestamp: "4시간 전",
      category: "기술토론",
      likes: 234,
      comments: 56,
      views: 1056,
      isHot: true,
      hasQuote: true,
      quoteSource: {
        type: "telegram" as const,
        source: "젠티 디파이 정보방",
        content: "최근 L2 가스비 비교: Arbitrum 0.1달러, Optimism 0.12달러, zkSync 0.08달러. zkSync가 가장 저렴하지만 Arbitrum의 생태계가 가장 활발합니다.",
        timestamp: "5시간 전",
        channelUrl: "https://t.me/Jenti_DeFi",
      },
    },
    {
      id: 6,
      title: "스테이블코인 규제, 어떻게 준비해야 할까?",
      content: "각국의 스테이블코인 규제 동향과 투자자가 알아야 할 주의사항을 정리했습니다.",
      author: "규제워처",
      timestamp: "5시간 전",
      category: "규제",
      likes: 87,
      comments: 31,
      views: 423,
    },
    {
      id: 7,
      title: "AI + 블록체인, 차세대 트렌드가 될까?",
      content: "AI와 블록체인의 결합이 새로운 트렌드로 떠오르고 있습니다. 대표적인 프로젝트들과 투자 포인트를 살펴봅니다.",
      author: "트렌드헌터",
      timestamp: "6시간 전",
      category: "트렌드",
      likes: 145,
      comments: 38,
      views: 567,
    },
    {
      id: 8,
      title: "보안 지갑 설정, 이것만은 꼭!",
      content: "해킹 피해를 예방하기 위한 필수 보안 설정들을 정리했습니다. 하드웨어 지갑 사용법과 시드 문구 관리 팁을 공유합니다.",
      author: "보안전문가",
      timestamp: "7시간 전",
      category: "보안",
      likes: 312,
      comments: 74,
      views: 1432,
      isHot: true,
    },
  ]

  const hotPosts = postsData.filter((post) => post.isHot)
  const allPosts = postsData

  const tabConfig = {
    hot: { data: hotPosts, label: "🔥 인기글" },
    recent: { data: allPosts, label: "최신글" },
    discussion: { 
      data: allPosts.filter((post) => post.category === "기술토론" || post.category === "시장분석"),
      label: "토론"
    },
    guide: { 
      data: allPosts.filter((post) => post.category === "초보가이드" || post.category === "보안"),
      label: "가이드"
    },
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Compact Header Section */}
      <section className="border-b bg-card/50">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                크립토 커뮤니티
              </h1>
              <p className="text-sm text-muted-foreground">
                암호화폐 투자자들과 정보를 공유하고 소통하세요
              </p>
            </div>
            
            {/* Tab Filter */}
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-muted/50 p-1">
                {Object.entries(tabConfig).map(([key, config]) => (
                  <Button
                    key={key}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-lg text-xs font-semibold transition-all ${
                      activeTab === key
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>
              <Button size="sm" className="rounded-lg">
                <PenSquare className="w-4 h-4 mr-1.5" />
                글쓰기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Posts Feed with Animation */}
      <section className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4">
          {tabConfig[activeTab as keyof typeof tabConfig].data.map((post, index) => (
            <div key={post.id} className="bg-card rounded-xl border">
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {/* Enhanced Community Guidelines */}
        <Card className="mt-8 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-2 border-accent/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          <CardContent className="p-6 md:p-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/20 border border-accent/30">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 text-foreground">커뮤니티 가이드</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    <span>투자 권유나 특정 코인 추천 게시글은 제한될 수 있습니다</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    <span>상호 존중하는 대화 문화를 만들어주세요</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    <span>근거 없는 루머나 허위 정보 유포는 삼가주세요</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">•</span>
                    <span>건설적인 토론과 정보 공유를 환영합니다</span>
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
