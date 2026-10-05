import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PromoBanner {
  id: number
  image: string
  imageHd: string
  alt: string
  title: string
  subtitle: string
}

const promoBanners: PromoBanner[] = [
  {
    id: 1,
    image: '/images/banners/promo-banner-large-ideas.png',
    imageHd: '/images/banners/promo-banner-large-ideas-hd.png',
    alt: 'Large Ideas. Real Results. – Pratham 5.0 & Pratham 3 Rapid 3D Printers',
    title: 'Large Ideas. Real Results.',
    subtitle: 'Precision 3D printing for functional parts, prototypes and end-use products.',
  },
  {
    id: 2,
    image: '/images/banners/promo-banner-precision-speed.png',
    imageHd: '/images/banners/promo-banner-precision-speed-hd.png',
    alt: 'Precision Speed. Limitless Possibilities. – EKA Resin 3D Printers',
    title: 'Precision Speed. Limitless Possibilities.',
    subtitle: 'Bring your ideas to life with Eka resin 3D printers.',
  },
  {
    id: 3,
    image: '/images/banners/promo-banner-powering-ideas.png',
    imageHd: '/images/banners/promo-banner-powering-ideas-hd.png',
    alt: 'Powering Bigger Ideas. – High-performance 3D Printers for Real-world Applications',
    title: 'Powering Bigger Ideas.',
    subtitle: 'High-performance 3D printers for real-world applications.',
  },
]

export const PromoBannerSlider: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const count = promoBanners.length

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % count)
  }, [count])

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev - 1 + count) % count)
  }, [count])

  // Smooth auto-scroll one after another every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current
      if (diff > 50) {
        nextSlide()
      } else if (diff < -50) {
        prevSlide()
      }
    }
    touchStartX.current = null
    touchEndX.current = null
    setIsPaused(false)
  }

  return (
    <section className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-8 py-2">
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-950 group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Track - Smooth horizontal slide animation */}
        <div className="relative w-full aspect-[1024/348] min-h-[170px] sm:min-h-[240px] md:min-h-[300px] lg:min-h-[360px] overflow-hidden bg-slate-950">
          <div
            className="flex h-full w-full will-change-transform"
            style={{
              transform: `translate3d(-${current * 100}%, 0, 0)`,
              transition: 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {promoBanners.map((banner, index) => (
              <div
                key={banner.id}
                className="relative w-full h-full shrink-0 flex items-center justify-center bg-slate-950"
              >
                <picture className="w-full h-full block">
                  <source srcSet={banner.imageHd} media="(min-width: 768px)" />
                  <img
                    src={banner.imageHd}
                    alt={banner.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover sm:object-cover pointer-events-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Visible on hover on desktop, always accessible) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Banner"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Banner"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Navigation Indicator Pills */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10">
          {promoBanners.map((banner, index) => {
            const isActive = index === current
            return (
              <button
                key={banner.id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 sm:w-8 h-2 bg-white shadow-sm'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PromoBannerSlider
