// src/store/userStore.ts
import { create } from 'zustand';
import { getItem, removeItem, setItem } from '#wf-local/common/storage';
import { StorageEnum, IMenuItem } from '#wf-types/enum';
import { DEFAULT_SERVICE_MAP_ENV_OPTION, DEFAULT_SERVICE_MAP_LAYOUT_OPTION, GRAPHIN_LAYOUT_PRESETS } from '#wf-local/common/constants';
// import {mockServiceMap} from '#wf-local/_mock/navMenu'

interface ServiceMapActions {
  setServiceMap: (s) => void;
  clearServiceMap: () => void;
  setLayout: (x) => void;
  setEnv: (x) => void;
}

interface ServiceMapStore {
  serviceMap: {[key: string]: any};
  layout: string;
  env: string;
  actions: ServiceMapActions
}

const useServiceMapStore = create<ServiceMapStore>((set) => ({
  serviceMap: getItem<[]>(StorageEnum.ServiceMap) ?? {},
  layout: getItem<string>(StorageEnum.ServiceMapLayout) ?? DEFAULT_SERVICE_MAP_LAYOUT_OPTION,
  env: getItem<string>(StorageEnum.ServiceMapEnv) ?? DEFAULT_SERVICE_MAP_ENV_OPTION,
  actions: {
    setServiceMap: (serviceMap: IMenuItem[]) => {
      set({ serviceMap });
      setItem(StorageEnum.ServiceMap, serviceMap);
    },
    clearServiceMap: () => {
      set({ serviceMap: [] });
      removeItem(StorageEnum.ServiceMap);
    },
    setLayout: (layout: string) => {
      set({ layout });
      setItem(StorageEnum.ServiceMapLayout, layout);
    },
    setEnv: (env: string) => {
      set({ env });
      setItem(StorageEnum.ServiceMapEnv, env);
    }
  }
}));

export const useServiceMap = () => useServiceMapStore((state) => {
  return {serviceMap: state.serviceMap, env: state.env, layout: state.layout}
});
export const useServiceMapActions = () => useServiceMapStore((state) => state.actions);


export default useServiceMapStore;
