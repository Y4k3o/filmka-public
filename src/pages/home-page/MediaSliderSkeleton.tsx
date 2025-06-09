import { Skeleton } from "@/components/ui/skeleton";

export const MediaSliderSkeleton = () => {
	return (
		<section className="py-8">
			<div className="container">
				<div className="flex items-center justify-between mb-4">
					<div className="h-6 w-40 rounded animate-pulse" />
					<div className="flex gap-2"></div>
				</div>
				<div className="flex gap-4 overflow-hidden">
					{Array.from({ length: 8 }).map((_, idx) => (
						<div key={idx} className="min-w-[160px] sm:min-w-[200px]">
							<Skeleton className="w-full h-[280px]" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
