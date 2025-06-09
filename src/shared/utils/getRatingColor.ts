export const getRatingColor = (rating: number | undefined) => {
	if (rating && rating >= 7) return "text-green-400";
	if (rating && rating >= 4) return "text-yellow-400";
	if (rating && rating >= 0) return "bg-red-400";
	return "bg-accent";
};

export const getRatingColorBg = (rating: number | undefined) => {
	if (rating && rating >= 7) return "bg-green-400";
	if (rating && rating >= 4) return "bg-yellow-400";
	if (rating && rating >= 0) return "bg-red-400";
	return "bg-accent";
};
