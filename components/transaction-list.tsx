"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchTransactions } from "@/lib/api"
import {  ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterPanel } from "./filter-panel"
import Image from "next/image"

export function TransactionList() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string[]>([])
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">Loading transactions...</div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 pt-20 ">
        <div className="flex items-center justify-between border-b pb-5">
          <div >
            <h2 className="text-[22px] font-bold">24 Transactions</h2>
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

        <div className="space-y-2">
          {transactions?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-card rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                  <Image src="/pointer-down.svg" alt="arrow-up" width={20} height={20} />
                </div>
                <div>
                  <h3 className="font-medium text-[14px]">{transaction.title}</h3>
                  <p className="text-[12px] text-gray-500 mt-0.5">{transaction.author}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-[14px]">USD {transaction.amount}</div>
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
      </div>

      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter}   />
    </>
  )
}
