import { createLazyFileRoute } from "@tanstack/react-router";
// import { ServiceMap } from "#wf-local/pages/ServiceMap";
import Dashboard from "#wf-local/pages/Dashboard";

export const Route = createLazyFileRoute("/_authenticated/servicemap")({
	component: Dashboard
});
