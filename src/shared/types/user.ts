import { MediaCategory } from "@/pages/profile-page/useProfileStore";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";
import {
	loginSchema,
	registerFirebaseSchema,
	registerSchema,
	updateEmailSchema,
	updatePasswordSchema,
	updateUserInfoSchema,
} from "../schemas/user.schema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterFirebaseData = z.infer<typeof registerFirebaseSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type UpdateEmailFormData = z.infer<typeof updateEmailSchema>;
export type UpdateUserInfoFormData = z.infer<typeof updateUserInfoSchema>;

export type UserData = {
	uid: string;
	email: string;
	displayName: string;
	createdAt: string;
	avatarUrl?: string;
	gender?: "male" | "female" | "other";
	about?: string;
};

export type MediaListItem = {
	id: number;
	type: "movie" | "tv";
	category: MediaCategory;
	addedAt: Timestamp;
	rating?: number;
};
