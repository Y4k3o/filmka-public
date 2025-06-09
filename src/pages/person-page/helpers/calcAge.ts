const getAgeSuffix = (age: number): string => {
	const lastTwoDigit = age % 100;
	if (lastTwoDigit >= 11 && lastTwoDigit <= 19) {
		return "лет";
	}

	const lastDigit = age % 10;
	switch (lastDigit) {
		case 1:
			return "год";
		case 2:
		case 3:
		case 4:
			return "года";
		default:
			return "лет";
	}
};

export const calculateAge = (birthday: string, deathday?: string): string => {
	const today = new Date();
	const birthDate = new Date(birthday);

	const deathDate = deathday ? new Date(deathday) : today;

	let age = deathDate.getFullYear() - birthDate.getFullYear();
	const monthDifference = deathDate.getMonth() - birthDate.getMonth();

	if (monthDifference < 0 || (monthDifference === 0 && deathDate.getDate() < birthDate.getDate())) {
		age--;
	}
	const ageSuffix = getAgeSuffix(age);
	return `${age} ${ageSuffix}`;
};
