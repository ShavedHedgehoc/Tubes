import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/index.css"

import { NuqsProvider, QueryProvider, ThemeProvider } from "@/app/providers"
import { App } from "."


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NuqsProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </NuqsProvider>
    </ThemeProvider>
  </StrictMode>
)
