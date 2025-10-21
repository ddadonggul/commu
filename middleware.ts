import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 미들웨어 - 요청을 가로채서 처리할 수 있습니다
export function middleware(request: NextRequest) {
  // 예: 인증 체크, 리디렉션 등
  
  return NextResponse.next()
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

