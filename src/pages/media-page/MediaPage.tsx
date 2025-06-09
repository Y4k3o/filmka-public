import { AddToListSelect } from "@/components/AddToListSelect";
import { Image } from "@/components/Image";
import { MediaRatingControl } from "@/components/MediaRatingControl";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthUser } from "@/shared/api/useAuthUser";
import { MediaType } from "@/shared/types/media";
import { isMovie } from "@/shared/utils/isMovie";
import { Link } from "react-router";
import { useOutletContext } from "react-router-dom";
import { MediaCard } from "../../components/MediaCard";
import { MediaSlider } from "../home-page/MediaSlider";
import { CastSection } from "./CastSection";
import { MediaDetails } from "./MediaDetails";
import { Rating } from "./Rating";
import { Trailer } from "./Trailer";
import { useSingleMedia } from "./useSingleMedia";

const MediaPage = () => {
	const { id, mediaType } = useOutletContext<{ id: number; mediaType: MediaType }>();
	const { data, credits, videos, recommendations, isPending, error } = useSingleMedia(id, mediaType);
	const { data: user } = useAuthUser();

	if (isPending) return <Skeleton className="w-full h-[80vh]" />;
	if (!data || error)
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold">{mediaType === "movie" ? "Фильм не найден " : "Сериал не найден "} или проблемы с сервером tmdb</h1>
			</div>
		);

	const title = isMovie(data) ? data.title : data.name;
	const originalTitle = isMovie(data) ? data.original_title : data.original_name;
	const vote = data.vote_average;
	const voteCount = data.vote_count;
	const trailers = videos?.results.filter((v) => v.type === "Trailer" && v.site === "YouTube");
	const mainTrailer = trailers?.[0];
	const backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : "../../assets/fallback_backdrop.jpg";
	const poster = data.poster_path ? ` https://image.tmdb.org/t/p/original${data.poster_path}` : "../../assets/fallback_poster.jpg";

	const director = credits?.crew.find((person) => person.job === "Director");
	const writers = credits?.crew
		.filter((person) => person.department === "Writing" || person.job === "Screenplay" || person.job === "Writer")
		.slice(0, 4);

	return (
		<div className="w-full text-foreground">
			<main className="relative min-h-screen">
				{backdrop && (
					<div className="absolute inset-0 z-0">
						<div
							className="absolute inset-0 z-10 bg-cover bg-top before:content-[''] before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-secondDark before:via-secondDark/50 before:to-secondDark/20"
							style={{ backgroundImage: `url(${backdrop})` }}
						></div>
					</div>
				)}

				<div className="relative z-10 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4  gap-5">
					<div className="col-start-2 col-end-5 row-end-2">
						<div className="flex flex-col md:flex-row justify-between gap-4 relative">
							<div>
								<h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
								<h2 className="text-2xl text-gray-200 italic">{originalTitle}</h2>
							</div>
							<div>
								<Rating rating={vote} voteCount={voteCount} />
							</div>
						</div>
					</div>

					<div className="row-start-1 row-end-4 relative w-full">
						<div className="flex flex-col gap-5">
							<div className="aspect-[2/3] rounded-lg border border-border shadow-xl overflow-hidden">
								<Image
									fallback="/fallback-poster.jpg"
									src={poster}
									alt={title}
									className="object-cover aspect-[2/3]"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<MediaRatingControl mediaId={data.id} type={mediaType === "movie" ? "movie" : "tv"} />
							</div>

							{user && <AddToListSelect id={data.id} type={mediaType === "movie" ? "movie" : "tv"} title={isMovie(data) ? data.title : data.name} />}

							{mainTrailer ? (
								<div className="flex-grow">
									<Trailer youtubeKey={mainTrailer.key} />
								</div>
							) : (
								<div className="flex-grow">
									<p className="text-center">Нет трейлера</p>
								</div>
							)}
						</div>
					</div>

					<div className="col-span-1 row-start-2 col-start-4 z-30">
						<div className="bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm">
							<h3 className="text-2xl font-bold text-white mb-2">В главных ролях</h3>
							{credits && <CastSection cast={credits.cast.slice(0, 10)} />}
							<Link to={`cast`} className="mt-3 text-primary cursor-pointer">
								{credits?.cast.length} актеров
							</Link>
						</div>
					</div>

					<div className="col-span-2 z-10">
						<MediaDetails mediaDetails={data} director={director} writers={writers} />

						<div className="mt-8 bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm">
							<h3 className="text-2xl font-semibold text-white mb-4">Описание</h3>
							<p className="text-gray-200 text-lg leading-relaxed">{data.overview || "Описание отсутствует."}</p>
						</div>
					</div>
				</div>
			</main>

			{/* Seasons */}
			{"seasons" in data && Array.isArray(data.seasons) && data.seasons.length > 0 && (
				<section className="max-w-6xl mx-auto px-4 py-8">
					<h2 className="text-xl font-semibold mb-4">Сезоны</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{data.seasons.map((season) => (
							<div key={season.id} className="bg-white/5 rounded-lg border border-border p-3">
								<p className="font-medium">{season.name}</p>
								<p className="text-sm text-white/60">{season.episode_count} эпизодов</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Recommendations */}
			{recommendations && recommendations?.length > 0 && (
				<section className="max-w-6xl mx-auto px-4 py-8">
					<MediaSlider
						items={recommendations}
						title="Похожие"
						renderItem={(item) => (item ? <MediaCard media={item} key={item.id} /> : <Skeleton />)}
					/>
				</section>
			)}
		</div>
	);
};
export default MediaPage;
