import { MediaCategory } from "@/pages/profile-page/useProfileStore";
import { categories } from "../constants/profileCategories";

export const getCategoryLabel = (key: MediaCategory): string => {
	const found = categories.find((category) => category.key === key);
	return found?.label ?? "Неизвестно";
};
