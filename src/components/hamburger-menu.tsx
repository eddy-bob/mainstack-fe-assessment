"use client"

import { X, Settings, FileText, Users, Bug, LogOut, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUser } from "@/lib/hooks"
import { getUserDisplayName } from "@/lib/api"

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const { data: user, isLoading, isError } = useUser();

  return (
    <>
      {/* Menu */}
     {isOpen && <div
        className={cn(
          "fixed top-[90px] right-3  rounded-[20px] pt-7  w-full max-w-xs bg-card shadow-2xl z-50 transition-transform duration-300 ease-out",
         
        )}
      >
        <div className="flex flex-col h-full">
         

          {/* User Profile Section */}
          <div className=" px-5  pb-4">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-32"></div>
                </div>
              </div>
            ) : isError ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-semibold">
                  ?
                </div>
                <div>
                  <div className="font-semibold text-sm text-destructive">Error</div>
                  <div className="text-xs font-medium text-muted-foreground">Failed to load user</div>
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{getUserDisplayName(user)}</div>
                  <div className="text-xs font-medium text-muted-foreground">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
                  ?
                </div>
                <div>
                  <div className="font-semibold text-sm">Unknown User</div>
                  <div className="text-xs font-medium text-muted-foreground">No data available</div>
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-1">
            {[
              { icon: Settings, label: "Settings" },
              { icon: FileText, label: "Purchase history" },
              { icon: Users, label: "Refer and Earn" },
              { icon: Settings, label: "Integrations" },
              { icon: Bug, label: "Report Bug" },
              { icon: Users, label: "Switch Account" },
              { icon: LogOut, label: "Sign Out" },

            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-4  rounded-lg hover:bg-accent transition-colors text-left text-sm"
                  onClick={onClose}
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold text-xs opacity-80">{item.label}</span>
                </button>
              )
            })}
          </div>

         
        </div>
      </div>}
    </>
  )
}
