# 환경 변수 설정 가이드

`.env` 파일은 보안상 Git에 포함되지 않습니다. 
다음 내용을 참고하여 프로젝트 루트에 `.env.local` 파일을 생성하세요.

## 필수 환경 변수

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 데이터베이스 설정
DATABASE_URL="postgresql://user:password@localhost:5432/commu"

# 인증 설정
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API 설정
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

## 선택적 환경 변수

필요에 따라 추가할 수 있는 환경 변수들:

### 이메일 설정
```env
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="user@example.com"
EMAIL_SERVER_PASSWORD="password"
EMAIL_FROM="noreply@example.com"
```

### OAuth 인증 (Google)
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### OAuth 인증 (GitHub)
```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 파일 업로드 (S3 등)
```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
```

## 환경별 설정

- `.env.local` - 로컬 개발 환경 (Git에 포함되지 않음)
- `.env.development` - 개발 환경 기본값
- `.env.production` - 프로덕션 환경
- `.env.test` - 테스트 환경

## 보안 주의사항

1. **절대 Git에 커밋하지 마세요**: `.env.local`, `.env` 파일은 `.gitignore`에 포함되어 있습니다.
2. **시크릿 키 생성**: 강력한 랜덤 문자열을 사용하세요.
   ```bash
   # 시크릿 키 생성 예시
   openssl rand -base64 32
   ```
3. **프로덕션 환경**: Vercel, AWS 등 배포 플랫폼의 환경 변수 설정을 사용하세요.

## 빠른 시작

```bash
# 1. 이 파일을 복사
cp ENV_SETUP_GUIDE.md .env.local

# 2. .env.local 파일을 열고 실제 값으로 수정
# 3. 개발 서버 실행
npm run dev
```

## 문제 해결

### 환경 변수가 적용되지 않는 경우

1. 서버를 재시작하세요 (`Ctrl+C` 후 `npm run dev`)
2. `.next` 폴더를 삭제하고 다시 빌드하세요
   ```bash
   rm -rf .next
   npm run dev
   ```

### NEXTAUTH_SECRET 생성

```bash
# Node.js로 생성
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 또는 OpenSSL로 생성
openssl rand -base64 32
```

## 참고 자료

- [Next.js 환경 변수 문서](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel 환경 변수 설정](https://vercel.com/docs/concepts/projects/environment-variables)

