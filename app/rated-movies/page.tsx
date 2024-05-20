'use client';
import img from '../../public/images/pic_2.png';
import { Button, Flex, Input, Pagination, rem, SimpleGrid } from '@mantine/core';
import EmptyState from '../ui/empty-state/empty-state';
import { useEffect, useState } from 'react';
import { SearchIcon } from '../ui/icons/SearchIcon';
import { MovieI } from '../lib/definitions';
import MovieCard from '../ui/movie-card/movie-card';
import useSWR from 'swr';
import { fetcher } from '../lib/utils';
import Loading from '../[id]/loading';
import LayoutComponent from '../ui/layout/layout-component';
import styles from './ratedMovies.module.css';

const pageSize = 4;

const Page = () => {
  const [value, setValue] = useState('');
  const [ratedMovies, setRatedMovies] = useState<MovieI[]>([]);
  const [currentMovies, setCurrentMovies] = useState<MovieI[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleSearch = () => {
    const filteredMovies = ratedMovies.filter((movie: MovieI) => movie.originalTitle.toLowerCase().includes(value.toLowerCase()));
    setActivePage(1);
    setTotalPages(Math.ceil(filteredMovies.length / pageSize));
    setCurrentMovies(filteredMovies.slice(0, pageSize));
  };
  const handleKeySearch = (key: string) => {
    if (key === 'Enter') {
      handleSearch();
    }
  };
  const changeCurrentMovies = (value: number) => {
    setActivePage(value);
    if (!value) {
      setCurrentMovies(ratedMovies.slice(0, pageSize));
    } else {
      const startIndex = (value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const movies = ratedMovies.slice(startIndex, endIndex);
      setCurrentMovies(movies);
    }
  };
  const { data, isLoading } = useSWR('api/genres', fetcher);
  useEffect(() => {
    const movieKeys = Object.keys(localStorage).filter((item: string) => item.includes('movie/'));
    const moviesData: MovieI[] = movieKeys?.map(key => {
      const lsItem = localStorage.getItem(key);
      if (lsItem) {
        return JSON.parse(lsItem);
      }
    });
    setRatedMovies(moviesData);
    setTotalPages(Math.ceil(moviesData.length / pageSize));
    setCurrentMovies(moviesData.slice(0, pageSize));
  }, []);
  return (
    <LayoutComponent>
      <div className={styles.container}>
        {isLoading ? (
          <Loading />
        ) : ratedMovies.length === 0 ? (
          <EmptyState image={img} isRatedPage={true} phrase={`You haven't rated any films yet`} />
        ) : (
          <>
            <Flex className={styles.header}>
              <span className={styles.headerTitle}>Rated movies</span>
              <Input
                className={styles.searchInput}
                placeholder="Search movie title"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyUp={(event) => handleKeySearch(event.key)}
                leftSection={<SearchIcon style={{ width: rem(16), height: rem(16) }} />}
                rightSectionPointerEvents="all"
                rightSectionWidth={104}
                mt="md"
                size="md"
                rightSection={
                  <Button onClick={handleSearch} className={styles.searchButton} variant="filled" radius="md">
                    Search
                  </Button>
                }
              />
            </Flex>
            <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" className={styles.grid}>
              {currentMovies?.map((el, index) => (
                <MovieCard
                  id={el.id}
                  key={index}
                  genres={data?.genres}
                  originalTitle={el.originalTitle}
                  voteCount={el.voteCount}
                  voteAverage={el.voteAverage}
                  releaseDate={el.releaseDate}
                  posterPath={el.posterPath}
                  genreIds={el.genreIds}
                />
              ))}
            </SimpleGrid>
            <Flex className={styles.pagination}>
              <Pagination
                boundaries={0}
                color="#9854F6"
                siblings={1}
                value={activePage}
                onChange={changeCurrentMovies}
                total={totalPages}
                mt={24}
                mb={24}
              />
            </Flex>
          </>
        )}
      </div>
    </LayoutComponent>
  );
};

export default Page;