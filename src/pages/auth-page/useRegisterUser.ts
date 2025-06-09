import { createUserDocument } from "@/pages/auth-page/createUserDocument";
import { auth } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { RegisterFirebaseData, RegisterFormData } from "@/shared/types/user";
import { notifyApiError } from "@/shared/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type UseRegisterUserProps = {
	form: UseFormReturn<RegisterFormData>;
};

export const useRegisterUser = ({ form }: UseRegisterUserProps) => {
	const { setError } = form;

	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: RegisterFirebaseData) => {
			const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
			await updateProfile(credential.user, { displayName: data.displayName });
			await createUserDocument(credential.user);
			return credential;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth-user"] }).then(() => {
				navigate("/login");
				toast.success("Вы успешно зарегистрировались");
			});
		},
		onError: (error) => {
			notifyApiError(error, false, { setError });
		},
		retry: false,
	});

	const onSubmit: SubmitHandler<RegisterFormData> = (data) => mutate(data);
	return { onSubmit, isPending };
};
