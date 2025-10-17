"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppsMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function AppsMenu({ isOpen, onClose }: AppsMenuProps) {
  const apps = [
    { name: "Link in Bio", description: "Manage your Link in Bio", color: "bg-red-500", icon: "🔗" },
    { name: "Store", description: "Manage your store activities", color: "bg-yellow-500", icon: "🛍️" },
    { name: "Media Kit", description: "Manage your Media Kit", color: "bg-green-500", icon: "📸" },
    { name: "Invoicing", description: "Manage your invoices", color: "bg-orange-500", icon: "📄" },
    { name: "Bookings", description: "Manage your Bookings", color: "bg-blue-500", icon: "📅" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Dropdown Menu */}
      <div
        className={cn(
          "fixed top-16 right-20 w-72 bg-card rounded-2xl shadow-2xl z-50 transition-all duration-300 ease-out border border-border",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="text-sm font-semibold">Apps</span>
            <button className="ml-auto text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors flex items-center gap-1">
              Link in Bio
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {apps.map((app) => (
              <button
                key={app.name}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                onClick={onClose}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold",
                    app.color,
                  )}
                >
                  {app.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{app.name}</div>
                  <div className="text-xs text-muted-foreground">{app.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
