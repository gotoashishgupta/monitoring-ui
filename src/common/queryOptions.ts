import { queryOptions } from "@tanstack/react-query";

import { getNavMenu, getServiceMap, getStatus } from "#wf-local/repositories";
import { StorageEnum } from "#wf-types/enum";
import { DEFAULT_SERVICE_MAP_ENV_OPTION } from "./constants";

export const navMenuQueryOptions = queryOptions({
	queryKey: [StorageEnum.NavMenu],
	queryFn: getNavMenu,
});

export const serviceMapQueryOptions = (env = DEFAULT_SERVICE_MAP_ENV_OPTION) =>
	queryOptions({
		queryKey: [StorageEnum.ServiceMap, { env }],
		queryFn: getServiceMap,
	});

export const aiStatusQueryOptions = (service, refetchInterval = -1) =>
	queryOptions({
		queryKey: [StorageEnum.AIStatus, { service }],
		queryFn: getStatus,
		...(refetchInterval > 0 ? { refetchInterval: 5000 } : {}),
	});
