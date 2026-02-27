type ApiErrorDetails = {
  statusCode: number;
  message: string;
};
export type ApiError = {
  error: string;
  details?: ApiErrorDetails;
};
