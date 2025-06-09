import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const registerSchema = z
	.object({
		email: z.string().email(),
		displayName: z.string().min(3, "Имя должно быть не менее 3 символов"),
		password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
		confirmPassword: z.string().min(8, "Пароль должен быть не менее 8 символов"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export const registerFirebaseSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	displayName: z.string().min(3, "Имя должно быть не менее 3 символов"),
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string(),
		newPassword: z.string().min(8, "Пароль должен быть не менее 8 символов"),
		confirmPassword: z.string().min(8, "Пароль должен быть не менее 8 символов"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export const updateEmailSchema = z.object({
	email: z.string().email(),
});

export const updateUserInfoSchema = z.object({
	displayName: z.string().min(3, "Имя должно быть не менее 3 символов").optional(),
	gender: z.enum(["male", "female", "other"]).optional(),
	about: z.string().optional(),
});
