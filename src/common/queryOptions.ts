import { queryOptions } from "@tanstack/react-query";

import { getNavMenu, getServiceMap, getStatus } from '#wf-local/repositories'
import { StorageEnum} from '#wf-types/enum'


export const navMenuQueryOptions = queryOptions({
  queryKey: [StorageEnum.NavMenu],
  queryFn: getNavMenu,
});

export const serviceMapQueryOptions = queryOptions({
  queryKey: [StorageEnum.ServiceMap],
  queryFn: getServiceMap,
})

export const aiStatusQueryOptions = queryOptions({
  queryKey: [StorageEnum.AIStatus],
  queryFn: getStatus,
})
