import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoHub - 가상화폐 커뮤니티",
  description: "실시간 가상화폐 뉴스, 에어드랍 정보, 커뮤니티 플랫폼. TDS 스타일의 깔끔하고 친숙한 UI/UX.",
  keywords: ["cryptocurrency", "bitcoin", "ethereum", "crypto news", "airdrop", "crypto community"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
