import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmailSchema } from "@/shared/schemas/user.schema";
import { UpdateEmailFormData } from "@/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateEmail } from "./useUpdateEmail";

export const UpdateEmail = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateEmailFormData>({ resolver: zodResolver(updateEmailSchema) });

	const { mutate, isPending } = useUpdateEmail();

	const onSubmit = (data: UpdateEmailFormData) => {
		mutate({
			email: data.email,
		});
		reset();
	};

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">Изменить email</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-center">
					<div className="space-y-2">
						<Label htmlFor="email">Сменить почту</Label>
						<Input id="email" type="email" autoComplete="email" {...register("email")} />
						{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					</div>
					<Button type="submit" className="w-[150px]" disabled={isPending}>
						{isPending ? "Сохраняем..." : "Обновить"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
