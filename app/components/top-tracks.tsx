'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Track {
  artist: string;
  songUrl: string;
  title: string;
  albumImageUrl: string;
}

export function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch('/api/spotify/top-tracks');
        const data = await response.json();
        setTracks(data.tracks);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
        setIsLoading(false);
      }
    }

    fetchTopTracks();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 9 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardContent>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
            </Card>
          ))
        : tracks.map((track, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={track.albumImageUrl}
                  alt={`${track.title} album cover`}
                  className="h-48 w-full object-cover"
                />
              </CardContent>
              <CardHeader>
                <CardTitle className="truncate">{track.title}</CardTitle>
                <CardDescription className="truncate">{track.artist}</CardDescription>
              </CardHeader>
            </Card>
          ))}
    </div>
  );
}

