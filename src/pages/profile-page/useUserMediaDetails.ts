import { api } from "@/shared/api/apiInstance";
import { SingleMedia } from "@/shared/types/media";
import { SingleMovie } from "@/shared/types/movie";
import { SingleSeries } from "@/shared/types/series";
import { useQueries } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { MediaCategory } from "./useProfileStore";
import { useUserMediaIds } from "./useUserMediaIds";

export const useUserMediaDetails = (uid: string | undefined) => {
	const { data, hasNextPage, isPending, isPlaceholderData, fetchNextPage, isFetchingNextPage } = useUserMediaIds(uid);

	const mediaList = data?.pages.flatMap((page) => page.mediaList) ?? [];

	const queries = useQueries({
		queries: mediaList.map((item) => ({
			queryKey: ["mediaDetails", item.type, item.id],
			queryFn: () => (item.type === "movie" ? api.get<SingleMovie>(`movie/${item.id}`) : api.get<SingleSeries>(`tv/${item.id}`)),
			enabled: !!item.id,
		})),
	});

	const isMediaDetailsLoading = queries.some((q) => q.isPending);

	const results = queries.map((query, i) => {
		const item = mediaList[i];
		const data = query.data?.data;

		return data
			? {
					...data,
					category: item.category,
					addedAt: item.addedAt,
			  }
			: null;
	});

	return {
		mediaDetails: results.filter(Boolean) as (SingleMedia & { category: MediaCategory; addedAt: Timestamp })[],
		isPending: isPending || isMediaDetailsLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isPlaceholderData,
	};
};
