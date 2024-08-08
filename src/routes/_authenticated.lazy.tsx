import {DashboardLayout} from '#wf-local/components/layout/dashboard';
import { createLazyFileRoute, redirect} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated")({
  component: DashboardLayout
});
