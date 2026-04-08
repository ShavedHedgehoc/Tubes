// import { ApiError } from "./error.type";

// function isApiResponse(error: unknown): error is { response: { data: { message: string | string[] } } } {
//   return (
//     typeof error === "object" &&
//     error !== null &&
//     "response" in error &&
//     typeof (error as any).response?.data?.message === "string" ||
//     Array.isArray((error as any).response?.data?.message)
//   );
// }

// export const handleError = (error: Error | ApiError | unknown): string => {
//   const defaultMessage = "Неизвестная ошибка";

//   if (!error) return defaultMessage;

//   if (isApiResponse(error)) {
//     const message = error.response.data.message;
//     return Array.isArray(message) ? message[0] : message;
//   }

//   if (typeof error === "object" && error !== null && "error" in error) {
//     const apiErr = error as ApiError;
//     return apiErr.details?.message || apiErr.error || defaultMessage;
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   if (typeof error === "string") return error;

//   return defaultMessage;
// };
// function isApiResponse(error: unknown): error is { response: { data: { message: string | string[] } } } {
//   const res = (error as any)?.response?.data;
//   return typeof res?.message === "string" || Array.isArray(res?.message);
// }

// export const handleError = (error: unknown): string => {
//   const defaultMessage = "Неизвестная ошибка";

//   if (!error) return defaultMessage;

//   if (typeof error === "object" && error !== null) {
//     const errObj = error as Record<string, any>
//   }

//   if (isApiResponse(error)) {
//     const msg = error.response.data.message;
//     // Исправляем типизацию: гарантируем возврат строки
//     return Array.isArray(msg) ? msg[0] : msg;
//   }

//   if (typeof error === "object" && error !== null && "error" in error) {
//     const apiErr = error as ApiError;
//     return apiErr.details?.message || apiErr.error || defaultMessage;
//   }

//   if (error instanceof Error) return error.message;
//   if (typeof error === "string") return error;

//   return defaultMessage;
// };
// export const handleError = (error: unknown): string => {
//   const defaultMessage = "Неизвестная ошибка";

//   if (!error) return defaultMessage;

//   // 1. Проверяем прямое наличие поля message (как в вашем DEBUG LOG)
//   if (typeof error === "object" && error !== null) {
//     const errObj = error as Record<string, any>;

//     // Проверяем и в корне (ваш случай), и в response.data (для Axios)
//     const apiMessage = errObj.message || errObj.response?.data?.message;

//     if (apiMessage) {
//       return Array.isArray(apiMessage) ? apiMessage[0] : apiMessage;
//     }

//     // Дополнительная проверка для вашего ApiError ("error" в корне)
//     if ("error" in errObj && typeof errObj.error === "string") {
//       return errObj.error;
//     }
//   }

//   if (error instanceof Error) return error.message;
//   if (typeof error === "string") return error;

//   return defaultMessage;
// };
export const handleError = (error: unknown): string => {
  const defaultMessage = "Неизвестная ошибка";

  if (!error) return defaultMessage;

  if (typeof error === "object" && error !== null) {
    const apiMessage = getMessageFromUnknown(error);

    if (apiMessage) {
      return Array.isArray(apiMessage) ? apiMessage[0] : apiMessage;
    }

    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }
  }

  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return defaultMessage;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getMessageFromUnknown(error: object): string | string[] | null {
  if ("message" in error) {
    const msg = (error as Record<string, unknown>).message;
    if (typeof msg === "string" || Array.isArray(msg)) {
      return msg as string | string[];
    }
  }
  if ("response" in error) {
    const response = (error as Record<string, unknown>).response;

    if (isObject(response) && "data" in response) {
      const data = response.data;

      if (isObject(data) && "message" in data) {
        const msg = data.message;
        if (typeof msg === "string" || Array.isArray(msg)) {
          return msg as string | string[];
        }
      }
    }
  }

  return null;
}
