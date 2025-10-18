// API service for React app

// Base API configuration
const EXTERNAL_API_BASE_URL = "https://fe-task-api.mainstack.io";

// HTTP Methods enum
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

// API Error class
export class ApiServiceError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiServiceError";
  }
}

// Base API service class
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = EXTERNAL_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    method: HttpMethod = HttpMethod.GET,
    body?: any,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };

    const config: RequestInit = {
      method,
      headers: defaultHeaders,
    };

    if (body && method !== HttpMethod.GET) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiServiceError(
          errorData.message || `HTTP error! status: ${response.status}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error;
      }

      // Network or other errors
      throw new ApiServiceError(
        error instanceof Error ? error.message : "An unexpected error occurred",
        0,
        "NETWORK_ERROR"
      );
    }
  }

  // HTTP method wrappers
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.GET, undefined, headers);
  }

  async post<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.POST, body, headers);
  }

  async put<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.PUT, body, headers);
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.PATCH, body, headers);
  }

  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, HttpMethod.DELETE, undefined, headers);
  }
}

// Create a singleton instance
export const apiService = new ApiService();

// Helper function to handle API errors
export function handleApiError(
  error: unknown,
  resourceName: string
): { error: string; code?: string } {
  console.error(`Error fetching ${resourceName} data:`, error);

  if (error instanceof ApiServiceError) {
    return {
      error: error.message,
      code: error.code,
    };
  }

  return {
    error: `Failed to fetch ${resourceName} data`,
  };
}
