# Changelog

프로젝트의 주요 변경사항을 기록합니다.

## [1.0.1] - 2024-10-21

### 🔒 보안 (Security)
- **Next.js 보안 패치 적용**: 14.2.5 → 14.2.33
  - Cache Poisoning 취약점 해결
  - Denial of Service (DoS) 취약점 해결
  - Image Optimization 보안 문제 해결
  - Authorization Bypass 취약점 해결
  - SSRF (Server-Side Request Forgery) 취약점 해결
  - Content Injection 취약점 해결
- **보안 취약점**: 0개 (Critical 1개 → 0개)

### 🎨 디자인 (Design)
- **Secondary 브랜드 컬러 변경**
  - Light Mode: #06B6D4 (Cyan) → #EAB308 (골드 옐로우)
  - Dark Mode: #22D3EE (Light Cyan) → #FCD34D (라이트 옐로우)
  - 더 따뜻하고 프리미엄한 느낌으로 개선

### 📝 문서 (Documentation)
- README.md 브랜드 컬러 정보 업데이트

---

## [1.0.0] - 2024-10-21

### ✨ 초기 릴리스 (Initial Release)

#### 핵심 기능
- **텔레그램 마인드쉐어**: 한국 크립토 텔레그램 채널 순위 시스템
- **뉴스 피드**: 실시간 가상화폐 뉴스
- **에어드랍 정보**: 진행중/예정/종료 에어드랍 목록
- **커뮤니티**: 인용 기능이 있는 게시판

#### 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-themes (다크/라이트 모드)

#### 디자인 시스템
- TDS-inspired 디자인
- Coinness 스타일 레이아웃
- 반응형 디자인 (모바일 최적화)
- 다크모드 기본 활성화

#### 문서
- README.md
- SETUP.md
- ENV_SETUP_GUIDE.md
- DESIGN_SYSTEM.md
- TELEGRAM_FEATURE.md
- CONTRIBUTING.md
- SECURITY_REVIEW.md
- UI_UX_IMPROVEMENTS.md

