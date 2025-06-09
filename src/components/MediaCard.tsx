import { Image } from "@/components/Image";
import { useUserMediaMap } from "@/shared/hooks/useUserMediaMap";
import { Genre } from "@/shared/types/genre";
import { MediaInList } from "@/shared/types/media";
import { getCategoryLabel } from "@/shared/utils/getCategoryLable";
import { getGenreNames } from "@/shared/utils/getGenreNames";
import { getRatingColorBg } from "@/shared/utils/getRatingColor";
import { isMovieInList } from "@/shared/utils/isMovie";
import { Link } from "react-router";

interface MediaCardProps {
	media: MediaInList;
	genres?: Genre[];
}

export const MediaCard = ({ media, genres }: MediaCardProps) => {
	const { data: mediaMap } = useUserMediaMap();

	const category = mediaMap?.[`${media.id}-${isMovieInList(media) ? "movie" : "tv"}`];

	const genreLabel = genres ? getGenreNames(media.genre_ids, genres, 1) : null;

	const displayTitle = isMovieInList(media) ? media?.title : media?.name;
	const displayDate = isMovieInList(media) ? media.release_date?.slice(0, 4) : media.first_air_date?.slice(0, 4);
	const navUrl = isMovieInList(media) ? `/movie/${media.id}` : `/series/${media.id}`;

	return (
		<Link
			to={navUrl}
			className="block group relative overflow-hidden rounded-xl shadow-lg bg-black/10 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer aspect-[2/3] min-h-[300px]"
		>
			<Image
				fallback="/fallback-poster.jpg"
				src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
				alt={displayTitle}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-70"
			/>

			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
				<div className="space-y-1 text-white text-xs leading-tight">
					<p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>

					<div className="flex items-center justify-between">
						<div className="flex gap-1">
							{genreLabel &&
								genreLabel.map((genre) => (
									<span key={genre} className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
										{genre}
									</span>
								))}
						</div>
						<span className="text-white/70">{displayDate}</span>
					</div>

					<div className="absolute top-2 left-2 z-10">
						<div className={` flex items-center justify-center h-7 rounded-sm w-10 text-center ${getRatingColorBg(media.vote_average)}`}>
							{media.vote_average?.toFixed(1)}
						</div>
					</div>
				</div>
			</div>
			{category && (
				<div className="absolute top-2 right-2 z-10">
					<span className="text-sm px-2 py-1 rounded bg-primary text-white capitalize">{getCategoryLabel(category)}</span>
				</div>
			)}
		</Link>
	);
};
