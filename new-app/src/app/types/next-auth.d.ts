import { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Возвращается функцией `toRegisteredUserData` на бэкенде
   */
  interface IUserData {
    id: number;
    name: string;
    email: string;
    roles: string[];
  }

  /**
   * Структура объекта, который возвращает твой `authorize`
   */
  interface User {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
  }

  /**
   * Структура сессии, доступная через `useSession` или `getServerSession`
   */

  interface Session extends DefaultSession {
    user: IUserData;
    accessToken: string;
    refreshToken: string;
    error?: "RefreshAccessTokenError"; // Добавляем для обработки логаута
  }
}

declare module "next-auth/jwt" {
  /**
   * Структура JWT токена
   */
  interface JWT {
    accessToken: string;
    refreshToken: string;
    userData: {
      id: number;
      name: string;
      email: string;
      roles: string[];
    };
    expiresAt: number; // Добавлено: для логики рефреша
    error?: "RefreshAccessTokenError";
  }
}
