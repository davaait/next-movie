export const getMovieGenres = async () => {
  const res = await fetch('/api/genres');
  return res.json();
};

export const getMovies = async () => {
  const res = await fetch('/api/movies?language=en-US&with_genres=18');
  return res.json();
};