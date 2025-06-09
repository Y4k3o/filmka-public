import { create } from "zustand";

type HeaderState = {
	isMenuOpen: boolean;
	isSearchOpen: boolean;
	searchQuery: string;
	debouncedQuery: string;
	toggleMenu: () => void;
	toggleSearch: () => void;
	setSearchQuery: (query: string) => void;
	setDebouncedQuery: (query: string) => void;
	setIsSearchOpen: (arg: boolean) => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
	isMenuOpen: false,
	isSearchOpen: false,
	searchQuery: "",
	debouncedQuery: "",
	toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
	toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
	setSearchQuery: (query: string) => set({ searchQuery: query }),
	setDebouncedQuery: (query: string) => set({ debouncedQuery: query }),
	setIsSearchOpen: (arg: boolean) => set({ isSearchOpen: arg }),
}));
