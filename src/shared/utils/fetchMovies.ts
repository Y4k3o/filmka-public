import { api } from "../api/apiInstance";
import { MediaInList, MediaInListResponse } from "../types/media";

export const fetchMedia = async (path: string, signal: AbortSignal): Promise<MediaInList[]> => {
	const totalPages = 1;

	const requests = Array.from({ length: totalPages }, (_, i) =>
		api.get<MediaInListResponse>(`${path}`, {
			signal: signal,
			params: {
				page: i + 1,
			},
		})
	);
	const response = await Promise.all(requests);

	const allMovies = response.flatMap((res) => res.data.results);

	return allMovies;
};
