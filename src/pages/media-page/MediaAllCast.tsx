import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaType } from "@/shared/types/media";
import { useOutletContext } from "react-router";
import { MediaAllCastListItem } from "./MediaAllCastListItem";
import { useSingleMedia } from "./useSingleMedia";

const MediaAllCastPage = () => {
	const { id, mediaType } = useOutletContext<{ id: number; mediaType: MediaType }>();
	const { credits, isCreditsPending } = useSingleMedia(id, mediaType);

	if (isCreditsPending) {
		return (
			<div className="container">
				<Skeleton />
			</div>
		);
	}

	if (!credits)
		return (
			<div className="container">
				<div>Каст не найден</div>
			</div>
		);

	const tabsData = [
		{
			label: "Актеры",
			value: "actor",
			content: credits.cast.map((actor) => <MediaAllCastListItem type="cast" person={actor} />),
		},
		{
			label: "Режиссёры",
			value: "directing",
			content: credits.crew
				.filter((crew) => crew.department === "Directing")
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
		{
			label: "Сценаристы",
			value: "writing",
			content: credits.crew
				.filter((crew) => crew.department === "Writing")
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
		{
			label: "Продюсеры",
			value: "production",
			content: credits.crew
				.filter((crew) => crew.department === "Production")
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
		{
			label: "Монтаж",
			value: "editing",
			content: credits.crew
				.filter((crew) => crew.department === "Editing")
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
		{
			label: "Операторская работа",
			value: "camera",
			content: credits.crew
				.filter((crew) => crew.department === "Camera")
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
		{
			label: "Прочее",
			value: "crew",
			content: credits.crew
				.filter((crew) => !["Directing", "Writing", "Production", "Editing", "Camera"].includes(crew.department))
				.map((person) => <MediaAllCastListItem key={person.credit_id} type="crew" person={person} />),
		},
	];

	return (
		<Tabs defaultValue="actor" className="mt-6 w-full container">
			<TabsList className="flex flex-wrap gap-2 h-12 bg-background rounded-lg shadow-inner mx-auto">
				{tabsData.map(({ value, label }) => (
					<TabsTrigger
						key={value}
						value={value}
						className="data-[state=active]:bg-primary data-[state=active]:text-white p-5 rounded-md text-sm font-medium transition-colors hover:bg-primary/80 cursor-pointer"
					>
						{label}
					</TabsTrigger>
				))}
			</TabsList>
			{tabsData.map(({ content, value }) => (
				<TabsContent key={value} value={value} className="space-y-3 mt-4">
					{content.length > 0 ? content : <div className="text-center mt-20 text-2xl">Нет данных</div>}
				</TabsContent>
			))}
		</Tabs>
	);
};

export default MediaAllCastPage;
