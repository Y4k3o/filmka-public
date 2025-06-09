import { Genre, GenreIds } from "./genre";
import { ProductionCompany, ProductionCountry, SpokenLanguages } from "./media";

export type TVShowInList = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: GenreIds;
	id: number;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
	original_country: string;
	popularity: number;
};

export type CreatedBy = {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
};

export type LastEpisodeToAir = {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
};

export type Network = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

export type Season = {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
};

export type TmdbSeriesStatus =
	| "Ended"
	| "Returning Series"
	| "In Production"
	| "Canceled"
	| "Pilot"
	| "Planned"
	| "Post Production"
	| "Upcoming"
	| "On Hiatus"
	| "Unknown";

export type SingleSeries = {
	adult: boolean;
	backdrop_path: string;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[] | string;
	last_air_date: string;
	last_episode_to_air: LastEpisodeToAir;
	name: string;
	next_episode_to_air: null;
	networks: Network[] | Network;
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[] | string;
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguages[];
	status: TmdbSeriesStatus;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
};
