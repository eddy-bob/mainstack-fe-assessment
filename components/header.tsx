"use client"

import { useState } from "react"
import { Bell, Menu, Grid3x3, Home, BarChart3, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HamburgerMenu } from "./hamburger-menu"

interface HeaderProps {
  onAppsClick?: () => void
}

export function Header({ onAppsClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAppsActive, setIsAppsActive] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Revenue", href: "/revenue", icon: TrendingUp },
    { label: "CRM", href: "/crm", icon: Users },
  ]

  return (
    <>
      <header className="sticky top-4 z-50 bg-white rounded-2xl shadow-md mx-6 md:mx-8">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <div className="text-primary-foreground font-bold text-xl">M</div>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`rounded-full px-6 transition-all duration-200 flex items-center gap-2 ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}

            <Button
              onClick={() => {
                setIsAppsActive(!isAppsActive)
                onAppsClick?.()
              }}
              className={`rounded-full px-6 transition-all duration-200 flex items-center gap-2 ${
                isAppsActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
              variant={isAppsActive ? "default" : "ghost"}
            >
              <Zap className="w-4 h-4" />
              Apps
              {isAppsActive && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-background/20 ml-1">Link in Bio</span>
              )}
            </Button>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent transition-colors duration-200"
              onClick={onAppsClick}
            >
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-ring transition-all duration-200">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback>OI</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
