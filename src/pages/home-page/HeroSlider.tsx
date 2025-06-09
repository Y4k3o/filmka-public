import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";
import { TMDB_IMAGE_BASE } from "@/shared/api/apiInstance";
import { Genre } from "@/shared/types/genre";
import { MediaInList } from "@/shared/types/media";
import { MovieInList } from "@/shared/types/movie";
import { getGenreNames } from "@/shared/utils/getGenreNames";
import { getRatingColorBg } from "@/shared/utils/getRatingColor";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCatalogFilter } from "../catalog-page/useCatalogFilters";

type HeroSliderProps = {
	genres: Genre[] | undefined;
	media: MediaInList[] | undefined;
};

export const HeroSlider = ({ genres, media }: HeroSliderProps) => {
	const navigate = useNavigate();
	const { setSelectedGenres, setYearFrom, setYearTo } = useCatalogFilter();

	const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);

	const [isHovered, setIsHovered] = useState(false);

	const pause = useCallback(() => autoplay.current.stop(), []);
	const play = useCallback(() => autoplay.current.play(), []);

	const movies = media as MovieInList[] | undefined;

	useEffect(() => {
		if (!emblaApi) return;
		if (isHovered) pause();
		else play();
	}, [emblaApi, isHovered, pause, play]);

	return (
		<section
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative z-0 w-full h-[75vh] flex items-center bg-background text-foreground overflow-hidden mb-30"
		>
			<div className="embla w-full" ref={emblaRef}>
				<div className="embla__container flex">
					{movies?.map((slide) => (
						<div
							key={slide.id}
							className="embla__slide relative flex-[0_0_100%] h-[75vh] bg-cover bg-top flex items-end p-8 before:content-[''] before:absolute before:inset-0 before:z-10 before:bg-gradient-to-t before:from-secondDark before:via-secondDark/20 before:to-secondDark/0"
							style={{
								backgroundImage: `url(${TMDB_IMAGE_BASE}original${slide.backdrop_path})`,
							}}
						>
							<div className="container z-10 px-4 md:px-12 flex flex-col md:flex-row items-center gap-6">
								<Image
									fallback="/fallback-poster.jpg"
									src={`${TMDB_IMAGE_BASE}original${slide.poster_path}`}
									alt={slide.title}
									className="w-48 md:w-64 rounded shadow-lg hidden md:block"
								/>

								<div>
									<h1 className="text-2xl md:text-4xl font-bold font-logo mb-5">{slide.title}</h1>
									<div className="flex items-center gap-2 mt-2 text-xs md:text-sm">
										<span className={`text-white p-2 rounded-md ${getRatingColorBg(slide.vote_average)}`}>⭐ {slide.vote_average.toFixed(1)}</span>
										<span
											onClick={() => {
												setYearFrom(slide.release_date.slice(0, 4));
												setYearTo(slide.release_date.slice(0, 4));
												navigate(`/catalog/movie`);
											}}
											className="bg-secondDark transition-colors text-white duration-500 p-2 rounded-lg cursor-pointer"
										>
											{slide.release_date.slice(0, 4)}
										</span>
										<ul className="flex gap-2">
											{genres != undefined
												? getGenreNames(slide.genre_ids, genres)?.map((name, index) => (
														<li
															onClick={() => {
																setSelectedGenres([genres.find((genre) => genre.name === name)!.id]);
																navigate(`/catalog/movie`);
															}}
															className="bg-secondary/90 transition-colors duration-500 text-white rounded-lg p-2 cursor-pointer"
															key={index}
														>
															{name}
														</li>
												  ))
												: null}
										</ul>
									</div>
									<p className="text-foreground mt-4 max-w-xl text-xs md:text-sm">
										{slide.overview.length > 200 ? `${slide.overview.slice(0, 200)}...` : slide.overview}
									</p>

									<div className="flex gap-4 mt-6">
										<Link to={`/movie/${slide.id}`}>
											<Button variant="outline">Подробнее</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
