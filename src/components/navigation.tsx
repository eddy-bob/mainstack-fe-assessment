  import { Link, useLocation } from "react-router-dom"
import { Home, BarChart3, Wallet, Users, Grid3x3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  onAppsClick?: () => void
}

const navItems = [
  { href: "/", label: "Home", icon: Home, type: "link" as const },
  { href: "/analytics", label: "Analytics", icon: BarChart3, type: "link" as const },
  { href: "/revenue", label: "Revenue", icon: Wallet, type: "link" as const },
  { href: "/crm", label: "CRM", icon: Users, type: "link" as const },
  { href: "/apps", label: "Apps", icon: Grid3x3, type: "button" as const },
]

export function Navigation({ onAppsClick }: NavigationProps) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className="flex items-center justify-center gap-2 flex-wrap">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        if (item.type === "button") {
          return (
            <button
              key={item.label}
              onClick={onAppsClick}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                "bg-muted text-foreground hover:bg-accent hover:scale-105 hover:shadow-md",
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          )
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted text-foreground hover:bg-accent hover:scale-105 hover:shadow-md",
            )}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
