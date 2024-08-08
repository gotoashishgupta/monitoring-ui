// src/store/userStore.ts
import { getItem, removeItem, setItem } from "#wf-local/common/storage";
import { IMenuItem, StorageEnum } from "#wf-types/enum";
import { create } from "zustand";
// import {mockServiceMap} from '#wf-local/_mock/navMenu'

interface ServiceMapActions {
	setServiceMap: (s) => void;
	clearServiceMap: () => void;
}

interface ServiceMapStore {
	serviceMap: { [key: string]: any };
	actions: ServiceMapActions;
}

const useServiceMapStore = create<ServiceMapStore>((set) => ({
	serviceMap: getItem<[]>(StorageEnum.ServiceMap) ?? {},
	actions: {
		setServiceMap: (serviceMap: IMenuItem[]) => {
			set({ serviceMap });
			setItem(StorageEnum.ServiceMap, serviceMap);
		},
		clearServiceMap: () => {
			set({ serviceMap: [] });
			removeItem(StorageEnum.ServiceMap);
		},
	},
}));

export const useServiceMap = () =>
	useServiceMapStore((state) => state.serviceMap);
export const useServiceMapActions = () =>
	useServiceMapStore((state) => state.actions);

export default useServiceMapStore;
