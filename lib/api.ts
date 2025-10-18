import type { Transaction, FinancialMetrics, ChartDataPoint } from "@/types";

// Mock API functions - replace with real API calls when ready
export async function fetchFinancialMetrics(): Promise<FinancialMetrics> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    availableBalance: 120500.0,
    ledgerBalance: 0.0,
    totalPayout: 55080.0,
    totalRevenue: 175580.0,
    pendingPayout: 0.0,
  };
}

export async function fetchChartData(): Promise<ChartDataPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate smooth wave data
  const data: ChartDataPoint[] = [];
  const startDate = new Date("2022-04-01");

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const value = 80000 + Math.sin(i / 5) * 30000 + Math.random() * 10000;

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(value),
    });
  }

  return data;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      title: "Psychology of Money",
      author: "Roy Cash",
      amount: 600,
      date: "2022-04-03",
      status: "completed",
    },
    {
      id: "2",
      title: "Buy me a coffee",
      author: "Jonathan Smart",
      amount: 100,
      date: "2022-04-02",
      status: "completed",
    },
    {
      id: "3",
      title: "How to build an online brand",
      author: "Delvan Ludicris",
      amount: 100,
      date: "2022-04-02",
      status: "completed",
    },
  ];
}
