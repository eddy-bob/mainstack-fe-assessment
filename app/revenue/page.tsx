"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchFinancialMetrics } from "@/lib/api"
import { RevenueChart } from "@/components/revenue-chart"
import { TransactionList } from "@/components/transaction-list"
import { AppsMenu } from "@/components/apps-menu"
import { MetricCard } from "@/components/metric-card"
import { Button } from "@/components/ui/button"

export default function RevenuePage() {
  const [isAppsOpen, setIsAppsOpen] = useState(false)

  const { data: metrics } = useQuery({
    queryKey: ["financialMetrics"],
    queryFn: fetchFinancialMetrics,
  })

  return (
    <div className="min-h-screen bg-background pt-6 sm:pt-8 lg:pt-10">
      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Top Section - Available Balance and Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
            {/* Left - Available Balance and Chart */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Available Balance</div>
                  <div className="text-2xl sm:text-3xl font-bold">
                    USD{" "}
                    {metrics?.availableBalance?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? "0.00"}
                  </div>
                </div>
                <Button className="rounded-full px-6 sm:px-8 py-3 sm:py-5.5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 whitespace-nowrap w-full sm:w-auto">
                  Withdraw
                </Button>
              </div>

              {/* Chart */}
              <div className="w-full">
                <RevenueChart />
             
            </div>
            </div>

            {/* Right - Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:h-full lg:justify-between lg:flex lg:flex-col">
              <MetricCard label="Ledger Balance" value={metrics?.ledgerBalance ?? 0} />
              <MetricCard label="Total Payout" value={metrics?.totalPayout ?? 0} />
              <MetricCard label="Total Revenue" value={metrics?.totalRevenue ?? 0} />
              <MetricCard label="Pending Payout" value={metrics?.pendingPayout ?? 0} />
            </div>
          </div>

          <div className="w-full">
            <TransactionList />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AppsMenu isOpen={isAppsOpen} onClose={() => setIsAppsOpen(false)} />
    </div>
  )
}
