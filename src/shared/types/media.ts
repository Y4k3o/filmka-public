import { MovieInList, SingleMovie } from "./movie";
import { SingleSeries, TVShowInList } from "./series";

export type ProductionCompany = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};
export type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

export type SpokenLanguages = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

export type MediaInList = MovieInList | TVShowInList;

export type MediaInListResponse = {
	page: number;
	results: MediaInList[];
	total_pages: number;
	total_results: number;
};

export type MediaType = "movie" | "series";

export type SingleMedia = SingleMovie | SingleSeries;

export type Video = {
	iso_639_1: string;
	iso_3166_1: string;
	key: string;
	name: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
};

export type Videos = {
	id: number;
	results: Video[];
};
