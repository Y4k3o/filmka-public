import { Link } from "react-router";

export const Footer = () => {
	return (
		<footer className="py-10 border-t border-border bg-background">
			<div className="container">
				<Link to="/" className="text-primary text-2xl font-bold font-logo">
					Filmka
				</Link>
				<p className="text-md text-muted-foreground mt-1">Онлайн библиотека фильмов и сериалов</p>

				<div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground ">
					<p className="font-logo text-md">&copy; {new Date().getFullYear()} Filmka</p>
					<p className="mt-2 text-sm"> This product uses the TMDB API but is not endorsed or certified by TMDB</p>
				</div>
			</div>
		</footer>
	);
};
