"use client"

import { useState } from "react"
import { Bell, Menu, Grid3x3, Home, BarChart3, TrendingUp, Users, Zap, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HamburgerMenu } from "./hamburger-menu"
import { AppsModal } from "./apps-modal"
import Image from "next/image"

interface HeaderProps {
  onAppsClick?: () => void
}

export function Header({ onAppsClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAppsActive, setIsAppsActive] = useState(false)
  const [isAppsModalOpen, setIsAppsModalOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: <Image src="/header-icon-0.svg" alt="Home" width={20} height={20} /> },
    { label: "Analytics", href: "/analytics", icon: <Image src="/header-icon-1.svg" alt="Analytics" width={20} height={20} /> },
    { label: "Revenue", href: "/revenue", icon: <Image src="/header-icon-2.svg" className="invert" alt="Revenue" width={20} height={20} /> },
    { label: "CRM", href: "/crm", icon: <Image src="/header-icon-3.svg" alt="CRM" width={20} height={20} /> },
  ]

  return (
    <>
     <div className="bg-white sticky top-0 z-40  pt-3 mx-2">
      <header className=" bg-white rounded-[40px] shadow-md sticky top-3  ">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
             <Image src="/mainstack-logo.svg" alt="Logo" width={32} height={32} />
          </div>

          {/* Center Navigation */}
          <nav className="hidden sm:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`rounded-full px-3 sm:px-4 lg:px-6 transition-all duration-200 flex items-center gap-1 sm:gap-2 ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <div className={`transition-all duration-200 ${
                      isActive ? "filter brightness-0 invert" : ""
                    }`}>
                      {Icon}
                    </div>
                    {item.label}
                  </Button>
                </Link>
              )
            })}

              <div className="flex items-center gap-[0.1px] relative">
                  <Button
              onClick={() => {
                setIsAppsActive(!isAppsActive)
                setIsAppsModalOpen(!isAppsModalOpen)
                onAppsClick?.()
              }}
              className={`rounded-l-full px-3 sm:px-4 lg:px-6 transition-all duration-200 flex items-center gap-1 sm:gap-2 ${
                isAppsActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
              }`}
              variant={isAppsActive ? "default" : "ghost"}
            >
              <div className={`transition-all duration-200 ${
                isAppsActive ? "filter brightness-0 invert" : ""
              }`}>
                <Image src="/header-icon-4.svg" alt="Apps" width={20} height={20} />
              </div>
              Apps
            
              </Button>

                {isAppsActive && <Button
                  onClick={() => {
                    setIsAppsActive(!isAppsActive)
                    setIsAppsModalOpen(!isAppsModalOpen)
                    onAppsClick?.()
                  }}
                  className={`rounded-r-full px-3 sm:px-4 lg:px-6 transition-all duration-200 flex items-center gap-1 sm:gap-2 ${isAppsActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"
                    }`}
                  variant={isAppsActive ? "default" : "ghost"}
                >
               
                  <span className="text-xs  py-0.5 rounded-full"> Link in Bio</span>
                  <ChevronDown className="w-3 h-3" />
              
            
                </Button>}
                
                <AppsModal 
                  isOpen={isAppsModalOpen} 
                  onClose={() => {
                    setIsAppsModalOpen(false)
                    setIsAppsActive(false)
                  }} 
                />
          </div>
           
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
              <Image src="/chat.svg" alt="Profile" width={42} height={42} />
            </Button>
              <div className="flex items-center gap-1 bg-[#EFF1F6]  px-1  rounded-full">
            <span className="text-xs font-medium text-white bg-[#111111] opacity-80 rounded-[100%] p-2">OJ</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image src="/menu.svg" alt="Menu" width={20} height={20} />
            </Button>
</div>
          </div>
        </div>
      </header>
     </div>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
