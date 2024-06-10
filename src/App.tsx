import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// ✅ globally default to 20 seconds
			staleTime: 1000 * 20,
		},
	}
});

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} >
        <TanStackRouterDevtools
          router={router}
          initialIsOpen={false}
          position="bottom-right"
        />
      </RouterProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
	);
};

export default App;
