import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "#wf-local/pages/Home";

export const Route = createLazyFileRoute("/_authenticated/monitor")({
	component: Home,
});
