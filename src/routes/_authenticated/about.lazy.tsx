import { createLazyFileRoute } from "@tanstack/react-router";

function About() {
	return <div className="p-2">Hello from About!</div>;
}

export const Route = createLazyFileRoute('/_authenticated/about')({
  component: About,
})
