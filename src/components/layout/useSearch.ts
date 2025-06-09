import { api } from "@/shared/api/apiInstance";
import { MultiSearchDto, MultiSearchResultDto } from "@/shared/types/multi";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (debouncedQuery: string) => {
	const { data, isPending } = useQuery<MultiSearchResultDto[]>({
		queryKey: ["search", debouncedQuery],
		queryFn: async () => {
			if (!debouncedQuery) return [];
			const res = await api.get<MultiSearchDto>(`/search/multi?query=${debouncedQuery}&include_adult=true`);
			return res.data.results;
		},
		enabled: !!debouncedQuery,
	});

	return { data, isPending };
};
