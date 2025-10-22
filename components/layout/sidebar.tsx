"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Newspaper,
  Gift,
  MessageSquare,
  Send,
  ChevronDown,
  Settings,
  X,
  TrendingUp,
  Users,
  Bell,
  Sparkles,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Sidebar({ 
  sidebarOpen, 
  setSidebarOpen,
  mobileMenuOpen, 
  setMobileMenuOpen 
}: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const sidebarItems = [
    {
      title: "홈",
      href: "/",
      icon: <Home />,
      isActive: pathname === "/",
    },
    {
      title: "뉴스",
      href: "/news",
      icon: <Newspaper />,
      isActive: pathname === "/news",
    },
    {
      title: "텔레그램",
      href: "/telegram",
      icon: <Send />,
      isActive: pathname.startsWith("/telegram"),
      subItems: [
        {
          title: "마인드쉐어",
          href: "/telegram?tab=mindshare",
          isActive: pathname === "/telegram" && (searchParams.get("tab") === "mindshare" || searchParams.get("tab") === null),
        },
        {
          title: "포스팅",
          href: "/telegram?tab=posts",
          isActive: pathname === "/telegram" && searchParams.get("tab") === "posts",
        },
      ],
    },
    {
      title: "에어드랍",
      href: "/airdrops",
      icon: <Gift />,
      badge: "NEW",
      isActive: pathname === "/airdrops",
    },
    {
      title: "커뮤니티",
      href: "/community",
      icon: <MessageSquare />,
      isActive: pathname === "/community",
    },
  ]

  // Auto-expand telegram submenu if on telegram page
  useEffect(() => {
    if (pathname.startsWith("/telegram")) {
      setExpandedItems((prev) => ({ ...prev, "텔레그램": true }))
    }
  }, [pathname])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const SidebarContent = ({ isDesktop = false, isMobileMenu = false }: { isDesktop?: boolean; isMobileMenu?: boolean }) => {
    // 모바일 메뉴가 열렸을 때는 항상 확장된 상태로 표시
    const isExpanded = isMobileMenu || sidebarOpen
    
    return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="size-5" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-lg truncate">코뮤니티</h2>
              <p className="text-xs text-muted-foreground truncate">Co-mmunity</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <motion.div 
              className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="size-5" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              <motion.div 
                className="mb-1"
                whileHover={{ x: isExpanded ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {item.subItems ? (
                  // Item with submenu - 클릭 시 페이지 이동과 서브메뉴 확장
                  <div>
                    <Link
                      href={item.href}
                      onClick={() => {
                        toggleExpanded(item.title)
                        setMobileMenuOpen(false)
                      }}
                      className={cn(
                        "flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
                        isExpanded ? "justify-between" : "justify-center",
                        item.isActive 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                      title={!isExpanded ? item.title : undefined}
                    >
                      <div className={cn("flex items-center gap-3", !isExpanded && "justify-center")}>
                        {item.icon}
                        {isExpanded && <span>{item.title}</span>}
                      </div>
                      {isExpanded && (
                        <ChevronDown 
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            expandedItems[item.title] && "rotate-180"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                ) : (
                  // Regular link
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex w-full items-center rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative",
                      isExpanded ? "justify-between" : "justify-center",
                      item.isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                    title={!isExpanded ? item.title : undefined}
                  >
                    <div className={cn("flex items-center gap-3", !isExpanded && "justify-center")}>
                      {item.icon}
                      {isExpanded && <span>{item.title}</span>}
                    </div>
                    {isExpanded && item.badge && (
                      <Badge variant="secondary" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {!isExpanded && item.badge && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                      </span>
                    )}
                  </Link>
                )}
              </motion.div>

              {/* Submenu items */}
              {item.subItems && isExpanded && (
                <AnimatePresence>
                  {expandedItems[item.title] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-border pl-3">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                              subItem.isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats - Only show when expanded */}
        {isExpanded && (
          <div className="mt-6 space-y-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Stats
            </p>
            <div className="space-y-1">
              <motion.div 
                className="flex items-center justify-between rounded-2xl px-3 py-2 bg-positive/10 hover:bg-positive/15 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-positive" />
                  <span className="text-sm font-medium">시장 상승</span>
                </div>
                <Badge variant="outline" className="bg-positive/20 text-positive border-positive/30">
                  +5.2%
                </Badge>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between rounded-2xl px-3 py-2 bg-primary/10 hover:bg-primary/15 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">활성 사용자</span>
                </div>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                  1.2K
                </Badge>
              </motion.div>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t p-3">
        <div className="space-y-1">
          <Link href="/settings">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full rounded-2xl hover:bg-muted",
                isExpanded ? "justify-start gap-3" : "justify-center"
              )}
              size="sm"
              title={!isExpanded ? "설정" : undefined}
            >
              <Settings className="h-4 w-4" />
              {isExpanded && <span>설정</span>}
            </Button>
          </Link>
          
          <motion.div 
            className={cn(
              "flex w-full items-center rounded-2xl px-3 py-2 hover:bg-muted cursor-pointer transition-colors",
              isExpanded ? "justify-between" : "justify-center"
            )}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            title={!isExpanded ? "사용자" : undefined}
          >
            {isExpanded ? (
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-7 w-7 border-2 border-primary shrink-0">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">사용자</span>
                  <span className="text-xs text-muted-foreground truncate">user@email.com</span>
                </div>
              </div>
            ) : (
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <h2 className="font-bold">코뮤니티</h2>
                  <p className="text-xs text-muted-foreground">Crypto Community</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="h-9 w-9">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent isMobileMenu={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-30 hidden bg-background border-r md:block overflow-hidden"
      >
        <SidebarContent isDesktop={true} isMobileMenu={false} />
      </motion.div>
    </>
  )
}

