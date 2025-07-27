"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, RefreshCw } from "lucide-react"
import { SoundBars } from "@/components/sound-bars"

interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchNowPlaying = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true)
      setError(null)

      const response = await fetch("/api/spotify/now-playing", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch now playing")
      }

      const data = await response.json()
      setNowPlaying(data)
      setLastUpdated(new Date())
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching now playing:", error)
      setError("Failed to load now playing")
      setIsLoading(false)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchNowPlaying()

    const interval = setInterval(() => {
      fetchNowPlaying()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchNowPlaying])

  const handleManualRefresh = () => {
    fetchNowPlaying(true)
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Error</h2>
        </div>
        <p className="text-[#b3b3b3] mb-4">{error}</p>
        <Button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="bg-[#1db954] hover:bg-[#1ed760] text-white"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Try Again
        </Button>
      </div>
    )
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] rounded-lg p-6 hover:from-[#252525] hover:to-[#2f2f2f] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Not Playing</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="border-[#535353] text-[#b3b3b3] hover:border-white hover:text-white bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <p className="text-[#b3b3b3]">Spotify is currently not playing any tracks.</p>
        {lastUpdated && <p className="text-xs text-[#535353] mt-4">Last updated: {lastUpdated.toLocaleTimeString()}</p>}
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2a2a2a] rounded-lg p-6 hover:from-[#252525] hover:to-[#2f2f2f] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white mr-3">Now Playing</h2>
          <SoundBars />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="border-[#535353] text-[#b3b3b3] hover:border-white hover:text-white bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {nowPlaying.albumImageUrl && (
          <img
            src={nowPlaying.albumImageUrl || "/placeholder.svg"}
            alt={`${nowPlaying.album} album cover`}
            className="h-20 w-20 rounded-md object-cover shadow-lg"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg truncate mb-1">{nowPlaying.title}</h3>
          <p className="text-[#b3b3b3] truncate mb-1">{nowPlaying.artist}</p>
          <p className="text-xs text-[#535353] truncate">{nowPlaying.album}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <a
          href={nowPlaying.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#b3b3b3] hover:text-white flex items-center transition-colors"
        >
          Open in Spotify
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
        {lastUpdated && <p className="text-xs text-[#535353]">Updated: {lastUpdated.toLocaleTimeString()}</p>}
      </div>
    </div>
  )
}
