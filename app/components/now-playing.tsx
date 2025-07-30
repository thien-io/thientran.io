"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"

interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  progress_ms?: number
  duration_ms?: number
}

// Animated Sound Bars Component
function SoundBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <>
      <div className="flex items-end space-x-0.5 h-4">
        <div className={`w-0.5 bg-green-500 rounded-full sound-bar-1 ${isPlaying ? "" : "paused"}`} />
        <div className={`w-0.5 bg-green-500 rounded-full sound-bar-2 ${isPlaying ? "" : "paused"}`} />
        <div className={`w-0.5 bg-green-500 rounded-full sound-bar-3 ${isPlaying ? "" : "paused"}`} />
        <div className={`w-0.5 bg-green-500 rounded-full sound-bar-4 ${isPlaying ? "" : "paused"}`} />
      </div>
      <style jsx>{`
        .sound-bar-1 {
          height: 60%;
          animation: soundbar1 1.2s ease-in-out infinite;
        }
        
        .sound-bar-2 {
          height: 100%;
          animation: soundbar2 1.5s ease-in-out infinite;
        }
        
        .sound-bar-3 {
          height: 40%;
          animation: soundbar3 1.8s ease-in-out infinite;
        }
        
        .sound-bar-4 {
          height: 80%;
          animation: soundbar4 1.3s ease-in-out infinite;
        }

        .sound-bar-1.paused,
        .sound-bar-2.paused,
        .sound-bar-3.paused,
        .sound-bar-4.paused {
          animation-play-state: paused;
        }
        
        @keyframes soundbar1 {
          0%, 100% { height: 20%; }
          50% { height: 60%; }
        }
        
        @keyframes soundbar2 {
          0%, 100% { height: 40%; }
          50% { height: 100%; }
        }
        
        @keyframes soundbar3 {
          0%, 100% { height: 15%; }
          50% { height: 40%; }
        }
        
        @keyframes soundbar4 {
          0%, 100% { height: 30%; }
          50% { height: 80%; }
        }
      `}</style>
    </>
  )
}

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [currentProgress, setCurrentProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

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

      if (data.progress_ms !== undefined) {
        setCurrentProgress(data.progress_ms)
      }

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
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (nowPlaying?.isPlaying && nowPlaying.duration_ms && nowPlaying.progress_ms !== undefined) {
      progressIntervalRef.current = setInterval(() => {
        setCurrentProgress((prev) => {
          const newProgress = prev + 1000
          return Math.min(newProgress, nowPlaying.duration_ms || 0)
        })
      }, 1000)
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [nowPlaying?.isPlaying, nowPlaying?.duration_ms, nowPlaying?.progress_ms])

  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(() => fetchNowPlaying(), 30000)
    return () => {
      clearInterval(interval)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [fetchNowPlaying])

  const handleManualRefresh = () => {
    fetchNowPlaying(true)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-800 dark:bg-zinc-900 rounded-xl p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-1 w-full mt-3" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full bg-zinc-800 dark:bg-zinc-900 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Failed to load</span>
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
    )
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <div className="w-full bg-zinc-800 dark:bg-zinc-900 rounded-sm p-4 shadow-lg max-w-80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-zinc-700 rounded-sm flex items-center justify-center">
              <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.5 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.5l3.883-3.316z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Not Playing</p>
              <p className="text-zinc-400 text-xs">No music currently playing</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 flex justify-center">
              <SoundBars isPlaying={false} />
            </div>
            <Button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              size="sm"
              variant="ghost"
              className="text-zinc-400 hover:text-white h-8 w-8 p-0 rounded-full"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = nowPlaying.duration_ms ? (currentProgress / nowPlaying.duration_ms) * 100 : 0

  return (
    <div className="w-full bg-zinc-800 dark:bg-zinc-900 rounded-xl p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        {/* Album Art */}
        <img
          src={nowPlaying.albumImageUrl || "/placeholder.svg?height=48&width=48"}
          alt={`${nowPlaying.album} album cover`}
          className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
        />

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">{nowPlaying.title}</h3>
          <p className="text-zinc-400 text-xs truncate">{nowPlaying.artist}</p>
        </div>

        {/* Sound Bars and Controls */}
        <div className="flex items-center space-x-3">
          <div className="w-12 flex justify-center">
            <SoundBars isPlaying={nowPlaying.isPlaying} />
          </div>
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            size="sm"
            variant="ghost"
            className="text-zinc-400 hover:text-white h-8 w-8 p-0 rounded-full"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 space-y-1">
        <div className="w-full bg-zinc-700 rounded-full h-1">
          <div
            className="bg-green-500 h-1 rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{formatTime(currentProgress)}</span>
          <span>{nowPlaying.duration_ms ? formatTime(nowPlaying.duration_ms) : "0:00"}</span>
        </div>
      </div>

      {/* Spotify Link */}
      {nowPlaying.songUrl && (
        <div className="mt-2">
          <a
            href={nowPlaying.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300 transition-colors"
          >
            Open in Spotify
          </a>
        </div>
      )}
    </div>
  )
}
