import { api } from "@/shared/api/apiInstance";
import { PersonResponse } from "@/shared/types/person";
import { useQuery } from "@tanstack/react-query";

export const usePopularPerson = () => {
	const {
		data: person,
		isPending: isPersonPending,
		error,
	} = useQuery({
		queryKey: ["person", "popular"],
		queryFn: ({ signal }) => api.get<PersonResponse>("/person/popular", { signal }).then((res) => res.data),
		select: (data) => data.results,
	});

	return { person, isPersonPending, error };
};
