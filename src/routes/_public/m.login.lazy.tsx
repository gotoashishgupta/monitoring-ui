import { createLazyFileRoute } from "@tanstack/react-router";

import { Login } from "#wf-local/pages/Login";

export const Route = createLazyFileRoute("/_public/m/login")({
  component: Login,
});
