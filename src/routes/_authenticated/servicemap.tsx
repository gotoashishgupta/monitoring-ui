import { createFileRoute } from "@tanstack/react-router";
import {navMenuQueryOptions} from '#wf-local/common/queryOptions';

export const Route = createFileRoute("/_authenticated/servicemap")({
	loader: async ({ location, context, preload }) => {
		const navMenu = context.queryClient.ensureQueryData(navMenuQueryOptions);
	},
  wrapInSuspense: true
});
