import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const API_KEY = process.env.TMDB_APIKEY;
  const details = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then(res => res.json());
  return NextResponse.json(details);
}