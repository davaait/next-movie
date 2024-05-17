'use client';
import img from '../../public/images/pic_2.png';
import { AppShell, Button, Flex, Input, Pagination, rem, SimpleGrid } from '@mantine/core';
import EmptyState from '../ui/empty-state/empty-state';
import { useEffect, useState } from 'react';
import { SearchIcon } from '../ui/icons/SearchIcon';
import { MovieI } from '../lib/definitions';
import MovieCard from '../ui/movie-card/movie-card';
import useSWR from 'swr';
import { fetcher } from '../lib/utils';
import Loading from '../[id]/loading';

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
    const moviesData: MovieI[] = movieKeys.map(key => {
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
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <AppShell.Main>
        <div style={{
          width: '100%',
          height: '100vh',
          padding: '40px 80px 0 80px',
          backgroundColor: '#F5F5F6',
        }}>
          {isLoading ? <Loading /> : ratedMovies.length === 0 ? (
            <EmptyState image={img} isRatedPage={true} phrase={`You haven't rated any films yet`} />
          ) : (
            <>
              <Flex justify={'space-between'} align={'center'} w={'100%'} mb={40}>
                <span style={{ fontWeight: 700, fontSize: 32 }}>Rated movies</span>
                <Input
                  style={{ width: 490, height: 48, display: 'flex', alignItems: 'center' }}
                  placeholder="Search movie title"
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                  onKeyUp={(event) => handleKeySearch(event.key)}
                  leftSection={<SearchIcon style={{ width: rem(16), height: rem(16) }} />}
                  rightSectionPointerEvents="all"
                  rightSectionWidth={104}
                  mt="md"
                  size="md"
                  rightSection={<Button onClick={handleSearch} style={{ width: 88, height: 32 }} variant="filled"
                                        radius="md">Search</Button>}
                />
              </Flex>
              <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="md" mt={24}>
                {currentMovies.map((el: MovieI, index: number) => (
                  <MovieCard id={el.id} key={index} genres={data?.genres} originalTitle={el.originalTitle}
                             voteCount={el.voteCount}
                             voteAverage={el.voteAverage}
                             releaseDate={el.releaseDate} posterPath={el.posterPath} genreIds={el.genreIds} />
                ))}
              </SimpleGrid>
              <Flex bg={'#F5F5F6'} justify={'center'} align={'center'}>
                <Pagination boundaries={0} color="#9854F6" siblings={1} value={activePage}
                            onChange={changeCurrentMovies}
                            total={totalPages} mt={24} mb={24} />
              </Flex>
            </>
          )}
        </div>
      </AppShell.Main>
    </AppShell>
  )
    ;
};

export default Page;