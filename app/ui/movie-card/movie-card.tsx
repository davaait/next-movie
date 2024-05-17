import { NoPosterIcon } from '../icons/NoPosterIcon';
import { Button, Divider, Flex, Group, Modal, Rating, rem } from '@mantine/core';
import { FilledStarIcon } from '../icons/FilledStar';
import { StarIcon } from '../icons/Star';
import { BlueStarIcon } from '../icons/BlueStar';
import { MovieCardProps, MovieI } from '../../lib/definitions';
import { getGenresText } from '../../lib/utils';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const MovieCard = ({
                     id,
                     genres,
                     originalTitle,
                     voteCount,
                     voteAverage,
                     releaseDate,
                     posterPath,
                     genreIds,
                   }: MovieCardProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(0);
  const valueFromLS = localStorage.getItem(`movie/${id}`);
  useEffect(() => {
    if (valueFromLS) {
      const obj = JSON.parse(valueFromLS) as MovieI;
      setValue(obj.rating);
    }
  }, [valueFromLS]);
  const saveRatingToLS = () => {
    localStorage.setItem(`movie/${id}`, JSON.stringify({
      id, genres, originalTitle, voteCount,
      voteAverage,
      releaseDate,
      posterPath,
      genreIds,
      rating: value,
    }));
    close();
  };
  const removeRatingFromLS = () => {
    localStorage.removeItem(`movie/${id}`);
    window.location.reload();
  };
  return (
    <div style={{
      width: '100%',
      height: 218,
      left: '422px',
      padding: 24,
      gap: ' 8px',
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    }}>
      <Flex justify={'flex-start'} h={'100%'}>
        {posterPath ? (
          <img style={{ width: '120px', height: '100%' }} src={`https://image.tmdb.org/t/p/w500${posterPath}`}
               alt={'Poster'} />
        ) : (
          <div style={{
            backgroundColor: '#EAEBED',
            height: '100%',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <NoPosterIcon style={{ width: rem(57), height: rem(44) }} />
          </div>
        )}
        <div
          style={{
            marginLeft: 16,
            flexDirection: 'column',
            height: '100%',
            gap: 8,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Flex direction="column">
            <Link href={`/${id}`}
                  style={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#9854F6',
                    cursor: 'pointer',
                  }}>{originalTitle}</Link>
            <span style={{ fontWeight: 400, fontSize: '16px', color: '#7B7C88' }}>{releaseDate?.slice(0, 4)}</span>
            <Flex align="center" gap={4}>
              <FilledStarIcon style={{ width: rem(28), height: rem(28) }} />
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#000000' }}>{voteAverage?.toFixed(1)}</span>
              <span style={{
                fontWeight: 400,
                fontSize: '16px',
                color: '#7B7C88',
                marginLeft: '4px',
              }}>{`(${voteCount})`}</span>
            </Flex>
          </Flex>
          <Group>
            <span style={{ fontWeight: 400, fontSize: '16px', color: '#7B7C88' }}>Genres</span>
            <span
              style={{ fontWeight: 400, fontSize: '16px', color: '#000000' }}>{getGenresText(genreIds, genres)}</span>
          </Group>
        </div>
      </Flex>
      <Flex align={'center'} gap={4}>
        <div onClick={open}>
          {!!valueFromLS ? (
            <Flex align={'center'} gap={6}>
              <BlueStarIcon style={{ width: rem(28), height: rem(28), cursor: 'pointer' }} />
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#000000' }}>{value}</span>
            </Flex>
          ) : (
            <StarIcon style={{ width: rem(28), height: rem(28), cursor: 'pointer' }} />
          )}
        </div>
      </Flex>
      <Modal size="auto" radius={'md'} opened={opened} onClose={close} centered title={'Your rating'}>
        <div style={{ width: 380, height: '100%' }}>
          <Divider size="xs" />
          <p style={{ fontWeight: 700 }}>{originalTitle}</p>
          <Rating w={'100%'} count={10} value={value} onChange={setValue}
                  emptySymbol={<StarIcon style={{ width: rem(28), height: rem(28), marginRight: 10 }} />}
                  fullSymbol={<FilledStarIcon style={{ width: rem(28), height: rem(28), marginRight: 10 }} />} />
          <Group mt={16}>
            <Button onClick={saveRatingToLS} variant="filled" color="#9854F6" radius="md">Save</Button>
            <Button onClick={removeRatingFromLS} variant="subtle" radius="md">Remove rating</Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default MovieCard;