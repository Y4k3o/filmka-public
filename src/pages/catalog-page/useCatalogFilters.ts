import { Genre } from "@/shared/types/genre";
import { create } from "zustand";

export type SortValue =
	| "popularity.desc"
	| "popularity.asc"
	| "vote_average.desc"
	| "vote_average.asc"
	| "release_date.desc"
	| "release_date.asc"
	| "vote_count.desc"
	| "vote_count.asc";

type CatalogFiltersState = {
	mediaType: "movie" | "tv";
	genres: Genre[];
	query: string;
	sortBy: SortValue;
	selectedGenres: number[];
	excludedGenres: number[];
	includeAdult: boolean;
	ratingFrom: string;
	ratingTo: string;
	yearFrom: string;
	yearTo: string;
	applyFilter: boolean;

	setMediaType: (type: "movie" | "tv") => void;
	setGenres: (genres: Genre[]) => void;
	setQuery: (val: string) => void;
	setSortBy: (val: SortValue) => void;
	setSelectedGenres: (genres: number[]) => void;
	setExcludedGenres: (genres: number[]) => void;
	setIncludeAdult: (val: boolean) => void;
	setRatingFrom: (val: string) => void;
	setRatingTo: (val: string) => void;
	setYearFrom: (val: string) => void;
	setYearTo: (val: string) => void;
	toggleApplyFilter: () => void;
	resetFilters: () => void;
};

export const useCatalogFilter = create<CatalogFiltersState>((set) => ({
	mediaType: "movie",
	genres: [],
	query: "",
	sortBy: "popularity.desc",
	selectedGenres: [],
	excludedGenres: [10767, 10764, 10763, 10766],
	includeAdult: false,
	ratingFrom: "",
	ratingTo: "",
	yearFrom: "",
	yearTo: "",
	applyFilter: false,

	setMediaType: (mediaType) => set({ mediaType }),
	setQuery: (query) => set({ query }),
	setGenres: (genres) => set({ genres }),
	setSortBy: (sortBy) => set({ sortBy }),
	setSelectedGenres: (selectedGenres) => set({ selectedGenres }),
	setExcludedGenres: (excludedGenres) => set({ excludedGenres }),
	setIncludeAdult: (includeAdult) => set({ includeAdult }),
	setRatingFrom: (ratingFrom) => set({ ratingFrom }),
	setRatingTo: (ratingTo) => set({ ratingTo }),
	setYearFrom: (yearFrom) => set({ yearFrom }),
	setYearTo: (yearTo) => set({ yearTo }),
	toggleApplyFilter: () => set({ applyFilter: true }),
	resetFilters: () =>
		set({
			selectedGenres: [],
			excludedGenres: [10767, 10764, 10763, 10766],
			includeAdult: false,
			ratingFrom: "",
			ratingTo: "",
			yearFrom: "",
			yearTo: "",
			applyFilter: false,
		}),
}));
