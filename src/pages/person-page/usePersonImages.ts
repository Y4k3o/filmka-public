import { api } from "@/shared/api/apiInstance";
import { SinglePersonImage, SinglePersonImageDto } from "@/shared/types/person";
import { useQuery } from "@tanstack/react-query";

export const usePersonImages = (id: number) => {
	const {
		data: images,
		isPending,
		error,
	} = useQuery<SinglePersonImage[]>({
		queryKey: ["person", "images", id],
		queryFn: ({ signal }) => api.get<SinglePersonImageDto>(`/person/${id}/images`, { signal }).then((res) => res.data.profiles),
	});

	return { images, isPending, error };
};
