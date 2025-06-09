import { Image } from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { getBestMovies, getBestTVShows } from "@/pages/person-page/helpers/getPopularSortedMedia";
import { notifyApiError } from "@/shared/utils/errors";
import { useMemo } from "react";
import { useParams } from "react-router";
import { BestMediaList } from "./BestMediaList";
import { BioFacts } from "./BioFacts";
import { BiographyCard } from "./BiographyCard";
import { PersonBackground } from "./PersonBackground";
import { PersonImages } from "./PersonImages";
import { PersonMediaTabs } from "./PersonMediaTabs";
import { usePersonCredits } from "./usePersonCredits";
import { useSinglePerson } from "./useSinglePerson";

const PersonPage = () => {
	const { id } = useParams<{ id: string }>();
	const { person, isPending, error } = useSinglePerson(Number(id));
	const { mediaCredits, mediaIsPending } = usePersonCredits(Number(id));
	const isActor = person?.known_for_department === "Acting";
	const credits = isActor ? mediaCredits?.cast : mediaCredits?.crew;

	const bestMovies = useMemo(() => {
		if (!mediaCredits) return [];
		return getBestMovies(credits ?? []);
	}, [credits, mediaCredits]);

	const bestSeries = useMemo(() => {
		if (!mediaCredits) return [];
		return getBestTVShows(credits ?? []);
	}, [credits, mediaCredits]);

	if (isPending) return <Skeleton className="w-full h-[80vh]" />;

	if (!person)
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold">Персона не найдена или проблемы с сервером tmdb</h1>
			</div>
		);

	if (error) {
		notifyApiError(error);
		return <Skeleton className="w-full h-[80vh]" />;
	}

	return (
		<main className="relative min-h-screen text-zinc-100">
			<section className="relative">
				<PersonBackground credits={credits} />
				<div className="relative z-10 container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-5">
					<div className="row-span-3 flex flex-col gap-5">
						<div className="aspect-[2/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-white/10">
							<Image
								fallback="/fallback-avatar.jpg"
								src={`https://image.tmdb.org/t/p/w500${person?.profile_path}`}
								alt={person?.name}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>

					<header className="col-start-2 col-end-5 row-end-2">
						<h1 className="text-3xl md:text-4xl font-bold">{person?.name}</h1>
						<p className="text-zinc-300">{person?.also_known_as.slice(0, 3).join(" | ")}</p>
					</header>

					<aside className="col-span-1 row-start-2 col-start-4 flex flex-col gap-5">
						{mediaIsPending ? (
							<Skeleton className="h-48 w-full rounded-xl" />
						) : (
							<>
								<div className="relative flex flex-col gap-2 ">
									{bestMovies.length > 0 && (
										<div className="backdrop-blur-2xl p-4 rounded-2xl bg-black/33 z-10">
											<h2 className="text-xl font-bold mb-2">Популярные фильмы</h2>
											<BestMediaList mediaItems={bestMovies} />
										</div>
									)}

									{bestSeries.length > 0 && (
										<div className="mt-5 backdrop-blur-2xl p-4 rounded-2xl bg-black/33 z-10">
											<h2 className="text-xl font-bold mb-2">Популярные сериалы</h2>
											<BestMediaList mediaItems={bestSeries} />
										</div>
									)}
								</div>
							</>
						)}
					</aside>

					<div className="col-span-2 flex flex-col gap-8">
						<BioFacts person={person} />
						<BiographyCard biography={person.biography} />
					</div>
				</div>
			</section>

			<section className="bg-gradient-to-b from-black to-background  p-10 backdrop-blur-2xl">
				<div className="container">
					<PersonImages id={Number(id)} />
					<h2 className="px-10 mt-10 text-center text-3xl">Фильмография</h2>
					{mediaCredits && <PersonMediaTabs {...mediaCredits} />}
				</div>
			</section>
		</main>
	);
};

export default PersonPage;
