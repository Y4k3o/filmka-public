import { db } from "@/shared/api/firebase";
import { UserData } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

export const usePublicUserProfile = (userId: string | undefined) => {
	return useQuery({
		queryKey: ["publicUser", userId],
		queryFn: async () => {
			if (!userId) return;
			const docRef = doc(db, "users", userId);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) toast.info("Такого пользователя не существует");
			return docSnap.data() as UserData;
		},
		enabled: !!userId,
	});
};
