import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/shared/constants/catalogSortOptions";
import { useEffect } from "react";
import { SortValue, useCatalogFilter } from "./useCatalogFilters";

export const SortPanel = () => {
	const { query, sortBy, setQuery, setSortBy, toggleApplyFilter } = useCatalogFilter();

	useEffect(() => {
		const handler = setTimeout(() => {
			toggleApplyFilter();
		}, 500);
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return (
		<div className="mt-7 mb-5 rounded-xl border border-border p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-background">
			<Input
				placeholder="Поиск"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
				className="w-full bg-secondDark max-w-md"
			/>
			{query && <div>Сортировка с поиском не работает!</div>}

			<div className="w-[300px] relative">
				<Select
					value={sortBy}
					onValueChange={(value: SortValue) => {
						setSortBy(value);
						toggleApplyFilter();
					}}
				>
					<SelectTrigger className="w-full bg-secondDark border border-border text-foreground rounded-md h-10 px-3 cursor-pointer">
						<span>{SORT_OPTIONS.find((option) => option.value === sortBy)?.label || "Сортировка"}</span>
					</SelectTrigger>

					<SelectContent className="w-full  bg-secondDark text-foreground border border-border rounded-md shadow-lg z-50" side="bottom" align="start">
						<SelectGroup>
							<SelectLabel className="px-3 py-1 text-xs text-foreground">Сортировать по</SelectLabel>
							{SORT_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value} className="hover:bg-primary cursor-pointer px-3 py-2 transition-colors">
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
