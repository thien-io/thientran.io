"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Track {
  artist: string
  songUrl: string
  title: string
  albumImageUrl: string
  album: string
}

interface AlbumCarouselProps {
  tracks: Track[]
}

export function AlbumCarousel({ tracks }: AlbumCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      return () => container.removeEventListener("scroll", checkScrollButtons)
    }
  }, [tracks])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 200 : 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  if (tracks.length === 0) return null

  return (
    <div
      className="relative w-full max-w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Arrow - Show on hover for desktop, always hidden on mobile */}
      <Button
        onClick={() => scroll("left")}
        variant="ghost"
        size="sm"
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 h-8 w-8 md:h-10 md:w-10 p-0 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-lg transition-all duration-300 ${
          !isMobile && canScrollLeft && isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 pointer-events-none"
        }`}
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-3 md:space-x-4 pb-4 px-1 md:px-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maxWidth: "100vw",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Show all 50 tracks */}
        {tracks.map((track, index) => (
          <div key={index} className="flex-shrink-0 w-28 sm:w-32 md:w-36 group/item cursor-pointer">
            <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
              <div className="relative">
                <img
                  src={track.albumImageUrl || "/placeholder.svg?height=144&width=144"}
                  alt={`${track.album} album cover`}
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-lg shadow-md group-hover/item:shadow-xl transition-all duration-200 group-hover/item:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors rounded-lg" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                  <div className="bg-green-500 rounded-full p-2 md:p-3 shadow-lg transform scale-90 group-hover/item:scale-100 transition-transform duration-200">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Track number indicator */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                  #{index + 1}
                </div>
              </div>
              <div className="mt-2 md:mt-3 px-1">
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate leading-tight">
                  {track.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">{track.artist}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Arrow - Show on hover for desktop, always hidden on mobile */}
      <Button
        onClick={() => scroll("right")}
        variant="ghost"
        size="sm"
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 h-8 w-8 md:h-10 md:w-10 p-0 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-lg transition-all duration-300 ${
          !isMobile && canScrollRight && isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      {/* Scroll indicator dots */}
      <div className="flex justify-center mt-4 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {Array.from({ length: Math.ceil(tracks.length / 8) }).map((_, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-200"
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
