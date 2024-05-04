'use client';
import { AppShell, Flex, Loader, SimpleGrid, Text } from '@mantine/core';
import MovieCard from './ui/movie-card/movie-card';
import FiltersComponent from './ui/filters/filtersComponent';
import { useState } from 'react';
import useSWR from 'swr';
import { getMovieGenres, getMovies } from './lib/actions';

export type GenreType = {
  id: number;
  name: string;
}

type MovieType = {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export default function HomePage() {
  const [filterValue, setFilterValue] = useState('');
  const { data, error, isLoading } = useSWR('genres', getMovieGenres);
  const { data: moviesData } = useSWR('movies', getMovies);
  const genres = data && data.genres.map((el: GenreType) => ({ value: el.id.toString(), label: el.name }));
  const [genreValue, setGenreValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [ratingFrom, setRatingFrom] = useState<string | number>('0.0');
  const [ratingTo, setRatingTo] = useState<string | number>('0.0');
  const [sortBy, setSortBy] = useState('');
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <AppShell.Main>
        <div style={{ width: '100%', minHeight: '100vh', padding: '40px 80px 0 80px', backgroundColor: '#F5F5F6' }}>
          <Text style={{ fontWeight: 700, fontFamily: 'Inter', fontSize: '32px' }}>Movies</Text>
          <FiltersComponent data={genres} genreValue={genreValue} setGenreValue={setGenreValue} ratingFrom={ratingFrom}
                            ratingTo={ratingTo} setRatingFrom={setRatingFrom} setRatingTo={setRatingTo}
                            releaseYear={releaseYear} setReleaseYear={setReleaseYear} setSortBy={setSortBy}
                            sortBy={sortBy} />
          {moviesData ? (
            <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" mt={24}>
              {moviesData.results.map((el: MovieType, index: number) => (
                <MovieCard key={index} genres={data.genres} originalTitle={el.original_title} voteCount={el.vote_count}
                           voteAverage={el.vote_average}
                           releaseDate={el.release_date} posterPath={el.poster_path} genreIds={el.genre_ids} />
              ))}
            </SimpleGrid>
          ) : (
            <Flex style={{
              position: 'fixed',
              top: '50%',
              left: '55%',
            }}>
              <Loader color="#9854F6" />
            </Flex>
          )}
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
