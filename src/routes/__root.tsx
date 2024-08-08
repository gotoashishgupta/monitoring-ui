import { createRootRouteWithContext } from "@tanstack/react-router";

import { QueryClient } from "@tanstack/react-query";

import { AuthContext } from "#wf-local/hooks/useAuth";
import { PageNotFound } from "#wf-local/pages/NotFound";

interface RouterContext {
	authService: AuthContext;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	notFoundComponent: PageNotFound,
});
