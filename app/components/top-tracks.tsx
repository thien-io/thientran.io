"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Play, TrendingUp, ChevronRight } from "lucide-react"
import { AlbumCarousel } from "@/components/album-carousel"

interface Track {
  artist: string
  songUrl: string
  title: string
  albumImageUrl: string
  album: string
  popularity?: number
  preview_url?: string
}

export function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchTopTracks() {
      try {
        const response = await fetch("/api/spotify/top-tracks", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        const data = await response.json()
        setTracks(data.tracks || [])
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
      <div className="space-y-6 md:space-y-8 w-full">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-4">
            <Skeleton className="h-5 md:h-6 w-32 md:w-48" />
            <Skeleton className="h-4 w-4 rounded" />
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex space-x-3 md:space-x-4 px-3 md:px-12">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex-shrink-0">
                  <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-lg" />
                  <div className="mt-2 space-y-1">
                    <Skeleton className="h-3 w-24 md:w-32" />
                    <Skeleton className="h-2 md:h-3 w-16 md:w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2 px-4">
          <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-md">
              <Skeleton className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
              <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded flex-shrink-0" />
              <div className="flex-1 space-y-1 min-w-0">
                <Skeleton className="h-3 md:h-4 w-3/4" />
                <Skeleton className="h-2 md:h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const displayedTracks = showAll ? tracks : tracks.slice(0, 20)

  return (
    <div className="space-y-6 md:space-y-8 w-full">
      {/* Album Carousel - Now showing all 50 tracks */}
      <div className="w-full">
        <div className="flex items-center space-x-2 mb-4 md:mb-6 px-4">
          <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white">Top 50 Album Art Gallery</h3>
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <AlbumCarousel tracks={tracks} />

        {/* Gallery stats */}
        <div className="flex justify-center mt-4 px-4">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2">
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
              Showing all {tracks.length} albums • Scroll horizontally to explore
            </p>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="w-full">
        <div className="flex items-center justify-between px-4 mb-4 md:mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white">Track List</h3>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              {tracks.length} tracks
            </div>
          </div>
          {tracks.length > 20 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors flex items-center space-x-1"
            >
              <span>{showAll ? "Show Less" : `Show All ${tracks.length}`}</span>
              <ChevronRight className={`h-3 w-3 transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          )}
        </div>

        <div className="space-y-1 max-h-[70vh] overflow-y-auto px-4">
          {displayedTracks.map((track, index) => (
            <div
              key={index}
              className="group flex items-center space-x-3 p-2 md:p-3 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer active:bg-black/10 dark:active:bg-white/10"
              onMouseEnter={() => setHoveredTrack(index)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <div className="w-4 flex items-center justify-center flex-shrink-0">
                {hoveredTrack === index ? (
                  <Play className="h-3 w-3 md:h-4 md:w-4 text-slate-900 dark:text-white fill-slate-900 dark:fill-white" />
                ) : (
                  <span className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium">{index + 1}</span>
                )}
              </div>

              <div className="relative flex-shrink-0">
                <img
                  src={track.albumImageUrl || "/placeholder.svg"}
                  alt={`${track.title} album cover`}
                  className="h-10 w-10 md:h-12 md:w-12 rounded object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 dark:text-white truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-sm md:text-base">
                  {track.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 truncate group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  {track.artist}
                </p>
              </div>

              {/* Popularity indicator and external link */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                {track.popularity && (
                  <div className="hidden sm:flex items-center space-x-2">
                    <div className="w-12 bg-zinc-200 dark:bg-zinc-700 rounded-full h-1">
                      <div
                        className="bg-green-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${track.popularity}%` }}
                      />
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 w-6 text-right">{track.popularity}</span>
                  </div>
                )}

                <div className="opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity">
                  <a
                    href={track.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 md:p-2"
                    aria-label={`Open ${track.title} in Spotify`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-friendly load more button */}
        {tracks.length > 20 && !showAll && (
          <div className="flex justify-center mt-4 px-4">
            <button
              onClick={() => setShowAll(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg flex items-center space-x-2"
            >
              <span>Load More ({tracks.length - 20} remaining)</span>
              <TrendingUp className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
