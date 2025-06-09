import { TmdbSeriesStatus } from "../types/series";

export const statusMap: Record<TmdbSeriesStatus, string> = {
	Ended: "Завершён",
	"Returning Series": "Возвращающийся сериал",
	"In Production": "В производстве",
	Canceled: "Отменён",
	Pilot: "Пилотный выпуск",
	Planned: "Запланировано",
	"Post Production": "Послепроизводство",
	Upcoming: "Предстоящий",
	"On Hiatus": "На паузе",
	Unknown: "Неизвестно",
};
