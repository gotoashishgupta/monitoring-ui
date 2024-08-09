import { createFileRoute, redirect} from "@tanstack/react-router";
import {serviceMapQueryOptions} from '#wf-local/common/queryOptions';
import { DEFAULT_ENV_OPTION } from "#wf-local/common/constants";

export const Route = createFileRoute("/_authenticated/servicemap")({
	loader: (opts) => opts.context.queryClient.ensureQueryData(serviceMapQueryOptions(DEFAULT_ENV_OPTION))
});
