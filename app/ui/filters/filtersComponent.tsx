import DropdownComponent from '../dropdowns/dropdown';
import InputNumberComponent from '../inputs/inputNumber';
import TextButton from '../buttons/textButton';
import { FiltersComponentProps } from '../../lib/definitions';
import { sortByValues } from '../../lib/placeholder-data';
import styles from '../components.module.css';

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
      <div className={styles.filtersContainer}>
        <DropdownComponent placeholder="Select genre" value={genreValue} data={data}
                           setValue={setGenreValue}
                           label="Genres" />
        <DropdownComponent placeholder="Select release year" value={releaseYear} data={years}
                           setValue={setReleaseYear} label="Release year" />
        <div className={styles.inputGroup}>
          <InputNumberComponent value={ratingFrom} setValue={setRatingFrom} placeholder="From" label="Ratings" />
          <InputNumberComponent value={ratingTo} setValue={setRatingTo} placeholder="To" label="" />
          <TextButton ml={8} resetFiltersHandler={resetFiltersHandler} />
        </div>
      </div>
      <div className={styles.sortContainer}>
        <DropdownComponent placeholder="Sort by" value={sortBy} data={sortByValues}
                           setValue={setSortBy}
                           label="Sort by" />
      </div>
    </>
  );
};

export default FiltersComponent;