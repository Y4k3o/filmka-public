import { db } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { MediaCategory } from "../../pages/profile-page/useProfileStore";

export const useAddToList = (mediaId: number, type: "movie" | "tv", title: string) =>
	useMutation({
		mutationFn: async (category: MediaCategory) => {
			const auth = getAuth();
			const user = auth.currentUser;

			if (!user) return;

			const docRef = doc(db, "users", user.uid, "mediaList", `${mediaId}-${type}`);

			await setDoc(docRef, {
				id: mediaId,
				title,
				type,
				category,
				addedAt: serverTimestamp(),
			});
		},
		onSuccess: () => toast.success("Добавлено в список"),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: ["mediaCategory"] });
			queryClient.refetchQueries({ queryKey: ["mediaMap"] });
			queryClient.refetchQueries({ queryKey: ["mediaIds"] });
		},
	});
