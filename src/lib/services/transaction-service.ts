import { apiService } from "../api-service";
import type { Transaction } from "@/types";

export class TransactionService {
  private static readonly ENDPOINT = "/transactions";

  // Get all transactions
  static async getTransactions(): Promise<Transaction[]> {
    return apiService.get<Transaction[]>(this.ENDPOINT);
  }
}
