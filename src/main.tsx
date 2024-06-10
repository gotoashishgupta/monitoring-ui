import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from '@tanstack/react-router'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import App from "./App.tsx";
import "./styles/tailwind.css";
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App router={router} />
    </StrictMode>
  )
}
