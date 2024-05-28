const { SortBy } = require('./definitions');

const sortByValues = [
  { value: SortBy.POPULARITY_ASC, label: 'Less popular' },
  { value: SortBy.POPULARITY_DESC, label: 'More popular' },
  { value: SortBy.ORIGINAL_TITLE_ASC, label: 'Original title (A to Z)' },
  { value: SortBy.ORIGINAL_TITLE_DESC, label: 'Original title (Z to A)' },
  { value: SortBy.REVENUE_DESC, label: 'Higher revenue' },
  { value: SortBy.REVENUE_ASC, label: 'Lower revenue' },
  { value: SortBy.PRIMARY_RELEASE_DATE_ASC, label: 'Earliest release date' },
  { value: SortBy.PRIMARY_RELEASE_DATE_DESC, label: 'Latest release date' },
  { value: SortBy.TITLE_ASC, label: 'Title (A to Z)' },
  { value: SortBy.TITLE_DESC, label: 'Title (Z to A)' },
  { value: SortBy.VOTE_AVERAGE_ASC, label: 'Lower average rating' },
  { value: SortBy.VOTE_AVERAGE_DESC, label: 'Higher average rating' },
  { value: SortBy.VOTE_COUNT_ASC, label: 'Fewer votes' },
  { value: SortBy.VOTE_COUNT_DESC, label: 'More votes' },
];

module.exports = {
  sortByValues,
};