import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { auth } from "./firebase";
import { queryClient } from "./queryClient";

export const useLogout = () => {
	const navigate = useNavigate();
	const { mutate: logout, isPending } = useMutation({
		mutationFn: () => signOut(auth),
		onSuccess: () => {
			toast.success("Вы успешно вышли из аккаунта");
			navigate("/");
		},
		onError: () => {
			toast.error("Ошибка выхода из аккаунта");
		},
		onSettled: () => {
			queryClient.removeQueries();
		},
	});

	return { logout, isPending };
};
