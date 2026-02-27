import { externalApiUrl, proxyApiUrl } from "./config";
import { ApiError } from "./error.type";

type QueryParams = Record<
  string,
  string | number | string[] | null | undefined
>;

export class ApiClient {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
    console.log('Client initialized with:', this.baseUrl);
  }

  private buildUrl(endpoint: string, queryParams?: QueryParams): string {
    const base = this.baseUrl.replace(/\/$/, "");
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    let url = `${base}${path}`;

    if (queryParams) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => params.append(key, item.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
    }
    return url;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      let errorBody: ApiError;

      try {
        errorBody = await response.json();
      } catch {
        errorBody = { error: "Unknown API error" };
      }
      throw errorBody;
    }
    if (response.status === 204) {
      return {} as TResult;
    }
    try {
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as TResult);
    } catch (error) {
      console.error("JSON Parse Error:", error);
      throw new Error("Не удалось прочитать ответ от сервера (Invalid JSON)");
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: QueryParams,
  ): Promise<TResult> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return this.handleResponse<TResult>(response);
  }

  public async delete<TResult = unknown>(
    endpoint: string,
    queryParams?: QueryParams,
  ): Promise<TResult> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return this.handleResponse<TResult>(response);
  }

  public async patch<TResult = unknown, TData = unknown>(
    endpoint: string,
    body: TData = {} as TData,
    queryParams?: QueryParams,
  ): Promise<TResult> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = unknown>(
    endpoint: string,
    body: TData,
  ): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(externalApiUrl ?? "");
export const proxyApiClient = new ApiClient(proxyApiUrl ?? "");
