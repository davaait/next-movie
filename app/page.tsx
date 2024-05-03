'use client';
import { AppShell, SimpleGrid, Text } from '@mantine/core';
import MovieCard from './ui/movie-card/movie-card';
import FiltersComponent from './ui/filters/filtersComponent';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getMovieGenres, getMovies } from './lib/actions';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';

type Genre = {
  id: number;
  name: string;
}

export default function HomePage() {
  const searchParams = useSearchParams()
  const [filterValue, setFilterValue] = useState('');
  const { data, error, isLoading } = useSWR('genres', getMovieGenres);
  const { data: moviesData } = useSWR('movies', getMovies);
  console.log(moviesData);
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
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </SimpleGrid>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
