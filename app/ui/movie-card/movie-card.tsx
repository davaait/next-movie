import { NoPosterIcon } from '../icons/NoPosterIcon';
import { Flex, Group, rem } from '@mantine/core';
import { FilledStarIcon } from '../icons/FilledStar';
import { BlueStarIcon } from '../icons/BlueStar';
import { StarIcon } from '../icons/Star';
import { MovieCardProps } from '../../lib/definitions';
import { getGenresText } from '../../lib/utils';

const MovieCard = ({
                     genres,
                     originalTitle,
                     voteCount,
                     voteAverage,
                     releaseDate,
                     posterPath,
                     genreIds,
                   }: MovieCardProps) => {
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
            <span style={{ fontWeight: 600, fontSize: '20px', color: '#9854F6', cursor: 'pointer' }}>{originalTitle}</span>
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
            <span style={{ fontWeight: 400, fontSize: '16px', color: '#000000' }}>{getGenresText(genreIds, genres)}</span>
          </Group>
        </div>
      </Flex>
      <Flex align={'center'} gap={4}>
        <StarIcon style={{ width: rem(28), height: rem(28), cursor: 'pointer' }} />
        {/*<BlueStarIcon style={{ width: rem(28), height: rem(28) }} />*/}
        {/*<span style={{ fontWeight: 600, fontSize: '16px', color: '#000000' }}>9</span>*/}
      </Flex>
    </div>
  );
};

export default MovieCard;