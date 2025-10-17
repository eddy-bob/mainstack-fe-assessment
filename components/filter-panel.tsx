"use client"

import { useState } from "react"
import { X, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ])
  const [transactionStatus, setTransactionStatus] = useState("Successful, Pending, Failed")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [startDate, setStartDate] = useState("2023-07-27")
  const [endDate, setEndDate] = useState("2023-08-17")
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const transactionTypes = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ]
  const statuses = ["Successful", "Pending", "Failed"]

  const toggleTransactionType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
  }

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

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-card shadow-2xl z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Filter</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Time Period Tabs */}
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {["Today", "Last 7 days", "This month", "Last 3 months"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                      selectedPeriod === period
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium block mb-3">Date Range</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <button
                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
                  >
                    <span>{formatDate(startDate)}</span>
                    <Calendar className="w-4 h-4" />
                  </button>
                  {showStartCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 p-4">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value)
                          setShowStartCalendar(false)
                        }}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <button
                    onClick={() => setShowEndCalendar(!showEndCalendar)}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
                  >
                    <span>{formatDate(endDate)}</span>
                    <Calendar className="w-4 h-4" />
                  </button>
                  {showEndCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 p-4">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value)
                          setShowEndCalendar(false)
                        }}
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Transaction Type - Collapsible Dropdown */}
            <div>
              <label className="text-sm font-medium block mb-3">Transaction Type</label>
              <div className="relative">
                <button
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
                >
                  <span className="truncate text-left text-xs">{selectedTypes.slice(0, 2).join(", ")}...</span>
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform flex-shrink-0", showTypeDropdown && "rotate-180")}
                  />
                </button>
                {showTypeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 p-2">
                    {transactionTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleTransactionType(type)}
                          className="w-4 h-4 rounded border border-border cursor-pointer accent-black"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Transaction Status */}
            <div>
              <label className="text-sm font-medium block mb-3">Transaction Status</label>
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
                >
                  <span className="truncate text-left">{transactionStatus}</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showStatusDropdown && "rotate-180")} />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setTransactionStatus(status)
                          setShowStatusDropdown(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex gap-3">
            <Button variant="outline" className="flex-1 rounded-full bg-transparent" onClick={onClose}>
              Clear
            </Button>
            <Button className="flex-1 rounded-full" onClick={onClose}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
