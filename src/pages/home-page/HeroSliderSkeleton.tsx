import { Skeleton } from "@/components/ui/skeleton";

export const HeroSliderSkeleton = () => {
	return (
		<section className="relative w-full h-[75vh] flex items-end px-8 py-12">
			<div className="container flex flex-col md:flex-row items-center gap-6">
				<Skeleton className="w-48 md:w-64 h-[384px] rounded-lg hidden md:block" />
				<div className="space-y-4 w-full max-w-xl">
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-4 w-1/3" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<div className="flex gap-4 mt-6">
						<Skeleton className="h-10 w-32 rounded" />
						<Skeleton className="h-10 w-32 rounded" />
					</div>
				</div>
			</div>
		</section>
	);
};
