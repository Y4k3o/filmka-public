import { db } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

type Params = {
	url: string;
	uid: string;
};

export const useAvatarUrl = () =>
	useMutation({
		mutationFn: ({ uid, url }: Params) => updateDoc(doc(db, "users", uid), { avatarUrl: url }),
		onSuccess: () => {
			toast.success("Аватар изменен");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user-data"] });
		},
	});
