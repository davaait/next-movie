import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url!);
  const searchParams = new URLSearchParams(url.searchParams);
  const API_KEY = process.env.TMDB_APIKEY;
  const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${searchParams.get('with_genres')}&primary_release_year=${searchParams.get('primary_release_year')}&vote_average.lte=${searchParams.get('vote_average.lte')}&vote_average.gte=${searchParams.get('vote_average.gte')}&sort_by=${searchParams.get('sort_by')}&page=${searchParams.get('page')}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(res => res.json());
  return NextResponse.json(movies);
}