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
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="px-8 md:px-12 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Section - Available Balance and Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Available Balance and Chart */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Available Balance</div>
                  <div className="text-3xl font-bold">
                    USD{" "}
                    {metrics?.availableBalance?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) ?? "0.00"}
                  </div>
                </div>
                <Button className="rounded-full px-8 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 whitespace-nowrap">
                  Withdraw
                </Button>
              </div>

              {/* Chart */}
              <RevenueChart />
            </div>

            {/* Right - Metrics */}
            <div className="space-y-6">
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
