"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"

interface Track {
  artist: string
  songUrl: string
  title: string
  albumImageUrl: string
}

export function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch("/api/spotify/top-tracks")
        const data = await response.json()
        setTracks(data.tracks)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching top tracks:", error)
        setIsLoading(false)
      }
    }

    fetchTopTracks()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center space-x-4 p-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tracks.map((track, index) => (
        <Card key={index} className="hover:bg-muted/50 transition-colors">
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="relative">
              <img
                src={track.albumImageUrl || "/placeholder.svg"}
                alt={`${track.title} album cover`}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-medium">#{index + 1}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label={`Open ${track.title} in Spotify`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
