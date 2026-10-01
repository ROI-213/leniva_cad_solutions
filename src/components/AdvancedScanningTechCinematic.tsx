import React, { useState } from 'react'
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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
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
  const [activeStep, setActiveStep] = useState(0)
  const [selectedZoom, setSelectedZoom] = useState<TechCardData | null>(null)

  const activeCard = techCards[activeStep]

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? techCards.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev === techCards.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      id="advanced-scanning-tech"
      className="relative bg-gradient-to-b from-white via-sky-50/40 to-slate-100 text-slate-900 border-y border-slate-200/90 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient Radial Depth Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-500/7 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ====================================================
            1. SECTION HEADER (Spacious & Clean - No Overlap)
           ==================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>Proprietary Multi-Modal Optical Array</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            ADVANCED SCANNING TECHNOLOGY
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Precision scanning technology engineered for accurate, efficient and reliable 3D data capture.
          </p>

          {/* ACTIVE TECHNOLOGY PROGRESS TABS */}
          <div className="pt-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {techCards.map((tech, idx) => {
              const isActive = activeStep === idx
              return (
                <button
                  key={tech.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group flex items-center space-x-2.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-md border-slate-300 text-slate-950 scale-102 ring-2 ring-blue-500/20'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-black px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tech.stepNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-tight">
                    {tech.titlePrimary} {tech.titleAccent}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ====================================================
            2. ACTIVE TECHNOLOGY PRESENTATION CARD
           ==================================================== */}
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-300/60 overflow-hidden flex flex-col transition-all duration-300"
            style={{
              borderColor: activeCard.accentColor ? `${activeCard.accentColor}33` : undefined,
            }}
          >
            {/* Top Accent Strip */}
            <div
              className="h-1.5 w-full shrink-0 transition-colors duration-300"
              style={{ backgroundColor: activeCard.accentColor }}
            />

            {/* HD Banner Graphic (Native 8:3 ratio) */}
            <div className="relative w-full bg-slate-950 overflow-hidden group" style={{ aspectRatio: '8/3' }}>
              <img
                key={activeCard.id}
                src={activeCard.imageSrc}
                alt={activeCard.fullTitle}
                className="w-full h-full object-fill select-none transition-opacity duration-300"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  display: 'block',
                }}
              />

              {/* Navigation Arrows on Card */}
              <button
                onClick={handlePrev}
                aria-label="Previous Technology Step"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Technology Step"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/70 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top-Right Badges & Zoom Button */}
              <div className="absolute top-4 right-4 sm:right-6 z-20 flex items-center space-x-2">
                <span className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold shadow-md">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeCard.accentColor }}
                  />
                  <span>{activeCard.badgeLabel}</span>
                </span>

                <button
                  onClick={() => setSelectedZoom(activeCard)}
                  className="w-8 h-8 rounded-full bg-slate-950/80 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Inspect HD Panel"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Interactive CTA Strip */}
              <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-20 flex items-center justify-between pointer-events-auto">
                <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs">
                  <span className="text-slate-400 font-mono">Status:</span>
                  <strong className="text-emerald-400 font-bold">Hardware Active</strong>
                </div>

                <button
                  onClick={() => openQuoteModal(activeCard.quoteInquiry)}
                  className="ml-auto inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer group/btn"
                >
                  <span>{activeCard.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Card Footer Details */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeCard.accentColor }}
                  />
                  <span className="text-sm font-bold text-slate-950">
                    Step {activeCard.stepNumber}: {activeCard.fullTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeCard.subtitle}
                </p>
              </div>

              {/* Feature Highlights Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {activeCard.highlights.map((h, i) => {
                  const Icon = h.icon
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-[11px] font-semibold text-slate-700 shadow-2xs"
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      <span>{h.label}</span>
                    </span>
                  )
                })}
              </div>
            </div>
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
            onClick={(e) => e.stopPropagation()}
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
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <img
                src={selectedZoom.imageSrc}
                alt={selectedZoom.fullTitle}
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-600 space-y-0.5">
                <p>
                  <strong>Description:</strong> {selectedZoom.subtitle}
                </p>
                <p>
                  <strong>Callout:</strong> {selectedZoom.callout.title} —{' '}
                  {selectedZoom.callout.subtitle}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedZoom(null)
                  openQuoteModal(selectedZoom.quoteInquiry)
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
              >
                {selectedZoom.ctaText}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdvancedScanningTechCinematic
