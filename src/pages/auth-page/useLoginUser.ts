import { auth } from "@/shared/api/firebase";
import { queryClient } from "@/shared/api/queryClient";
import { LoginFormData } from "@/shared/types/user";
import { notifyApiError } from "@/shared/utils/errors";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type UseLoginUserProps = {
	form: UseFormReturn<LoginFormData>;
};

export const useLoginUser = ({ form }: UseLoginUserProps) => {
	const { setError } = form;

	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: (data: LoginFormData) => signInWithEmailAndPassword(auth, data.email, data.password),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth-user"] }).then(() => {
				navigate("/");
			});
			toast.success("Вы успешно вошли в аккаунт");
		},
		onError: (error) => {
			notifyApiError(error, false, { setError });
		},
		retry: false,
	});

	const onSubmit: SubmitHandler<LoginFormData> = (data) => mutate(data);
	return { onSubmit, isPending };
};
