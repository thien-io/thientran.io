"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, RefreshCw } from "lucide-react"

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

    // Set up interval for auto-refresh every 30 seconds
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
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[200px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[100px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleManualRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Not Playing</CardTitle>
            <CardDescription>Spotify is currently not playing any tracks.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleManualRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        {lastUpdated && (
          <CardFooter>
            <p className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
          </CardFooter>
        )}
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          Now Playing
          <div className="ml-2 flex space-x-1">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleManualRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        {nowPlaying.albumImageUrl && (
          <img
            src={nowPlaying.albumImageUrl || "/placeholder.svg"}
            alt={`${nowPlaying.album} album cover`}
            className="h-20 w-20 rounded-md"
          />
        )}
        <div className="flex-1">
          <h3 className="font-semibold truncate">{nowPlaying.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{nowPlaying.artist}</p>
          <p className="text-xs text-muted-foreground truncate">{nowPlaying.album}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <a
          href={nowPlaying.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary flex items-center"
        >
          Open in Spotify
          <ExternalLink className="ml-1 h-3 w-3" />
        </a>
        {lastUpdated && <p className="text-xs text-muted-foreground">Updated: {lastUpdated.toLocaleTimeString()}</p>}
      </CardFooter>
    </Card>
  )
}
