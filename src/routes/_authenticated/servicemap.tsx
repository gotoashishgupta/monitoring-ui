import { createFileRoute, redirect} from "@tanstack/react-router";
import {navMenuQueryOptions, serviceMapQueryOptions} from '#wf-local/common/queryOptions';

export const Route = createFileRoute("/_authenticated/servicemap")({
	loader: (opts) => opts.context.queryClient.ensureQueryData(serviceMapQueryOptions)
});
