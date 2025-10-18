import { apiService } from "../api-service";
import type { Wallet } from "@/types";

export class WalletService {
  private static readonly ENDPOINT = "/wallet";

  // Get wallet data
  static async getWallet(): Promise<Wallet> {
    return apiService.get<Wallet>(this.ENDPOINT);
  }
}
