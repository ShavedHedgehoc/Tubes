"use client";

import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/features/theme";
import { ServerFalldown } from "@/features/health-check";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background antialiased flex flex-col h-dvh",
          "font-sans",
        )}
      >
        <ThemeProvider>
          <ServerFalldown reset={reset} isAuto={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
