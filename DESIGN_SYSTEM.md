# CryptoHub 디자인 시스템

토스 디자인 시스템(TDS)에서 영감을 받아 가상화폐 커뮤니티에 최적화된 독자적인 디자인 시스템입니다.

## 디자인 원칙

### 1. 친숙함 (Familiarity)
사용자들이 이미 익숙한 인터페이스 패턴을 활용하여 학습 곡선을 최소화합니다.

### 2. 명확성 (Clarity)
정보의 계층 구조를 명확히 하여 중요한 내용이 한눈에 들어오도록 합니다.

### 3. 부드러움 (Smoothness)
둥근 모서리와 자연스러운 애니메이션으로 편안한 사용자 경험을 제공합니다.

### 4. 일관성 (Consistency)
모든 페이지와 컴포넌트에서 동일한 디자인 언어를 사용합니다.

## 색상 시스템

### Primary Colors (주요 색상)
```css
/* 브랜드 컬러 - 블루 */
--primary: 217 91% 60%
--primary-foreground: 0 0% 100%
--primary-50: 217 91% 95%
--primary-100: 217 91% 85%
```

**사용처**: 버튼, 링크, 중요한 액션

### Semantic Colors (의미론적 색상)
```css
/* 긍정적 (가격 상승) */
--positive: 142 76% 36%

/* 부정적 (가격 하락) */
--negative: 0 84% 60%
```

### Neutral Colors (중립 색상)
```css
--background: 0 0% 98%
--foreground: 220 14% 12%
--muted: 220 13% 96%
--muted-foreground: 220 9% 46%
```

## 타이포그래피

### 폰트 패밀리
- **기본**: Inter (Google Fonts)
- **특성**: 가독성이 뛰어난 sans-serif 폰트

### 크기 스케일
```css
/* 헤드라인 */
text-4xl: 2.25rem (36px)
text-5xl: 3rem (48px)

/* 본문 */
text-base: 1rem (16px)
text-sm: 0.875rem (14px)
text-xs: 0.75rem (12px)

/* 가중치 */
font-medium: 500
font-semibold: 600
font-bold: 700
```

## 간격 시스템

### 컴포넌트 간격
```css
gap-2: 0.5rem (8px)
gap-4: 1rem (16px)
gap-6: 1.5rem (24px)
gap-8: 2rem (32px)
```

### 패딩
```css
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)
```

## Border Radius (둥근 모서리)

### TDS-inspired 큰 반경
```css
--radius: 1rem (16px)

rounded-lg: 1rem
rounded-xl: 1.25rem
rounded-2xl: 1.5rem
```

**특징**: 토스 디자인 시스템의 특징적인 큰 둥근 모서리를 채택하여 부드럽고 친근한 느낌을 제공합니다.

## 그림자

### Elevated Shadow
```css
.shadow-elevated {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 
              0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.shadow-elevated-hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 
              0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

**사용처**: 카드, 팝업, 호버 상태

## 애니메이션

### Transition
```css
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**특징**: 빠르지만 자연스러운 전환 효과 (200ms)

### Transform
```css
/* 호버 시 살짝 확대 */
hover:scale-[1.02]

/* 클릭 시 살짝 축소 */
active:scale-[0.98]
```

## 컴포넌트

### Button
```tsx
// Primary
<Button variant="default">기본 버튼</Button>

// Secondary
<Button variant="ghost">보조 버튼</Button>

// Outline
<Button variant="outline">외곽선 버튼</Button>
```

**특징**:
- 큰 둥근 모서리 (`rounded-xl`)
- 충분한 패딩으로 터치 영역 확보
- 명확한 시각적 피드백

### Card
```tsx
// 기본 카드
<Card>내용</Card>

// Elevated 카드 (호버 효과)
<Card variant="elevated">내용</Card>
```

**특징**:
- `rounded-2xl` (24px) 큰 모서리
- 기본 border와 배경색
- elevated 버전은 그림자와 호버 효과

### Badge
```tsx
<Badge variant="positive">상승</Badge>
<Badge variant="negative">하락</Badge>
<Badge variant="outline">카테고리</Badge>
```

**특징**:
- 의미에 따른 색상 구분
- 둥근 형태 (`rounded-full`)
- 명확한 가독성

### Tabs
```tsx
<Tabs value={active} onValueChange={setActive}>
  <TabsList>
    <TabsTrigger value="1">탭 1</TabsTrigger>
  </TabsList>
  <TabsContent value="1">내용</TabsContent>
</Tabs>
```

**특징**:
- 둥근 배경 (`rounded-xl`)
- 선택된 탭에 배경색과 그림자
- 부드러운 전환 애니메이션

## 레이아웃 패턴

### Grid Layout
```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* 카드들 */}
</div>
```

**반응형 브레이크포인트**:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

### Container
```tsx
<div className="container mx-auto px-4">
  {/* 콘텐츠 */}
</div>
```

## 모범 사례

### 1. 카드 사용
```tsx
// ✅ 좋은 예
<Card variant="elevated" className="transition-smooth hover:scale-[1.02]">
  <CardHeader>
    <CardTitle>제목</CardTitle>
  </CardHeader>
  <CardContent>내용</CardContent>
</Card>

// ❌ 나쁜 예
<div className="border p-4">
  <h3>제목</h3>
  <p>내용</p>
</div>
```

### 2. 색상 사용
```tsx
// ✅ 좋은 예 - 토큰 사용
<span className="text-primary">중요한 텍스트</span>

// ❌ 나쁜 예 - 하드코딩
<span className="text-blue-500">중요한 텍스트</span>
```

### 3. 간격
```tsx
// ✅ 좋은 예 - 일관된 간격
<div className="space-y-4">
  <Card />
  <Card />
</div>

// ❌ 나쁜 예 - 불규칙한 간격
<div>
  <Card className="mb-3" />
  <Card className="mb-5" />
</div>
```

## 접근성

### 1. 색상 대비
- WCAG AA 기준 준수
- 텍스트와 배경 간 충분한 대비

### 2. 포커스 표시
```css
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-ring 
focus-visible:ring-offset-2
```

### 3. 의미론적 HTML
```tsx
<button> // ✅
<div onClick> // ❌
```

## 다크 모드

현재 라이트 모드 우선으로 구현되어 있으며, 다크 모드 토큰이 정의되어 있습니다.

```css
.dark {
  --background: 220 14% 8%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## 참고 자료

- [Toss Design System](https://toss.im) - 디자인 철학 영감
- [Coinbase Design System](https://github.com/coinbase/cds) - 컴포넌트 구조 참고
- [Tailwind CSS](https://tailwindcss.com) - 유틸리티 클래스

---

**디자인 시스템은 계속 발전합니다** 🎨

