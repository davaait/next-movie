'use client';

import { Flex, Pagination, SimpleGrid } from '@mantine/core';
import MovieCard from './ui/movie-card/movie-card';
import FiltersComponent from './ui/filters/filtersComponent';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { GenreType, MovieType } from './lib/definitions';
import { fetcher } from './lib/utils';
import img from '../public/images/pic_1.png';
import EmptyState from './ui/empty-state/empty-state';
import Loading from './[id]/loading';
import LayoutComponent from './ui/layout/layout-component';
import styles from './ui/components.module.css';
import { useMediaQuery } from '@mantine/hooks';

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px');
  const [activePage, setPage] = useState(1);
  const [genreValue, setGenreValue] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [ratingFrom, setRatingFrom] = useState<string | number>('');
  const [ratingTo, setRatingTo] = useState<string | number>('');
  const [sortBy, setSortBy] = useState('');
  const resetFiltersHandler = () => {
    window.location.reload();
  };
  useEffect(() => {
    setPage(1);
    if (Number(ratingFrom) < 0 || Number(ratingFrom) > 10) {
      setRatingFrom(0);
    } else if (Number(ratingTo) < 0 || Number(ratingTo) > 10) {
      setRatingTo(10);
    }
  }, [genreValue, genreValue, releaseYear, ratingFrom, ratingTo, sortBy]);
  const { data, error } = useSWR('api/genres', fetcher);
  const {
    data: moviesData,
    isLoading,
  } = useSWR(`api/movies?with_genres=${genreValue}&primary_release_year=${releaseYear}&vote_average.lte=${ratingTo}&vote_average.gte=${ratingFrom}&sort_by=${sortBy}&page=${activePage}`, fetcher);
  if (error) return <Loading />;
  const genres = data?.genres?.map((el: GenreType) => ({ value: el.id.toString(), label: el.name }));
  return (
    <LayoutComponent>
      <div className={styles.mainPageContainer}>
        <span style={{ fontWeight: 700, fontSize: 32 }}>Movies</span>
        <FiltersComponent resetFiltersHandler={resetFiltersHandler} data={genres} genreValue={genreValue}
                          setGenreValue={setGenreValue} ratingFrom={ratingFrom}
                          ratingTo={ratingTo} setRatingFrom={setRatingFrom} setRatingTo={setRatingTo}
                          releaseYear={releaseYear} setReleaseYear={setReleaseYear} setSortBy={setSortBy}
                          sortBy={sortBy} />
        {moviesData?.results?.length ? (
          <>
            <SimpleGrid cols={{ xs: 1, sm: 1, lg: 2, xl: 2 }} spacing="md" mt={24}>
              {moviesData?.results?.map((el: MovieType, index: number) => (
                <MovieCard id={el.id} key={index} genres={data.genres} originalTitle={el.original_title}
                           voteCount={el.vote_count}
                           voteAverage={el.vote_average}
                           releaseDate={el.release_date} posterPath={el.poster_path} genreIds={el.genre_ids} />
              ))}
            </SimpleGrid>
            <Flex bg={'#F5F5F6'} direction={'row'} justify={isMobile ? 'center' : 'flex-end'} align={'center'}>
              <Pagination boundaries={0} color="#9854F6" siblings={1} value={activePage} onChange={setPage}
                          total={moviesData?.total_pages} mt={24} mb={24} />
            </Flex>
          </>
        ) : isLoading ? <Loading /> : (
          <EmptyState image={img} isRatedPage={false} phrase={`We don't have such movies, look for another one`} />
        )}
      </div>
    </LayoutComponent>
  );
}
