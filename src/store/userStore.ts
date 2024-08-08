// src/store/userStore.ts
import { getItem, removeItem, setItem } from "#wf-local/common/storage";
import { StorageEnum } from "#wf-types/enum";
import { create } from "zustand";

interface UserStore {
	auth: boolean;
	setAuth: (auth: boolean) => void;
	clearAuth: () => void;
}

const useUserStore = create<UserStore>((set) => ({
	auth: getItem<boolean>(StorageEnum.Auth) ?? false,
	setAuth: (auth: boolean) => {
		set({ auth });
		setItem(StorageEnum.Auth, auth);
	},
	clearAuth: () => {
		set({ auth: false });
		removeItem(StorageEnum.Auth);
	},
}));

export const useUserInfo = (selector: (state: UserStore) => any) =>
	useUserStore(selector);
export const useUserActions = (selector: (state: UserStore) => any) =>
	useUserStore(selector);

export default useUserStore;
