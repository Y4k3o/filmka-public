import { useMutation } from "@tanstack/react-query";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { deleteUserWithCollections } from "../utils/deleteFirestoreCollection";
import { auth } from "./firebase";
import { queryClient } from "./queryClient";

type DeleteAccountPayload = {
	password: string;
};

export const useDeleteAccount = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async ({ password }: DeleteAccountPayload) => {
			const user = auth.currentUser;
			if (!user || !user.email) {
				return;
			}

			const credential = EmailAuthProvider.credential(user.email, password);
			await reauthenticateWithCredential(user, credential);
			await deleteUserWithCollections(user.uid);
		},
		onSuccess: () => {
			navigate("/");
			toast.success("Аккаунт удален");
		},
		onSettled: () => {
			queryClient.removeQueries();
		},
	});
};
