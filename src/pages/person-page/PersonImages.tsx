import { Image } from "@/components/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { notifyApiError } from "@/shared/utils/errors";
import { useState } from "react";
import { usePersonImages } from "./usePersonImages";

export const PersonImages = ({ id }: { id: number }) => {
	const [showAll, setShowAll] = useState(false);
	const { images, isPending, error } = usePersonImages(id);

	if (isPending || !images) return <Skeleton className="h-1/2 w-1/6" />;

	if (error) {
		notifyApiError(error);
		return <Skeleton className="h-1/2 w-1/6" />;
	}

	const filteredImages = images.slice(1);
	const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 5);

	return (
		<div className="space-y-4">
			<h2 className="text-xl font-bold">Фотографии</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{displayedImages.map((img) => (
					<div key={img.file_path} className="relative overflow-hidden rounded-2xl border border-border shadow-md group">
						<Image
							fallback="/fallback-avatar.jpg"
							src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
							alt="Person"
							width={img.width}
							height={img.height}
							className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				))}
			</div>
			{filteredImages.length > 5 && (
				<button onClick={() => setShowAll((prev) => !prev)} className="mt-2 text-sm text-primary cursor-pointer hover:underline">
					{showAll ? "Скрыть" : "Показать все"}
				</button>
			)}
		</div>
	);
};
