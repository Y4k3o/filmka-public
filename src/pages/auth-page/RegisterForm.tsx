import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/shared/schemas/user.schema";
import { RegisterFormData } from "@/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useRegisterUser } from "./useRegisterUser";

const RegisterForm = () => {
	const form = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema), mode: "onChange" });
	const { onSubmit, isPending } = useRegisterUser({ form });
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	return (
		<div className="flex pb-50 items-center justify-center h-screen ">
			<div className="bg-background/95 backdrop-blur-lg p-8  rounded-2xl shadow-xl w-full max-w-md">
				<h2 className="text-2xl font-bold text-white mb-6 text-center">Регистрация</h2>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
					<Input {...register("email")} type="email" placeholder="Email" autoComplete="email" />
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					<Input {...register("displayName")} type="text" placeholder="Имя пользователя" autoComplete="username" />
					{errors.displayName && <p className="text-red-500 text-sm">{errors.displayName.message}</p>}
					<Input {...register("password")} type="password" placeholder="Пароль" autoComplete="new-password" />
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
					<Input {...register("confirmPassword")} type="password" placeholder="Повторите пароль" autoComplete="new-password" />
					{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
					<Button disabled={isPending} type="submit" className="w-full">
						Зарегистрироваться
					</Button>
					{errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
					<div className="text-center">
						<p className="text-sm text-gray-400">
							Уже есть аккаунт?{" "}
							<Link to="/login" className="text-primary hover:underline cursor-pointer">
								Войдите
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
