"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { X, ChevronDown, ChevronUp,  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/calendar"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  setSelectedFilter: Dispatch<SetStateAction<string[]>>
  selectedFilter: string[]
  onDateRangeChange?: (startDate: string, endDate: string) => void
}

export function FilterPanel({ isOpen, onClose, setSelectedFilter, selectedFilter, onDateRangeChange }: FilterPanelProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
   
  ])

  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [startDate, setStartDate] = useState("2023-07-27")
  const [endDate, setEndDate] = useState("2023-08-17")
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

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
     setSelectedFilter((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleTransactionStatus = (status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
    setSelectedFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleApply = () => {
    if (onDateRangeChange) {
      onDateRangeChange(startDate, endDate)
    }
    onClose()
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
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-700",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full rounded-[25px] m-2 w-full max-w-md bg-card shadow-2xl z-50 transition-transform duration-700 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Header */}
          <div className="flex items-center justify-between p-6  border-border">
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
                      "px-3 py-1.5 text-xs border font-medium rounded-full transition-colors",
                      selectedPeriod === period
                        ? "bg-primary text-primary-foreground"
                        : "bg-white  text-black hover:bg-accent hover:text-foreground",
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
                    onClick={() => {
                      setShowStartCalendar(!showStartCalendar)
                      setShowEndCalendar(false) // Close end calendar when opening start
                    }}
                    className="w-full px-3 py-3 text-sm  bg-[#eff1f6]  hover:bg-white hover:text-foreground  hover:border rounded-lg   flex items-center justify-between"
                  >
                    <span>{formatDate(startDate)}</span>
                    {showStartCalendar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showStartCalendar && (
                    <CalendarComponent
                      selectedDate={startDate}
                      onDateSelect={(date) => {
                        setStartDate(date)
                        setShowStartCalendar(false)
                      }}
                      onClose={() => setShowStartCalendar(false)}
                      isOpen={showStartCalendar}
                    />
                  )}
                </div>
                <div className="flex-1 relative">
                  <button
                    onClick={() => {
                      setShowEndCalendar(!showEndCalendar)
                      setShowStartCalendar(false) // Close start calendar when opening end
                    }}
                    className="w-full px-3 py-3 text-sm  rounded-lg  bg-[#eff1f6] hover:bg-white hover:text-foreground  hover:border flex items-center justify-between"
                  >
                    <span>{formatDate(endDate)}</span>
                    {showEndCalendar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showEndCalendar && (
                    <CalendarComponent
                      selectedDate={endDate}
                      onDateSelect={(date) => {
                        setEndDate(date)
                        setShowEndCalendar(false)
                      }}
                      onClose={() => setShowEndCalendar(false)}
                      isOpen={showEndCalendar}
                    />
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
                  className="w-full px-3 py-4 text-sm hover:bg-white hover:text-foreground  hover:border rounded-lg  bg-[#eff1f6]   flex items-center justify-between"
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
                  className="w-full px-3 py-4 text-sm rounded-lg  bg-[#eff1f6] hover:bg-white hover:text-foreground  hover:border flex items-center justify-between"
                >
                  <span className="truncate text-left">{selectedStatus.slice(0, 2).join(", ")}...</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showStatusDropdown && "rotate-180")} />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                    {statuses.map((status) => (
                     <label
                        key={status}
                        className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(status)}
                          onChange={() => toggleTransactionStatus(status)}
                          className="w-4 h-4 rounded border border-border cursor-pointer accent-black"
                        />
                        <span className="text-sm">{status}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6  border-border flex gap-3">
            <Button variant="outline" className="flex-1 rounded-full bg-transparent" onClick={()=>{setSelectedFilter([]);setSelectedStatus([]);setSelectedTypes([]); setStartDate("2023-07-27"); setEndDate("2023-08-17"); setSelectedPeriod("Last 7 days"); setShowStartCalendar(false); setShowEndCalendar(false); setShowStatusDropdown(false); setShowTypeDropdown(false); onClose()}}>
              Clear
            </Button>
            <Button className={`flex-1 rounded-full ${selectedFilter.length > 0 || selectedStatus.length > 0 || selectedTypes.length > 0 || startDate !== "2023-07-27" || endDate !== "2023-08-17" ? "bg-primary text-primary-foreground" : "opacity-20"}`}  onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
