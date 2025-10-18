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
    

      {/* Menu */}
     {isOpen && <div
        className={cn(
          "fixed top-22 right-3  rounded-[20px] pt-7  w-full max-w-xs bg-card shadow-2xl z-50 transition-transform duration-300 ease-out",
         
        )}
      >
        <div className="flex flex-col h-full">
         

          {/* User Profile Section */}
          <div className=" px-5  pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                OJ
              </div>
              <div>
                <div className="font-semibold text-sm">Olivier Jones</div>
                <div className="text-xs font-medium text-muted-foreground">olivierjones@email.com</div>
              </div>
            </div>
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
