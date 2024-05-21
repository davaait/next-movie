import { NoPosterIcon } from '../icons/NoPosterIcon';
import { Button, Divider, Flex, Group, Modal, Rating, rem, Tooltip } from '@mantine/core';
import { FilledStarIcon } from '../icons/FilledStar';
import { StarIcon } from '../icons/Star';
import { BlueStarIcon } from '../icons/BlueStar';
import { MovieCardProps, MovieI } from '../../lib/definitions';
import { formatNumber, getGenresText } from '../../lib/utils';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './movieCard.module.css';

const baseUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

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
    <div className={styles.movieCard}>
      <Flex className={styles.movieCardInnerContainer}>
        {posterPath ? (
          <Image width={119} height={170}
                 src={`${baseUrl}w500${posterPath}`}
                 alt={'Poster'}
          />
        ) : (
          <div className={styles.movieCardPoster}>
            <NoPosterIcon style={{ width: rem(57), height: rem(44) }} />
          </div>
        )}
        <div className={styles.movieCardDetails}>
          <Flex direction="column" className={styles.detailsInnerContainer}>
            <Tooltip label={originalTitle}>
              <Link href={`/${id}`} className={styles.movieCardLink}>
                {originalTitle}
              </Link>
            </Tooltip>
            <span className={styles.movieCardReleaseDate}>{releaseDate?.slice(0, 4)}</span>
            <Flex align="center" gap={4}>
              <FilledStarIcon style={{ width: rem(28), height: rem(28) }} />
              <span className={styles.movieCardRating}>{voteAverage?.toFixed(1)}</span>
              <span className={styles.movieCardRatingCount}>{`(${formatNumber(voteCount)})`}</span>
            </Flex>
          </Flex>
          <Flex style={{ maxWidth: 220, width: '100%', gap: 8 }}>
            <span className={styles.movieCardGenres}>Genres</span>
            <Tooltip label={getGenresText(genreIds, genres)}>
              <span className={styles.movieCardGenresText}>{getGenresText(genreIds, genres)}</span>
            </Tooltip>
          </Flex>
        </div>
      </Flex>
      <Flex onClick={open} align={'flex-start'} h={'100%'} gap={4}>
        {!!valueFromLS ? (
          <Flex className={styles.starRating} align={'center'} gap={6}>
            <BlueStarIcon style={{ width: rem(28), height: rem(28), cursor: 'pointer' }} />
            <span className={styles.movieCardRating}>{value}</span>
          </Flex>
        ) : (
          <StarIcon style={{ width: rem(28), height: rem(28), cursor: 'pointer' }} />
        )}
      </Flex>
      <Modal size="auto" radius={'md'} opened={opened} onClose={close} centered title={'Your rating'}>
        <div className={styles.movieCardModalContent}>
          <Divider size="xs" />
          <p className={styles.movieCardTitle}>{originalTitle}</p>
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