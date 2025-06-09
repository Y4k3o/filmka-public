import { MediaCategory } from "@/pages/profile-page/useProfileStore";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase";
import { useAuthUser } from "../api/useAuthUser";
import { MediaListItem } from "../types/user";

// useUserMediaMap.ts
export const useUserMediaMap = () => {
	const { data: user } = useAuthUser();

	return useQuery({
		queryKey: ["mediaMap", user?.uid],
		queryFn: async (): Promise<Record<string, MediaCategory>> => {
			if (!user?.uid) return {};
			const ref = collection(db, "users", user.uid, "mediaList");
			const snapshot = await getDocs(ref);

			const map: Record<string, MediaCategory> = {};
			snapshot.docs.forEach((doc) => {
				const data = doc.data() as MediaListItem;
				map[`${data.id}-${data.type}`] = data.category;
			});

			return map;
		},
		enabled: !!user?.uid,
		staleTime: 60 * 1000,
	});
};
