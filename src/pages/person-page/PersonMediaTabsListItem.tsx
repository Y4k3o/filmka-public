import { AddToListSelect } from "@/components/AddToListSelect";
import { useAuthUser } from "@/shared/api/useAuthUser";
import { CombinedPersonMediaCredits } from "@/shared/types/credits";
import { getRatingColor } from "@/shared/utils/getRatingColor";
import { Link } from "react-router";

export const PersonMediaTabsListItem = ({ item }: { item: CombinedPersonMediaCredits }) => {
	const { data: authUser } = useAuthUser();
	return (
		<li
			key={`${item.id}-${item.credit_id}`}
			className="border-b p-4 bg-background shadow-sm hover:shadow-md transition-all duration-300 hover:bg-muted/60 flex justify-around items-center  group"
		>
			<Link to={item.media_type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`} className="block cursor-pointer flex-grow pr-4">
				<div className="text-xl font-semibold hover:text-primary transition-colors duration-300">{"title" in item ? item.title : item.name}</div>

				<div className="text-lg text-muted-foreground mt-1">{"character" in item ? item.character : "job" in item ? item.job : ""}</div>

				<div className="text-sm text-muted-foreground mt-1">
					{"release_date" in item ? item.release_date : item.first_air_date || "Дата неизвестна"}
				</div>
			</Link>

			<div className="flex w-50 flex-col items-center space-y-1">
				<span className={`text-lg font-semibold ${getRatingColor(item.vote_average)}`}>
					{"vote_average" in item ? item.vote_average.toFixed(1) : "-"}
				</span>
				<span className="text-xs text-muted-foreground">{"vote_count" in item ? item.vote_count.toLocaleString() : "0"} оценок</span>
			</div>
			{authUser && (
				<div className="flex items-center space-x-3">
					<AddToListSelect id={item.id} title={item.media_type === "movie" ? item.title : item.name} type={item.media_type} />
				</div>
			)}
		</li>
	);
};
