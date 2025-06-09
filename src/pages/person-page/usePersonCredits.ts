import { api } from "@/shared/api/apiInstance";
import { PersonMediaCredits } from "@/shared/types/credits";
import { useQuery } from "@tanstack/react-query";

export const usePersonCredits = (id: number) => {
	const { data: mediaCredits, isPending: mediaIsPending } = useQuery<PersonMediaCredits>({
		queryKey: ["credits", "media", "person", id],
		queryFn: ({ signal }) => api.get(`/person/${id}/combined_credits`, { signal }).then((res) => res.data),
		select: (data) => {
			data.cast = [...data.cast.filter((media) => media.vote_count > 50)];
			return data;
		},
	});

	return {
		mediaCredits,
		mediaIsPending,
	};
};
