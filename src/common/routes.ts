import { ascend } from "ramda";

import { IMenuItem } from "#wf-types/enum";
import { AppRouteObject } from "#wf-types/router";

export const menuFilter = (items: IMenuItem[]) => {
	return items
		.filter((item) => {
			const show = !item.hide;
			if (show && item.children) {
				item.children = menuFilter(item.children);
			}
			return show;
		})
		.sort(ascend((item) => item.order || Infinity));
};

export function getRoutesFromModules() {
	const menuModules: AppRouteObject[] = [];

	const modules = import.meta.glob("./routes/modules/**/*.tsx", {
		eager: true,
	});
	Object.keys(modules).forEach((key) => {
		const mod = (modules as any)[key].default || {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		menuModules.push(...modList);
	});
	return menuModules;
}

export function getMenuRoutes(appRouteObjects: AppRouteObject[]) {
	return menuFilter(appRouteObjects);
}

export function flattenMenuRoutes(routes) {
	return routes.reduce((prev, item) => {
		const { route, children } = item;
		prev.push(item);
		if (children) prev.push(...flattenMenuRoutes(children));
		return prev;
	}, []);
}
