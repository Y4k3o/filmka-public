import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useGenres } from "../home-page/useGenres";
import { useCatalogFilter } from "./useCatalogFilters";

export const FilterPanel = () => {
	const {
		mediaType,
		setGenres,
		selectedGenres,
		excludedGenres,
		includeAdult,
		setExcludedGenres,
		setIncludeAdult,
		setSelectedGenres,
		setYearFrom,
		setYearTo,
		setRatingFrom,
		setRatingTo,
		ratingFrom,
		ratingTo,
		yearFrom,
		yearTo,
		resetFilters,
		toggleApplyFilter,
	} = useCatalogFilter();

	const { genres, isGenresPending } = useGenres(mediaType);

	useEffect(() => {
		if (!genres) return;
		setGenres(genres);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [genres]);

	const toggleGenre = (id: number) => {
		if (selectedGenres.includes(id)) {
			setSelectedGenres(selectedGenres.filter((g) => g !== id));
		} else {
			setSelectedGenres([...selectedGenres, id]);
		}
	};

	const toggleExcludedGenre = (id: number) => {
		if (excludedGenres.includes(id)) {
			setExcludedGenres(excludedGenres.filter((g) => g !== id));
		} else {
			setExcludedGenres([...excludedGenres, id]);
		}
	};

	if (!genres || isGenresPending) {
		return <Skeleton className="w-full md:w-64 h-[300px]" />;
	}

	return (
		<div className="mt-7 bg-background p-5 pl-1 rounded-xl border border-border">
			<div className="max-h-[80vh] overflow-y-auto scrollbar-custom" style={{ direction: "rtl" }}>
				<div className="pl-3  space-y-6" style={{ direction: "ltr" }}>
					<div>
						<Label className="block mb-2 text-sm font-medium">Жанры</Label>
						<div className="flex flex-col gap-1  overflow-y-auto pr-2">
							{genres.map((genre) => (
								<div key={genre.id} className="flex items-center space-x-2">
									<Checkbox id={`genre-${genre.id}`} checked={selectedGenres.includes(genre.id)} onCheckedChange={() => toggleGenre(genre.id)} />
									<Label htmlFor={`genre-${genre.id}`}>{genre.name}</Label>
								</div>
							))}
						</div>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">Исключить жанры</Label>
						<div className="flex flex-col gap-1 overflow-y-auto pr-2">
							{genres.map((genre) => (
								<div key={genre.id} className="flex items-center space-x-2">
									<Checkbox
										id={`excluded-${genre.id}`}
										checked={excludedGenres.includes(genre.id)}
										onCheckedChange={() => toggleExcludedGenre(genre.id)}
									/>
									<Label htmlFor={`excluded-${genre.id}`}>{genre.name}</Label>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="adult"
							checked={includeAdult}
							onCheckedChange={(val) => {
								setIncludeAdult(Boolean(val));
							}}
						/>
						<Label htmlFor="adult">Включить 18+</Label>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">Год выпуска (от - до)</Label>
						<div className="flex gap-2">
							<Input
								type="number"
								className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								placeholder="От"
								value={yearFrom}
								onChange={(e) => {
									setYearFrom(e.target.value);
								}}
							/>
							<Input
								className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								type="number"
								placeholder="До"
								value={yearTo}
								onChange={(e) => {
									setYearTo(e.target.value);
								}}
							/>
						</div>
					</div>

					<div>
						<Label className="block mb-2 text-sm font-medium">Рейтинг (от - до)</Label>
						<div className="flex gap-2">
							<Input
								type="number"
								step="0.1"
								min="0"
								max="10"
								placeholder="От"
								className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								value={ratingFrom ?? ""}
								onChange={(e) => {
									const val = e.target.value ? e.target.value : "";
									setRatingFrom(val);
								}}
							/>
							<Input
								type="number"
								step="0.1"
								min="0"
								max="10"
								className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
								placeholder="До"
								value={ratingTo ?? ""}
								onChange={(e) => {
									const val = e.target.value ? e.target.value : "";
									setRatingTo(val);
								}}
							/>
						</div>
					</div>
					<div className="flex justify-between">
						<Button className="w-25" variant="outline" onClick={resetFilters}>
							Сбросить
						</Button>
						<Button className="w-25" onClick={toggleApplyFilter}>
							Применить
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
