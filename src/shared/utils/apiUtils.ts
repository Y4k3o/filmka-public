import { AxiosRequestConfig } from "axios";
import { z, ZodSchema } from "zod";
import { api } from "../api/apiInstance";
import { notifyApiError } from "./errors";

export const getAndValidate = async <TSchema extends ZodSchema>(
	url: string,
	schema: TSchema,
	signal?: AbortSignal,
	config?: AxiosRequestConfig
): Promise<z.infer<TSchema>> => {
	try {
		const response = await api.get(url, { signal, ...config });
		const parsed = schema.safeParse(response.data);

		if (!parsed.success) {
			console.error("❌ Invalid response from", url);
			console.error(parsed.error.format());
			throw new Error("Invalid response from server");
		}

		return parsed.data;
	} catch (error) {
		throw new Error(notifyApiError(error));
	}
};
