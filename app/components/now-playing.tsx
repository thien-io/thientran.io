"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import { AudioWave } from "@/components/audio-wave"

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

export function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [currentProgress, setCurrentProgress] = useState(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchTimeRef = useRef<number>(0)

  const fetchNowPlaying = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) setIsRefreshing(true)
      setError(null)

      const fetchTime = Date.now()
      lastFetchTimeRef.current = fetchTime

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

      console.log("Received data:", data) // Debug log

      setNowPlaying(data)
      setLastUpdated(new Date())

      // Set initial progress
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

  // Update progress in real-time when music is playing
  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    if (nowPlaying?.isPlaying && nowPlaying.duration_ms && nowPlaying.progress_ms !== undefined) {
      progressIntervalRef.current = setInterval(() => {
        setCurrentProgress((prev) => {
          const newProgress = prev + 1000 // Add 1 second
          // Don't exceed the duration
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

    const interval = setInterval(() => {
      fetchNowPlaying()
    }, 30000)

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
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="space-y-4 sm:space-y-6">
          <Skeleton className="w-full aspect-square rounded-xl sm:rounded-2xl" />
          <div className="text-center space-y-2">
            <Skeleton className="h-6 sm:h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 sm:h-5 w-1/2 mx-auto" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            <Skeleton className="h-10 sm:h-12 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-3 sm:h-4 w-8" />
                <Skeleton className="h-3 sm:h-4 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">Error</h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">{error}</p>
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-4 py-2"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <div className="text-zinc-400 dark:text-zinc-600">
              <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.5 13.5H2a1 1 0 01-1-1V7.5a1 1 0 011-1h2.5l3.883-3.316z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">Not Playing</h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">No music currently playing</p>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="rounded-full bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {lastUpdated && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          )}
        </div>
      </div>
    )
  }

  // Calculate progress percentage using current progress
  const progressPercentage = nowPlaying.duration_ms ? (currentProgress / nowPlaying.duration_ms) * 100 : 0

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
      <div className="space-y-4 sm:space-y-6">
        {/* Album Art */}
        <div className="relative">
          <img
            src={nowPlaying.albumImageUrl || "/placeholder.svg?height=300&width=300"}
            alt={`${nowPlaying.album} album cover`}
            className="w-full aspect-square object-cover rounded-xl sm:rounded-2xl shadow-md"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-0 shadow-md h-8 w-8 sm:h-10 sm:w-10 p-0"
          >
            <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Song Info */}
        <div className="text-center space-y-1 px-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white truncate leading-tight">
            {nowPlaying.title}
          </h3>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 truncate">{nowPlaying.artist}</p>
        </div>

        {/* Audio Wave Animation */}
        <div className="py-2 sm:py-4">
          <AudioWave />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 px-1">
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 sm:h-2">
            <div
              className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <span>{formatTime(currentProgress)}</span>
            <span>{nowPlaying.duration_ms ? formatTime(nowPlaying.duration_ms) : "0:00"}</span>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="text-xs text-zinc-500 space-y-1">
            <p>
              Progress: {currentProgress}ms / {nowPlaying.duration_ms}ms
            </p>
            <p>Percentage: {progressPercentage.toFixed(1)}%</p>
            <p>Is Playing: {nowPlaying.isPlaying ? "Yes" : "No"}</p>
          </div>
        )}

        {/* Spotify Link */}
        {nowPlaying.songUrl && (
          <div className="text-center">
            <a
              href={nowPlaying.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors inline-block py-2"
            >
              Open in Spotify
            </a>
          </div>
        )}

        {lastUpdated && (
          <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
            Updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  )
}
