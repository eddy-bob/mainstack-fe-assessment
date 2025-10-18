import { apiService } from "../api-service";
import type { User } from "@/types";

export class UserService {
  private static readonly ENDPOINT = "/user";

  // Get user data
  static async getUser(): Promise<User> {
    return apiService.get<User>(this.ENDPOINT);
  }
}
