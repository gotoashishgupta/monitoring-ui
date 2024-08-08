import { createFileRoute } from "@tanstack/react-router";
import { Home } from "#wf-local/pages/Home";

export const Route = createFileRoute("/_authenticated/$")({
	component: Home,
});
