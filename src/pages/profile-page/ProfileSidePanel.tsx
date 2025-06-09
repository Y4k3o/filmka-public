import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { categories } from "@/shared/constants/profileCategories";
import { useProfileStore } from "./useProfileStore";

export const ProfileSidePanel = () => {
	const { category, sortBy, sortType, view, setCategory, setSortBy, setSortType, setView } = useProfileStore();

	return (
		<aside className="w-70 max-h-215 flex-shrink-0 sticky top-25 border px-2 py-6 space-y-2 bg-background rounded-2xl">
			<div className="space-y-3">
				<h2 className="text-lg text-muted-foreground font-light px-5">Списки</h2>
				<ul className="space-y-1">
					<li>
						<Button
							onClick={() => setCategory("all")}
							variant={"ghost"}
							className={`w-full h-10 flex justify-between text-lg font-light hover:bg-muted mb-1 ${"all" === category && "bg-muted"}`}
						>
							Все
						</Button>
					</li>
					{categories.map((cat) => (
						<li key={cat.key}>
							<Button
								onClick={() => setCategory(cat.key)}
								variant={"ghost"}
								className={`w-full h-10 flex justify-between text-lg font-light hover:bg-muted mb-1 ${cat.key === category && "bg-muted"}`}
							>
								{cat.label}
							</Button>
						</li>
					))}
				</ul>

				<Separator />

				<h2 className="text-lg text-muted-foreground font-light px-5">Вид</h2>
				<div className="space-y-1 flex flex-col">
					<Button
						onClick={() => setView("grid")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							view === "grid" && "bg-muted"
						)}
					>
						Плитка
					</Button>
					<Button
						onClick={() => setView("list")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							view === "list" && "bg-muted"
						)}
					>
						Список
					</Button>
				</div>

				<Separator />

				<h2 className="text-lg text-muted-foreground font-light px-5">Сортировка</h2>
				<div className="flex flex-col">
					<Button
						onClick={() => setSortBy("title")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortBy === "title" && "bg-muted"
						)}
					>
						По названию
					</Button>
					<Button
						onClick={() => setSortBy("addedAt")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortBy === "addedAt" && "bg-muted"
						)}
					>
						По дате добавления
					</Button>
				</div>

				<Separator />
				<div className="flex flex-col">
					<Button
						onClick={() => setSortType("asc")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortType === "asc" && "bg-muted"
						)}
					>
						По возрастанию
					</Button>
					<Button
						onClick={() => setSortType("desc")}
						variant={"ghost"}
						className={cn(
							"w-full h-10 flex justify-between text-lg font-light 0 transition-colors duration-400 hover:bg-muted mb-1",
							sortType === "desc" && "bg-muted"
						)}
					>
						По убыванию
					</Button>
				</div>
			</div>
		</aside>
	);
};
