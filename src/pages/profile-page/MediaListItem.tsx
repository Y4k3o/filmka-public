import { AddToListSelect } from "@/components/AddToListSelect";
import { Image } from "@/components/Image";
import { MediaRatingView } from "@/components/MediaRatingView";
import { SingleMedia } from "@/shared/types/media";
import { isMovie } from "@/shared/utils/isMovie";
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router";
import { useProfileStore } from "./useProfileStore";

type Props = {
	media: SingleMedia & { category: string; addedAt: Timestamp };
};

export const MediaListItem = ({ media }: Props) => {
	const title = isMovie(media) ? media.title : media.name;
	const date = isMovie(media) ? media.release_date : media.first_air_date;
	const { isOwner } = useProfileStore();

	return (
		<div className="flex gap-4 rounded-xl overflow-hidden bg-background border border-border shadow hover:shadow-md transition">
			<Link className="relative" to={isMovie(media) ? `/movie/${media.id}` : `/series/${media.id}`}>
				<Image
					fallback="/fallback-poster.jpg"
					src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
					alt={title}
					className="w-40 p-2 rounded-2xl object-cover"
				/>
				<MediaRatingView mediaId={media.id} type="list" mediaType={isMovie(media) ? "movie" : "tv"} />
			</Link>
			<div className="flex justify-between w-full items-center px-2">
				<div className="flex flex-col gap-1 w-125">
					<Link to={isMovie(media) ? `/movie/${media.id}` : `/series/${media.id}`} className="text-lg font-semibold">
						{title}
					</Link>
					<p className="text-sm text-gray-500">{date?.slice(0, 4)}</p>
					<p className="text-sm text-gray-500">{isMovie(media) ? "Фильм" : "Сериал"}</p>
				</div>
				<div className="">
					<div className="text-muted-foreground">Добавлено</div>
					<div>{media.addedAt.toDate().toLocaleDateString("ru-RU")}</div>
				</div>

				<div className="w-40 mr-10">
					{isOwner && <AddToListSelect id={media.id} type={isMovie(media) ? "movie" : "tv"} title={isMovie(media) ? media.title : media.name} />}
				</div>
			</div>
		</div>
	);
};
