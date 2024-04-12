import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./context/themeContext";
import UserContextProvider from "./context/context.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
