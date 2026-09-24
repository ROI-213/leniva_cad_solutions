import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Sparkles,
  Target,
  Zap,
  Box,
  Eye,
  Lightbulb,
  ShieldCheck,
  Maximize2,
  X,
  ChevronDown,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

interface TechCardData {
  id: number
  stepNumber: string
  titlePrimary: string
  titleAccent: string
  fullTitle: string
  subtitle: string
  imageSrc: string
  badgeLabel: string
  quoteInquiry: string
  ctaText: string
  accentColor: string
  glowColor: string
  highlights: {
    icon: React.ComponentType<{ className?: string }>
    label: string
  }[]
  callout: {
    title: string
    subtitle: string
  }
}

const techCards: TechCardData[] = [
  {
    id: 1,
    stepNumber: '01',
    titlePrimary: 'ACCURATE',
    titleAccent: '3D SCANNING',
    fullTitle: 'Accurate 3D Scanning',
    subtitle: 'Up to 0.08mm accuracy for highly detailed scans',
    imageSrc: '/images/scanners/tech-panel-1-accurate.png',
    badgeLabel: '0.08mm Metrology Accuracy',
    quoteInquiry: '3DeVOK MQ - Accurate 3D Scanning 0.08mm Demo',
    ctaText: 'Request Metrology Benchmark',
    accentColor: '#2563eb',
    glowColor: 'rgba(37, 99, 235, 0.15)',
    highlights: [
      { icon: Target, label: '0.08mm Accuracy' },
      { icon: Zap, label: 'Fast Scanning' },
      { icon: Box, label: 'Realistic 3D Models' },
    ],
    callout: {
      title: 'DETAILED REAL RESULTS',
      subtitle: '0.1mm resolution captures even the finest details',
    },
  },
  {
    id: 2,
    stepNumber: '02',
    titlePrimary: 'INVISIBLE LIGHT',
    titleAccent: 'TECHNOLOGY',
    fullTitle: 'Invisible Light Technology',
    subtitle:
      'Dual infrared light sources, invisible to the human eye, ensuring greater safety and comfort.',
    imageSrc: '/images/scanners/tech-panel-2-invisible.png',
    badgeLabel: 'Class 1 Eye-Safe Infrared',
    quoteInquiry: '3DeVOK MQ - Invisible Light Technology Inquiry',
    ctaText: 'Explore Eye-Safe Tech',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.15)',
    highlights: [
      { icon: Eye, label: 'Eye-safe Scanning' },
      { icon: Lightbulb, label: 'Dual Infrared Light Sources' },
      { icon: ShieldCheck, label: 'Safe & Comfortable' },
    ],
    callout: {
      title: 'HIGH-QUALITY 3D DATA',
      subtitle: 'Accurate and smooth scans for design, prototyping and product development',
    },
  },
  {
    id: 3,
    stepNumber: '03',
    titlePrimary: 'MARKER-FREE',
    titleAccent: 'SCANNING',
    fullTitle: 'Marker-Free Scanning',
    subtitle: 'Infrared laser and speckle technology enables non-marker scanning.',
    imageSrc: '/images/scanners/tech-panel-3-markerfree.png',
    badgeLabel: 'Hybrid Geometric & Feature Tracking',
    quoteInquiry: '3DeVOK MQ - Marker-Free Scanning Demo',
    ctaText: 'Schedule Live Demo',
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.15)',
    highlights: [
      { icon: Box, label: 'No Markers Required' },
      { icon: Zap, label: 'Fast & Efficient' },
      { icon: Sparkles, label: 'Works on Complex Surfaces' },
    ],
    callout: {
      title: 'CAPTURE COMPLEX DETAILS',
      subtitle: 'Scan intricate surfaces and fine textures without markers',
    },
  },
]

export const AdvancedScanningTechCinematic: React.FC = () => {
  const { openQuoteModal } = useApp()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [selectedZoom, setSelectedZoom] = useState<TechCardData | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Track responsive viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // High-performance scroll listener with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const containerHeight = sectionRef.current.offsetHeight
    const viewportHeight = window.innerHeight

    // Calculate progress: 0 when top enters viewport, 1 when bottom leaves
    const scrolled = -rect.top
    const maxScroll = containerHeight - viewportHeight

    if (maxScroll <= 0) return

    const rawProgress = scrolled / maxScroll
    const clampedProgress = Math.max(0, Math.min(1, rawProgress))

    setScrollProgress(clampedProgress)

    // Determine active technology index
    if (clampedProgress < 0.38) {
      setActiveStep(0)
    } else if (clampedProgress < 0.72) {
      setActiveStep(1)
    } else {
      setActiveStep(2)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Smooth jump to any technology step
  const scrollToStep = (stepIdx: number) => {
    if (!sectionRef.current) return
    const containerTop = sectionRef.current.offsetTop
    const containerHeight = sectionRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const maxScroll = containerHeight - viewportHeight

    const stepTargets = [0.15, 0.55, 0.88]
    const targetScrollY = containerTop + maxScroll * stepTargets[stepIdx]

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  // Calculate 3D transforms for each card based on scrollProgress (p)
  // Step 1: Card 01 zooms in (0.00 -> 0.20), holds (0.20 -> 0.38), recedes (0.38 -> 0.60)
  // Step 2: Card 02 emerges from depth (0.35 -> 0.55), holds (0.55 -> 0.72), recedes (0.72 -> 0.90)
  // Step 3: Card 03 emerges from depth (0.68 -> 0.88), holds (0.88 -> 1.00)
  const getCardStyle = (index: number) => {
    const p = scrollProgress

    // Default 3D values
    let scale = 1
    let opacity = 0
    let translateZ = 0
    let translateY = 0
    let rotateY = 0
    let blurPx = 0
    let zIndex = 10
    let pointerEvents: 'auto' | 'none' = 'none'

    if (index === 0) {
      if (p < 0.22) {
        // Card 01 entering from depth toward user
        const t = Math.max(0, Math.min(1, p / 0.22))
        scale = 0.82 + (1.0 - 0.82) * t
        opacity = t
        translateZ = -300 * (1 - t)
        translateY = 40 * (1 - t)
        rotateY = isMobile ? 0 : -8 * (1 - t)
        blurPx = 8 * (1 - t)
        zIndex = 30
        pointerEvents = t > 0.5 ? 'auto' : 'none'
      } else if (p < 0.38) {
        // Card 01 holding foreground
        const holdT = (p - 0.22) / (0.38 - 0.22)
        scale = 1.0 + 0.015 * Math.sin(holdT * Math.PI)
        opacity = 1
        translateZ = 0
        translateY = 0
        rotateY = 0
        blurPx = 0
        zIndex = 30
        pointerEvents = 'auto'
      } else if (p < 0.65) {
        // Card 01 receding backward as Card 02 emerges
        const recT = (p - 0.38) / (0.65 - 0.38)
        scale = 1.0 - 0.16 * recT
        opacity = 1.0 - 0.55 * recT
        translateZ = -220 * recT
        translateY = -25 * recT
        rotateY = isMobile ? 0 : -5 * recT
        blurPx = 5 * recT
        zIndex = 15
        pointerEvents = 'none'
      } else {
        // Deep background fade
        opacity = Math.max(0, 0.45 - (p - 0.65) * 4)
        scale = 0.82
        translateZ = -350
        translateY = -35
        blurPx = 8
        zIndex = 5
        pointerEvents = 'none'
      }
    } else if (index === 1) {
      if (p < 0.33) {
        // Hidden in depth behind Card 01
        opacity = 0
        scale = 0.70
        translateZ = -600
        blurPx = 10
        zIndex = 10
        pointerEvents = 'none'
      } else if (p < 0.54) {
        // Card 02 emerging from behind Card 01
        const t = (p - 0.33) / (0.54 - 0.33)
        scale = 0.70 + (1.0 - 0.70) * t
        opacity = t
        translateZ = -600 * (1 - t)
        translateY = 40 * (1 - t)
        rotateY = isMobile ? 0 : 8 * (1 - t)
        blurPx = 10 * (1 - t)
        zIndex = 40
        pointerEvents = t > 0.5 ? 'auto' : 'none'
      } else if (p < 0.72) {
        // Card 02 holding foreground
        const holdT = (p - 0.54) / (0.72 - 0.54)
        scale = 1.0 + 0.015 * Math.sin(holdT * Math.PI)
        opacity = 1
        translateZ = 0
        translateY = 0
        rotateY = 0
        blurPx = 0
        zIndex = 40
        pointerEvents = 'auto'
      } else if (p < 0.92) {
        // Card 02 receding backward as Card 03 emerges
        const recT = (p - 0.72) / (0.92 - 0.72)
        scale = 1.0 - 0.16 * recT
        opacity = 1.0 - 0.55 * recT
        translateZ = -220 * recT
        translateY = -25 * recT
        rotateY = isMobile ? 0 : 5 * recT
        blurPx = 5 * recT
        zIndex = 20
        pointerEvents = 'none'
      } else {
        // Deep background fade
        opacity = Math.max(0, 0.45 - (p - 0.92) * 4)
        scale = 0.82
        translateZ = -350
        blurPx = 8
        zIndex = 10
        pointerEvents = 'none'
      }
    } else if (index === 2) {
      if (p < 0.66) {
        // Hidden in deep depth behind Card 02
        opacity = 0
        scale = 0.60
        translateZ = -900
        blurPx = 12
        zIndex = 10
        pointerEvents = 'none'
      } else if (p < 0.86) {
        // Card 03 emerging from deep space
        const t = (p - 0.66) / (0.86 - 0.66)
        scale = 0.60 + (1.0 - 0.60) * t
        opacity = t
        translateZ = -900 * (1 - t)
        translateY = 40 * (1 - t)
        rotateY = isMobile ? 0 : -8 * (1 - t)
        blurPx = 12 * (1 - t)
        zIndex = 50
        pointerEvents = t > 0.5 ? 'auto' : 'none'
      } else {
        // Card 03 dominant foreground finale
        scale = 1.0
        opacity = 1
        translateZ = 0
        translateY = 0
        rotateY = 0
        blurPx = 0
        zIndex = 50
        pointerEvents = 'auto'
      }
    }

    return {
      transform: `perspective(1600px) translate3d(0px, ${translateY}px, ${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      filter: blurPx > 0.3 ? `blur(${blurPx.toFixed(1)}px)` : 'none',
      zIndex,
      pointerEvents,
      willChange: 'transform, opacity, filter',
      transition: 'box-shadow 0.3s ease',
    }
  }

  return (
    <section
      ref={sectionRef}
      id="advanced-scanning-tech"
      className="relative bg-gradient-to-b from-white via-sky-50/50 to-slate-100 text-slate-900 border-y border-slate-200/90 h-[340vh]"
    >
      {/* ====================================================
          STICKY VIEWPORT CONTAINER (PINS IN PLACE DURING SCROLL)
         ==================================================== */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Subtle Ambient Industrial Lighting */}
        <div
          className="absolute inset-0 opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Radial Depth Glows with Parallax Shift */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none transition-transform duration-700"
          style={{ transform: `scale(${1 + scrollProgress * 0.12}) translate(${scrollProgress * 20}px, ${scrollProgress * -30}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/7 rounded-full blur-[130px] pointer-events-none transition-transform duration-700"
          style={{ transform: `scale(${1 + (1 - scrollProgress) * 0.1})` }}
        />

        {/* ====================================================
            1. SECTION HEADER
           ==================================================== */}
        <div className="relative z-20 text-center max-w-4xl mx-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Proprietary Multi-Modal Optical Array</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            ADVANCED SCANNING TECHNOLOGY
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto mt-1.5 font-normal leading-relaxed">
            Precision scanning technology engineered for accurate, efficient and reliable 3D data capture.
          </p>

          {/* ACTIVE TECHNOLOGY PROGRESS INDICATOR */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 mt-4">
            {techCards.map((tech, idx) => {
              const isActive = activeStep === idx
              const isPast = activeStep > idx
              return (
                <button
                  key={tech.id}
                  onClick={() => scrollToStep(idx)}
                  className={`group flex items-center space-x-2 transition-all cursor-pointer py-1 ${
                    isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`font-mono text-xs sm:text-sm font-black transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    {tech.stepNumber}
                  </span>
                  <div className="w-12 sm:w-20 md:w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 w-full shadow-sm'
                          : isPast
                          ? 'bg-slate-400 w-full'
                          : 'w-0'
                      }`}
                    />
                  </div>
                  <span className="hidden lg:inline text-[11px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    {tech.titlePrimary}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ====================================================
            2. 3D CINEMATIC STAGE (THE CARDS STACK)
           ==================================================== */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-2 sm:my-4"
          style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
        >
          {techCards.map((card, idx) => {
            const cardStyle = getCardStyle(idx)
            const isActive = activeStep === idx

            return (
              <div
                key={card.id}
                style={cardStyle}
                className={`absolute inset-x-0 mx-auto w-full max-w-[1080px] rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/70 overflow-hidden flex flex-col transition-shadow duration-500 ${
                  isActive ? 'ring-2 ring-blue-500/20 shadow-blue-500/5' : ''
                }`}
              >
                {/* Active Top Accent Line */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: card.accentColor }}
                />

                {/* Card Main Body — images are 1024×384 (8:3 wide landscape) */}
                <div className="relative w-full bg-slate-950 overflow-hidden group" style={{ aspectRatio: '8/3' }}>
                  {/* Full HD Wide Banner — rendered at native 8:3 with no cropping */}
                  <img
                    src={card.imageSrc}
                    alt={card.fullTitle}
                    className="w-full h-full object-fill select-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      display: 'block',
                    }}
                  />

                  {/* Subtle Top-Right Interactive Badges & Expand Trigger */}
                  <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                    <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: card.accentColor }}
                      />
                      <span>{card.badgeLabel}</span>
                    </span>

                    <button
                      onClick={() => setSelectedZoom(card)}
                      className="w-8 h-8 rounded-full bg-slate-950/80 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md cursor-pointer"
                      title="Inspect HD Panel"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Interactive CTA Strip (Contextual Demo Request) */}
                  <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-20 flex items-center justify-between pointer-events-auto">
                    <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs">
                      <span className="text-slate-400 font-mono">Status:</span>
                      <strong className="text-emerald-400 font-bold">Hardware Active</strong>
                    </div>

                    <button
                      onClick={() => openQuoteModal(card.quoteInquiry)}
                      className="ml-auto inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer group/btn"
                    >
                      <span>{card.ctaText}</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Step Indicator Footer on Card */}
                <div className="bg-slate-50 border-t border-slate-100 px-5 py-2.5 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-2 font-mono font-bold text-slate-700">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span>Technology Step {card.stepNumber} of 03</span>
                  </div>
                  <span className="hidden sm:inline text-slate-400 font-medium">
                    Scroll to advance sequence • Reverse scroll returns
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ====================================================
            3. FOOTER HINT & CONTINUATION CUE
           ==================================================== */}
        <div className="relative z-20 text-center pb-1">
          <div className="inline-flex items-center space-x-2 text-xs text-slate-400 font-mono font-medium">
            <span>
              {scrollProgress < 0.95
                ? 'Scroll to advance 3D sequence'
                : 'Sequence complete — scroll to continue'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce text-blue-600" />
          </div>
        </div>
      </div>

      {/* ====================================================
          FULL HD ZOOM MODAL
         ==================================================== */}
      {selectedZoom && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedZoom(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 text-slate-900 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase">
                  Step {selectedZoom.stepNumber} Metrology Panel
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 mt-0.5">
                  {selectedZoom.fullTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedZoom(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl p-2 sm:p-3 flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src={selectedZoom.imageSrc}
                alt={selectedZoom.fullTitle}
                className="w-full h-auto max-h-[65vh] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <p className="text-slate-600">{selectedZoom.subtitle}</p>
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={() => {
                    openQuoteModal(selectedZoom.quoteInquiry)
                    setSelectedZoom(null)
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  {selectedZoom.ctaText}
                </button>
                <button
                  onClick={() => setSelectedZoom(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
