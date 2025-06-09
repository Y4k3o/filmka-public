import { useEffect } from "react";
import { Input } from "../ui/input";
import { SearchResults } from "./Search";
import { useHeaderStore } from "./useHeaderStore";

export const MobileSearch = () => {
	const { searchQuery, debouncedQuery, setDebouncedQuery, setSearchQuery } = useHeaderStore();

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 300);
		return () => clearTimeout(handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<header className="bg-background sticky top-0 left-0 right-0 z-500 border-b border-border">
			<div className="container py-3">
				<div className="relative w-full max-w-[400px] mx-auto">
					<div className="">
						<Input
							placeholder="Фильмы, сериалы, персоны"
							className="w-full mx-auto bg-secondDark"
							autoFocus
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<SearchResults query={debouncedQuery} />
				</div>
			</div>
		</header>
	);
};
