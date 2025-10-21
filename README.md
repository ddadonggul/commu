# CryptoHub - 가상화폐 커뮤니티 플랫폼

Next.js 14, TypeScript, Tailwind CSS를 기반으로 한 현대적인 가상화폐 정보 공유 플랫폼입니다.
토스 디자인 시스템(TDS)에서 영감을 받은 깔끔하고 친숙한 UI/UX를 제공합니다.

## 🎨 디자인 철학

- **TDS-inspired Design**: 토스 디자인 시스템의 핵심 요소에서 영감을 받아 독자적으로 구현
- **Coinness 레이아웃**: 깔끔하고 정돈된 상단 섹션, 모바일 최적화
- **반응형 레이아웃**: 좌우 여백을 통한 중앙 정렬 (max-w-7xl)
- **다크모드 우선**: 기본값은 다크모드, 라이트모드 전환 가능
- **브랜드 컬러**: 명확하고 일관된 색상 시스템
  - Primary: #0066FF (라이트) / #3B82F6 (다크)
  - Secondary: #EAB308 (라이트) / #FCD34D (다크) - 골드 옐로우
  - Accent: #10B981 / #34D399
- **큰 둥근 모서리**: 부드럽고 친근한 느낌 (border-radius: 1rem)
- **명확한 계층 구조**: 그림자와 간격을 통한 시각적 위계
- **부드러운 애니메이션**: 자연스러운 전환 효과
- **가독성 중심**: 명확한 타이포그래피와 충분한 여백
- **스티키 네비게이션**: 탭 필터가 상단에 고정되어 편리한 탐색

## 🚀 핵심 차별점

### 📱 텔레그램 마인드쉐어 (핵심 기능!)
**한국 크립토 커뮤니티의 게임체인저**
- 영향력 있는 텔레그램 채널 실시간 순위
- 마인드쉐어 점수 기반 리더보드
- 기간별 트렌드 분석 (7일/30일/90일)
- 채널별 점수 변화 추적
- 카테고리별 필터링

**레퍼런스**: [DeSpread Labs](https://dashboard.despreadlabs.io/storyteller-leaderboard/abstract), [따디](https://theddari.com/trends/telegram)

### 💬 스마트 커뮤니티
- **텔레그램/뉴스 인용 기능**: 신뢰할 수 있는 출처 기반 토론
- 긍정/부정 댓글 반응 시스템 (준비 중)
- 게시글 작성자 리워드 (준비 중)
- 인기글 및 카테고리별 분류

## 🚀 주요 기능

### 📰 실시간 뉴스
- 깔끔한 상단 헤더 (Coinness 스타일)
- 실시간 코인 시세 티커 (카드 형태)
- 카테고리별 필터링 (BTC, ETH, DeFi, NFT)
- 스티키 탭 네비게이션
- 반응형 그리드 레이아웃 (sm: 2열, lg: 3열)

### 📱 텔레그램 어그리게이터
- 한국 크립토 텔레그램 채널 통합
- 마인드쉐어 점수 및 순위
- 기간별 필터 (7일/30일/90일)
- 카테고리별 필터링
- 통계 대시보드 (채널 수, 총점, 평균, 최고 상승률)
- 실시간 트렌딩 토픽

### 🎁 에어드랍 정보
- 통계 대시보드 (진행중/예정/종료 카운트)
- 상태별 필터링 (진행중/예정/종료)
- 참여자 수 및 보상 정보 카드
- 에어드랍 참여 팁 제공
- 반응형 그리드 레이아웃

### 💬 커뮤니티
- 사용자 간 정보 공유 게시판
- **텔레그램/뉴스 인용 기능** (차별점!)
- 커뮤니티 통계 (게시글, 인기글, 활성 사용자)
- 다양한 탭 필터 (인기글/최신글/토론/가이드)
- 카테고리별 분류
- 좋아요 및 댓글 기능
- 커뮤니티 가이드라인 제공

## 🛠️ 기술 스택

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 컴포넌트**: 커스텀 디자인 시스템 (TDS-inspired)
- **테마**: [next-themes](https://github.com/pacocoursey/next-themes) (다크/라이트 모드)
- **폰트**: Inter

## 📁 프로젝트 구조

```
cryptohub/
├── app/                    # Next.js App Router
│   ├── telegram/          # 텔레그램 마인드쉐어 (핵심!)
│   ├── airdrops/          # 에어드랍 페이지
│   ├── community/         # 커뮤니티 페이지 (인용 기능)
│   ├── login/             # 로그인
│   ├── signup/            # 회원가입
│   ├── globals.css        # 글로벌 스타일 (TDS 토큰)
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 (뉴스 피드)
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   │   └── navbar.tsx     # 네비게이션 바
│   ├── telegram/          # 텔레그램 관련 (핵심!)
│   │   ├── channel-card.tsx
│   │   └── mindshare-stats.tsx
│   ├── news/              # 뉴스 관련 컴포넌트
│   │   └── news-card.tsx
│   ├── airdrops/          # 에어드랍 관련 컴포넌트
│   │   └── airdrop-card.tsx
│   ├── community/         # 커뮤니티 관련 (인용 기능)
│   │   ├── post-card.tsx
│   │   └── quote-card.tsx  # 인용 카드 (차별점!)
│   └── ui/                # 기본 UI 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── tabs.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/                   # 유틸리티
│   ├── utils.ts
│   └── constants.ts
├── types/                 # TypeScript 타입
│   └── index.ts           # TelegramChannel, MindshareData 등
└── public/               # 정적 파일
```

## 🎨 디자인 토큰

### 테마 시스템
**기본값: 다크모드** 🌙

### 색상 시스템

#### Light Mode
```css
background: #F8FAFC  /* 밝은 회색 */
primary:    #0066FF  /* 브랜드 블루 */
secondary:  #06B6D4  /* 시안 */
accent:     #10B981  /* 그린 (상승) */
text:       #1E293B  /* 다크 텍스트 */
```

#### Dark Mode (기본값)
```css
background: #0F172A  /* 다크 네이비 */
primary:    #3B82F6  /* 밝은 블루 */
secondary:  #22D3EE  /* 밝은 시안 */
accent:     #34D399  /* 밝은 그린 */
text:       #F1F5F9  /* 밝은 텍스트 */
```

### 가격 변동 색상
```css
--positive: 158 64% 52%  /* 상승 - 초록 (Accent) */
--negative: 0 84% 60%     /* 하락 - 빨강 */
```

### Border Radius
```css
--radius: 1rem  /* TDS 스타일 큰 둥근 모서리 */
```

### 그림자
- `.shadow-elevated`: 기본 카드 그림자
- `.shadow-elevated-hover`: 호버 시 강조 그림자

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 빌드
```bash
npm run build
npm run start
```

## 📄 주요 페이지

- **메인** (`/`) - 실시간 뉴스 피드
- **텔레그램** (`/telegram`) - 마인드쉐어 리더보드 ⭐ 핵심 기능
- **에어드랍** (`/airdrops`) - 에어드랍 정보
- **커뮤니티** (`/community`) - 사용자 게시판 (인용 기능)
- **로그인** (`/login`) - 사용자 로그인
- **회원가입** (`/signup`) - 회원가입

## 💡 핵심 차별화 기능

### 1. 텔레그램 마인드쉐어
```tsx
// 채널 리더보드
<ChannelCard
  rank={1}
  name="마인부우의 크립토볼"
  score={35339}
  scoreChange={2340}
  rankChange={0}
/>

// 통계 대시보드
<MindshareStats
  totalChannels={20}
  totalScore={250000}
  topGainer={{ name: "브라이언홍", scoreChange: 1890 }}
/>
```

### 2. 커뮤니티 인용 기능
```tsx
// 텔레그램 인용
<PostCard
  title="비트코인 분석"
  hasQuote={true}
  quoteSource={{
    type: "telegram",
    source: "브라이언홍",
    content: "ETF 승인 임박...",
    channelUrl: "https://t.me/BrianAitch"
  }}
/>

// 뉴스 인용
<QuoteCard
  type="news"
  source="CoinDesk"
  content="NFT 거래량 40% 증가..."
/>
```

## 🎯 참고 레퍼런스

- **디자인 영감**: [Toss Design System](https://toss.im/toss-design-system) - 독자적 구현
- **서비스 레퍼런스**: 
  - [Coinness](https://coinness.com/) - 가상화폐 뉴스 플랫폼
  - [DeSpread Labs](https://dashboard.despreadlabs.io/storyteller-leaderboard/abstract) - 텔레그램 마인드쉐어
  - [따디](https://theddari.com/trends/telegram) - 텔레그램 트렌드
- **디자인 시스템**: [Coinbase Design System](https://github.com/coinbase/cds) - 컴포넌트 구조 참고

## 🔧 개발 가이드

### 텔레그램 채널 카드 추가
```tsx
import { ChannelCard } from "@/components/telegram/channel-card"

<ChannelCard
  rank={1}
  name="채널명"
  channelUrl="https://t.me/channel"
  score={35000}
  subscribers={10000}
  category="종합"
  scoreChange={1000}
  rankChange={2}
/>
```

### 인용 기능 사용
```tsx
import { QuoteCard } from "@/components/community/quote-card"

<QuoteCard
  type="telegram"
  source="채널명"
  content="인용 내용"
  timestamp="1시간 전"
  channelUrl="https://t.me/channel"
/>
```

## 📊 타입 정의

```typescript
interface TelegramChannel {
  id: number
  rank: number
  name: string
  channelUrl: string
  score: number
  subscribers?: number
  category?: string
  scoreChange?: number
  rankChange?: number
}

interface Post {
  id: number
  title: string
  content: string
  hasQuote?: boolean
  quoteSource?: {
    type: "telegram" | "news"
    source: string
    content: string
    timestamp?: string
    channelUrl?: string
  }
}
```

## 🔮 향후 개발 계획

### Phase 1 (완료 ✅)
- [x] TDS 스타일 디자인 시스템
- [x] 뉴스 피드
- [x] 텔레그램 마인드쉐어
- [x] 에어드랍 정보
- [x] 커뮤니티 (인용 기능)
- [x] **다크/라이트 모드** (다크모드 기본)

### Phase 2 (예정)
- [ ] 실제 API 연동
- [ ] 텔레그램 실시간 데이터 수집
- [ ] 마인드쉐어 자동 계산 알고리즘
- [ ] 긍정/부정 댓글 반응 시스템
- [ ] 게시글 작성자 리워드 시스템
- [ ] 사용자 인증 & 프로필

### Phase 3 (계획)
- [ ] 실시간 가격 차트
- [ ] 채널 상세 페이지
- [ ] 알림 시스템
- [ ] 시스템 테마 감지 옵션
- [ ] 모바일 앱

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

---

**Made with ❤️ for Korean Crypto Community**
