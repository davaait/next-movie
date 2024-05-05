'use client';
import { AppShell, Flex, Loader, Pagination, SimpleGrid, Text } from '@mantine/core';
import MovieCard from './ui/movie-card/movie-card';
import FiltersComponent from './ui/filters/filtersComponent';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { GenreType, MovieType } from './lib/definitions';
import { fetcher } from './lib/utils';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [genreValue, setGenreValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [ratingFrom, setRatingFrom] = useState<string | number>('0.0');
  const [ratingTo, setRatingTo] = useState<string | number>('10.0');
  const [sortBy, setSortBy] = useState('');
  const resetFiltersHandler = () => {
    setGenreValue('');
    setReleaseYear('');
    setRatingFrom('0.0');
    setRatingTo('10.0');
    setSortBy('');
    window.location.reload();
  };
  useEffect(() => {
    setPage(1);
  }, [genreValue, genreValue, releaseYear, ratingFrom, ratingTo, sortBy]);
  const { data } = useSWR('api/genres', fetcher);
  const genres = data && data.genres.map((el: GenreType) => ({ value: el.id.toString(), label: el.name }));
  const {
    data: moviesData,
    error,
    isLoading,
  } = useSWR(`api/movies?with_genres=${genreValue}&primary_release_year=${releaseYear}&vote_average.lte=${ratingTo}&vote_average.gte=${ratingFrom}&sort_by=${sortBy}&page=${activePage}`, fetcher);
  console.log(moviesData);
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <AppShell.Main>
        <div style={{ width: '100%', minHeight: '100vh', padding: '40px 80px 0 80px', backgroundColor: '#F5F5F6' }}>
          <Text style={{ fontWeight: 700, fontFamily: 'Inter', fontSize: '32px' }}>Movies</Text>
          <FiltersComponent resetFiltersHandler={resetFiltersHandler} data={genres} genreValue={genreValue}
                            setGenreValue={setGenreValue} ratingFrom={ratingFrom}
                            ratingTo={ratingTo} setRatingFrom={setRatingFrom} setRatingTo={setRatingTo}
                            releaseYear={releaseYear} setReleaseYear={setReleaseYear} setSortBy={setSortBy}
                            sortBy={sortBy} />
          {moviesData ? (
            <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" mt={24}>
              {moviesData?.results?.map((el: MovieType, index: number) => (
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
          <Flex bg={'#F5F5F6'} justify={'flex-end'} align={'center'}>
            <Pagination color="#9854F6" siblings={0} value={activePage} onChange={setPage} total={moviesData?.total_pages} mt={24} mb={24} />
          </Flex>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
