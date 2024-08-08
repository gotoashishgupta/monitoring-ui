import { isEmpty } from "ramda";
import { useMemo } from "react";

import { flattenTrees } from "#wf-local/common/tree";
import { useNavMenu } from "#wf-local/store/navMenuStore";

import { IMenuItem } from "#wf-types/enum";

const entryPath = "/src/pages";

const pages = import.meta.glob("/src/pages/**/*.tsx");

export const pagesSelect = Object.entries(pages).map(([path]) => {
	const pagePath = path.replace(entryPath, "");
	return {
		label: pagePath,
		value: pagePath,
	};
});

function resolveComponent(path: string) {
	return pages[`${entryPath}${path}`];
}

/**
 * return routes about navMenu
 */
export function useNavMenuRoutes() {
	const navMenu = useNavMenu();

	return useMemo(() => {
		const flattenedNavMenu = flattenTrees(navMenu!);
		const menuRoutes =
			!isEmpty(navMenu) &&
			transformNavMenuToMenuRoutes(navMenu, flattenedNavMenu);
		console.log(`menuRoutes`, menuRoutes);
		return [...menuRoutes];
	}, [navMenu]);
}

/**
 * transform IMenuItem[] to  AppRouteObject[]
 * @param menu
 * @param parent
 */
function transformNavMenuToMenuRoutes(
	menu: IMenuItem[],
	flattenedMenu: IMenuItem[]
) {
	console.log(`menu->`, menu);
	return menu.map((item) => {
		console.log(`item-->`, item);
		const { children } = item;
		const menuFullRoute = {
			...item,
			...{
				route: getCompleteRoute(item, flattenedMenu),
			},
			...(children
				? {
						children: transformNavMenuToMenuRoutes(children, flattenedMenu),
					}
				: {}),
		};
		return menuFullRoute;
	});
}

/**
 * Splicing from the root permission route to the current permission route
 * @param {IMenuItem} permission - current permission
 * @param {IMenuItem[]} flattenedMenu - flattened permission array
 * @param {string} route - parent permission route
 * @returns {string} - The complete route after splicing
 */
function getCompleteRoute(
	menuItem: IMenuItem,
	flattenedMenu: IMenuItem[],
	route = ""
) {
	console.log(`item--->`, menuItem);
	const currentRoute = route
		? `/${menuItem.route}${route}`
		: `/${menuItem.route}`;
	if (menuItem.parentId) {
		const parentMenu = flattenedMenu.find((p) => p.id === menuItem.parentId)!;
		return getCompleteRoute(parentMenu, flattenedMenu, currentRoute);
	}

	return currentRoute;
}
