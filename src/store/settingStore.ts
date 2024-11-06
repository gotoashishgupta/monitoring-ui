import { create } from "zustand";

import { getItem, removeItem, setItem } from "#wf-local/common/storage";

import {
	StorageEnum,
	ThemeColorPresets,
	ThemeLayout,
	ThemeMode,
} from "#wf-types/enum";

interface SettingsType {
	themeColorPresets: ThemeColorPresets;
	themeMode: ThemeMode;
	themeLayout: ThemeLayout;
	themeStretch: boolean;
	breadCrumb: boolean;
	multiTab: boolean;
}

interface SettingStore {
	settings: SettingsType;
	actions: {
		setSettings: (settings: SettingsType) => void;
		clearSettings: () => void;
	};
}

const useSettingStore = create<SettingStore>((set) => ({
	settings: getItem<SettingsType>(StorageEnum.Settings) || {
		themeColorPresets: ThemeColorPresets.Default,
		themeMode: ThemeMode.Light,
		themeLayout: ThemeLayout.Vertical,
		themeStretch: true,
		breadCrumb: true,
		multiTab: false,
	},
	actions: {
		setSettings: (settings) => {
			set({ settings });
			setItem(StorageEnum.Settings, settings);
		},
		clearSettings() {
			removeItem(StorageEnum.Settings);
		},
	},
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () =>
	useSettingStore((state) => state.actions);
