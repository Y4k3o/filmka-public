import { MediaCard } from "@/components/MediaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersection } from "@/shared/hooks/useIntersection";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { FilterPanel } from "./FilterPanel";
import { SortPanel } from "./SortPanel";
import { useCatalog } from "./useCatalog";
import { useCatalogFilter } from "./useCatalogFilters";

const CatalogPage = () => {
	const {
		mediaType,
		genres,
		query,
		sortBy,
		selectedGenres,
		excludedGenres,
		includeAdult,
		setMediaType,
		yearFrom,
		yearTo,
		ratingFrom,
		ratingTo,
		applyFilter,
	} = useCatalogFilter();

	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes("/series")) {
			setMediaType("tv");
		} else {
			setMediaType("movie");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const { data, isPending, isPlaceholderData, fetchNextPage, isFetchingNextPage, refetch } = useCatalog({
		mediaType,
		query,
		sortBy,
		selectedGenres,
		excludedGenres,
		includeAdult,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
	});

	useEffect(() => {
		if (!applyFilter) return;
		refetch();
		useCatalogFilter.setState({ applyFilter: false });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [applyFilter]);

	const cursorRef = useIntersection(() => {
		fetchNextPage();
	});

	return (
		<div className="container py-6 space-y-4">
			<h1 className="text-center text-4xl font-logo">{mediaType === "movie" ? "Фильмы" : "Сериалы"}</h1>

			<div className="flex flex-col lg:flex-row gap-6 relative">
				<aside className="lg:w-70 shrink-0 sticky top-25 self-start h-fit">
					<FilterPanel />
				</aside>

				<main className="flex-1">
					<SortPanel />
					{!data && !isPending && <div className="text-center">Ничего не найдено</div>}
					<div
						className={
							"bg-background p-4 rounded-xl border border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" +
							(isPlaceholderData ? " opacity-50" : "")
						}
					>
						{data?.pages
							.flatMap((page) => page.results)
							.map((item) => (item ? <MediaCard key={item.id} media={item} genres={genres} /> : <Skeleton />))}

						{isFetchingNextPage && Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="aspect-[2/3] min-h-[300px]" />)}
					</div>

					<div className="mb-25" ref={cursorRef}></div>
				</main>
			</div>
		</div>
	);
};

export default CatalogPage;
