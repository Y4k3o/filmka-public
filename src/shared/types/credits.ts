export type MediaCreditsCast = {
	adult: boolean;
	gender: 0 | 1 | 2;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};

export type MediaCreditsCrew = {
	adult: boolean;
	gender: 0 | 1 | 2;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string;
	job: string;
};

export type MediaCredits = {
	id: number;
	cast: MediaCreditsCast[];
	crew: MediaCreditsCrew[];
};

export type MovieCreditsCast = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	character: string;
	credit_id: string;
	order: number;
	media_type: "movie";
};

export type MovieCreditsCrew = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	credit_id: string;
	department: string;
	job: string;
	media_type: "movie";
};

export type TVCreditsCast = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
	character: string;
	credit_id: string;
	episode_count: number;
	media_type: "tv";
};

export type TVCreditsCrew = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
	credit_id: string;
	department: string;
	job: string;
	episode_count: number;
	media_type: "tv";
};

export type PersonMediaCredits = {
	id: number;
	cast: (TVCreditsCast | MovieCreditsCast)[];
	crew: (TVCreditsCrew | MovieCreditsCrew)[];
};

export type CombinedPersonMediaCredits = MovieCreditsCast | TVCreditsCast | MovieCreditsCrew | TVCreditsCrew;
