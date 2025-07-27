"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Play } from "lucide-react"

interface Track {
  artist: string
  songUrl: string
  title: string
  albumImageUrl: string
}

export function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)

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
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-2 rounded-md">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-12 w-12 rounded" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => (
        <div
          key={index}
          className="group flex items-center space-x-4 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredTrack(index)}
          onMouseLeave={() => setHoveredTrack(null)}
        >
          <div className="w-4 flex items-center justify-center pl-1">
            {hoveredTrack === index ? (
              <Play className="h-4 w-4 text-zinc-900 dark:text-white fill-zinc-900 dark:fill-white " />
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{index + 1}</span>
            )}
          </div>

          <div className="relative">
            <img
              src={track.albumImageUrl || "/placeholder.svg"}
              alt={`${track.title} album cover`}
              className="h-12 w-12 rounded object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm text-zinc-900 dark:text-white truncate group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              {track.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {track.artist}
            </p>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 pr-4"
              aria-label={`Open ${track.title} in Spotify`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
