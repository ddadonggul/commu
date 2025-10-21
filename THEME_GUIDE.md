# 테마 시스템 가이드

CryptoHub의 다크/라이트 모드 테마 시스템에 대한 가이드입니다.

## 🎨 브랜드 컬러

### Light Mode
```css
background: #F8FAFC  /* 밝은 회색 배경 */
primary:    #0066FF  /* 브랜드 블루 */
secondary:  #06B6D4  /* 시안 */
accent:     #10B981  /* 그린 (가격 상승) */
text:       #1E293B  /* 다크 텍스트 */
```

### Dark Mode (기본값)
```css
background: #0F172A  /* 다크 네이비 */
primary:    #3B82F6  /* 밝은 블루 */
secondary:  #22D3EE  /* 밝은 시안 */
accent:     #34D399  /* 밝은 그린 */
text:       #F1F5F9  /* 밝은 텍스트 */
```

## 🚀 사용법

### 1. 기본 설정

프로젝트는 **다크모드가 기본값**으로 설정되어 있습니다.

```tsx
// app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"        // 다크모드 기본값
  enableSystem={false}       // 시스템 설정 무시
  disableTransitionOnChange={false}
>
  {children}
</ThemeProvider>
```

### 2. 테마 전환

네비게이션 바에 테마 토글 버튼이 있습니다.

```tsx
import { useTheme } from "next-themes"

const { theme, setTheme } = useTheme()

// 테마 전환
setTheme(theme === "dark" ? "light" : "dark")
```

### 3. 컴포넌트에서 사용

```tsx
"use client"

import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme } = useTheme()
  
  return (
    <div className="bg-background text-foreground">
      현재 테마: {theme}
    </div>
  )
}
```

## 🎨 CSS 변수

### 사용 가능한 CSS 변수

```css
/* 배경 */
--background
--foreground

/* 카드 */
--card
--card-foreground

/* Primary (브랜드 컬러) */
--primary
--primary-foreground
--primary-50
--primary-100

/* Secondary */
--secondary
--secondary-foreground

/* Accent */
--accent
--accent-foreground

/* 가격 변동 */
--positive  /* 상승 (초록) */
--negative  /* 하락 (빨강) */

/* 기타 */
--muted
--muted-foreground
--border
--input
--ring
```

### Tailwind 클래스로 사용

```tsx
// 배경색
<div className="bg-background">

// 텍스트 색상
<p className="text-foreground">

// Primary 색상
<button className="bg-primary text-primary-foreground">

// 가격 상승/하락
<span className="text-positive">+5.2%</span>
<span className="text-negative">-2.1%</span>
```

## 🔧 커스터마이징

### 색상 변경

`app/globals.css` 파일에서 색상을 수정할 수 있습니다.

```css
@layer base {
  :root {
    /* Light Mode */
    --primary: 217 100% 50%;  /* #0066FF */
  }

  .dark {
    /* Dark Mode */
    --primary: 217 91% 60%;   /* #3B82F6 */
  }
}
```

### 새로운 색상 추가

```css
@layer base {
  :root {
    --custom-color: 200 100% 50%;
  }
  
  .dark {
    --custom-color: 200 80% 60%;
  }
}
```

```tsx
// tailwind.config.ts에 추가
colors: {
  custom: "hsl(var(--custom-color))",
}

// 사용
<div className="bg-custom">
```

## 💡 모범 사례

### 1. 항상 CSS 변수 사용

```tsx
// ✅ 좋은 예
<div className="bg-background text-foreground">

// ❌ 나쁜 예 (테마가 바뀌어도 색상이 고정됨)
<div className="bg-slate-900 text-white">
```

### 2. 조건부 스타일링

```tsx
// 다크모드에서만 다른 스타일 적용
<div className="bg-card dark:bg-card/50">
```

### 3. 가격 변동 색상

```tsx
// 가격 상승
<span className="text-positive">↗ +5.2%</span>

// 가격 하락
<span className="text-negative">↘ -2.1%</span>
```

## 🎯 컴포넌트별 예시

### Button
```tsx
// Primary 버튼 (테마 자동 적용)
<Button className="bg-primary text-primary-foreground">
  클릭
</Button>

// Ghost 버튼 (배경 투명)
<Button variant="ghost">
  클릭
</Button>
```

### Card
```tsx
<Card className="bg-card text-card-foreground">
  <CardHeader>제목</CardHeader>
  <CardContent>내용</CardContent>
</Card>
```

### Badge
```tsx
// 상승
<Badge className="bg-positive/10 text-positive">
  상승
</Badge>

// 하락
<Badge className="bg-negative/10 text-negative">
  하락
</Badge>
```

## 🔄 테마 전환 애니메이션

기본적으로 부드러운 전환 효과가 적용됩니다.

```tsx
// 전환 비활성화
<ThemeProvider
  disableTransitionOnChange={true}
>
```

## 📱 모바일 고려사항

다크모드는 특히 모바일에서 배터리 절약과 눈의 피로 감소에 도움이 됩니다.

```tsx
// 모바일에서 추가 패딩
<div className="p-4 md:p-6 bg-background">
```

## 🐛 문제 해결

### 테마가 깜빡이는 경우

`html` 태그에 `suppressHydrationWarning` 추가:

```tsx
<html lang="ko" suppressHydrationWarning>
```

### 초기 렌더링 시 테마 깜빡임 방지

```tsx
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return null  // 또는 스켈레톤
}
```

### SSR 이슈

`useTheme`는 클라이언트 컴포넌트에서만 사용:

```tsx
"use client"

import { useTheme } from "next-themes"
```

## 📊 색상 대비 체크

WCAG AA 기준을 준수하도록 색상을 선택했습니다.

- **Light Mode**: 텍스트 대비 4.5:1 이상
- **Dark Mode**: 텍스트 대비 7:1 이상

## 🎨 디자인 토큰

### Primary Colors
- Light: `#0066FF` (브랜드 블루)
- Dark: `#3B82F6` (밝은 블루)

### Secondary Colors
- Light: `#06B6D4` (시안)
- Dark: `#22D3EE` (밝은 시안)

### Accent Colors
- Light: `#10B981` (그린)
- Dark: `#34D399` (밝은 그린)

### Background
- Light: `#F8FAFC` (밝은 회색)
- Dark: `#0F172A` (다크 네이비)

### Text
- Light: `#1E293B` (다크 텍스트)
- Dark: `#F1F5F9` (밝은 텍스트)

## 🔮 향후 개선 사항

- [ ] 시스템 테마 감지 옵션 추가
- [ ] 테마별 커스텀 로고
- [ ] 애니메이션 효과 개선
- [ ] 사용자 테마 설정 저장

---

**다크모드로 더 나은 사용자 경험을!** 🌙

