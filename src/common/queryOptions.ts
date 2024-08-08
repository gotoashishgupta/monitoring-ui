import { queryOptions } from "@tanstack/react-query";

import { getNavMenu } from "#wf-local/repositories/navMenu";
import { getServiceMap } from "#wf-local/repositories/serviceMap";
import { StorageEnum } from "#wf-types/enum";

export const navMenuQueryOptions = queryOptions({
	queryKey: [StorageEnum.NavMenu],
	queryFn: getNavMenu,
});

export const serviceMapQueryOptions = queryOptions({
	queryKey: [StorageEnum.ServiceMap],
	queryFn: getServiceMap,
});
