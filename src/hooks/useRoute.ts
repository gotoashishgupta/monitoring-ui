import { useNavigate, useRouter } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRoute() {
	const navigate = useNavigate();
	const { history } = useRouter();

	const router = useMemo(
		() => ({
			back: () => history.go(-1),
			forward: () => history.go(1),
			reload: () => window.location.reload(),
			push: (href: string) => navigate({ to: href }),
			replace: (href: string) => navigate({ to: href, replace: true }),
		}),
		[history, navigate]
	);

	return router;
}
