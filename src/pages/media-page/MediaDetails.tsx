import { Image } from "@/components/Image";
import { statusMap } from "@/shared/constants/seriesStatusMap";
import { MediaCreditsCrew } from "@/shared/types/credits";
import { Genre } from "@/shared/types/genre";
import { ProductionCountry, SingleMedia } from "@/shared/types/media";
import { extractMainDomain } from "@/shared/utils/extractMainDomain";
import { isMovie } from "@/shared/utils/isMovie";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router";
import { useCatalogFilter } from "../catalog-page/useCatalogFilters";

interface MovieDetailsProps {
	mediaDetails: SingleMedia;
	director?: MediaCreditsCrew;
	writers?: MediaCreditsCrew[];
}

export const MediaDetails = ({ mediaDetails, director, writers }: MovieDetailsProps) => {
	const navigate = useNavigate();
	const { setSelectedGenres } = useCatalogFilter();

	const releaseDate = isMovie(mediaDetails) ? mediaDetails.release_date : mediaDetails.first_air_date;
	const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
	const lastAirYear = !isMovie(mediaDetails) ? new Date(mediaDetails.last_air_date).getFullYear() : null;
	const runtime = isMovie(mediaDetails) ? mediaDetails.runtime : mediaDetails.episode_run_time?.[0];
	const status = !isMovie(mediaDetails) ? statusMap[mediaDetails.status] : null;
	const homepage = mediaDetails.homepage;

	const formatRuntime = (minutes: number) => {
		if (!minutes) return null;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}ч ${mins}мин`;
	};

	return (
		<div className="bg-black/33 p-6 rounded-lg border border-border backdrop-blur-sm relative z-20">
			<div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-2 text-gray-200 ">
				{year && (
					<>
						<div className="text-zinc-400">Год</div>
						<div>
							{year} {lastAirYear && <>- {lastAirYear}</>}
						</div>
					</>
				)}

				{status && (
					<>
						<div className="text-zinc-400">Статус</div>
						<div>{status}</div>
					</>
				)}

				{mediaDetails.production_countries?.length > 0 && (
					<>
						<div className="text-zinc-400">Страна</div>
						<div>
							{mediaDetails.production_countries.map((country: ProductionCountry, index: number) => (
								<Fragment key={country.iso_3166_1}>
									{country.name}
									{index < mediaDetails.production_countries.length - 1 ? ", " : ""}
								</Fragment>
							))}
						</div>
					</>
				)}

				{mediaDetails.genres?.length > 0 && (
					<>
						<div className="text-zinc-400">Жанр</div>
						<div>
							{mediaDetails.genres.map((genre: Genre, index: number) => (
								<Fragment key={genre.id}>
									<span
										onClick={() => {
											setSelectedGenres([genre.id]);
											navigate(`/catalog/${isMovie(mediaDetails) ? "movie" : "series"}`);
										}}
										className="cursor-pointer"
									>
										{genre.name}
									</span>
									{index < mediaDetails.genres.length - 1 ? ", " : " "}
								</Fragment>
							))}
						</div>
					</>
				)}

				<>
					<div className="text-zinc-400">Слоган</div>
					<div>{mediaDetails.tagline ? `${mediaDetails.tagline.toLocaleString()}` : "Неизвестно"}</div>
				</>

				{director && (
					<>
						<div className="text-zinc-400">Режиссер</div>
						<div className="group relative inline-block">
							<Link to={`/person/${director.id}`} className="block cursor-pointer border-primary/40 hover:text-primary transition-colors">
								{director.name}
							</Link>

							<div
								className="
      pointer-events-none
      absolute top-full z-50 mt-3 min-w-72 max-w-xs -translate-x-1/2
      opacity-0 scale-95
      rounded-2xl border border-white/10 bg-background
      shadow-xl ring-1 ring-white/5
      transition-[opacity,transform] duration-300
      group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100
    "
							>
								<div className="flex gap-4 p-5">
									{director.profile_path ? (
										<Image
											fallback="/fallback-avatar.jpg"
											src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
											alt={director.name}
											className="h-32 w-32 flex-shrink-0 rounded-xl object-cover"
										/>
									) : (
										<div className="h-32 w-32 flex-shrink-0 rounded-full bg-gray-700 grid place-content-center">
											<span className="text-2xl font-semibold text-gray-300">{director.name.charAt(0)}</span>
										</div>
									)}
									<div className="self-center">
										<h3 className="text-lg font-semibold text-white whitespace-normal break-words">{director.name}</h3>
										<p className="mt-1 text-sm text-gray-400">{director.job}</p>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{writers && writers.length > 0 && (
					<>
						<div className="text-zinc-400">Сценарий</div>
						<div>
							{writers.map((writer, index) => (
								<Fragment key={`${writer.id}-${writer.job}`}>
									<div className="group relative inline-block">
										<Link to={`/person/${writer.id}`} className="block cursor-pointer border-primary/40 hover:text-primary transition-colors">
											{writer.name}
										</Link>

										<div
											className="
																pointer-events-none
																absolute left-1/2 top-full z-50 mt-3 min-w-72 max-w-xs -translate-x-1/2
																opacity-0 scale-95
																rounded-2xl border border-white/10 bg-background
																shadow-xl ring-1 ring-white/5
																transition-[opacity,transform] duration-300
																group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100
    "
										>
											<div className="flex gap-4 p-5">
												{writer.profile_path ? (
													<Image
														fallback="/fallback-avatar.jpg"
														src={`https://image.tmdb.org/t/p/w185${writer.profile_path}`}
														alt={writer.name}
														className="h-32 w-32 flex-shrink-0 rounded-xl object-cover"
													/>
												) : (
													<div className="h-32 w-32 flex-shrink-0 rounded-full bg-gray-700 grid place-content-center">
														<span className="text-2xl font-semibold text-gray-300">{writer.name.charAt(0)}</span>
													</div>
												)}
												<div className="self-center">
													<h3 className="text-lg font-semibold text-white whitespace-normal break-words">{writer.name}</h3>
													<p className="mt-1 text-sm text-gray-400">{writer.job}</p>
												</div>
											</div>
										</div>
									</div>
									{index < writers.length - 1 ? ", " : ""}
								</Fragment>
							))}
						</div>
					</>
				)}

				{isMovie(mediaDetails) && (
					<>
						<div className="text-zinc-400">Бюджет</div>
						<div>{mediaDetails.budget ? `$${mediaDetails.budget.toLocaleString()}` : "Неизвестно"}</div>
					</>
				)}

				{isMovie(mediaDetails) && (
					<>
						<div className="text-zinc-400">Сборы</div>
						<div>{mediaDetails.revenue ? `$${mediaDetails.revenue.toLocaleString()}` : "Неизвестно"}</div>
					</>
				)}
				{runtime && (
					<>
						<div className="text-gray-400">Длительность</div>
						<div>{formatRuntime(runtime)}</div>
					</>
				)}
				{homepage && (
					<>
						<div className="text-gray-400">Сайт</div>
						<a href={homepage} target="_blank" rel="noopener noreferrer">
							{extractMainDomain(homepage)}
						</a>
					</>
				)}
			</div>
		</div>
	);
};
