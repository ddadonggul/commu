# 프로젝트 설정 가이드

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# 데이터베이스 설정
DATABASE_URL="postgresql://user:password@localhost:5432/commu"

# 인증 설정
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API Keys
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# 이메일 설정 (선택사항)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="user@example.com"
EMAIL_SERVER_PASSWORD="password"
EMAIL_FROM="noreply@example.com"

# OAuth 설정 (선택사항)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

## 의존성 설치

```bash
# npm 사용
npm install

# yarn 사용
yarn install

# pnpm 사용
pnpm install
```

## 데이터베이스 설정 (선택사항)

데이터베이스를 사용하려면:

1. PostgreSQL 설치 및 실행
2. 데이터베이스 생성
3. DATABASE_URL 환경 변수 설정
4. 마이그레이션 실행 (Prisma 등 사용 시)

## 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 프로덕션 빌드

```bash
npm run build
npm run start
```

## 추가 설정

### VSCode 설정 (권장)

`.vscode/settings.json` 파일 생성:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Prettier 설정 (권장)

`.prettierrc` 파일 생성:

```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 문제 해결

### 포트가 이미 사용 중인 경우

```bash
# 3000번 포트를 사용하는 프로세스 종료 후
npm run dev -- -p 3001
```

### node_modules 재설치

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### 캐시 삭제

```bash
rm -rf .next
npm run dev
```

