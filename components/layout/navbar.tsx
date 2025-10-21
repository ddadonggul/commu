"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 클라이언트 사이드에서만 렌더링
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/", label: "뉴스" },
    { href: "/telegram", label: "텔레그램" },
    { href: "/airdrops", label: "에어드랍" },
    { href: "/community", label: "커뮤니티" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
              C
            </div>
            <span className="text-xl font-bold">CryptoHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-semibold transition-smooth rounded-lg",
                    pathname === item.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
            )}
            
            <Link href="/login">
              <Button variant="ghost" className="rounded-xl">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-xl">
                시작하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-1 pb-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-sm font-semibold transition-smooth rounded-lg",
                  pathname === item.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

