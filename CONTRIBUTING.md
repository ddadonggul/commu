# 기여 가이드

프로젝트에 기여해주셔서 감사합니다! 🎉

## 기여 방법

1. 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 코딩 규칙

### 커밋 메시지

커밋 메시지는 다음 형식을 따릅니다:

```
<type>: <subject>

<body>
```

**Types:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경 (포맷팅 등)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스 또는 도구 변경

**예시:**
```
feat: Add user authentication

- Add login page
- Add signup page
- Implement JWT authentication
```

### 코드 스타일

- TypeScript를 사용합니다
- ESLint와 Prettier 설정을 따릅니다
- 의미 있는 변수/함수 이름을 사용합니다
- 컴포넌트는 함수형 컴포넌트로 작성합니다
- 필요한 경우 주석을 추가합니다

### 파일 구조

```
app/              # 페이지 (App Router)
components/       # 재사용 가능한 컴포넌트
  ├── ui/        # 기본 UI 컴포넌트
  └── ...        # 도메인별 컴포넌트
lib/             # 유틸리티 함수
hooks/           # 커스텀 훅
types/           # TypeScript 타입 정의
```

## Pull Request 체크리스트

- [ ] 코드가 프로젝트 스타일 가이드를 따릅니다
- [ ] 린터 오류가 없습니다 (`npm run lint`)
- [ ] 빌드가 성공합니다 (`npm run build`)
- [ ] 변경사항을 설명하는 커밋 메시지를 작성했습니다
- [ ] 필요한 경우 문서를 업데이트했습니다

## 질문이 있으신가요?

이슈를 생성하거나 메인테이너에게 문의해주세요.

감사합니다! 🙏

