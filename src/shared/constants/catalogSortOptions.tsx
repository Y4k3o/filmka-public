import { SortValue } from "@/pages/catalog-page/useCatalogFilters";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JSX } from "react";

type SORT_OPTION = {
	label: JSX.Element;
	value: SortValue;
};

export const SORT_OPTIONS: SORT_OPTION[] = [
	{
		label: (
			<span className="flex items-center gap-1">
				Популярные <ChevronDown />
			</span>
		),
		value: "popularity.desc",
	},
	{
		label: (
			<span className="flex items-center gap-1">
				Популярные <ChevronUp />
			</span>
		),
		value: "popularity.asc",
	},

	{
		label: (
			<span className="flex items-center gap-1">
				Рейтинг <ChevronDown />
			</span>
		),
		value: "vote_average.desc",
	},
	{
		label: (
			<span className="flex items-center gap-1">
				Рейтинг <ChevronUp />
			</span>
		),
		value: "vote_average.asc",
	},

	{
		label: (
			<span className="flex items-center gap-1">
				По дате <span>(сначала новые)</span>
			</span>
		),
		value: "release_date.desc",
	},
	{
		label: (
			<span className="flex items-center gap-1">
				По дате <span>(сначала старые)</span>
			</span>
		),
		value: "release_date.asc",
	},

	{
		label: (
			<span className="flex items-center gap-1">
				Количество голосов <ChevronDown />
			</span>
		),
		value: "vote_count.desc",
	},
	{
		label: (
			<span className="flex items-center gap-1">
				Количество голосов <ChevronUp />
			</span>
		),
		value: "vote_count.asc",
	},
];
