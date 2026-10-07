"use client";

import { Loader2 } from "lucide-react";
import {
  SessionProvider as NextAuthSessionProvider,
  useSession,
  signOut,
} from "next-auth/react";
import { useEffect } from "react";

function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  if (status === "loading" || session?.error === "RefreshAccessTokenError") {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/70 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium animate-pulse">Загрузка ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AppSessionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <NextAuthSessionProvider refetchInterval={30} refetchOnWindowFocus={true}>
      <SessionGuard>{children}</SessionGuard>
    </NextAuthSessionProvider>
  );
}
