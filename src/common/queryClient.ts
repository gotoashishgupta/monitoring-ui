import { QueryCache, QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];
const MAX_RETRIES = 6;

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			console.error(`Caught error for query '${query.queryKey}': `, error);

			if (error.message === "Cookie expired or invalid.") {
				redirect({
					to: "/",
					search: {
						redirect: location.href,
					},
				});
				return;
			} else {
				console.error(error?.message);
			}
		},
	}),
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: 5 * (60 * 1000),
			throwOnError: (error) => {
				return error.message !== "Cookie expired or invalid.";
			},
			retry: (failureCount, error) => {
				if (error.message === "Cookie expired or invalid.") {
					return false;
				}
				console.error(`Retrying query (N=${failureCount}): `, error);
				return (
					!HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status!) &&
					failureCount <= MAX_RETRIES
				);
			},
		},
		mutations: {
			onError: (error) => {
				console.log("mutation error: ", error);
				if (error instanceof Response) {
					return;
				}
				const err_message =
					typeof error === "object" && typeof (error as Error).message
						? (error as Error).message
						: `${error}`;
				console.error(err_message);
			},
		},
	},
});
