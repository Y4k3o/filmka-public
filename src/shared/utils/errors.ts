import { isAxiosError } from "axios";
import { FirebaseError } from "firebase/app";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export type ApiError = {
	status_code: number;
	status_message: string;
	success?: boolean;
};

const firebaseErrorMessage: Record<string, string> = {
	"auth/email-already-in-use": "Эта почта уже зарегистрирована",
	"auth/invalid-email": "Неверный формат email",
	"auth/user-not-found": "Пользователь не найден",
	"auth/missing-password": "Введите пароль",
	"auth/operation-not-allowed": "Операция не разрешена",
	"auth/invalid-credential": "Неверные учетные данные",
	"auth/invalid-verification-code": "Неверный код подтверждения",
	"auth/invalid-verification-id": "Неверный идентификатор подтверждения",
	"auth/missing-verification-id": "Отсутствует идентификатор подтверждения",
	"auth/invalid-user-token": "Неверный токен пользователя",
};

type MaybeSetError<TFieldValues extends FieldValues> = UseFormSetError<TFieldValues> | null | undefined;

export const notifyApiError = <TFieldValues extends FieldValues>(
	error: unknown,
	shouldToast = true,
	options?: {
		setError?: MaybeSetError<TFieldValues>;
	}
): string => {
	let message = "Неизвестная ошибка";
	if (isAxiosError(error)) {
		if (error.response?.data) {
			const apiError = error.response.data as ApiError;
			message = apiError.status_message || "Ошибка запроса к серверу";
		}
	} else if (typeof error === "object" && error !== null && "code" in error && "name" in error && (error as FirebaseError).name === "FirebaseError") {
		const firebaseError = error as FirebaseError;
		const firebaseCode = firebaseError.code;
		message = firebaseErrorMessage[firebaseCode];
		const setError = options?.setError;

		if (setError) {
			setError("root", { type: "manual", message });
		}
	} else if (error instanceof Error) {
		message = error.message;
	}

	if (shouldToast === true) {
		toast.error(message);
	}

	return message;
};
