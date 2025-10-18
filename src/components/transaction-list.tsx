"use client"
 
import { useState } from "react"
import { useTransactions, } from "@/lib/hooks"
import { formatTransactionType } from "@/lib/api"
import { ChevronDown, Download, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterPanel } from "./filter-panel"
import { Alert, AlertDescription } from "./ui/alert"
import { TransactionEmptyState } from "./empty-state"
// Using regular img tags instead of Next.js img

export function   TransactionList() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string } | null>(null)
  
  const { data: transactions, isLoading, isError, error } = useTransactions()

  // Clear all filters
  const handleClearFilter = () => {
    setSelectedFilter([])
    setDateRange(null)
  }

  // Handle date range change from filter panel
  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate })
    // Add date range to selectedFilter for count tracking
    const dateFilterKey = `date-${startDate}-${endDate}`
    setSelectedFilter(prev => {
      // Remove any existing date filters
      const filtered = prev.filter(f => !f.startsWith('date-'))
      // Add new date filter
      const newFilters = [...filtered, dateFilterKey]
      return newFilters
    })
  }

  // Check if there are any active filters
  const hasActiveFilters = selectedFilter.length > 0 || dateRange !== null
  

  // Filter transactions based on selected filters
  const filteredTransactions = transactions?.filter((transaction) => {
    if (!hasActiveFilters) return true
    
    // Date range filtering
    if (dateRange) {
      const transactionDate = transaction.date.split('T')[0] // Get YYYY-MM-DD format
      const startDate = dateRange.startDate
      const endDate = dateRange.endDate
      

      if (transactionDate < startDate || transactionDate > endDate) {
        return false
      }
    }
    
    // Filter out date filters and check if there are any type/status filters
    const nonDateFilters = selectedFilter.filter(f => !f.startsWith('date-'))
    
    // If no type/status filters, return true (date filter already applied above)
    if (nonDateFilters.length === 0) return true
    
    // Map filter panel options to actual transaction data
    const filterMap: { [key: string]: string[] } = {
      "Store Transactions": ["deposit"],
      "Withdrawals": ["withdrawal"],
      "Get Tipped": ["deposit"],
      "Chargebacks": ["withdrawal"],
      "Cashbacks": ["deposit"],
      "Refer & Earn": ["deposit"],
      "Successful": ["successful"],
      "Pending": ["pending"],
      "Failed": ["failed"]
    }
    
    // Check if transaction matches any selected filter
    for (const filter of nonDateFilters) {
      const matchingValues = filterMap[filter] || []
      
      // Check transaction type
      if (matchingValues.includes(transaction.type)) {
        return true
      }
      
      // Check transaction status
      if (matchingValues.includes(transaction.status)) {
        return true
      }
    }
    
    return false
  }) || []


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading transactions...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-6 pt-20">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load transactions. {error?.message || "Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 sm:pt-20 pt-10">
        <div className="flex items-center justify-between border-b pb-5">
          <div >
            <h2 className="text-[22px] font-bold">
              {filteredTransactions.length} Transactions
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">Your transactions for the last 7 days</p>
          </div>
          <div className="flex items-center gap-3 ">
            <Button
              variant="outline"
              className="rounded-full bg-card hover:bg-gray-50 transition-all duration-200 hover:shadow-sm border-gray-200"
              onClick={() => setIsFilterOpen(true)}
            >
              Filter {selectedFilter.length >0  && <span className="rounded-full py-0.5 px-1.5 text-xs text-white bg-black">
                { selectedFilter.length  }
              </span>}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-card hover:bg-gray-50 transition-all duration-200 hover:shadow-sm border-gray-200"
            >
              Export list
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <TransactionEmptyState
            onClearFilter={handleClearFilter}
            hasFilters={hasActiveFilters}
            icon={<img src="/receipt-long.svg" alt="Empty State" width={30} height={30}/>}
            title="No matching transaction found for the selected filter"
            description="Change your filters to see more results, or add a new product."
            actionLabel="Clear Filter"
            onAction={handleClearFilter}
            
          />
        ) : (
          <div className="space-y-2">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={transaction.payment_reference || `txn-${index}`}
                className="flex items-center justify-between py-4 bg-card rounded-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === "deposit" ? "bg-[#E3FCF2]" : "bg-[#F9E3E0]"
                  }`}>
                    <img 
                      src={transaction.type === "deposit" ? "/pointer-down.svg" : "/pointer-up.svg"} 
                      alt={transaction.type} 
                      width={20} 
                      height={20} 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[14px]">
                      {transaction.metadata?.product_name || formatTransactionType(transaction.type)}
                    </h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      {transaction.metadata?.name || "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-extrabold text-[14px]`}>
                   USD {transaction.amount.toLocaleString()}
                  </div>
                  <div className="text-[12px] text-gray-500 font-semibold mt-0.5">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        setSelectedFilter={setSelectedFilter} 
        selectedFilter={selectedFilter}
        onDateRangeChange={handleDateRangeChange}
      />
    </>
  )
}
