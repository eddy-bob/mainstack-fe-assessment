import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: number
  className?: string
  showInfo?: boolean
}

export function MetricCard({ label, value, className, showInfo = true }: MetricCardProps) {
  return (
    <div className={cn("flex items-start justify-between", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-normal text-gray-600">{label}</span>
        <div className="text-2xl font-bold leading-none tracking-tight">
          USD {value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      {showInfo && (
        <button className="flex-shrink-0 mt-1 hover:opacity-70 transition-opacity">
          <Info className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  )
}
