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
  const { data } = useSWR<Details>(`api/movies/${id}`, fetcher);
  if (!data || !data.original_title) {
    return <NotFound />;
  }
  const movieGenres = data?.original_title && data.genres.map(el => el.name).join();
  const date = data?.original_title && parseISO(data.release_date);
  return (
    <LayoutComponent>
      <Flex align={'center'} direction={'column'}
            style={{ width: '100%', minHeight: '100vh', paddingTop: 40, backgroundColor: '#F5F5F6' }}>
        {data && (
          <div style={{ width: 800, minHeight: '100vh' }}>
            <Breadcrumbs separator="/">{getBreadcrumbs(id, data.original_title)}</Breadcrumbs>
            <Flex
              style={{
                marginTop: 20,
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 24,
                height: 400,
                width: '100%',
              }}>
              {data.poster_path ? (
                <Image width={250} height={352} style={{ width: 'auto', height: 'auto', display: 'block' }}
                       src={`${baseUrl}w500${data.poster_path}`}
                       alt={'Poster'} />
              ) : (
                <div style={{
                  backgroundColor: '#EAEBED',
                  height: '100%',
                  width: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <NoPosterIcon style={{ width: rem(57), height: rem(44) }} />
                </div>
              )}
              <Flex direction={'column'} ml={16} justify={'space-between'}>
                <Flex direction="column">
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: '20px',
                      color: '#9854F6',
                      cursor: 'pointer',
                    }}>{data.original_title}</span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '16px',
                      color: '#7B7C88',
                    }}>{format(date!, 'yyyy')}</span>
                  <Flex align="center" gap={4}>
                    <FilledStarIcon style={{ width: rem(28), height: rem(28) }} />
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#000000',
                      }}>{data.vote_average.toFixed(1)}</span>
                    <span style={{
                      fontWeight: 400,
                      fontSize: '16px',
                      color: '#7B7C88',
                      marginLeft: '4px',
                    }}>{`(${data.vote_count})`}</span>
                  </Flex>
                </Flex>
                <SimpleGrid verticalSpacing={13} style={{ maxWidth: 320 }} cols={{ base: 2, sm: 2 }} mt={24}>
                  <Flex direction={'column'}>
                    <span style={{ color: '#7B7C88', fontWeight: 400, fontSize: '16px' }}>Duration</span>
                    <span style={{ color: '#7B7C88', fontWeight: 400, fontSize: '16px' }}>Premiere</span>
                    <span style={{ color: '#7B7C88', fontWeight: 400, fontSize: '16px' }}>Budget</span>
                    <span style={{ color: '#7B7C88', fontWeight: 400, fontSize: '16px' }}>Gross worldwide</span>
                    <span style={{ color: '#7B7C88', fontWeight: 400, fontSize: '16px' }}>Genres</span>
                  </Flex>
                  <Flex direction={'column'}>
                      <span style={{
                        color: '#000000',
                        fontWeight: 400,
                        fontSize: '16px',
                      }}>{`${minutesToHoursMinutes(data.runtime)}`}</span>
                    <time dateTime={data.release_date}>{format(date!, 'LLLL d, yyyy')}</time>
                    <span style={{ color: '#000000', fontWeight: 400, fontSize: '16px' }}>{`$${data.budget}`}</span>
                    <span style={{ color: '#000000', fontWeight: 400, fontSize: '16px' }}>{`$${data.revenue}`}</span>
                    <Tooltip label={movieGenres}>
                      <span style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: '#000000', fontWeight: 400, fontSize: '16px',
                      }}>{`${movieGenres}`}</span>
                    </Tooltip>
                  </Flex>
                </SimpleGrid>
              </Flex>
            </Flex>
            <Flex direction={'column'} style={{
              marginTop: 20,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 24,
              minHeight: 400,
              height: '100%',
              width: '100%',
            }}>
              <span style={{ marginBottom: 16, fontWeight: 700, fontSize: '20px', color: '#000000' }}>Trailer</span>
              <iframe width="500" height="281" src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              <Divider mt={20} mb={20} />
              <span
                style={{ marginBottom: 16, fontWeight: 700, fontSize: '20px', color: '#000000' }}>Description</span>
              <span style={{
                fontWeight: 400,
                fontSize: '16px',
                color: '#000000',
                lineHeight: '22px',
              }}>{data.overview}</span>
              <Divider mt={20} mb={20} />
              <span
                style={{ marginBottom: 16, fontWeight: 700, fontSize: '20px', color: '#000000' }}>Production</span>
              {data.production_companies.map((el, index: number) => (
                <Flex align={'center'} gap={8} key={index} mb={12}>
                  {el.logo_path ? (
                    <img style={{
                      borderRadius: '50%',
                      border: '0.5px solid #F1F1F1',
                      width: 40,
                      height: 40,
                      objectFit: 'contain',
                    }}
                         src={`${baseUrl}original${el.logo_path}`}
                         alt={'Poster'} />
                  ) : (
                    <Flex align={'center'} justify={'center'}
                          style={{ borderRadius: '50%', border: '0.5px solid #F1F1F1', width: 40, height: 40 }}>
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