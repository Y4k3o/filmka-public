import { Image } from "@/components/Image";
import { MediaCreditsCast, MediaCreditsCrew } from "@/shared/types/credits";
import { Link } from "react-router";

type Props = {
	person: MediaCreditsCast | MediaCreditsCrew;
	type: "cast" | "crew";
};

export const MediaAllCastListItem = ({ person, type }: Props) => {
	const role = type === "cast" ? (person as MediaCreditsCast).character : (person as MediaCreditsCrew).job;
	const image = person.profile_path ? `https://image.tmdb.org/t/p/h632${person.profile_path}` : "/fallback-avatar.jpg";

	return (
		<div className="flex items-center justify-between gap-4 p-4 border rounded-xl shadow-sm bg-card hover:bg-muted transition-colors">
			<Link to={`/person/${person.id}`} className="flex gap-4 items-center group">
				<Image
					fallback="/fallback-avatar.jpg"
					src={image}
					alt={person.name}
					className="w-30 h-40 rounded-md object-cover shadow group-hover:scale-105 transition-transform"
				/>
				<div className="flex flex-col">
					<span className="font-semibold text-lg leading-tight">{person.name}</span>
					<span className="text-sm text-muted-foreground">{role}</span>
				</div>
			</Link>
		</div>
	);
};
