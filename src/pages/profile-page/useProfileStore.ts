import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewType = "grid" | "list";
export type MediaCategory = "favorites" | "planned" | "watching" | "completed" | "postponed" | "abandoned";
export type SortOption = "addedAt" | "title";
export type SortType = "asc" | "desc";

type ProfileStore = {
	category: MediaCategory | "all";
	view: ViewType;
	sortBy: SortOption;
	sortType: SortType;
	isOwner: boolean;
	setIsOwner: (isOwner: boolean) => void;
	setCategory: (cat: MediaCategory | "all") => void;
	setView: (view: ViewType) => void;
	setSortBy: (sort: SortOption) => void;
	setSortType: (sort: SortType) => void;
	reset: () => void;
};

export const useProfileStore = create<ProfileStore>()(
	persist(
		(set) => ({
			category: "all",
			view: "grid",
			sortBy: "addedAt",
			sortType: "desc",
			isOwner: false,
			setIsOwner: (isOwner) => set({ isOwner }),
			setCategory: (category) => set({ category }),
			setView: (view) => set({ view }),
			setSortBy: (sortBy) => set({ sortBy }),
			setSortType: (sortType) => set({ sortType }),
			reset: () => set({ category: "all", view: "grid", sortBy: "addedAt", sortType: "desc" }),
		}),
		{
			name: "profile-preferences",
		}
	)
);
