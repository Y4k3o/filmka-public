import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAge } from "@/pages/person-page/helpers/calcAge";
import { SinglePerson } from "@/shared/types/person";

type BioFactsProps = {
	person: SinglePerson;
};

export const BioFacts = ({ person }: BioFactsProps) => {
	let gender: string = "";
	switch (person.gender) {
		case 0:
			gender = "трап";
			break;
		case 1:
			gender = "Женщина";
			break;
		case 2:
			gender = "Мужчина";
			break;
		default:
			break;
	}

	return (
		<Card className="bg-black/33 backdrop-blur-sm border-none">
			<CardHeader>
				<CardTitle className="text-lg">О персоне</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-[1fr_3fr] text-sm space-y-2 text-zinc-300">
				<span className="text-zinc-400">Карьера: </span>
				<p>{person.known_for_department}</p>

				<span className="text-zinc-400">Дата рождения:</span>
				<div className="flex gap-2">
					{person.birthday}
					{!person.deathday && <span className="text-zinc-400 italic mr-10">{calculateAge(person.birthday)}</span>}
				</div>

				<span className="text-zinc-400">Место рождения:</span>
				<p>{person.place_of_birth}</p>

				<span className="text-zinc-400">Пол:</span>
				<p>{gender}</p>

				<span className="text-zinc-400">Популярность:</span>
				<p>{person.popularity.toFixed(0)}</p>

				{person.deathday && (
					<>
						<span className="text-zinc-400">Дата Смерти:</span>
						<div className="flex gap-2">
							<p>{person?.deathday}</p>
							<span className="text-zinc-400 italic mr-10">{calculateAge(person.birthday, person.deathday)}</span>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};
