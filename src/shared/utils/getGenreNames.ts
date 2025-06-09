import { Genre, GenreIds } from "../types/genre";

export const getGenreNames = (genreIds: GenreIds | undefined, genres: Genre[] | undefined, amount = 5) => {
	if (!Array.isArray(genres)) {
		console.error(`${genres} не является массивом:`, genres);
		return [];
	}

	if (genreIds && genres) {
		const genreNames = genreIds
			.map((id) => genres.find((genre: { id: number; name: string }) => genre.id === id)?.name || "Неизвестный жанр")
			.filter(Boolean);

		return genreNames.map((genre) => (genre.length > 13 ? genre.slice(0, 13) + "..." : genre)).slice(0, amount);
	}
};
