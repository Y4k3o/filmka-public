import { api } from "@/shared/api/apiInstance";
import { MediaInListResponse } from "@/shared/types/media";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SortValue } from "./useCatalogFilters";

type useCatalogProps = {
	mediaType: "movie" | "tv";
	query: string;
	sortBy: SortValue;
	selectedGenres: number[];
	excludedGenres: number[];
	includeAdult: boolean;
	yearFrom: string;
	yearTo: string;
	ratingFrom: string;
	ratingTo: string;
};

export const useCatalog = ({
	mediaType,
	query,
	sortBy,
	selectedGenres,
	excludedGenres,
	includeAdult,
	ratingFrom,
	ratingTo,
	yearFrom,
	yearTo,
}: useCatalogProps) => {
	const { data, isPending, isPlaceholderData, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery<MediaInListResponse>({
		queryKey: ["media-catalog", mediaType],
		queryFn: async (meta) => {
			const url = query ? `https://api.themoviedb.org/3/search/${mediaType}` : `https://api.themoviedb.org/3/discover/${mediaType}`;
			const res = await api.get<MediaInListResponse>(url, {
				params: {
					signal: meta.signal,
					page: meta.pageParam,
					query: query || undefined,
					sort_by: sortBy,
					with_genres: selectedGenres.length ? selectedGenres.join(",") : undefined,
					without_genres: excludedGenres.length ? excludedGenres.join(",") : undefined,
					include_adult: includeAdult,
					[`${mediaType === "movie" ? "primary_release_date.gte" : "first_air_date.gte"}`]: yearFrom ? `${yearFrom}-01-01` : undefined,
					[`${mediaType === "movie" ? "primary_release_date.lte" : "first_air_date.lte"}`]: yearTo ? `${yearTo}-12-31` : undefined,
					"vote_average.gte": ratingFrom ? ratingFrom : undefined,
					"vote_average.lte": ratingTo ? ratingTo : undefined,
				},
			});
			return res.data;
		},
		enabled: false,
		initialPageParam: 1,
		getNextPageParam: (result) => {
			if (result.page >= result.total_pages) return undefined;
			return result.page + 1;
		},
	});
	return { data, isPending, isPlaceholderData, fetchNextPage, isFetchingNextPage, refetch };
};
