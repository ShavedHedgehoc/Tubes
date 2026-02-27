"use client";

import { ApiGuard } from "@/features/health-check";
// import { AppSessionProvider } from "@/entities/session/app-session-provider";
import { ThemeProvider } from "@/features/theme";
// import { ComposeChildren } from "@/shared/lib/react";
import { getBrowserQueryClient } from "@/shared/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getBrowserQueryClient();
  return (
    // <ComposeChildren>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ApiGuard>
          <ThemeProvider>
            {/* <AppSessionProvider /> */}

            {children}
            <Toaster position="top-right" richColors />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </ApiGuard>
      </QueryClientProvider>
    </NuqsAdapter>
    // </ComposeChildren>
  );
}
