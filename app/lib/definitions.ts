export type GenreType = {
  id: number;
  name: string;
}

export type MovieType = {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export type FiltersComponentProps = {
  genreValue: string;
  releaseYear: string;
  ratingFrom: string | number;
  ratingTo: string | number;
  sortBy: string;
  setGenreValue: (val: string) => void;
  setReleaseYear: (val: string) => void;
  setRatingFrom: (val: string | number) => void;
  setRatingTo: (val: string | number) => void;
  setSortBy: (val: string) => void;
  data: Array<{ value: string, label: string }>;
  resetFiltersHandler: () => void;
}

export type NativeSelectProps = {
  value: string;
  setValue: (val: string) => void;
  label: string;
  placeholder: string;
  data: Array<{ value: string, label: string } | string>;
}

export type MovieCardProps = {
  genres: Array<GenreType>;
  originalTitle: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
}

export enum SortBy {
  ORIGINAL_TITLE_ASC = 'original_title.asc',
  ORIGINAL_TITLE_DESC = 'original_title.desc',
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC = 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC = 'primary_release_date.desc',
  TITLE_ASC = 'title.asc',
  TITLE_DESC = 'title.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}