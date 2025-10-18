import { UserService } from "@/lib/services/user-service";
import { handleApiResponse, handleApiError } from "@/lib/api-service";

export async function GET() {
  try {
    const data = await UserService.getUser();
    return handleApiResponse(data);
  } catch (error) {
    return handleApiError(error, "user");
  }
}
