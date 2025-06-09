import { MediaCategory } from "@/pages/profile-page/useProfileStore";

export const categories: { key: MediaCategory; label: string }[] = [
	{ key: "watching", label: "Смотрю" },
	{ key: "planned", label: "В планах" },
	{ key: "abandoned", label: "Брошено" },
	{ key: "completed", label: "Просмотрено" },
	{ key: "favorites", label: "Любимые" },
	{ key: "postponed", label: "Отложено" },
];
