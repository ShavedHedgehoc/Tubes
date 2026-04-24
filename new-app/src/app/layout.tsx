import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { AppProvider } from "./_providers/app-provider";
import { getHealthCheck } from "@/features/health-check/api/get-health-check";

export const metadata: Metadata = {
  title: "Tubes",
  description: "Tubes application",
};

// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// const geistSans = Geist({
//   variable: "--font-sans",
//   subsets: ["latin", "cyrillic"],
//   display: "swap",
// });

const geistSans = localFont({
  src: "./fonts/Geist[wght].woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

// const geistMono = Geist_Mono({
//   variable: "--font-mono",
//   subsets: ["latin", "cyrillic"],
//   display: "swap",
// });

const geistMono = localFont({
  src: "./fonts/GeistMono[wght].woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getHealthCheck({ isServer: true });
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-background antialiased flex flex-col h-dvh",
          "font-sans",
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
