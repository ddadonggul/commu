# 텔레그램 마인드쉐어 기능 가이드

CryptoHub의 핵심 차별화 기능인 **텔레그램 마인드쉐어 어그리게이터**에 대한 상세 가이드입니다.

## 📱 기능 개요

텔레그램 마인드쉐어는 한국 크립토 커뮤니티에서 영향력 있는 텔레그램 채널들을 추적하고 순위를 매기는 시스템입니다.

### 주요 기능

1. **채널 리더보드**
   - 실시간 순위 표시
   - 마인드쉐어 점수 기반 정렬
   - 순위 변동 추적

2. **통계 대시보드**
   - 총 채널 수
   - 총 마인드쉐어 점수
   - 최대 상승 채널
   - 평균 점수

3. **기간별 필터**
   - 7일 트렌드
   - 30일 트렌드
   - 90일 트렌드

4. **카테고리 필터**
   - 종합
   - 시장분석
   - 에어드랍
   - DeFi
   - NFT
   - 기술
   - 공지
   - 정보
   - 학습

## 🎯 마인드쉐어 점수란?

마인드쉐어(Mindshare)는 텔레그램 채널의 영향력을 수치화한 지표입니다.

### 점수 산정 요소 (예시)

```typescript
interface MindshareScore {
  subscribers: number        // 구독자 수 (30%)
  engagement: number         // 참여도 (40%)
  contentQuality: number     // 콘텐츠 품질 (20%)
  consistency: number        // 활동 일관성 (10%)
}
```

### 점수 계산 공식 (개념)

```
마인드쉐어 점수 = 
  (구독자 수 × 0.3) +
  (평균 조회수 × 0.4) +
  (콘텐츠 품질 × 0.2) +
  (활동 일관성 × 0.1)
```

## 🏆 채널 순위 시스템

### 메달 시스템
- 🥇 1위
- 🥈 2위
- 🥉 3위
- #4, #5, ... (숫자 표시)

### 순위 변동
- ↑ 3: 3계단 상승
- ↓ 2: 2계단 하락
- -: 변동 없음

## 💾 데이터 구조

### TelegramChannel 타입
```typescript
interface TelegramChannel {
  id: number
  rank: number
  name: string
  channelUrl: string
  score: number
  subscribers?: number
  category?: string
  description?: string
  avatar?: string
  scoreChange?: number    // 점수 변화량
  rankChange?: number     // 순위 변화
}
```

### MindshareData 타입
```typescript
interface MindshareData {
  period: "7d" | "30d" | "90d"
  channels: TelegramChannel[]
  totalScore: number
  topGainers: TelegramChannel[]
  trending: string[]
}
```

## 🎨 UI 컴포넌트

### 1. ChannelCard
채널 정보를 표시하는 카드 컴포넌트

```tsx
<ChannelCard
  rank={1}
  name="마인부우의 크립토볼"
  channelUrl="https://t.me/minebuu_cryptoball"
  score={35339}
  subscribers={12500}
  category="종합"
  scoreChange={2340}
  rankChange={0}
/>
```

**주요 기능:**
- 순위 표시 (메달 또는 숫자)
- 점수 및 구독자 수
- 순위/점수 변동량
- 카테고리 뱃지
- 텔레그램 링크

### 2. MindshareStats
통계 대시보드 컴포넌트

```tsx
<MindshareStats
  totalChannels={20}
  totalScore={250000}
  avgScore={12500}
  topGainer={{
    name: "브라이언홍",
    scoreChange: 1890
  }}
/>
```

**주요 기능:**
- 총 채널 수
- 총 마인드쉐어
- 최대 상승 채널
- 평균 점수

## 🔄 커뮤니티 연동

### 텔레그램 인용 기능

커뮤니티 게시글에서 텔레그램 채널의 콘텐츠를 인용할 수 있습니다.

```tsx
<PostCard
  title="비트코인 ETF 승인 분석"
  hasQuote={true}
  quoteSource={{
    type: "telegram",
    source: "브라이언홍",
    content: "ETF 승인 관련 SEC 내부 소식...",
    timestamp: "1시간 전",
    channelUrl: "https://t.me/BrianAitch"
  }}
/>
```

### QuoteCard 컴포넌트

```tsx
<QuoteCard
  type="telegram"
  source="채널명"
  content="인용 내용"
  timestamp="1시간 전"
  channelUrl="https://t.me/channel"
/>
```

## 📊 실제 데이터 예시

### 상위 채널 (예시)

| 순위 | 채널명 | 점수 | 구독자 | 변동 |
|------|--------|------|--------|------|
| 🥇 | 마인부우의 크립토볼 | 35,339 | 12,500 | - |
| 🥈 | 브라이언홍 | 34,831 | 11,200 | ↑1 |
| 🥉 | 라오니 | 25,858 | 9,800 | ↓1 |
| #4 | 젠티 디파이 정보방 | 25,522 | 8,900 | ↑2 |
| #5 | 매실남과 당신은 반드시 승리할것 | 20,206 | 7,600 | ↓1 |

## 🔌 API 연동 준비

### 예상 API 엔드포인트

```typescript
// 채널 목록 조회
GET /api/telegram/channels?period=7d&category=all

// 채널 상세 정보
GET /api/telegram/channels/:id

// 마인드쉐어 통계
GET /api/telegram/stats?period=7d

// 트렌딩 토픽
GET /api/telegram/trending
```

### 응답 형식 (예시)

```json
{
  "success": true,
  "data": {
    "period": "7d",
    "channels": [
      {
        "id": 1,
        "rank": 1,
        "name": "마인부우의 크립토볼",
        "channelUrl": "https://t.me/minebuu_cryptoball",
        "score": 35339,
        "subscribers": 12500,
        "category": "종합",
        "scoreChange": 2340,
        "rankChange": 0
      }
    ],
    "totalScore": 250000,
    "totalChannels": 20
  }
}
```

## 🎯 향후 개발 계획

### Phase 1 (완료 ✅)
- [x] UI 구현
- [x] 채널 카드 컴포넌트
- [x] 통계 대시보드
- [x] 기간별 필터
- [x] 카테고리 필터
- [x] 커뮤니티 인용 기능

### Phase 2 (예정)
- [ ] 실제 텔레그램 데이터 수집 (Telegram API)
- [ ] 마인드쉐어 점수 자동 계산
- [ ] 실시간 업데이트
- [ ] 채널 상세 페이지
- [ ] 알림 시스템

### Phase 3 (계획)
- [ ] 채널 비교 기능
- [ ] 히스토리 차트
- [ ] AI 기반 콘텐츠 분석
- [ ] 사용자 맞춤 추천

## 🔗 레퍼런스

- [DeSpread Labs](https://dashboard.despreadlabs.io/storyteller-leaderboard/abstract) - 마인드쉐어 리더보드
- [따디 트렌드](https://theddari.com/trends/telegram) - 텔레그램 트렌드
- [따디 대시보드](https://theddari.com/trends/telegram-dashboard) - 텔레그램 대시보드

## 💡 활용 팁

### 투자자를 위한 팁
1. **신뢰도 높은 채널 찾기**
   - 상위 10개 채널 팔로우
   - 점수 변동 추적
   
2. **트렌드 파악**
   - 급상승 채널 주목
   - 카테고리별 트렌드 분석

3. **정보 교차 검증**
   - 여러 채널의 정보 비교
   - 커뮤니티 반응 확인

### 채널 운영자를 위한 팁
1. **점수 향상 방법**
   - 꾸준한 콘텐츠 업데이트
   - 높은 품질의 정보 제공
   - 커뮤니티 참여 유도

2. **순위 상승 전략**
   - 독점 정보 제공
   - 빠른 뉴스 전달
   - 명확한 분석 제공

## 🛠️ 개발자 가이드

### 새 채널 추가

```typescript
const newChannel: TelegramChannel = {
  id: Date.now(),
  rank: 13,
  name: "새로운 채널",
  channelUrl: "https://t.me/new_channel",
  score: 5000,
  subscribers: 2000,
  category: "종합",
  scoreChange: 500,
  rankChange: 3
}
```

### 커스텀 필터 구현

```typescript
const filteredChannels = channels.filter(channel => {
  if (category !== "all" && channel.category !== category) {
    return false
  }
  if (minScore && channel.score < minScore) {
    return false
  }
  return true
})
```

---

**텔레그램 마인드쉐어 - 한국 크립토 커뮤니티의 중심** 📱

