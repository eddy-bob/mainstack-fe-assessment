import { WalletService } from "@/lib/services/wallet-service";
import { handleApiResponse, handleApiError } from "@/lib/api-service";

export async function GET() {
  try {
    const data = await WalletService.getWallet();
    return handleApiResponse(data);
  } catch (error) {
    return handleApiError(error, "wallet");
  }
}
