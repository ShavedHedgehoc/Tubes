"use client";

import { ApiGuard } from "@/features/health-check";
import { ThemeProvider } from "@/features/theme";
import { getBrowserQueryClient } from "@/shared/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";
import { Toaster } from "sonner";
import { AppSessionProvider } from "@/entities/user";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getBrowserQueryClient();
  return (
    <AppSessionProvider>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <ApiGuard>
            <ThemeProvider>
              {children}
              <Toaster position="top-right" richColors />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </ApiGuard>
        </QueryClientProvider>
      </NuqsAdapter>
    </AppSessionProvider>
  );
}
