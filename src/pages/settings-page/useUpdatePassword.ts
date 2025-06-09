import { auth } from "@/shared/api/firebase";
import { UpdatePasswordFormData } from "@/shared/types/user";
import { notifyApiError } from "@/shared/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

type SecurityPayload = {
	oldPassword: string;
	newPassword: string;
};

type UseUpdatePasswordProps = {
	form: UseFormReturn<UpdatePasswordFormData>;
};

export const useUpdatePassword = ({ form }: UseUpdatePasswordProps) => {
	const { setError, reset } = form;

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ oldPassword, newPassword }: SecurityPayload) => {
			if (!auth.currentUser || !auth.currentUser.email) {
				toast.error("Пользователь не найден");
				return;
			}
			const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
			await reauthenticateWithCredential(auth.currentUser, credential);
			await updatePassword(auth.currentUser, newPassword);
		},
		onSuccess: () => toast.success("Данные обновлены"),
		onError: (error) => notifyApiError(error, false, { setError }),
	});
	const onSubmit: SubmitHandler<UpdatePasswordFormData> = (data) => {
		mutate({
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
		reset();
	};

	return { onSubmit, isPending };
};
