import { Image } from "@/components/Image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import * as React from "react";

type TrailerProps = {
	youtubeKey: string;
};

export const Trailer = ({ youtubeKey }: TrailerProps) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className={`group cursor-pointer relative w-full overflow-hidden rounded-lg border border-border`}>
					<AspectRatio ratio={16 / 9}>
						<Image
							fallback="/fallback-backdrop.gif"
							src={`https://i.ytimg.com/vi/${youtubeKey}/hqdefault.jpg`}
							alt="Trailer thumbnail"
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>

						<div className="absolute inset-0 flex items-center justify-center bg-black/33 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
							<Play size={64} className="text-primary drop-shadow-lg" />
						</div>
					</AspectRatio>
				</button>
			</DialogTrigger>

			<DialogContent className="overflow-hidden border-none bg-transparent p-0">
				<DialogTitle className="sr-only">Трейлер</DialogTitle>
				<AspectRatio ratio={16 / 9} className="rounded-2xl shadow-2xl bg-background">
					<iframe
						src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
						title="Trailer"
						className="h-full w-full rounded-2xl"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</AspectRatio>
			</DialogContent>
		</Dialog>
	);
};
