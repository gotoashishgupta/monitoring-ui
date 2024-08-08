import { createLazyFileRoute } from "@tanstack/react-router";
import { ServiceMap } from "#wf-local/pages/ServiceMap";

export const Route = createLazyFileRoute("/_authenticated/servicemap")({
	component: ServiceMap
});
