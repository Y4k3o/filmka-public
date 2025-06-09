import { CombinedPersonMediaCredits, PersonMediaCredits } from "@/shared/types/credits";
import { sortByDate } from "./sortByDate";

export const getFilteredByRole = (role: string, cast: PersonMediaCredits["cast"], crew: PersonMediaCredits["crew"]): CombinedPersonMediaCredits[] => {
	if (role === "cast") return sortByDate(cast);

	const filteredCrew = crew.filter((item) => item.job.toLowerCase().includes(role));
	return sortByDate(filteredCrew);
};
