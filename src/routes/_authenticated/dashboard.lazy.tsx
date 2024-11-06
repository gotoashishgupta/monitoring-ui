import { createLazyFileRoute } from "@tanstack/react-router";
import { Dashboard } from "#wf-local/pages/Dashboard";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
	component: Dashboard,
});
