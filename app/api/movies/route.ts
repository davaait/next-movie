import { NextResponse } from 'next/server';
import { useSearchParams } from 'next/navigation';

export async function GET(req: Request) {
  const API_KEY = process.env.TMDB_APIKEY;
  const { searchParams } = new URL(req.url);
  console.log(searchParams.get('with_genres'));
  // const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${}&primary_release_year=${}&vote_average.lte=${}&vote_average.gte=${}&sort_by=${}&page=${}`, {
  const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=18`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(res => res.json());
  return NextResponse.json(movies);
}