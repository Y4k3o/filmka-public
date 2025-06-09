import { MediaRatingView } from "@/components/MediaRatingView";
import { SingleMedia } from "@/shared/types/media";
import { getRatingColorBg } from "@/shared/utils/getRatingColor";
import { isMovie } from "@/shared/utils/isMovie";
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router";
import { Image } from "../../components/Image";

type Props = {
	media: SingleMedia & { category: string; addedAt: Timestamp };
};

export const MediaCardById = ({ media }: Props) => {
	const displayTitle = isMovie(media) ? media.title : media.name;
	const navUrl = isMovie(media) ? `/movie/${media.id}` : `/series/${media.id}`;

	return (
		<Link
			to={navUrl}
			className="block group relative overflow-hidden rounded-xl shadow-lg bg-black/10 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer aspect-[2/3] min-h-[335px]"
		>
			<Image
				fallback="/fallback-poster.jpg"
				src={`https://image.tmdb.org/t/p/original${media.poster_path}`}
				alt={displayTitle}
				className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-70"
			/>
			<MediaRatingView mediaId={media.id} type="grid" mediaType={isMovie(media) ? "movie" : "tv"} />
			<div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
				<div className="space-y-1 text-white text-xs leading-tight">
					<p className="text-sm font-semibold line-clamp-2">{displayTitle}</p>

					<div className="absolute top-2 left-2 z-10">
						<div className={`flex items-center justify-center h-7 w-10 rounded-sm ${getRatingColorBg(media.vote_average)}`}>
							{media.vote_average?.toFixed(1)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
