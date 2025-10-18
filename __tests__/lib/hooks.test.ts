import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTransactions, useTransactionStats } from "@/lib/hooks";
import * as api from "@/lib/api";

// Mock the API functions
jest.mock("@/lib/api", () => ({
  fetchTransactions: jest.fn(),
  fetchUser: jest.fn(),
  fetchWallet: jest.fn(),
  fetchFinancialMetrics: jest.fn(),
  fetchLegacyTransactions: jest.fn(),
  fetchChartData: jest.fn(),
}));

const mockApi = api as jest.Mocked<typeof api>;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children
  );
};

describe("useTransactions Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch transactions successfully", async () => {
    const mockTransactions = [
      {
        amount: 500,
        metadata: {
          name: "John Doe",
          type: "digital_product",
          email: "johndoe@example.com",
          quantity: 1,
          country: "Nigeria",
          product_name: "Rich Dad Poor Dad",
        },
        payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
        status: "successful" as const,
        type: "deposit" as const,
        date: "2022-03-03T10:00:00Z",
      },
    ];

    mockApi.fetchTransactions.mockResolvedValueOnce(mockTransactions);

    const { result } = renderHook(() => useTransactions(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTransactions);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should handle loading state", () => {
    mockApi.fetchTransactions.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useTransactions(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    const error = new Error("Failed to fetch transactions");
    mockApi.fetchTransactions.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useTransactions(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });
});

describe("useTransactionStats Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate transaction statistics correctly", async () => {
    const mockTransactions = [
      {
        amount: 500,
        status: "successful" as const,
        type: "deposit" as const,
        date: "2022-03-03T10:00:00Z",
        payment_reference: "ref1",
      },
      {
        amount: 300,
        status: "successful" as const,
        type: "withdrawal" as const,
        date: "2022-03-01T10:00:00Z",
        payment_reference: "ref2",
      },
      {
        amount: 200,
        status: "pending" as const,
        type: "deposit" as const,
        date: "2022-02-20T10:00:00Z",
        payment_reference: "ref3",
      },
    ];

    mockApi.fetchTransactions.mockResolvedValueOnce(mockTransactions);

    const { result } = renderHook(() => useTransactionStats(), { wrapper });

    await waitFor(() => {
      expect(result.current.stats).toBeDefined();
    });

    const stats = result.current.stats!;
    expect(stats.totalTransactions).toBe(3);
    expect(stats.totalDeposits).toBe(2);
    expect(stats.totalWithdrawals).toBe(1);
    expect(stats.successfulTransactions).toBe(2);
    expect(stats.pendingTransactions).toBe(1);
    expect(stats.failedTransactions).toBe(0);
    expect(stats.totalDepositAmount).toBe(500); // Only successful deposits
    expect(stats.totalWithdrawalAmount).toBe(300); // Only successful withdrawals
  });

  it("should handle empty transactions array", async () => {
    mockApi.fetchTransactions.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useTransactionStats(), { wrapper });

    await waitFor(() => {
      expect(result.current.stats).toBeDefined();
    });

    const stats = result.current.stats!;
    expect(stats.totalTransactions).toBe(0);
    expect(stats.totalDeposits).toBe(0);
    expect(stats.totalWithdrawals).toBe(0);
    expect(stats.successfulTransactions).toBe(0);
    expect(stats.pendingTransactions).toBe(0);
    expect(stats.failedTransactions).toBe(0);
    expect(stats.totalDepositAmount).toBe(0);
    expect(stats.totalWithdrawalAmount).toBe(0);
  });

  it("should only count successful transactions for amounts", async () => {
    const transactionsWithFailed = [
      {
        amount: 500,
        status: "successful" as const,
        type: "deposit" as const,
        date: "2022-03-01T10:00:00Z",
        payment_reference: "ref1",
      },
      {
        amount: 100,
        status: "failed" as const,
        type: "deposit" as const,
        date: "2022-03-02T10:00:00Z",
        payment_reference: "ref2",
      },
    ];

    mockApi.fetchTransactions.mockResolvedValueOnce(transactionsWithFailed);

    const { result } = renderHook(() => useTransactionStats(), { wrapper });

    await waitFor(() => {
      expect(result.current.stats).toBeDefined();
    });

    const stats = result.current.stats!;
    expect(stats.totalDepositAmount).toBe(500); // Only successful deposits
    expect(stats.totalWithdrawalAmount).toBe(0); // No successful withdrawals
  });
});
