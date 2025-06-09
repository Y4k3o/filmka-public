import { api } from "@/shared/api/apiInstance";
import { MediaCredits } from "@/shared/types/credits";
import { MediaInList, MediaInListResponse, MediaType, SingleMedia, Videos } from "@/shared/types/media";
import { useQuery } from "@tanstack/react-query";

export const useSingleMedia = (id: number, mediaType: MediaType) => {
	const { data, isPending, error } = useQuery<SingleMedia>({
		queryKey: [mediaType, id],
		queryFn: ({ signal }) => api.get(mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`, { signal }).then((res) => res.data),
	});

	const { data: credits, isPending: isCreditsPending } = useQuery<MediaCredits>({
		queryKey: ["credits", mediaType, id],
		queryFn: ({ signal }) => api.get(mediaType === "movie" ? `/movie/${id}/credits` : `/tv/${id}/credits`, { signal }).then((res) => res.data),
	});

	const { data: videos } = useQuery<Videos>({
		queryKey: ["videos", mediaType, id],
		queryFn: ({ signal }) => api.get(mediaType === "movie" ? `/movie/${id}/videos` : `/tv/${id}/videos`, { signal }).then((res) => res.data),
	});

	const { data: recommendations } = useQuery<MediaInList[]>({
		queryKey: ["recommendations", mediaType, id],
		queryFn: ({ signal }) =>
			api
				.get<MediaInListResponse>(mediaType === "movie" ? `/movie/${id}/recommendations` : `/tv/${id}/recommendations`, { signal })
				.then((res) => res.data.results),
	});

	return { data, credits, videos, recommendations, isPending, error, isCreditsPending };
};
