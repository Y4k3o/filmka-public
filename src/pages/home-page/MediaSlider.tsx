import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

type MediaSliderProps<T> = {
	title: string;
	items: (T | undefined)[];
	renderItem: (item: T | undefined) => React.ReactNode;
};

export const MediaSlider = <T,>({ title, items, renderItem }: MediaSliderProps<T>) => {
	const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			dragFree: true,
			align: "start",
		},
		[autoplay.current]
	);

	const [isHovered, setIsHovered] = useState(false);

	const pause = useCallback(() => autoplay.current.stop(), []);
	const play = useCallback(() => autoplay.current.play(), []);

	useEffect(() => {
		if (!emblaApi) return;
		if (isHovered) pause();
		else play();
	}, [emblaApi, isHovered, pause, play]);

	return (
		<section className="py-10">
			<div className="container">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-bold font-logo">{title}</h2>
					<div className="flex gap-2"></div>
				</div>
				<div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} ref={emblaRef} className="overflow-hidden relative">
					<div className="flex gap-4 px-4">
						{items.map((item, index) => (
							<div key={index}>{renderItem(item)}</div>
						))}
					</div>
				</div>
			</div>

			<div className="relative group"></div>
		</section>
	);
};
