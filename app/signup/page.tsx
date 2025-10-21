import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold">
            Commu
          </Link>
          <h2 className="mt-6 text-2xl font-semibold">회원가입</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            새로운 계정을 만드세요
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                이름
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="홍길동"
              />
            </div>

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
                required
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                비밀번호 확인
              </label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              <Link href="#" className="text-primary hover:underline">
                이용약관
              </Link>
              {" "}및{" "}
              <Link href="#" className="text-primary hover:underline">
                개인정보처리방침
              </Link>
              에 동의합니다
            </label>
          </div>

          <Button type="submit" className="w-full">
            회원가입
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
            <Link href="/login" className="text-primary hover:underline">
              로그인
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

