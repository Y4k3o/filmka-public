import { api } from "@/shared/api/apiInstance";
import { SinglePerson } from "@/shared/types/person";
import { useQuery } from "@tanstack/react-query";

export const useSinglePerson = (id: number) => {
	const {
		data: person,
		isPending,
		error,
	} = useQuery<SinglePerson>({
		queryKey: ["person", id],
		queryFn: ({ signal }) => api.get(`/person/${id}`, { signal }).then((res) => res.data),
	});

	return { person, isPending, error };
};
