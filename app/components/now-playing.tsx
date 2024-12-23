'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await fetch('/api/spotify/now-playing');
        const data = await response.json();
        setNowPlaying(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching now playing:', error);
        setIsLoading(false);
      } finally {
        // Revalidate the request every n milliseconds
        setTimeout(fetchNowPlaying, 10000);
      }
    }

    fetchNowPlaying();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-4 w-[200px]' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[100px] w-full' />
        </CardContent>
      </Card>
    );
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not Playing</CardTitle>
          <CardDescription>
            Spotify is currently not playing any tracks.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center space-x-4'>
        {nowPlaying.albumImageUrl && (
          <img
            src={nowPlaying.albumImageUrl}
            alt={`${nowPlaying.album} album cover`}
            className='h-20 w-20 rounded-md'
          />
        )}
        <div>
          <h3 className='font-semibold'>{nowPlaying.title}</h3>
          <p className='text-sm text-muted-foreground'>{nowPlaying.artist}</p>
          <p className='text-xs text-muted-foreground'>{nowPlaying.album}</p>
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={nowPlaying.songUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-muted-foreground hover:text-primary flex items-center'
        >
          Open in Spotify
          <ExternalLink className='ml-1 h-3 w-3' />
        </a>
      </CardFooter>
    </Card>
  );
}
