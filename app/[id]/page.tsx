'use client';
import { CurrentMoviePropsType, Details } from '../lib/definitions';
import { Breadcrumbs, Flex, SimpleGrid, Tooltip, rem, Divider } from '@mantine/core';
import useSWR from 'swr';
import { fetcher, minutesToHoursMinutes } from '../lib/utils';
import { NoPosterIcon } from '../ui/icons/NoPosterIcon';
import { FilledStarIcon } from '../ui/icons/FilledStar';
import { parseISO, format } from 'date-fns';
import { ClapperboardIcon } from '../ui/icons/Clapperboard';
import BreadcrumbsLink from '../ui/buttons/breadcrumbsLink';
import LayoutComponent from '../ui/layout/layout-component';
import Image from 'next/image';
import NotFound from '../not-found';
import Loading from './loading';
import styles from './page.module.css';
import { useMediaQuery } from '@mantine/hooks';

const getBreadcrumbs = (id: string, movieName: string) => {
  return [
    { title: 'Movies', href: '/' },
    { title: movieName, href: `/${id}` },
  ].map((item, index) => (
    <BreadcrumbsLink key={index} title={item.title} href={item.href} />
  ));
};

const baseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

const Page = ({ params: { id } }: CurrentMoviePropsType) => {
  const isMobile = useMediaQuery('(max-width: 960px');
  const { data, error } = useSWR<Details>(`api/movies/${id}`, fetcher);
  if (!data && !error) {
    return <Loading />;
  }
  if (error || !data || !data.original_title) {
    return <NotFound />;
  }
  const movieGenres = data?.original_title && data.genres.map(el => el.name).join();
  const date = data?.original_title && parseISO(data.release_date);
  return (
    <LayoutComponent>
      <Flex align={'center'} direction={'column'} className={styles.container}>
        {data && (
          <div className={styles.content}>
            <Breadcrumbs separator="/">{getBreadcrumbs(id, data.original_title)}</Breadcrumbs>
            <Flex className={styles.imagePoster}>
              {data.poster_path ? (
                <Image
                  width={250}
                  height={352}
                  // className={styles.posterImage}
                  src={`${baseUrl}w500${data.poster_path}`}
                  alt={'Poster'}
                />
              ) : (
                <div className={styles.noPosterContainer}>
                  <NoPosterIcon style={{ width: rem(57), height: rem(44) }} />
                </div>
              )}
              <Flex direction={'column'} ml={16} justify={'space-between'}>
                <Flex direction="column" className={styles.titleContainer}>
                  <span className={styles.movieTitle}>{data.original_title}</span>
                  <span className={styles.movieYear}>{format(date!, 'yyyy')}</span>
                  <Flex align="center" gap={4}>
                    <FilledStarIcon style={{ width: rem(28), height: rem(28) }} />
                    <span className={styles.rating}>{data.vote_average.toFixed(1)}</span>
                    <span className={styles.voteCount}>{`(${data.vote_count})`}</span>
                  </Flex>
                </Flex>
                {isMobile ? (
                  <Flex direction={'column'} className={styles.detailsGrid}>
                    <span className={styles.detailLabel}>Duration</span>
                    <span className={styles.detailValue}>{`${minutesToHoursMinutes(data.runtime)}`}</span>
                    <span className={styles.detailLabel}>Premiere</span>
                    <time className={styles.detailValue}
                          dateTime={data.release_date}>{format(date!, 'LLLL d, yyyy')}</time>
                    <span className={styles.detailLabel}>Budget</span>
                    <span className={styles.detailValue}>{`$${data.budget}`}</span>
                    <span className={styles.detailLabel}>Gross worldwide</span>
                    <span className={styles.detailValue}>{`$${data.revenue}`}</span>
                    <span className={styles.detailLabel}>Genres</span>
                    <Tooltip label={movieGenres}>
                      <span className={styles.detailValue}>{`${movieGenres}`}</span>
                    </Tooltip>
                  </Flex>
                ) : (
                  <SimpleGrid verticalSpacing={13} className={styles.detailsGrid} cols={{ base: 2, sm: 2 }} mt={24}>
                    <Flex direction={'column'}>
                      {['Duration', 'Premiere', 'Budget', 'Gross worldwide', 'Genres'].map((el, index) => (
                        <span key={index} className={styles.detailLabel}>{el}</span>
                      ))}
                    </Flex>
                    <Flex className={styles.detailsColumn} direction={'column'}>
                      <span className={styles.detailValue}>{`${minutesToHoursMinutes(data.runtime)}`}</span>
                      <time dateTime={data.release_date}>{format(date!, 'LLLL d, yyyy')}</time>
                      <span className={styles.detailValue}>{`$${data.budget}`}</span>
                      <span className={styles.detailValue}>{`$${data.revenue}`}</span>
                      <Tooltip label={movieGenres}>
                        <span className={styles.detailValue}>{`${movieGenres}`}</span>
                      </Tooltip>
                    </Flex>
                  </SimpleGrid>
                )}
              </Flex>
            </Flex>
            <Flex direction={'column'} className={styles.trailerContainer}>
              <span className={styles.sectionTitle}>Trailer</span>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                // paddingBottom: '56.25%',
                height: 281,
                overflow: 'hidden',
                borderRadius: '9px',
              }}>
                <iframe
                  style={{ position: 'absolute', width: '100%', height: 281, top: 0, left: 0, border: 0 }}
                  src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <Divider mt={20} mb={20} />
              <span className={styles.sectionTitle}>Description</span>
              <span className={styles.description}>{data.overview}</span>
              <Divider mt={20} mb={20} />
              <span className={styles.sectionTitle}>Production</span>
              {data.production_companies?.map((el, index: number) => (
                <Flex align={'center'} gap={8} key={index} mb={12} className={styles.productionCompany}>
                  {el.logo_path ? (
                    <img
                      className={styles.productionCompanyLogo}
                      src={`${baseUrl}original${el.logo_path}`}
                      alt={'Poster'}
                    />
                  ) : (
                    <Flex align={'center'} justify={'center'} className={styles.productionCompanyFallback}>
                      <ClapperboardIcon style={{ width: rem(20), height: rem(20) }} />
                    </Flex>
                  )}
                  <span style={{ fontWeight: 700, fontSize: '16px', color: '#000000' }}>{el.name}</span>
                </Flex>
              ))}
            </Flex>
          </div>
        )}
      </Flex>
    </LayoutComponent>
  );
};

export default Page;