import { fetchMedia } from "@/shared/utils/fetchMovies";
import { useQuery } from "@tanstack/react-query";

export const useSeries = () => {
	const {
		data: bestSeries,
		isPending: isBestSeriesPending,
		error: bestSeriesError,
	} = useQuery({
		queryKey: ["series", "best"],
		queryFn: ({ signal }) => fetchMedia("/tv/top_rated", signal),
	});

	const {
		data: popularSeries,
		isPending: isPopularSeriesPending,
		error: popularSeriesError,
	} = useQuery({
		queryKey: ["series", "popular"],
		queryFn: ({ signal }) => fetchMedia("/trending/tv/week", signal),
		select: (data) => data.filter((series) => series.vote_count > 70 && series.vote_average > 5.5),
	});

	return {
		bestSeries,
		isBestSeriesPending,
		bestSeriesError,
		popularSeries,
		isPopularSeriesPending,
		popularSeriesError,
	};
};
