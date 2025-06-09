import { MovieCreditsCast, MovieCreditsCrew, TVCreditsCast, TVCreditsCrew } from "@/shared/types/credits";

type PersonBackgroundProps = {
	credits: (TVCreditsCast | MovieCreditsCast)[] | (TVCreditsCrew | MovieCreditsCrew)[] | undefined;
};

export const PersonBackground = ({ credits }: PersonBackgroundProps) => {
	if (!credits || credits.length === 0)
		return (
			<div className="absolute inset-0 -z-10 bg-cover bg-center after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-black/50 after:to-black/25" />
		);

	const randomIndex = Math.floor(Math.random() * credits.length);
	const randomCredit = credits[randomIndex];
	const backdrop = `https://image.tmdb.org/t/p/original${randomCredit.backdrop_path}`;

	return (
		<div
			className="absolute inset-0 -z-10 bg-cover bg-center after:absolute after:backdrop-blur-xs after:inset-0 after:bg-gradient-to-t after:from-black after:via-black/50 after:to-black/25"
			style={{ backgroundImage: `url(${backdrop})` }}
		/>
	);
};
