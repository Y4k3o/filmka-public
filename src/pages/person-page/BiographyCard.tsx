import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export const BiographyCard = ({ biography }: { biography?: string }) => {
	const [open, setOpen] = useState(false);

	if (!biography || biography.trim() === "") {
		return (
			<Card className="bg-black/33 backdrop-blur-sm border-none">
				<CardContent>
					<p>Нет биографии</p>
				</CardContent>
			</Card>
		);
	}

	const paragraphs = biography.split("\n").filter((p) => p.trim() !== "");
	const shortBio = paragraphs.length >= 2 ? `${paragraphs[0]} ${paragraphs[1]}` : paragraphs.slice(0, 200);

	return (
		<Card className="bg-black/33 backdrop-blur-sm border-none">
			<CardHeader>
				<CardTitle className="text-lg">Биография</CardTitle>
			</CardHeader>
			<CardContent>
				{/* Краткая версия биографии */}
				<p className="line-clamp-5 leading-relaxed text-zinc-200 whitespace-pre-line">{shortBio}</p>

				{/* Кнопка открытия диалога */}
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="link" className="mt-3 p-0 h-auto font-normal">
							Показать полностью
						</Button>
					</DialogTrigger>

					<DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border-none backdrop-blur-2xl bg-black/33 shadow-2xl p-0">
						<DialogTitle className="sr-only">Биография</DialogTitle>
						<div className="p-6">
							<h3 className="text-xl font-bold mb-4">Биография</h3>
							<ScrollArea className="h-[60vh] pr-4">
								<p className="whitespace-pre-line text-zinc-200">{biography}</p>
							</ScrollArea>
						</div>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
};
