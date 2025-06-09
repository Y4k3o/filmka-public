type KnownFor = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type Person = {
	adult: boolean;
	gender: number;
	id: number;
	known_for: KnownFor[];
	known_for_department: string;
	name: string;
	popularity: number;
	profile_path: string;
};

export type PersonResponse = {
	page: number;
	results: Person[];
	total_pages: number;
	total_results: number;
};

export type SinglePerson = {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: string;
	gender: number;
	homepage: string;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
};

export type SinglePersonImage = {
	aspect_ratio: number;
	height: number;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
};

export type SinglePersonImageDto = {
	id: number;
	profiles: SinglePersonImage[];
};
