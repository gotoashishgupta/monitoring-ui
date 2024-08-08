import { DashboardLayout } from "#wf-local/components/layout/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated")({
	component: DashboardLayout,
});
