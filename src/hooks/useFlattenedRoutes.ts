import { useCallback, useMemo } from "react";

import { flattenMenuRoutes, menuFilter } from "#wf-local/common/routes";

import { useNavMenuRoutes } from "./useNavMenuRoutes";

export function useFlattenedRoutes() {
	const flattenRoutes = useCallback(flattenMenuRoutes, []);
	const navMenuRoutes = useNavMenuRoutes();
	return useMemo(() => {
		const menuRoutes = menuFilter(navMenuRoutes);
		return flattenRoutes(menuRoutes);
	}, [flattenRoutes, navMenuRoutes]);
}
