export interface Transaction {
  id: string
  title: string
  author: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

export interface FinancialMetrics {
  availableBalance: number
  ledgerBalance: number
  totalPayout: number
  totalRevenue: number
  pendingPayout: number
}

export interface ChartDataPoint {
  date: string
  value: number
}
