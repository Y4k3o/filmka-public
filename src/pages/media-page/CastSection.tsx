import { Image } from "@/components/Image";
import { MediaCreditsCast } from "@/shared/types/credits";
import { Link } from "react-router";

export function CastSection({ cast }: { cast: MediaCreditsCast[] }) {
	if (!cast.length) return null;

	return (
		<ul className="space-y-1">
			{cast.map((person) => (
				<Link to={`/person/${person.id}`} key={person.id} className="group block relative">
					<span className="text-white cursor-pointer border-zinc-400 hover:text-primary">{person.name}</span>
					<div
						className="p-4  flex flex-col     pointer-events-none
      absolute top-full z-50 mt-3 min-w-72 max-w-xs -translate-x-1/2
      opacity-0 scale-95
      rounded-2xl border border-white/10 bg-background
      shadow-xl ring-1 ring-white/5
      transition-[opacity,transform] duration-300
      group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100"
					>
						<div className="flex gap-4">
							{person.profile_path ? (
								<div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
									<Image
										fallback="/fallback-avatar.jpg"
										src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
										alt={person.name}
										className="w-full h-full object-cover"
										onError={(e) => {
											if (!e.currentTarget.dataset.fallback) {
												e.currentTarget.src = "/src/assets/fallback-avatar.jpg";
												e.currentTarget.dataset.fallback = "true";
											}
										}}
									/>
								</div>
							) : (
								<div className="w-32 h-32 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
									<span className="text-xs text-gray-300">Нет фото</span>
								</div>
							)}
							<div>
								<div className="font-medium text-white">{person.name}</div>
								<div className="text-sm text-gray-400">{person.character}</div>
							</div>
						</div>
					</div>
				</Link>
			))}
		</ul>
	);
}
