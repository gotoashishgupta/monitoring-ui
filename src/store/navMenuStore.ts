// src/store/userStore.ts
import { create } from 'zustand';
import { getItem, removeItem, setItem } from '#wf-local/common/storage';
import { StorageEnum, IMenuItem } from '#wf-types/enum';
import {mockNavMenu} from '#wf-local/_mock/navMenu'

interface NavMenuActions {
  setNavMenu: (navMenu: IMenuItem[]) => void;
  clearNavMenu: () => void;
}

interface NavMenuStore {
  navMenu: IMenuItem[];
  actions: NavMenuActions
}

const useNavMenuStore = create<NavMenuStore>((set) => ({
  navMenu: getItem<IMenuItem[]>(StorageEnum.NavMenu) ?? mockNavMenu,
  actions: {
    setNavMenu: (navMenu: IMenuItem[]) => {
      set({ navMenu });
      setItem(StorageEnum.NavMenu, navMenu);
    },
    clearNavMenu: () => {
      set({ navMenu: [] });
      removeItem(StorageEnum.NavMenu);
    }
  }
}));

export const useNavMenu = () => useNavMenuStore((state) => state.navMenu);
export const useNavMenuActions = () => useNavMenuStore((state) => state.actions);


export default useNavMenuStore;
