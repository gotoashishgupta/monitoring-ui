import { Link, Outlet } from "@tanstack/react-router";
import { isEmpty } from "ramda";
import { Suspense, lazy, useMemo } from "react";

import { flattenTrees } from "#wf-local/common/tree";
import { Iconify } from "#wf-local/components/icon";
import { CircleLoading } from "#wf-local/components/loading";
import { useNavMenu } from "#wf-local/store/navMenuStore";
import ProTag from "#wf-local/theme/antd/components/tag";

import { IMenuItem, MenuStatus, MenuType } from "#wf-types/enum";
import { AppRouteObject } from "#wf-types/router";

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
		const menuRoutes = transformNavMenuToMenuRoutes(
			navMenu || [],
			flattenedNavMenu
		);
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
	return menu.map((item) => {
		const {
			route,
			type,
			label,
			icon,
			order,
			hide,
			hideTab,
			status,
			frameSrc,
			newFeature,
			component,
			parentId,
			children = [],
		} = item;

		const appRoute: AppRouteObject = {
			path: route,
			meta: {
				label,
				key: getCompleteRoute(item, flattenedMenu),
				hideMenu: !!hide,
				hideTab,
				disabled: status === MenuStatus.DISABLE,
			},
		};

		if (order) appRoute.order = order;
		if (icon) appRoute.meta!.icon = icon;
		if (frameSrc) appRoute.meta!.frameSrc = frameSrc;

		if (newFeature) {
			appRoute.meta!.suffix = (
				<ProTag
					color="cyan"
					icon={<Iconify icon="solar:bell-bing-bold-duotone" size={14} />}
				>
					NEW
				</ProTag>
			);
		}

		if (type === MenuType.CATALOGUE) {
			appRoute.meta!.hideTab = true;
			if (!parentId) {
				appRoute.element = (
					<Suspense fallback={<CircleLoading />}>
						<Outlet />
					</Suspense>
				);
			}
			appRoute.children = transformNavMenuToMenuRoutes(children, flattenedMenu);

			if (!isEmpty(children)) {
				appRoute.children.unshift({
					index: true,
					element: <Link to={children[0].route} replace />,
				});
			}
		} else if (type === MenuType.MENU) {
			const Element = lazy(resolveComponent(component!) as any);
			if (frameSrc) {
				appRoute.element = <Element src={frameSrc} />;
			} else {
				appRoute.element = (
					<Suspense fallback={<CircleLoading />}>
						<Element />
					</Suspense>
				);
			}
		}

		return appRoute;
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
	const currentRoute = route
		? `/${menuItem.route}${route}`
		: `/${menuItem.route}`;

	if (menuItem.parentId) {
		const parentMenu = flattenedMenu.find((p) => p.id === menuItem.parentId)!;
		return getCompleteRoute(parentMenu, flattenedMenu, currentRoute);
	}

	return currentRoute;
}
