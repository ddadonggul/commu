import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold">
            Commu
          </Link>
          <h2 className="mt-6 text-2xl font-semibold">로그인</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            계정에 로그인하세요
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                로그인 상태 유지
              </label>
            </div>

            <Link href="#" className="text-sm text-primary hover:underline">
              비밀번호 찾기
            </Link>
          </div>

          <Button type="submit" className="w-full">
            로그인
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">계정이 없으신가요? </span>
            <Link href="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </div>
        </form>

        <div className="text-center">
          <Link href="/">
            <Button variant="ghost">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

