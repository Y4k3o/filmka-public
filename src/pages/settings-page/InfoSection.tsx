import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useUserData } from "@/shared/api/useUserData";
import { updateUserInfoSchema } from "@/shared/schemas/user.schema";
import { UpdateUserInfoFormData } from "@/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserInfo } from "./useUpdateUserInfo";

export const InfoSection = () => {
	const { data: userData, isPending: isUserPending } = useUserData();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(updateUserInfoSchema),
	});

	const { mutate, isPending } = useUpdateUserInfo();

	useEffect(() => {
		if (userData) {
			reset({
				displayName: userData.displayName || "",
				gender: userData.gender || "other",
				about: userData.about || "",
			});
		}
	}, [userData, reset]);

	if (!userData || isUserPending) return <Skeleton />;
	const uid = userData.uid;

	const onSubmit = (data: UpdateUserInfoFormData) => {
		mutate({
			uid,
			...data,
		});
		reset(data);
	};

	return (
		<Card>
			<CardContent>
				<h2 className="text-lg font-semibold mb-5 text-center">Информация</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="displayName">Никнейм</Label>
						<Input {...register("displayName")} id="displayName" autoComplete="username" />
						{errors.displayName && <p className="text-red-500 text-sm">{errors.displayName.message}</p>}
					</div>
					<div className="space-y-2">
						<Label htmlFor="gender">Пол</Label>
						<Select
							{...register("gender")}
							defaultValue={userData?.gender || "other"}
							onValueChange={(value: "other" | "male" | "female") => setValue("gender", value)}
						>
							<SelectTrigger id="gender">
								<SelectValue placeholder="Выберите пол" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="other">Не указан</SelectItem>
								<SelectItem value="male">Мужской</SelectItem>
								<SelectItem value="female">Женский</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="about">О себе</Label>
						<Textarea {...register("about")} id="about" className="min-h-35" placeholder="Напишите немного о себе..." />
						{errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
					</div>
					<Button disabled={isPending}>Обновить</Button>
				</form>
			</CardContent>
		</Card>
	);
};
