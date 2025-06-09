import { Image } from "@/components/Image";
import { Card, CardContent } from "@/components/ui/card";
import { CombinedPersonMediaCredits } from "@/shared/types/credits";
import { getGenreNames } from "@/shared/utils/getGenreNames";
import { getRatingColorBg } from "@/shared/utils/getRatingColor";
import { useState } from "react";
import { Link } from "react-router";
import { useGenres } from "../home-page/useGenres";

interface BestMediaListProps {
	mediaItems: CombinedPersonMediaCredits[];
}

export const BestMediaList = ({ mediaItems }: BestMediaListProps) => {
	const [hoveredMedia, setHoveredMedia] = useState<CombinedPersonMediaCredits | null>(null);

	const [isHoveringCard, setIsHoveringCard] = useState(false);

	const { genres, isGenresPending } = useGenres();

	return (
		<div className="relative flex flex-col gap-2">
			<ul className="flex flex-col">
				{mediaItems.map((media) => (
					<Link
						key={media.id}
						to={media.media_type === "movie" ? `/movie/${media.id}` : `/series/${media.id}`}
						onMouseEnter={() => setHoveredMedia(media)}
						onMouseLeave={() => {
							if (!isHoveringCard) setHoveredMedia(null);
						}}
						className="cursor-pointer pb-0.5 rounded-md hover:text-primary transition-colors"
					>
						{media.media_type === "movie" ? media.title : media.name}
					</Link>
				))}
			</ul>

			{hoveredMedia && (
				<div
					className="absolute top-0 right-full mr-9 w-80 z-10"
					onMouseEnter={() => setIsHoveringCard(true)}
					onMouseLeave={() => {
						setIsHoveringCard(false);
						setHoveredMedia(null);
					}}
				>
					<Card className="shadow-lg animate-fade-in z-10 bg-background ">
						<CardContent className="flex flex-col gap-2">
							<Image
								fallback="/fallback-poster.jpg"
								src={`https://image.tmdb.org/t/p/w500${hoveredMedia.poster_path}`}
								alt={hoveredMedia.media_type === "movie" ? hoveredMedia.title : hoveredMedia.name}
								className="rounded-md object-cover"
							/>
							<div className="absolute top-8 left-8">
								<div
									className={`inline-flex items-center justify-center text-sm font-bold w-10 h-4 rounded-sm p-4 ${getRatingColorBg(
										hoveredMedia.vote_average
									)}`}
								>
									{hoveredMedia.vote_average.toFixed(1)}
								</div>
							</div>
							<h3 className="text-lg font-semibold">{hoveredMedia.media_type === "movie" ? hoveredMedia.title : hoveredMedia.name}</h3>
							<p className="text-sm text-muted-foreground">
								{hoveredMedia.media_type === "movie" ? hoveredMedia.release_date.slice(0, 4) : hoveredMedia.first_air_date.slice(0, 4)}
							</p>
							<ul className="flex gap-2">
								{genres != undefined && !isGenresPending
									? getGenreNames(hoveredMedia.genre_ids, genres)?.map((name, index) => (
											<li className="cursor-pointer hover:text-primary" key={index}>
												{name}
												{index < 2 ? ", " : ""}
											</li>
									  ))
									: "Загрузка..."}
							</ul>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};
