import { CombinedPersonMediaCredits } from "@/shared/types/credits";

export const sortByDate = (items: CombinedPersonMediaCredits[]): CombinedPersonMediaCredits[] => {
	const EXCLUDED_GENRE_IDS = [10767, 10763, 10764, 10766];
	return [...items]
		.filter((item) => {
			const date = (item.media_type === "movie" && item.release_date) || (item.media_type === "tv" && item.first_air_date);
			const genres = item.genre_ids || [];
			const isExcluded = genres.some((id) => EXCLUDED_GENRE_IDS.includes(id));

			const isScam = isExcluded || genres.length === 0;

			return date && !isScam;
		})
		.sort((a, b) => {
			const dateA = new Date((a.media_type === "movie" ? a.release_date : a.first_air_date) || "").getTime();
			const dateB = new Date((b.media_type === "movie" ? b.release_date : b.first_air_date) || "").getTime();
			return dateB - dateA;
		});
};
