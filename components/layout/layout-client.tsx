"use client"

import { useState, useEffect, Suspense } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Bell,
  Cloud,
  MessageSquare,
  Menu,
  Moon,
  Sun,
  PanelLeft,
  PanelLeftOpen,
  Monitor,
  Smartphone,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { cn } from "@/lib/utils"

interface LayoutClientProps {
  children: React.ReactNode
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    setMounted(true)
    // 데스크톱에서만 사이드바 자동으로 열기
    if (window.innerWidth >= 768) {
      setSidebarOpen(true)
    }
  }, [])

  // 레이아웃 콘텐츠 컴포넌트
  const LayoutContent = () => (
    <>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(234, 179, 8, 0.3) 0%, rgba(0, 102, 255, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.3) 0%, rgba(234, 179, 8, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Sidebar */}
      <Suspense fallback={<div />}>
        <Sidebar
          sidebarOpen={viewMode === "desktop" ? sidebarOpen : false}
          setSidebarOpen={setSidebarOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </Suspense>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          // 모바일: 여백 없음, 데스크톱: 사이드바 상태에 따라 여백 조정
          viewMode === "mobile" 
            ? "ml-0" 
            : sidebarOpen 
              ? "ml-0 md:ml-64" 
              : "ml-0 md:ml-20"
        )}
      >
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "sticky top-0 z-20 flex items-center gap-3 border-b bg-background/95 backdrop-blur",
            viewMode === "mobile" ? "h-14 px-3" : "h-16 px-4 md:px-6"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-2xl md:hidden",
              viewMode === "mobile" && "flex"
            )}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={cn(
                  "rounded-2xl h-9 w-9",
                  viewMode === "mobile" ? "hidden" : "hidden md:flex"
                )}
              >
                {sidebarOpen ? (
                  <PanelLeft className="h-5 w-5" />
                ) : (
                  <PanelLeftOpen className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className={cn("flex items-center", viewMode === "mobile" ? "gap-1.5" : "gap-2 md:gap-3")}>
              {viewMode === "desktop" && (
                <>
                  <Button variant="ghost" size="icon" className="rounded-2xl hidden md:flex">
                    <Cloud className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-2xl hidden md:flex">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </>
              )}

              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-2xl relative",
                  viewMode === "mobile" && "h-9 w-9"
                )}
              >
                <Bell className={viewMode === "mobile" ? "h-4 w-4" : "h-5 w-5"} />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-negative text-white font-semibold",
                      viewMode === "mobile" ? "h-4 w-4 text-[10px]" : "h-5 w-5 text-xs"
                    )}
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>

              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "rounded-2xl",
                    viewMode === "mobile" && "h-9 w-9"
                  )}
                >
                  {theme === "dark" ? (
                    <Sun className={viewMode === "mobile" ? "h-4 w-4" : "h-5 w-5"} />
                  ) : (
                    <Moon className={viewMode === "mobile" ? "h-4 w-4" : "h-5 w-5"} />
                  )}
                </Button>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className={cn(
                  "border-2 border-primary cursor-pointer",
                  viewMode === "mobile" ? "h-8 w-8" : "h-9 w-9"
                )}>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content with Animation */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </div>
    </>
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* View Mode Toggle - Fixed Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 bg-background/95 backdrop-blur border rounded-full p-1.5 shadow-lg"
      >
        <Button
          variant={viewMode === "desktop" ? "default" : "ghost"}
          size="icon"
          onClick={() => setViewMode("desktop")}
          className="rounded-full h-9 w-9"
          title="데스크톱 뷰"
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "mobile" ? "default" : "ghost"}
          size="icon"
          onClick={() => setViewMode("mobile")}
          className="rounded-full h-9 w-9"
          title="모바일 뷰"
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Mobile View Container */}
      {viewMode === "mobile" ? (
        <div className="fixed inset-0 z-40 bg-muted/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-[375px] h-[812px] bg-background rounded-[3rem] shadow-2xl border-8 border-foreground/10 overflow-hidden"
          >
            {/* Mobile Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-foreground/10 rounded-b-3xl z-[60]" />
            
            {/* Mobile Content - Isolated container */}
            <div className="relative h-full w-full overflow-hidden">
              <div className="h-full overflow-auto">
                <LayoutContent />
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <LayoutContent />
      )}
    </div>
  )
}

