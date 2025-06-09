import { db } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";

export type UpdateUserInfoPayload = {
	uid: string;
	displayName?: string;
	gender?: "male" | "female" | "other";
	about?: string;
};

export const useUpdateUserInfo = () =>
	useMutation({
		mutationFn: async ({ uid, displayName, about, gender }: UpdateUserInfoPayload) => {
			const updateData: Partial<UpdateUserInfoPayload> = {};

			if (displayName) updateData.displayName = displayName;
			if (gender) updateData.gender = gender;
			updateData.about = about;

			if (Object.keys(updateData).length > 0) {
				await updateDoc(doc(db, "users", uid), updateData);
			}
		},
		onSuccess: () => {
			toast.success("Информация изменена");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user-data"] });
		},
	});
