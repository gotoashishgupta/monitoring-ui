import { QueryClient } from "@tanstack/react-query";

const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: 5 * (60 * 1000),
			retry(_, error) {
				return !HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status!);
			},
		},
	},
});
