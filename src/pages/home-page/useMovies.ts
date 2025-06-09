import { fetchMedia } from "@/shared/utils/fetchMovies";
import { useQuery } from "@tanstack/react-query";

export const useMovies = () => {
	const { data: bestMovies, isPending: isBestMoviesPending } = useQuery({
		queryKey: ["movies", "best"],
		queryFn: ({ signal }) => fetchMedia("/movie/top_rated", signal),
	});

	const { data: popularMovies, isPending: isPopularMoviesPending } = useQuery({
		queryKey: ["movies", "popular"],
		queryFn: ({ signal }) => fetchMedia("/trending/movie/week", signal),
		select: (data) => data.filter((movie) => movie.vote_count > 70 && movie.vote_average > 5.5),
	});

	const { data: upcomingMovies, isPending: isUpcomingMoviesPending } = useQuery({
		queryKey: ["movies", "upcoming"],
		queryFn: ({ signal }) => fetchMedia("/movie/now_playing", signal),
		select: (data) => data.filter((movie) => movie.vote_average > 3),
	});

	return {
		bestMovies,
		isBestMoviesPending,
		popularMovies,
		isPopularMoviesPending,
		upcomingMovies,
		isUpcomingMoviesPending,
	};
};
