import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Person } from "@/shared/types/person";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router";

type PersonCardProps = {
	person: Person;
};

export const PersonCard = ({ person }: PersonCardProps) => {
	const imageUrl = person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : "../../assets/fallback-avatar.jpg";

	return (
		<Link
			to={`/person/${person.id}`}
			className=" block relative group w-50 overflow-hidden rounded-4xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
		>
			<Image
				fallback="/fallback-avatar.jpg"
				src={imageUrl}
				alt={person.name}
				className="w-full h-64 object-cover group-hover:scale-105 group-hover:opacity-70 transition-transform duration-500"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white z-10 hover:text-rose-400">
					<Heart className="w-4 h-4" />
				</Button>

				<div className="absolute bottom-0 w-full p-3 text-white z-10">
					<h3 className="text-sm font-semibold truncate">{person.name}</h3>

					<div className="flex items-center justify-between text-xs text-gray-300 mt-2">
						<span>Популярность</span>
						<div className="flex items-center gap-1">
							<Star className="w-3 h-3 text-orange-500 fill-orange-500" />
							<span>{person.popularity.toFixed(1)}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
