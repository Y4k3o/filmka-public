import { CombinedPersonMediaCredits } from "../../../shared/types/credits";

export const getBestTVShows = (credits: CombinedPersonMediaCredits[]): CombinedPersonMediaCredits[] => {
	const EXCLUDED_GENRE_IDS = [99, 10763, 10764, 10766, 10767];
	if (!credits) return [];
	return Array.from(
		new Map(
			credits
				.filter((item) => item.media_type === "tv")
				.filter((item) => !item.genre_ids?.some((id) => EXCLUDED_GENRE_IDS.includes(id)))
				.sort((a, b) => b.popularity - a.popularity)
				.map((item) => [item.id, item])
		).values()
	).slice(0, 7);
};

export const getBestMovies = (credits: CombinedPersonMediaCredits[]): CombinedPersonMediaCredits[] => {
	if (!credits) return [];
	return Array.from(
		new Map(
			credits
				.filter((item) => item.media_type === "movie")
				.sort((a, b) => b.popularity - a.popularity)
				.map((item) => [item.id, item])
		).values()
	).slice(0, 7);
};
