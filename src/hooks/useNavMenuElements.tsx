import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Iconify, SvgIcon } from "#wf-local/components/icon";
import { useSettings } from "#wf-local/store/settingStore";

import ProTag from "#wf-local/theme/antd/components/tag";
import { IMenuItem, MenuStatus, ThemeLayout } from "#wf-types/enum";
import { type ItemType } from "antd/es/menu/interface";

export const useNavMenuElements = () => {
	const { t } = useTranslation();
	const { themeLayout } = useSettings();
	const navMenuElementsFn = useCallback(
		(x: IMenuItem[]) => {
			return x
				.filter((xs) => !xs.hide!)
				.map((xs) => {
					const { icon, newFeature, children } = xs;
					const xsm = {
						...{
							key: xs.id,
							disabled: xs.status! === MenuStatus.DISABLE,
							label: (
								<div
									className={`inline-flex w-full items-center ${
										themeLayout === ThemeLayout.Horizontal
											? "justify-start"
											: "justify-between"
									}`}
								>
									<div>{t(xs["label"])}</div>
									{newFeature ? (
										<ProTag
											color="cyan"
											icon={
												<Iconify
													icon="solar:bell-bing-bold-duotone"
													size={14}
												/>
											}
										>
											NEW
										</ProTag>
									) : (
										""
									)}
								</div>
							),
						},
						...(children ? { children: navMenuElementsFn(children) } : {}),
						...(!icon
							? {}
							: typeof icon !== "string"
								? { icon }
								: {
										icon: icon.startsWith("ic") ? (
											<SvgIcon
												icon={icon}
												size={24}
												className="ant-menu-item-icon"
											/>
										) : (
											<Iconify
												icon={icon}
												size={24}
												className="ant-menu-item-icon"
											/>
										),
									}),
					};
					return xsm as ItemType;
				});
		},
		[t, themeLayout]
	);
	return navMenuElementsFn;
};

export default useNavMenuElements;
