import { authApi } from "@/features/auth";
import { handleError } from "@/shared/api";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        try {
          const response = await authApi.login({
            email: credentials.email,
            password: credentials.password,
          });
          if (response && response.accessToken) {
            return response;
          }
          return null;
        } catch (error) {
          const message = handleError(error);
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          userData: user.user,
          expiresAt: Date.now() + 30 * 60 * 1000,
        };
      }
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }
      try {
        const refreshedTokens = await authApi.refresh(token.refreshToken);
        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
          expiresAt: Date.now() + 30 * 60 * 1000,
        };
      } catch (error) {
        console.error("Refresh error:", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.userData;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
