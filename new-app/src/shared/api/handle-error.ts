import { ApiError } from "./error.type";

export const handleError = (error: Error | ApiError | unknown): string => {
  const defaultMessage = "Неизвестная ошибка";

  if (!error) return defaultMessage;

  if (typeof error === "object" && error !== null && "error" in error) {
    const apiErr = error as ApiError;
    return apiErr.details?.message || apiErr.error || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") return error;

  return defaultMessage;
};
