import { useAuthUser } from "@/shared/api/useAuthUser";
import { useUserMedia } from "@/shared/hooks/useUserMedia";
import { getRatingColorBg } from "@/shared/utils/getRatingColor";

type Props = {
	mediaId: number;
	mediaType: "movie" | "tv";
	type: "grid" | "list";
};

export const MediaRatingView = ({ mediaId, mediaType, type }: Props) => {
	const { data, isFetched } = useUserMedia(mediaId, mediaType);
	const { data: user } = useAuthUser();
	const ratingColor = getRatingColorBg(data?.rating);

	return (
		<>
			{!user || (!data?.rating && isFetched)
				? null
				: data &&
				  (type == "grid" ? (
						<div className={`flex items-center justify-center absolute top-2 right-2 ${ratingColor} rounded-sm h-7 w-10 text-sm`}>{data.rating}</div>
				  ) : (
						<div className={`flex items-center justify-center absolute top-1 right-1 ${ratingColor} rounded-sm h-8 w-6 text-sm`}>{data.rating}</div>
				  ))}
		</>
	);
};
