import { db } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { useAuthUser } from "@/shared/api/useAuthUser";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export const useRemoveFromMediaList = () => {
	const { data: user } = useAuthUser();

	return useMutation({
		mutationFn: async ({ mediaId, type }: { mediaId: number; type: "movie" | "tv" }) => {
			if (!user?.uid) return;

			const ref = doc(db, "users", user.uid, "mediaList", `${mediaId}-${type}`);
			await deleteDoc(ref);
		},
		onSuccess: () => toast.success("Успешно удалено"),
		onError: () => toast.error("Ошибка при удалении"),
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: ["mediaCategory"] });
			queryClient.refetchQueries({ queryKey: ["mediaMap"] });
			queryClient.refetchQueries({ queryKey: ["mediaIds"] });
		},
	});
};
