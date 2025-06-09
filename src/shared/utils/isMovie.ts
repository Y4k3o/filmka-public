import { MediaInList, SingleMedia } from "../types/media";
import { MovieInList, SingleMovie } from "../types/movie";

export const isMovie = (item: SingleMedia | MediaInList): item is SingleMovie => "title" in item;
export const isMovieInList = (item: MediaInList | SingleMedia): item is MovieInList => "title" in item;
