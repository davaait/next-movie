import { GenreType } from './definitions';

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const getGenresText = (genresIds: number[], genres: Array<GenreType>) => {
  if (genres) {
    return genres.filter((el: GenreType) => genresIds?.includes(el.id))
      .map((el: GenreType) => el.name).join(', ');
  }
};
