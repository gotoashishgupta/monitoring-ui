// src/store/userStore.ts
import { create } from 'zustand';
import { getItem, removeItem, setItem } from '#wf-local/common/storage';
import { StorageEnum, IMenuItem } from '#wf-types/enum';

interface NavMenuActions {
  setNavMenu: (navMenu: IMenuItem[]) => void;
  clearNavMenu: () => void;
}

interface NavMenuStore {
  navMenu: IMenuItem[];
  actions: NavMenuActions
}

const useNavMenuStore = create<NavMenuStore>((set) => ({
  navMenu: getItem<IMenuItem[]>(StorageEnum.NavMenu) ?? [],
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
