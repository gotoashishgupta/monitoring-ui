import Dashboard from "#wf-local/pages/Dashboard";
import { createLazyFileRoute, redirect} from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authenticated")({
  component: Dashboard
});
