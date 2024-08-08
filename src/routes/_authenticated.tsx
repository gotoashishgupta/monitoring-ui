import { navMenuQueryOptions } from "#wf-local/common/queryOptions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location, context, preload }) => {
		const { isLoggedIn } = context.authService;
		if (!isLoggedIn()) {
			throw redirect({
				to: "/m/login",
				search: {
					redirect: location.href,
				},
				throw: true,
			});
		}
	},
	loader: (opts) =>
		opts.context.queryClient.ensureQueryData(navMenuQueryOptions),
});
