import { auth } from "@/shared/api/firebase";
import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "firebase/auth";
import { toast } from "sonner";

export type SecurityPayload = {
	email: string;
};

export const useUpdateEmail = () =>
	useMutation({
		mutationFn: async ({ email }: SecurityPayload) => {
			if (!auth.currentUser || !auth.currentUser.email) {
				toast.error("Пользователь не найден");
				return;
			}
			await updateEmail(auth.currentUser, email);
		},
		onSuccess: () => toast.success("Данные обновлены"),
	});
