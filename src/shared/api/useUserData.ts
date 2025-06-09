import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../types/user";
import { db } from "./firebase";
import { useAuthUser } from "./useAuthUser";

export const useUserData = () => {
	const { data: authUser } = useAuthUser();

	return useQuery<UserData | null>({
		queryKey: ["user-data", authUser?.uid],
		enabled: !!authUser?.uid,
		queryFn: async () => {
			if (!authUser?.uid) {
				return Promise.reject("User is not logged in");
			}
			const docRef = doc(db, "users", authUser.uid);
			const docSnap = await getDoc(docRef);
			return docSnap.exists() ? (docSnap.data() as UserData) : null;
		},
		staleTime: Infinity,
	});
};
