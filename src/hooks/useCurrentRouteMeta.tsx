import { Outlet, useMatches } from "@tanstack/react-router";
import { isEmpty } from "ramda";
import { useEffect, useState } from "react";

import { useFlattenedRoutes } from "./useFlattenedRoutes";
import { useRoute } from "./useRoute";

import type { RouteMeta } from "#wf-types/router";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

export function useCurrentRouteMeta() {
	const { push } = useRoute();

	const children = Outlet;

	const matches = useMatches();

	const flattenedRoutes = useFlattenedRoutes();

	const [currentRouteMeta, setCurrentRouteMeta] = useState<RouteMeta>();

	useEffect(() => {
		const lastRoute = matches.at(-1);
		if (!lastRoute) return;

		const { pathname, params } = lastRoute;
		const matchedRouteMeta = flattenedRoutes.find((item) => {
			return item.key === pathname || `${item.key}/` === pathname;
		});

		if (matchedRouteMeta) {
			matchedRouteMeta.outlet = children;
			if (!isEmpty(params)) {
				matchedRouteMeta.params = params;
			}
			setCurrentRouteMeta({ ...matchedRouteMeta });
		} else {
			push(HOMEPAGE);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matches]);

	return currentRouteMeta;
}
