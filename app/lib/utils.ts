import { GenreType } from './definitions';

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const getGenresText = (genresIds: number[], genres: Array<GenreType>) => {
  if (genres) {
    return genres.filter((el: GenreType) => genresIds?.includes(el.id))
      .map((el: GenreType) => el.name).join(', ');
  }
};

export const minutesToHoursMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursPart = hours > 0 ? `${hours}h` : '';
  const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}m` : '';
  return `${hoursPart} ${minutesPart}`;
}
