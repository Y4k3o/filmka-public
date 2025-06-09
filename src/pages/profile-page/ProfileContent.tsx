import { Skeleton } from "@/components/ui/skeleton";
import { useIntersection } from "@/shared/hooks/useIntersection";
import { MediaCardById } from "./MediaCardById";
import { MediaListItem } from "./MediaListItem";
import { useProfileStore } from "./useProfileStore";
import { useUserMediaDetails } from "./useUserMediaDetails";

type Props = {
	uid: string | undefined;
};

export const ProfileContent = ({ uid }: Props) => {
	const { view } = useProfileStore();
	const { mediaDetails, isPending, isPlaceholderData, fetchNextPage, isFetchingNextPage } = useUserMediaDetails(uid);

	const cursorRef = useIntersection(() => {
		fetchNextPage();
	});

	return (
		<main className={"flex-1 bg-background p-5 rounded-2xl border border-border" + (isPlaceholderData ? " opacity-50" : "")}>
			{!isPending && mediaDetails && mediaDetails.length === 0 && (
				<div className="text-center text-4xl mt-80 items-center text-muted-foreground">В этом списке пока нет тайтлов</div>
			)}

			{view === "grid" ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
					{isPending
						? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="aspect-[2/3] min-h-[335px]" />)
						: mediaDetails.map((item) => (item ? <MediaCardById key={item.id} media={item} /> : <Skeleton />))}
					{isFetchingNextPage && Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="aspect-[2/3] min-h-[335px]" />)}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{isPending
						? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-50 w-full rounded-xl" />)
						: mediaDetails.map((item) => (item ? <MediaListItem key={item.id} media={item} /> : <Skeleton />))}
					{isFetchingNextPage && Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} className="h-50 w-full rounded-xl" />)}
				</div>
			)}

			<div className="absolute -bottom-10" ref={cursorRef}></div>
		</main>
	);
};
