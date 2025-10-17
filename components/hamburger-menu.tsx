"use client"

import { X, Settings, FileText, Users, Bug, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-xs bg-card shadow-2xl z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                OJ
              </div>
              <div>
                <div className="font-semibold text-sm">Olivier Jones</div>
                <div className="text-xs text-muted-foreground">olivier@email.com</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-6 space-y-1">
            {[
              { icon: Settings, label: "Settings" },
              { icon: FileText, label: "Purchase history" },
              { icon: Users, label: "Refer and Earn" },
              { icon: Settings, label: "Integrations" },
              { icon: Bug, label: "Report Bug" },
              { icon: Users, label: "Switch Account" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left text-sm"
                  onClick={onClose}
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Sign Out */}
          <div className="p-6 border-t border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 transition-colors text-left text-sm text-destructive">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
