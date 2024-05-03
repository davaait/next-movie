import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.TMDB_APIKEY;
  const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(res => res.json());
  return NextResponse.json(genres);
}