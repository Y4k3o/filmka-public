import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePasswordSchema } from "@/shared/schemas/user.schema";
import { UpdatePasswordFormData } from "@/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";

export const UpdatePassword = () => {
	const form = useForm<UpdatePasswordFormData>({ resolver: zodResolver(updatePasswordSchema) });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	const { onSubmit, isPending } = useUpdatePassword({ form });

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">Изменить пароль</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-center">
					<div className="space-y-2">
						<Label htmlFor="oldPassword">Старый пароль</Label>
						<Input id="oldPassword" type="password" autoComplete="password" {...register("oldPassword")} />
						{errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="newPassword">Новый пароль</Label>
						<Input id="newPassword" type="password" autoComplete="new-password" {...register("newPassword")} />
						{errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Подтверждение пароля</Label>
						<Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")} />
						{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
						{errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
					</div>
					<Button type="submit" className="w-[150px]" disabled={isPending}>
						{isPending ? "Сохраняем..." : "Обновить"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
