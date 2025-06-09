import axios from "axios";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

export const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	timeout: 5000,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
	},
	params: {
		language: "ru-RU",
		region: "RU",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);
