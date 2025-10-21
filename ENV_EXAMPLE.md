# 환경 변수 템플릿

이 파일의 내용을 `.env` 파일로 복사하여 사용하세요.

## 📝 .env 파일 생성 방법

1. 프로젝트 루트에 `.env` 파일 생성
2. 아래 내용을 복사하여 붙여넣기
3. 필요한 값들을 실제 값으로 변경

## 📋 환경 변수 템플릿

```bash
# CryptoHub 환경 변수 템플릿

# ======================
# 데이터베이스 (향후 사용)
# ======================
# DATABASE_URL="postgresql://user:password@localhost:5432/cryptohub"

# ======================
# API 엔드포인트 (향후 사용)
# ======================
# NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# ======================
# 텔레그램 API (향후 사용)
# ======================
# TELEGRAM_API_ID=""
# TELEGRAM_API_HASH=""
# TELEGRAM_BOT_TOKEN=""

# ======================
# 뉴스 API (향후 사용)
# ======================
# NEWS_API_KEY=""
# COINDESK_API_KEY=""

# ======================
# 인증 (향후 사용)
# ======================
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="your-secret-key-here"

# ======================
# OAuth (향후 사용)
# ======================
# GOOGLE_CLIENT_ID=""
# GOOGLE_CLIENT_SECRET=""

# ======================
# 이메일 (향후 사용)
# ======================
# SMTP_HOST=""
# SMTP_PORT=""
# SMTP_USER=""
# SMTP_PASSWORD=""

# ======================
# 기타
# ======================
# NODE_ENV="development"
# PORT=3000
```

## ⚠️ 주의사항

1. `.env` 파일은 **절대로** Git에 커밋하지 마세요
2. `.gitignore`에 `.env`가 포함되어 있는지 확인하세요
3. 실제 프로덕션 환경에서는 별도의 `.env.production` 사용을 권장합니다
4. 민감한 정보는 암호화하여 저장하세요

## 🔐 보안 권장사항

- **API 키**: 외부 공개 금지
- **시크릿**: 랜덤 문자열 사용 (최소 32자)
- **데이터베이스**: 강력한 비밀번호 사용
- **프로덕션**: 환경 변수 관리 서비스 사용 (Vercel, AWS Secrets Manager 등)

