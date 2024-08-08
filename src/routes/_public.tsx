import { createFileRoute } from "@tanstack/react-router";

import { NonAuthLayout } from "#wf-local/components/layout/NonAuthLayout";

export const Route = createFileRoute("/_public")({
	component: NonAuthLayout,
});
