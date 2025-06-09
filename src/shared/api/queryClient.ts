import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notifyApiError } from "../utils/errors";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error: unknown) => {
			if (!navigator.onLine) {
				toast.error("Нет подключения к интернету");
			} else {
				notifyApiError(error);
			}
		},
	}),
	mutationCache: new MutationCache({
		onError: (error: unknown) => {
			if (!navigator.onLine) {
				toast.error("Нет подключения к интернету");
			} else {
				notifyApiError(error);
			}
		},
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
			staleTime: 1000 * 60 * 5,
		},
		mutations: {
			retry: 1,
		},
	},
});
