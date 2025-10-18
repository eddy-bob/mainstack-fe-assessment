import {
  fetchChartData,
  getUserDisplayName,
  formatTransactionType,
  getTransactionStatusColor,
} from "@/lib/api";

// Mock the fetchTransactions function
jest.mock("@/lib/api", () => {
  const actual = jest.requireActual("@/lib/api");
  return {
    ...actual,
    fetchTransactions: jest.fn(),
  };
});

const mockFetchTransactions = jest.mocked(
  require("@/lib/api").fetchTransactions
);

describe("API Utility Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementation
    mockFetchTransactions.mockClear();
  });

  describe("getUserDisplayName", () => {
    it("should combine first and last name", () => {
      const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
      };
      expect(getUserDisplayName(user)).toBe("John Doe");
    });

    it("should handle empty names", () => {
      const user = { first_name: "", last_name: "", email: "john@example.com" };
      expect(getUserDisplayName(user)).toBe(" ");
    });
  });

  describe("formatTransactionType", () => {
    it("should capitalize first letter", () => {
      expect(formatTransactionType("deposit")).toBe("Deposit");
      expect(formatTransactionType("withdrawal")).toBe("Withdrawal");
    });

    it("should handle single character", () => {
      expect(formatTransactionType("a")).toBe("A");
    });
  });

  describe("getTransactionStatusColor", () => {
    it("should return correct colors for each status", () => {
      expect(getTransactionStatusColor("successful")).toBe("text-green-600");
      expect(getTransactionStatusColor("pending")).toBe("text-yellow-600");
      expect(getTransactionStatusColor("failed")).toBe("text-red-600");
    });

    it("should return default color for unknown status", () => {
      expect(getTransactionStatusColor("unknown")).toBe("text-gray-600");
    });
  });

  describe("fetchChartData", () => {
    it("should process transactions into chart data", async () => {
      const mockTransactions = [
        {
          amount: 100,
          status: "successful" as const,
          type: "deposit" as const,
          date: "2022-03-01T10:00:00Z",
          payment_reference: "ref1",
        },
        {
          amount: 50,
          status: "successful" as const,
          type: "withdrawal" as const,
          date: "2022-03-01T10:00:00Z",
          payment_reference: "ref2",
        },
        {
          amount: 200,
          status: "successful" as const,
          type: "deposit" as const,
          date: "2022-03-02T10:00:00Z",
          payment_reference: "ref3",
        },
      ];

      // Mock the global fetch function
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransactions,
      });

      const result = await fetchChartData();

      expect(result).toEqual([
        { date: "2022-03-01", value: 50 }, // 100 - 50
        { date: "2022-03-02", value: 200 }, // 200
      ]);
    });

    it("should exclude failed transactions", async () => {
      const mockTransactions = [
        {
          amount: 100,
          status: "successful" as const,
          type: "deposit" as const,
          date: "2022-03-01T10:00:00Z",
          payment_reference: "ref1",
        },
        {
          amount: 50,
          status: "failed" as const,
          type: "deposit" as const,
          date: "2022-03-01T10:00:00Z",
          payment_reference: "ref2",
        },
      ];

      // Mock the global fetch function
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransactions,
      });

      const result = await fetchChartData();

      expect(result).toEqual([
        { date: "2022-03-01", value: 100 }, // Only successful transaction
      ]);
    });

    it("should return empty array when no transactions", async () => {
      // Mock the global fetch function
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      const result = await fetchChartData();

      expect(result).toEqual([]);
    });

    it("should fill missing dates with zero values", async () => {
      const mockTransactions = [
        {
          amount: 100,
          status: "successful" as const,
          type: "deposit" as const,
          date: "2022-03-01T10:00:00Z",
          payment_reference: "ref1",
        },
        {
          amount: 200,
          status: "successful" as const,
          type: "deposit" as const,
          date: "2022-03-03T10:00:00Z",
          payment_reference: "ref2",
        },
      ];

      // Mock the global fetch function
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockTransactions,
      });

      const result = await fetchChartData();

      expect(result).toEqual([
        { date: "2022-03-01", value: 100 },
        { date: "2022-03-02", value: 0 }, // Filled missing date
        { date: "2022-03-03", value: 200 },
      ]);
    });
  });
});
