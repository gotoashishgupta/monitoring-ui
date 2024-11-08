import { IMenuItem, MenuType } from "#wf-types/enum";
export const mockNavMenu: IMenuItem[] = [
	{
		id: "798103a0-45fe-4796-870b-7342e3131fe6",
		parentId: "0",
		name: "Dashboard",
		label: "sys.menu.dashboard",
		type: MenuType.MENU,
		route: "/dashboard",
		status: null,
		order: 1,
		icon: "ic-analysis",
		component: null,
		hide: null,
		hideTab: null,
		frameSrc: null,
		newFeature: null,
		children: null,
	},
	{
		id: "bd1928a9-29cc-486a-b888-1aa06751efbf",
		parentId: "0",
		name: "ServiceNetwork",
		label: "sys.menu.service_netowrk",
		type: MenuType.MENU,
		route: "/servicemap",
		status: null,
		order: 2,
		icon: "ic-analysis",
		component: null,
		hide: null,
		hideTab: null,
		frameSrc: null,
		newFeature: true,
		children: null,
	},
	{
		id: "64a2c25d-0ca9-4e29-826d-30f0ff2b4e9a",
		parentId: "0",
		name: "More",
		label: "sys.menu.more",
		type: MenuType.CATALOGUE,
		route: "/m",
		status: null,
		order: 3,
		icon: "ic-analysis",
		component: null,
		hide: null,
		hideTab: null,
		frameSrc: null,
		newFeature: null,
		children: [
			{
				id: "fead36bb-3267-4ab3-9023-40019f63ec8f",
				parentId: "64a2c25d-0ca9-4e29-826d-30f0ff2b4e9a",
				name: "About",
				label: "sys.menu.about",
				type: MenuType.MENU,
				route: "/m/about",
				status: null,
				order: 1,
				icon: "ic-analysis",
				component: null,
				hide: null,
				hideTab: null,
				frameSrc: null,
				newFeature: null,
				children: null,
			},
			{
				id: "920afb4d-8c45-4ffc-9bae-82888158cfbf",
				parentId: "64a2c25d-0ca9-4e29-826d-30f0ff2b4e9a",
				name: "login",
				label: "sys.menu.login",
				type: MenuType.MENU,
				route: "/m/login",
				status: null,
				order: 2,
				icon: "ic-analysis",
				component: null,
				hide: null,
				hideTab: null,
				frameSrc: null,
				newFeature: null,
				children: null,
			},
		],
	},
];
