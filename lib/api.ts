import type {
  User,
  Wallet,
  Transaction,
  FinancialMetrics,
  ChartDataPoint,
  LegacyTransaction,
} from "@/types";

// Base API configuration
const API_BASE_URL = "/api";

// Generic API error class
class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic fetch wrapper with error handling
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : "An unexpected error occurred",
      0,
      "NETWORK_ERROR"
    );
  }
}

export async function fetchUser(): Promise<User> {
  return apiRequest<User>(`${API_BASE_URL}/user`);
}

export async function fetchWallet(): Promise<Wallet> {
  return apiRequest<Wallet>(`${API_BASE_URL}/wallet`);
}

export async function fetchTransactions(): Promise<Transaction[]> {
  return apiRequest<Transaction[]>(`${API_BASE_URL}/transactions`);
}

export async function fetchFinancialMetrics(): Promise<FinancialMetrics> {
  const wallet = await fetchWallet();

  return {
    availableBalance: wallet.balance,
    ledgerBalance: wallet.ledger_balance,
    totalPayout: wallet.total_payout,
    totalRevenue: wallet.total_revenue,
    pendingPayout: wallet.pending_payout,
  };
}

// Convert transactions to legacy format for backward compatibility
export async function fetchLegacyTransactions(): Promise<LegacyTransaction[]> {
  const transactions = await fetchTransactions();

  return transactions.map((transaction, index) => ({
    id: transaction.payment_reference || `txn-${index}`,
    title:
      transaction.metadata?.product_name ||
      (transaction.type === "deposit" ? "Deposit" : "Withdrawal"),
    author: transaction.metadata?.name || "Unknown",
    amount: transaction.amount,
    date: transaction.date,
    status:
      transaction.status === "successful"
        ? "completed"
        : transaction.status === "pending"
        ? "pending"
        : "failed",
  }));
}

// Chart data generation based on actual transactions
export async function fetchChartData(): Promise<ChartDataPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get actual transactions data
  const transactions = await fetchTransactions();

  // Group transactions by date and calculate daily revenue
  const dailyRevenue = new Map<string, number>();

  transactions.forEach((transaction) => {
    if (transaction.status === "successful") {
      const date = transaction.date.split("T")[0]; // Get YYYY-MM-DD format
      const currentAmount = dailyRevenue.get(date) || 0;

      if (transaction.type === "deposit") {
        dailyRevenue.set(date, currentAmount + transaction.amount);
      } else if (transaction.type === "withdrawal") {
        dailyRevenue.set(date, currentAmount - transaction.amount);
      }
    }
  });

  // Convert to array and sort by date
  const data: ChartDataPoint[] = Array.from(dailyRevenue.entries())
    .map(([date, value]) => ({ date, value: Math.round(value) }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // If no data, return empty array
  if (data.length === 0) {
    return [];
  }

  // Fill in missing dates with 0 values for better visualization
  const filledData: ChartDataPoint[] = [];
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const existingData = data.find((item) => item.date === dateStr);
    filledData.push({
      date: dateStr,
      value: existingData ? existingData.value : 0,
    });
  }

  return filledData;
}

// Utility function to get user display name
export function getUserDisplayName(user: User): string {
  return `${user.first_name} ${user.last_name}`;
}

// Utility function to format transaction type
export function formatTransactionType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// Utility function to get transaction status color
export function getTransactionStatusColor(status: string): string {
  switch (status) {
    case "successful":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "failed":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
