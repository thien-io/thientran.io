import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getTopTracks();
    const { items } = response;

    const tracks = items.slice(0, 10).map((track: any) => ({
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0].url,
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json({ error: 'Error fetching top tracks' }, { status: 500 });
  }
}

