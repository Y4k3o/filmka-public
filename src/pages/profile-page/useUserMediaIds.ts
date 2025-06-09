import { db } from "@/shared/api/firebase";
import { MediaListItem } from "@/shared/types/user";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, where } from "firebase/firestore";
import { MediaCategory, SortOption, SortType, useProfileStore } from "./useProfileStore";

type PageParam = QueryDocumentSnapshot | undefined;

type MediaIdsResponse = {
	mediaList: MediaListItem[];
	lastDoc: QueryDocumentSnapshot | undefined;
};

export const useUserMediaIds = (uid: string | undefined) => {
	const { category, sortBy, sortType } = useProfileStore();

	return useInfiniteQuery<
		MediaIdsResponse,
		Error,
		InfiniteData<MediaIdsResponse>,
		[string, string | undefined, MediaCategory | "all", SortOption, SortType],
		PageParam
	>({
		queryKey: ["mediaIds", uid, category, sortBy, sortType],
		queryFn: async ({ pageParam }) => {
			if (!uid) return { mediaList: [], lastDoc: undefined };

			const ref = collection(db, "users", uid, "mediaList");

			let q;

			if (category === "all") {
				q = query(ref, orderBy(sortBy, sortType), limit(10));
			} else {
				q = query(ref, where("category", "==", category), orderBy(sortBy, sortType), limit(10));
			}

			if (pageParam) {
				q = query(q, startAfter(pageParam));
			}

			const snapshot = await getDocs(q);
			const mediaList = snapshot.docs.map((doc) => doc.data() as MediaListItem);
			const lastDoc = snapshot.docs[snapshot.docs.length - 1] ?? undefined;

			return { mediaList, lastDoc };
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.lastDoc ?? undefined,
		enabled: !!uid,
	});
};
