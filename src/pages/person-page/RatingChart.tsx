import { CombinedPersonMediaCredits } from "@/shared/types/credits.ts";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type RatingChartProps = {
	media: CombinedPersonMediaCredits[];
};

export const RatingChart = ({ media }: RatingChartProps) => {
	const data = media
		.map((item) => {
			const date = item.media_type === "movie" ? item.release_date : item.first_air_date;
			const year = date.slice(0, 4) ?? "Неизвестно";
			const title = item.media_type === "movie" ? item.title : item.name;
			return {
				year,
				title,
				rating: item.vote_average,
				votes: item.vote_count,
			};
		})
		.sort((a, b) => a.year.localeCompare(b.year));

	if (data.length === 0)
		return <div className="text-muted-foreground text-sm text-center h-[300px] flex items-center justify-center">Нет рейтингов</div>;

	return (
		<ResponsiveContainer width="100%" height={300} minWidth={300}>
			<BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
				<XAxis dataKey="year" stroke="#9ca3af" />
				<YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} stroke="#9ca3af" />
				<Tooltip
					contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#f9fafb" }}
					formatter={(value: number, name: string) => {
						if (name === "rating") return [`★ ${value.toFixed(1)}`, "Рейтинг"];
						if (name === "votes") return [`${value}`, "Оценок"];
						return value;
					}}
					labelFormatter={(label, payload) => {
						const item = payload?.[0]?.payload;
						return item?.title ? `Год: ${label} | ${item.title}` : `Год: ${label}`;
					}}
				/>
				<Bar dataKey="rating" fill="hsl(32, 96%, 48%)" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
};
