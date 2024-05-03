'use client';
import { AppShell, SimpleGrid, Text } from '@mantine/core';
import MovieCard, { MovieCardProps } from './ui/movie-card/movie-card';
import FiltersComponent from './ui/filters/filtersComponent';
import { useState } from 'react';
import useSWR from 'swr';
import { getMovieGenres, getMovies } from './lib/actions';
import { useSearchParams } from 'next/navigation';

type Genre = {
  id: number;
  name: string;
}

type Movie = {
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const [filterValue, setFilterValue] = useState('');
  const { data, error, isLoading } = useSWR('genres', getMovieGenres);
  const { data: moviesData } = useSWR('movies', getMovies);
  const genres = data && data.genres.map((el: Genre) => el.name);
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
        <div style={{ width: '100%', height: '100vh', padding: '40px 80px 0 80px', backgroundColor: '#F5F5F6' }}>
          <Text style={{ fontWeight: 700, fontFamily: 'Inter', fontSize: '32px' }}>Movies</Text>
          <FiltersComponent data={genres} genreValue={genreValue} setGenreValue={setGenreValue} ratingFrom={ratingFrom}
                            ratingTo={ratingTo} setRatingFrom={setRatingFrom} setRatingTo={setRatingTo}
                            releaseYear={releaseYear} setReleaseYear={setReleaseYear} setSortBy={setSortBy}
                            sortBy={sortBy} />
          <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" mt={24}>
            {moviesData && moviesData.results.map((el: Movie, index: number) => (
              <MovieCard key={index} originalTitle={el.original_title} voteCount={el.vote_count}
                         voteAverage={el.vote_average}
                         releaseDate={el.release_date} posterPath={el.poster_path} genreIds={el.genre_ids} />
            ))}
          </SimpleGrid>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
