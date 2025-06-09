import { Skeleton } from "@/components/ui/skeleton";
import { MediaCard } from "../../components/MediaCard";
import { HeroSlider } from "./HeroSlider";
import { HeroSliderSkeleton } from "./HeroSliderSkeleton";
import { MediaSlider } from "./MediaSlider";
import { MediaSliderSkeleton } from "./MediaSliderSkeleton";
import { PersonCard } from "./PersonCard";
import { useGenres } from "./useGenres";
import { useMovies } from "./useMovies";
import { usePopularPerson } from "./usePopularPerson";
import { useSeries } from "./useSeries";

const HomePage = () => {
	const { genres: movieGenres } = useGenres("movie");
	const { genres: tvGenres } = useGenres("tv");

	const { bestMovies, isBestMoviesPending, upcomingMovies, isUpcomingMoviesPending, popularMovies, isPopularMoviesPending } = useMovies();

	const { bestSeries, isBestSeriesPending, popularSeries, isPopularSeriesPending } = useSeries();

	const { person, isPersonPending } = usePopularPerson();

	return (
		<>
			{isPopularMoviesPending || !popularMovies ? <HeroSliderSkeleton /> : <HeroSlider media={popularMovies} genres={movieGenres} />}

			{isUpcomingMoviesPending || !upcomingMovies ? (
				<MediaSliderSkeleton />
			) : (
				<MediaSlider
					title="Новые фильмы"
					items={upcomingMovies}
					renderItem={(movie) => (movie ? <MediaCard media={movie} genres={movieGenres} key={movie.id} /> : <Skeleton />)}
				/>
			)}

			{isPersonPending || !person ? (
				<MediaSliderSkeleton />
			) : (
				<MediaSlider
					title="Популярные персоны"
					items={person}
					renderItem={(person) => (person ? <PersonCard person={person} key={person.id} /> : <Skeleton />)}
				/>
			)}

			{isPopularSeriesPending || !popularSeries ? (
				<MediaSliderSkeleton />
			) : (
				<MediaSlider
					title="Популярные сериалы"
					items={popularSeries}
					renderItem={(series) => (series ? <MediaCard media={series} genres={tvGenres} key={series.id} /> : <Skeleton />)}
				/>
			)}

			{isBestMoviesPending || !bestMovies ? (
				<MediaSliderSkeleton />
			) : (
				<MediaSlider
					title="Фильмы с самым высоким рейтингом"
					items={bestMovies}
					renderItem={(movie) => (movie ? <MediaCard media={movie} genres={movieGenres} key={movie.id} /> : <Skeleton />)}
				/>
			)}
			{isBestSeriesPending || !bestSeries ? (
				<MediaSliderSkeleton />
			) : (
				<MediaSlider
					title="Сериалы с самым высоким рейтингом"
					items={bestSeries}
					renderItem={(series) => (series ? <MediaCard media={series} genres={tvGenres} key={series.id} /> : <Skeleton />)}
				/>
			)}
		</>
	);
};

export default HomePage;
