import { MultiSearchResultDto } from "@/shared/types/multi";
import { getRatingColor } from "@/shared/utils/getRatingColor";
import { Link } from "react-router";
import { Image } from "../Image";
import { useSearch } from "./useSearch";

export const SearchResults = ({ query }: { query: string }) => {
	const { data, isPending } = useSearch(query);

	if (!query) return null;

	const sorted = [...(data || [])].sort((a, b) => b.popularity - a.popularity);

	const renderItem = (item: MultiSearchResultDto) => {
		const isMovie = item.media_type === "movie";
		const isSeries = item.media_type === "tv";
		const isPerson = item.media_type === "person";

		const title = isMovie ? item.title : item.name;
		const originalTitle = isMovie ? item.original_title : isSeries ? item.original_name : item.known_for_department;
		const imgPath = isMovie ? item.poster_path : isSeries ? item.poster_path : item.profile_path;
		const imgUrl = imgPath ? `https://image.tmdb.org/t/p/w92${imgPath}` : null;

		return (
			<Link
				key={`${item.media_type}-${item.id}`}
				to={isMovie ? `/movie/${item.id}` : isSeries ? `/series/${item.id}` : `/person/${item.id}`}
				className="flex gap-2 p-2 rounded-lg hover:bg-accent  cursor-pointer transition-all"
			>
				{imgUrl ? (
					<Image fallback="/fallback-avatar.jpg" src={imgUrl} alt={title || ""} className="w-[48px] h-[72px] object-cover rounded-md shrink-0" />
				) : (
					<img src="/fallback-avatar.jpg" alt={title || ""} className="w-[48px] h-[72px] object-cover rounded-md shrink-0" />
				)}
				<div className="text-sm w-full">
					<div className="font-medium">{title}</div>
					<p className="text-xs line-clamp-2">{originalTitle}</p>
					<div className="flex justify-between mt-4">
						{!isPerson && <div className={`text-sm ${getRatingColor(item.vote_average)}`}>{item.vote_average.toFixed(1)}</div>}
						{!isPerson && <div className="text-sm text-primary">{isMovie ? item.release_date.slice(0, 4) : item.first_air_date.slice(0, 4)}</div>}
					</div>
				</div>
			</Link>
		);
	};

	const categories = {
		Фильмы: sorted.filter((item) => item.media_type === "movie"),
		Сериалы: sorted.filter((item) => item.media_type === "tv"),
		Персоны: sorted.filter((item) => item.media_type === "person"),
	};

	return (
		<div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-md shadow max-h-[500px] overflow-y-auto scrollbar-custom">
			{isPending ? (
				<div className="p-4 text-center">Загрузка...</div>
			) : (
				Object.entries(categories).map(([label, items]) =>
					items.length > 0 ? (
						<div key={label} className="p-2 border-b last:border-none">
							<div className="text-xs font-bold  uppercase mb-1">{label}</div>
							{items.map(renderItem)}
						</div>
					) : null
				)
			)}
		</div>
	);
};
