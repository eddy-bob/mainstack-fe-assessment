import { TransactionService } from "@/lib/services/transaction-service";
import { handleApiResponse, handleApiError } from "@/lib/api-service";

export async function GET() {
  try {
    const data = await TransactionService.getTransactions();
    return handleApiResponse(data);
  } catch (error) {
    return handleApiError(error, "transactions");
  }
}
