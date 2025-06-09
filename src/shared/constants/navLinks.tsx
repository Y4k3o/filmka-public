import { Film, Home, Tv } from "lucide-react";

export const navLinks = [
	{ name: "Главная", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
	{ name: "Фильмы", path: "/catalog/movie", icon: <Film className="w-4 h-4 mr-2" /> },
	{ name: "Сериалы", path: "/catalog/series", icon: <Tv className="w-4 h-4 mr-2" /> },
];
