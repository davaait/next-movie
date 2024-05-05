import DropdownComponent from '../dropdowns/dropdown';
import InputNumberComponent from '../inputs/inputNumber';
import TextButton from '../buttons/textButton';
import { FiltersComponentProps } from '../../lib/definitions';
import { sortByValues } from '../../lib/placeholder-data';

const FiltersComponent = ({
                            genreValue,
                            releaseYear,
                            ratingFrom,
                            ratingTo,
                            sortBy,
                            setGenreValue,
                            setReleaseYear,
                            setRatingFrom,
                            setRatingTo,
                            setSortBy,
                            data,
                            resetFiltersHandler,
                          }: FiltersComponentProps) => {
  const years = [];
  for (let year = 1930; year <= 2024; year++) {
    years.push(year.toString());
  }
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '16px',
        alignItems: 'flex-end',
        marginTop: 42,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
        <DropdownComponent placeholder={'Select genre'} value={genreValue} data={data}
                           setValue={setGenreValue}
                           label="Genres" />
        <DropdownComponent placeholder={'Select release year'} value={releaseYear} data={years}
                           setValue={setReleaseYear} label="Release year" />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <InputNumberComponent value={ratingFrom} setValue={setRatingFrom} placeholder={'From'} label={'Ratings'} />
          <InputNumberComponent value={ratingTo} setValue={setRatingTo} placeholder={'To'} label={''} />
        </div>
        <TextButton resetFiltersHandler={resetFiltersHandler} />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '16px',
        alignItems: 'flex-end',
        marginTop: 24,
        justifyContent: 'flex-end',
      }}>
        <DropdownComponent placeholder={'Sort by'} value={sortBy} data={sortByValues}
                           setValue={setSortBy}
                           label="Sort by" />
      </div>
    </>
  )
    ;
};

export default FiltersComponent;