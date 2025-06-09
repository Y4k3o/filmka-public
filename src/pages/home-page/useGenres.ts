import { api } from "@/shared/api/apiInstance";
import { Genre } from "@/shared/types/genre";
import { useQuery } from "@tanstack/react-query";

export const useGenres = (mediaType: "tv" | "movie" = "movie") => {
	const { data: genres, isPending: isGenresPending } = useQuery({
		queryKey: ["genres", mediaType],
		queryFn: ({ signal }) => api.get<{ genres: Genre[] }>(`/genre/${mediaType}/list`, { signal }).then((res) => res.data),
		select: (data) => data.genres,
	});

	return { genres, isGenresPending };
};
