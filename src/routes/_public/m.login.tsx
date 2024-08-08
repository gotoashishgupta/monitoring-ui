import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/m/login")({
  validateSearch: (search) => search as { redirect?: string },
});
