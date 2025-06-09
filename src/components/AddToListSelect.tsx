// src/features/media/AddToListSelect.tsx
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { MediaCategory } from "@/pages/profile-page/useProfileStore";
import { categories } from "@/shared/constants/profileCategories";
import { useAddToList } from "@/shared/hooks/useAddToList";
import { useRemoveFromMediaList } from "@/shared/hooks/useRemoveFromMediaList";
import { useUserMedia } from "@/shared/hooks/useUserMedia";
import { useEffect, useState } from "react";

type Props = {
	id: number;
	type: "movie" | "tv";
	title: string;
};

export const AddToListSelect = ({ id, type, title }: Props) => {
	const { data, isPending: isDataPending } = useUserMedia(id, type);
	const { mutate: addToFolder, isPending: isAddPending } = useAddToList(id, type, title);
	const { mutate: removeMedia, isPending: isRemovePending } = useRemoveFromMediaList();

	const [localCategory, setLocalCategory] = useState<MediaCategory | undefined | null>(data?.category);

	useEffect(() => {
		if (!isDataPending) {
			setLocalCategory(data?.category);
		}
	}, [data?.category, isDataPending]);

	const isPending = isDataPending || isRemovePending || isAddPending;

	const handleValueChange = (value: MediaCategory | "remove") => {
		if (value === "remove") {
			removeMedia({ mediaId: id, type });
		} else {
			addToFolder(value);
		}
	};

	const selectedLabel = localCategory ? categories.find((cat) => cat.key === data?.category)?.label : "Добавить в список";

	return (
		<Select defaultValue={localCategory || undefined} disabled={isPending} onValueChange={handleValueChange}>
			<SelectTrigger className="w-full bg-background">{selectedLabel}</SelectTrigger>
			<SelectContent>
				{categories.map((cat) => (
					<SelectItem key={cat.key} value={cat.key}>
						{cat.label}
					</SelectItem>
				))}
				<div className="border-t my-1"></div>
				<SelectItem value="remove" className="text-rose-500">
					Удалить из списка
				</SelectItem>
			</SelectContent>
		</Select>
	);
};
