import { queryOptions } from "@tanstack/react-query";

import { getNavMenu } from "#wf-local/repositories/navMenu";
import { StorageEnum } from "#wf-types/enum";

export const navMenuQueryOptions = queryOptions({
	queryKey: [StorageEnum.NavMenu],
	queryFn: () => getNavMenu,
});
