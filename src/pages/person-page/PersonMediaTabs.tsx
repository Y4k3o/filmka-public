import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonMediaCredits } from "@/shared/types/credits.ts";
import { useMemo, useState } from "react";
import { getCountLabel } from "./helpers/getCountLabel";
import { getFilteredByRole } from "./helpers/getFilteredByRole";
import { PersonMediaTabsListItem } from "./PersonMediaTabsListItem";
import { RatingChart } from "./RatingChart";

const ROLE_MAP = [
	{ key: "cast", label: "Актёр" },
	{ key: "director", label: "Режиссёр" },
	{ key: "writer", label: "Сценарист" },
	{ key: "producer", label: "Продюсер" },
];

export const PersonMediaTabs = ({ cast, crew }: PersonMediaCredits) => {
	const [activeRole, setActiveRole] = useState("cast");

	const tabFiltered = useMemo(() => getFilteredByRole(activeRole, cast, crew), [activeRole, cast, crew]);

	return (
		<div className="p-10">
			<div className="mt-6 bg-background rounded-xl border border-border p-4 shadow">
				<h3 className="text-xl font-semibold mb-2">Рейтинг по годам</h3>
				<RatingChart media={getFilteredByRole(activeRole, cast, crew)} />
			</div>

			<Tabs value={activeRole} onValueChange={setActiveRole} className="w-full mt-10">
				<TabsList className="flex-nowrap bg-background">
					{ROLE_MAP.map(({ key, label }) => (
						<TabsTrigger key={key} value={key} className="whitespace-nowrap text-xl px-10">
							{label} {getCountLabel(key, cast, crew)}
						</TabsTrigger>
					))}
				</TabsList>

				{ROLE_MAP.map(({ key }) => {
					return (
						<TabsContent key={key} value={key}>
							{tabFiltered.length === 0 ? (
								<div className="text-center rounded-xl p-9.5 bg-background shadow-sm">Нет данных</div>
							) : (
								<ul className="min-h-[300]">
									{tabFiltered.map((item) => (
										<PersonMediaTabsListItem key={item.id} item={item} />
									))}
								</ul>
							)}
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
};
