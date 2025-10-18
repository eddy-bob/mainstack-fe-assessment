"use client"

import { FileText, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex  items-start justify-start flex-col items-center justify-start py-12 px-4", className)}>
      {/* Icon */}
     <div>
                <div className="w-12 h-12 rounded-full bg-[#F6F7F9] flex items-center justify-center mb-4">
        {icon || (
          <FileText className="w-6 h-6 text-gray-400 rounded-full" />
        )}
      </div>
   

      {/* Title */}
      <h3 className="text-[28px] leading-11 font-bold text-[#131316] mb-2 text-start max-w-md">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[16px] text-[#56616B] mb-6 text-start max-w-sm">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          onClick={onAction}
          className="rounded-full bg-primary text-[#131316] p-6 border-none font-bold hover:bg-primary/90 "
        >
          {actionLabel}
        </Button>
      )}</div>
    </div>
  )
}

// Specific empty state for transactions
interface TransactionEmptyStateProps {
  onClearFilter?: () => void
  hasFilters?: boolean
    className?: string
    icon?: React.ReactNode
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export function TransactionEmptyState({
  onClearFilter,
  hasFilters = false,
    className,
    icon,
    title,
    description,
    actionLabel,
    onAction,
}: TransactionEmptyStateProps) {
  return (
    <EmptyState
      title={title ||   'Transaction not found'}
      description={description || "No transaction found for the selected "}
      actionLabel={actionLabel || (hasFilters ? "Clear Filter" : undefined)}
      onAction={onAction || (hasFilters ? onClearFilter : undefined)}
      icon={icon || <Filter className="w-6 h-6 text-gray-400 rounded-full" />}
      className={className}
    />
  )
}
