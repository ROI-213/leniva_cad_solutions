import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

export interface CategoryProductItem {
  name: string
  image: string
  isContain?: boolean
}

export interface CategoryShowcaseData {
  id: string
  title: string
  badge: string
  description: string
  link: string
  linkText: string
  products: CategoryProductItem[]
  intervalMs?: number
}

interface Props {
  category: CategoryShowcaseData
  intervalOffset?: number
}

export const CategoryCardWithSlider: React.FC<Props> = ({
  category,
  intervalOffset = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const total = category.products.length

  const nextSlide = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrentIndex(prev => (prev + 1) % total)
  }, [total])

  const prevSlide = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setCurrentIndex(prev => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (total <= 1 || isHovered || isFullscreen) return
    const interval = (category.intervalMs || 3200) + intervalOffset
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total)
    }, interval)

    return () => clearInterval(timer)
  }, [total, isHovered, isFullscreen, category.intervalMs, intervalOffset])

  // Keyboard navigation for full screen mode
  useEffect(() => {
    if (!isFullscreen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false)
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, nextSlide, prevSlide])

  const currentProduct = category.products[currentIndex]

  return (
    <>
      <div
        className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slider Image Container - Full Frame Aspect Ratio with Click-to-Fullscreen */}
        <div
          onClick={() => setIsFullscreen(true)}
          className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-100 relative select-none cursor-pointer"
          title="Click to view full screen"
        >
          {category.products.map((item, index) => {
            const isActive = index === currentIndex
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full ${
                    item.isContain ? 'object-contain p-2' : 'object-cover'
                  } group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                />
              </div>
            )
          })}

          {/* Top-Left Category Badge */}
          <span className="absolute top-3 left-3 z-20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded shadow-sm pointer-events-none">
            {category.badge}
          </span>

          {/* Top-Right Counter and Fullscreen Trigger Button */}
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5">
            {total > 1 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-white/90 text-slate-700 backdrop-blur-sm rounded shadow-sm border border-slate-200/60 font-mono pointer-events-none">
                {currentIndex + 1} / {total}
              </span>
            )}
            <button
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setIsFullscreen(true)
              }}
              aria-label="Display full screen"
              title="Display in full screen"
              className="w-7 h-7 rounded bg-slate-900/75 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow cursor-pointer group/btn"
            >
              <Maximize2 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>

          {/* Bottom Current Product Name Pill & Indicator Dots */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-3 pt-7 flex items-center justify-between">
            <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-[70%] drop-shadow">
              {currentProduct?.name}
            </span>

            {total > 1 && (
              <div
                className="flex items-center space-x-1"
                onClick={e => e.stopPropagation()}
              >
                {category.products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={e => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentIndex(idx)
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? 'w-4 h-1.5 bg-red-500'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Manual Left/Right Navigation Controls on Hover */}
          {total > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous product image"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/85 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next product image"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/85 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <Link to={category.link} className="block group-hover:text-red-600 transition-colors">
              <h3 className="text-lg font-bold text-slate-950 group-hover:text-red-600 transition-colors">
                {category.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {category.description}
            </p>
          </div>
          <Link
            to={category.link}
            className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-800 group-hover:translate-x-1 transition-all"
          >
            <span>{category.linkText}</span>
          </Link>
        </div>
      </div>

      {/* ====================================================
          FULL SCREEN MODAL / LIGHTBOX VIEW
         ==================================================== */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none animate-in fade-in duration-200"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Fullscreen Header */}
          <div
            className="flex items-center justify-between border-b border-white/10 pb-4 z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-bold uppercase tracking-wider rounded">
                  {category.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {category.title}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentProduct?.name}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs font-mono text-slate-400 bg-white/10 px-2.5 py-1 rounded-full">
                {currentIndex + 1} / {total}
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
                aria-label="Close full screen mode"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Main Image Viewer */}
          <div
            className="flex-1 relative flex items-center justify-center my-4 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] max-w-[90vw] flex items-center justify-center">
              <img
                key={currentIndex}
                src={currentProduct?.image}
                alt={currentProduct?.name}
                className="max-h-[75vh] max-w-[90vw] object-contain select-none drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Left & Right Fullscreen Navigation Controls */}
            {total > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  aria-label="Previous product"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next product"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl cursor-pointer border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Fullscreen Footer Controls */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-4 z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 overflow-x-auto max-w-full py-1">
              {category.products.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={p.name}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 h-2 bg-red-500'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to={category.link}
                onClick={() => setIsFullscreen(false)}
                className="px-5 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl transition-all border border-white/20"
              >
                View Full Category
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryCardWithSlider
