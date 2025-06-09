import { getRatingColor } from "@/shared/utils/getRatingColor";

export const Rating = ({ rating, voteCount }: { rating: number; voteCount: number }) => {
	const ratingColor = getRatingColor(rating);

	return (
		<div className="bg-black/33 p-4 rounded-lg border border-border backdrop-blur-sm flex flex-col items-center">
			<div className={`text-4xl font-bold ${ratingColor}`}>{rating.toFixed(1)}</div>
			<div className="text-foreground/60 mt-1 text-center text-xs">
				{voteCount.toLocaleString()} {getVoteCountText(voteCount)}
			</div>
		</div>
	);
};

function getVoteCountText(count: number) {
	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		return "оценка";
	} else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
		return "оценки";
	} else {
		return "оценок";
	}
}
