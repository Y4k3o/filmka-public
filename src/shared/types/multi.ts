import { MovieInList } from "./movie";
import { Person } from "./person";
import { TVShowInList } from "./series";

export type MultiSearchResultDto =
	| (Person & { media_type: "person" })
	| (MovieInList & { media_type: "movie" })
	| (TVShowInList & { media_type: "tv" });

export type MultiSearchDto = {
	page: number;
	results: MultiSearchResultDto[];
	total_pages: number;
	total_results: number;
};
