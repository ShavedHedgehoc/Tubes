import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import { cache } from "react";

// Функция для создания сконфигурированного клиента
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // На сервере staleTime должен быть чуть больше 0,
        // чтобы избежать немедленного рефетча на клиенте
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // Убеждаемся, что дегидратируются только успешные запросы
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

// 1. Для СЕРВЕРА (Server Components / Actions)
// cache() гарантирует, что QueryClient будет синглтоном В РАМКАХ ОДНОГО ЗАПРОСА
export const getQueryClient = cache(makeQueryClient);

// 2. Для КЛИЕНТА (Browser)
// Переменная для хранения клиента в браузере
let browserQueryClient: QueryClient | undefined = undefined;

export function getBrowserQueryClient() {
  if (typeof window === "undefined") {
    // На сервере всегда создаем новый через makeQueryClient (или getQueryClient)
    return makeQueryClient();
  } else {
    // В браузере создаем один раз и переиспользуем
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
