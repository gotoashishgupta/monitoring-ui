import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { HelmetProvider } from 'react-helmet-async';
import {queryClient} from '#wf-local/common/queryClient';

// Import the generated route tree
import App from "#wf-local/App";
import './locales/i18n';
import "./theme/tailwind.css";

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
            <Suspense>
              <App />
            </Suspense>
        </QueryClientProvider>
      </HelmetProvider>
  )
}
