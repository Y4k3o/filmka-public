// hooks/useSetMediaRating.ts
import { useMutation } from "@tanstack/react-query";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { queryClient } from "../api/queryClient";
import { useAuthUser } from "../api/useAuthUser";

export const useSetMediaRating = (mediaId: number, mediaType: "movie" | "tv") => {
	const { data: user } = useAuthUser();

	return useMutation({
		mutationFn: async (rating: number) => {
			if (!user?.uid) return;

			const ref = doc(db, "users", user.uid, "mediaList", `${mediaId}-${mediaType}`);
			const snapshot = await getDoc(ref);
			if (snapshot.exists()) {
				await updateDoc(ref, { rating });
				return;
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["mediaIds", user?.uid] });
			queryClient.invalidateQueries({ queryKey: ["mediaCategory"] });
		},
	});
};
