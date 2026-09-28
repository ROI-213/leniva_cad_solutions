import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Target,
  Settings,
  Layers,
  TrendingUp,
  Box,
  Zap,
  Flame,
  ShieldCheck,
  Eye,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  LucideIcon,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export interface ShowcaseProductItem {
  id: string
  name: string
  nameAccent?: string
  subtitle: string
  description: string
  modelsCount: string
  badgeLabel?: string
  image: string
  link: string
  quoteInquiry: string
  isContain?: boolean
  features: {
    icon: LucideIcon
    label: string
  }[]
}

export interface ShowcaseCategorySection {
  id: string
  categoryTag: string
  titlePrimary: string
  titleAccent: string
  subtitle: string
  catalogLink: string
  catalogText: string
  accentColor: string
  badges: {
    icon: LucideIcon
    label: string
  }[]
  products: ShowcaseProductItem[]
}

const showcaseCategories: ShowcaseCategorySection[] = [
  // 1. INDUSTRIAL FDM 3D PRINTERS
  {
    id: 'fdm',
    categoryTag: 'EXPLORE OUR',
    titlePrimary: '3D PRINTING',
    titleAccent: 'SOLUTIONS',
    subtitle: 'Industrial-grade 3D printers for prototyping, production and real-world applications.',
    catalogLink: '/products',
    catalogText: 'View All Products in Catalog',
    accentColor: '#dc2626',
    badges: [
      { icon: Target, label: 'High Precision' },
      { icon: Settings, label: 'Industrial Grade' },
      { icon: Layers, label: 'Wide Material Range' },
      { icon: TrendingUp, label: 'Scalable Production' },
    ],
    products: [
      {
        id: 'pratham-6-0',
        name: 'Pratham',
        nameAccent: '6.0',
        subtitle: 'Industrial FDM | Large Format',
        description: 'High-performance 3D printing for functional prototypes and end-use production.',
        modelsCount: '7 MODELS',
        badgeLabel: 'Production Workhorse',
        image: '/images/products/pratham-6-0.png',
        link: '/products/pratham-6',
        quoteInquiry: 'Pratham 6.0 Large Format FDM Inquiry',
        features: [
          { icon: Box, label: 'Large Build Volume' },
          { icon: Target, label: 'High Precision' },
          { icon: Settings, label: 'Production Ready' },
        ],
      },
      {
        id: 'eka-xle',
        name: 'EKA',
        nameAccent: 'XLE',
        subtitle: 'Production DLP 3D Printer',
        description: 'High-speed, high-precision DLP printing for detailed functional parts and production applications.',
        modelsCount: '3 MODELS',
        badgeLabel: 'Flagship Production',
        image: '/images/products/eka-xle.png',
        link: '/products/eka-xle',
        quoteInquiry: 'EKA XLE Production DLP Inquiry',
        features: [
          { icon: Sparkles, label: 'Exceptional Detail' },
          { icon: Zap, label: 'Fast Production' },
          { icon: Settings, label: 'Stable Performance' },
        ],
      },
      {
        id: 'pratham-5-0',
        name: 'Pratham',
        nameAccent: '5.0',
        subtitle: 'Enclosed Engineering FDM',
        description: 'Heated chamber industrial 3D printing engineered for ABS, PC, Nylon and carbon composites.',
        modelsCount: '7 MODELS',
        badgeLabel: 'High Temperature',
        image: '/images/products/pratham-5-0.png',
        link: '/products/pratham-5',
        quoteInquiry: 'Pratham 5.0 Engineering FDM Inquiry',
        features: [
          { icon: Flame, label: 'Chamber Heating' },
          { icon: ShieldCheck, label: 'Composite Ready' },
          { icon: Zap, label: 'Direct Dual Extrusion' },
        ],
      },
      {
        id: 'pratham-3-0',
        name: 'Pratham',
        nameAccent: '3.0',
        subtitle: 'Continuous Precision FDM',
        description: 'Reliable 24/7 industrial fabrication with automatic bed leveling and filament runout protection.',
        modelsCount: '7 MODELS',
        badgeLabel: 'Factory Proven',
        image: '/images/products/pratham-3-0.png',
        link: '/products/pratham-3',
        quoteInquiry: 'Pratham 3.0 Industrial FDM Inquiry',
        features: [
          { icon: Clock, label: '24/7 Continuous Duty' },
          { icon: Target, label: 'Auto Mesh Leveling' },
          { icon: Box, label: 'All-Metal Hotend 300°C' },
        ],
      },
      {
        id: 'pratham-desktop',
        name: 'Pratham',
        nameAccent: 'Desktop',
        subtitle: 'Compact Industrial Platform',
        description: 'High-accuracy desktop industrial printing tailored for design studios, labs and universities.',
        modelsCount: '7 MODELS',
        badgeLabel: 'Studio Series',
        image: '/images/products/pratham-desktop.png',
        link: '/products/pratham-desktop',
        quoteInquiry: 'Pratham Desktop FDM Inquiry',
        features: [
          { icon: Sparkles, label: 'Fine Layer Detail' },
          { icon: Settings, label: 'Linear Rail Motion' },
          { icon: ShieldCheck, label: 'Silent Stepper Drivers' },
        ],
      },
    ],
  },

  // 2. PRODUCTION DLP 3D PRINTERS
  {
    id: 'dlp',
    categoryTag: 'HIGH-SPEED PHOTOPOLYMER',
    titlePrimary: 'DLP 3D PRINTING',
    titleAccent: 'SYSTEMS',
    subtitle: 'High-speed, high-precision DLP printing for detailed functional parts and production applications.',
    catalogLink: '/products/industrial-dlp-3d-printers',
    catalogText: 'Explore All DLP Printers',
    accentColor: '#ea580c',
    badges: [
      { icon: Sparkles, label: 'Exceptional Detail' },
      { icon: Zap, label: 'Fast Production' },
      { icon: Settings, label: 'Stable Performance' },
      { icon: Target, label: 'Sub-25μm Resolution' },
    ],
    products: [
      {
        id: 'eka-xle',
        name: 'EKA',
        nameAccent: 'XLE',
        subtitle: 'Production DLP 3D Printer',
        description: 'High-speed, high-precision DLP printing for detailed functional parts and production applications.',
        modelsCount: '3 MODELS',
        badgeLabel: 'Flagship Production',
        image: '/images/products/eka-xle.png',
        link: '/products/eka-xle',
        quoteInquiry: 'EKA XLE Production DLP Inquiry',
        features: [
          { icon: Sparkles, label: 'Exceptional Detail' },
          { icon: Zap, label: 'Fast Production' },
          { icon: Settings, label: 'Stable Performance' },
        ],
      },
      {
        id: 'eka-xl',
        name: 'EKA',
        nameAccent: 'XL',
        subtitle: 'Large-Format Industrial DLP',
        description: 'Expanded DLP build envelope engineered for batch dental, jewelry and precision casting patterns.',
        modelsCount: '3 MODELS',
        badgeLabel: 'Large Format',
        image: '/images/products/eka-xl.png',
        link: '/products/eka-xl',
        quoteInquiry: 'EKA XL Large-Format DLP Inquiry',
        features: [
          { icon: Box, label: 'Expanded Build Area' },
          { icon: Target, label: 'Industrial Optical Engine' },
          { icon: ShieldCheck, label: 'Rigid Granite Base' },
        ],
      },
      {
        id: 'eka-ht',
        name: 'EKA',
        nameAccent: 'HT',
        subtitle: 'High-Temperature Engineering DLP',
        description: 'Engineered for advanced polymer formulations requiring heated vat control and chemical resistance.',
        modelsCount: '3 MODELS',
        badgeLabel: 'Engineering Grade',
        image: '/images/products/eka-ht.png',
        link: '/products/eka-ht',
        quoteInquiry: 'EKA HT High-Temp DLP Inquiry',
        features: [
          { icon: Flame, label: 'Heated Vat Control' },
          { icon: ShieldCheck, label: 'Chemical Resistant Vat' },
          { icon: Zap, label: 'Ultra-Fast Layer Cure' },
        ],
      },
    ],
  },

  // 3. 3D METROLOGY & OPTICAL SCANNERS
  {
    id: 'scanners',
    categoryTag: 'PRECISION METROLOGY & DIGITIZATION',
    titlePrimary: '3D SCANNING',
    titleAccent: 'TECHNOLOGY',
    subtitle: 'Metrology-grade optical, laser & infrared digitizing systems for inspection, CMM and reverse engineering.',
    catalogLink: '/products/3d-scanners',
    catalogText: 'Explore All 3D Scanners',
    accentColor: '#2563eb',
    badges: [
      { icon: Award, label: '0.015mm Accuracy' },
      { icon: Zap, label: 'Marker-Free Tracking' },
      { icon: Eye, label: 'True 24-Bit Color' },
      { icon: ShieldCheck, label: 'VDI/VDE Certified' },
    ],
    products: [
      {
        id: '3devok-mq',
        name: '3DeVOK',
        nameAccent: 'MQ',
        subtitle: 'Color & High-Speed Optical Scanner',
        description: 'Rapid 3D data capture with photorealistic 24-bit texture mapping and high-resolution geometry.',
        modelsCount: '4 MODELS',
        badgeLabel: 'Color Metrology',
        image: '/images/scanners/3devok-mq.png',
        link: '/3d-scanners/3devok-mq',
        quoteInquiry: '3DeVOK MQ Color 3D Scanner Inquiry',
        isContain: true,
        features: [
          { icon: Target, label: '0.08mm Accuracy' },
          { icon: Zap, label: 'Fast Scanning' },
          { icon: Box, label: 'Realistic 3D Models' },
        ],
      },
      {
        id: '3devok-mt',
        name: '3DeVOK',
        nameAccent: 'MT',
        subtitle: 'Industrial Metrology Coordinate Scanner',
        description: 'VDI/VDE 2634 Part 2 certified scanner engineered for robotic inline verification and CAD comparison.',
        modelsCount: '4 MODELS',
        badgeLabel: 'Metrology Grade',
        image: '/images/scanners/3devok-mt.png',
        link: '/3d-scanners/3devok-mt',
        quoteInquiry: '3DeVOK MT Metrology Scanner Inquiry',
        isContain: true,
        features: [
          { icon: Award, label: '0.015mm Accuracy' },
          { icon: Settings, label: 'Robot-Ready Interface' },
          { icon: ShieldCheck, label: 'VDI/VDE 2634 Certified' },
        ],
      },
      {
        id: 'einscan-hx',
        name: 'EinScan',
        nameAccent: 'HX',
        subtitle: 'Dual Blue Laser & LED Scanner',
        description: 'Hybrid blue LED and laser light sources for reflective metal, dark surfaces and high-speed inspection.',
        modelsCount: '4 MODELS',
        badgeLabel: 'Hybrid Laser/LED',
        image: '/images/scanners/einscan-hx.png',
        link: '/products/einscan',
        quoteInquiry: 'EinScan HX Dual Light Scanner Inquiry',
        isContain: true,
        features: [
          { icon: Eye, label: 'Dual Light Engine' },
          { icon: Target, label: 'Laser Line Precision' },
          { icon: Sparkles, label: 'Black / Shiny Surface' },
        ],
      },
      {
        id: 'einscan-h2',
        name: 'EinScan',
        nameAccent: 'H2',
        subtitle: 'Dual Infrared & Color Scanner',
        description: 'Eye-safe infrared speckle technology with integrated color camera for body, face and heritage scanning.',
        modelsCount: '4 MODELS',
        badgeLabel: 'Eye-Safe Infrared',
        image: '/images/scanners/einscan-h2.png',
        link: '/products/einscan',
        quoteInquiry: 'EinScan H2 Dual Light Scanner Inquiry',
        isContain: true,
        features: [
          { icon: ShieldCheck, label: 'Eye-Safe Infrared' },
          { icon: Sparkles, label: 'Marker-Free Mode' },
          { icon: Box, label: 'Photorealistic Color' },
        ],
      },
    ],
  },

  // 4. INDUSTRIAL LCD 3D PRINTERS
  {
    id: 'lcd',
    categoryTag: 'ULTRA-HIGH DEFINITION MSLA',
    titlePrimary: 'INDUSTRIAL LCD',
    titleAccent: '3D PRINTERS',
    subtitle: 'High-resolution resin printing systems delivering crisp fidelity up to 16K resolution for volume manufacturing.',
    catalogLink: '/products/industrial-lcd-3d-printers',
    catalogText: 'Explore All LCD Printers',
    accentColor: '#0284c7',
    badges: [
      { icon: Target, label: 'Up to 16K Precision' },
      { icon: Layers, label: 'Uniform Light Matrix' },
      { icon: Zap, label: 'Fast Layer Curing' },
      { icon: TrendingUp, label: 'Scalable Batching' },
    ],
    products: [
      {
        id: 'eka-gt-max',
        name: 'EKA',
        nameAccent: 'GT MAX',
        subtitle: '8K Industrial MSLA Resin Printer',
        description: 'High-resolution industrial MSLA system with 8K monochrome LCD and uniform parallel light collimation.',
        modelsCount: '2 MODELS',
        badgeLabel: '8K High Resolution',
        image: '/images/products/eka-gt-max.png',
        link: '/products/eka-gt-max',
        quoteInquiry: 'EKA GT MAX 8K MSLA Inquiry',
        features: [
          { icon: Sparkles, label: '8K Monochrome Screen' },
          { icon: Layers, label: 'Uniform UV Array' },
          { icon: Box, label: 'Large Build Envelope' },
        ],
      },
      {
        id: 'eka-f1-16k',
        name: 'EKA',
        nameAccent: 'F1 16K',
        subtitle: '16K Ultra-Fast MSLA Printer',
        description: 'Next-generation 16K ultra-fine resolution for micron-level dental, microfluidics and precision parts.',
        modelsCount: '2 MODELS',
        badgeLabel: '16K Ultra-Resolution',
        image: '/images/products/eka-f1-16k.png',
        link: '/products/eka-f1-16k',
        quoteInquiry: 'EKA F1 16K MSLA Inquiry',
        features: [
          { icon: Target, label: '16K Micro-Fidelity' },
          { icon: Zap, label: 'High-Speed Release Film' },
          { icon: Settings, label: 'Thermal Vat Stabilization' },
        ],
      },
    ],
  },
]

export const ShowroomSolutionsSection: React.FC = () => {
  const { openQuoteModal } = useApp()
  // Maintain current slide index for each category
  const [activeIndices, setActiveIndices] = useState<{ [catId: string]: number }>({
    fdm: 0,
    dlp: 0,
    scanners: 0,
    lcd: 0,
  })
  const [zoomItem, setZoomItem] = useState<ShowcaseProductItem | null>(null)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null)
  const [timerProgress, setTimerProgress] = useState(0)

  // Auto-slide carousel rotation effect with smooth progress timer
  useEffect(() => {
    if (!isAutoPlay || zoomItem) return

    const tickInterval = 50 // ms per tick
    const totalDuration = 4500 // 4.5 seconds per slide
    const progressStep = (tickInterval / totalDuration) * 100

    const timer = setInterval(() => {
      setTimerProgress(prev => {
        if (prev >= 100) {
          // Advance category (unless hovered)
          setActiveIndices(curr => {
            const next = { ...curr }
            showcaseCategories.forEach(cat => {
              if (hoveredCatId !== cat.id) {
                next[cat.id] = (curr[cat.id] + 1) % cat.products.length
              }
            })
            return next
          })
          return 0
        }
        return prev + progressStep
      })
    }, tickInterval)

    return () => clearInterval(timer)
  }, [isAutoPlay, hoveredCatId, zoomItem])

  const handlePrev = useCallback((catId: string, totalCount: number) => {
    setActiveIndices(prev => ({
      ...prev,
      [catId]: (prev[catId] - 1 + totalCount) % totalCount,
    }))
    setTimerProgress(0)
  }, [])

  const handleNext = useCallback((catId: string, totalCount: number) => {
    setActiveIndices(prev => ({
      ...prev,
      [catId]: (prev[catId] + 1) % totalCount,
    }))
    setTimerProgress(0)
  }, [])

  const handleSetIndex = useCallback((catId: string, index: number) => {
    setActiveIndices(prev => ({
      ...prev,
      [catId]: index,
    }))
    setTimerProgress(0)
  }, [])

  return (
    <>
      <section id="showroom-solutions" className="w-full relative overflow-hidden py-1 sm:py-2">
        {/* Showroom Panoramic Background */}
        <div className="relative w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
          {/* Showroom Stage Outer Container: Single unified section without blank spaces */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#f8fafc]/95 via-[#f0f7ff]/75 to-[#e2e8f0]/65 p-4 sm:p-6 lg:p-7 xl:p-8 border border-slate-200/90 shadow-2xl overflow-hidden">
            {/* Background Ambient Lighting & Potted Plant Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/6 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Industrial Grid Floor Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />

            <div className="relative z-10 space-y-6 sm:space-y-8">
              {showcaseCategories.map((section, catIndex) => {
                const isFirstCategory = catIndex === 0
                const currentIndex = activeIndices[section.id] || 0
                const totalProducts = section.products.length

                // Get 4 cards to display simultaneously across the showroom carousel:
                // Card 0: Previous item (peeking from left edge)
                // Card 1: Active item 1 (full card)
                // Card 2: Active item 2 (full card)
                // Card 3: Next item (peeking from right edge)
                const prevProductIndex = (currentIndex - 1 + totalProducts) % totalProducts
                const prevProduct = section.products[prevProductIndex]

                const firstProduct = section.products[currentIndex]

                const secondProductIndex = (currentIndex + 1) % totalProducts
                const secondProduct = totalProducts > 1 ? section.products[secondProductIndex] : null

                const nextProductIndex = (currentIndex + 2) % totalProducts
                const nextProduct = totalProducts > 2 ? section.products[nextProductIndex] : prevProduct

                return (
                  <div
                    key={section.id}
                    id={`showcase-${section.id}`}
                    className="w-full relative scroll-mt-24"
                  >
                    {/* Subtle Elegant Divider for Down 3 Categories */}
                    {!isFirstCategory && (
                      <div className="border-t border-slate-200/90 mb-8 sm:mb-12" />
                    )}

                    {/* ====================================================
                        HEADER:
                        Category 1: Full Showcase Header (Tag, Title, Subtitle, Badges, Side Tags)
                        Down 3 Categories: ONLY Category Name & Products (no separate sections)
                       ==================================================== */}
                    {isFirstCategory ? (
                      <div className="relative z-20 mb-6 sm:mb-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          {/* Left Decorative Side Tag: FROM CONCEPT TO CREATION */}
                          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
                            <div className="w-1.5 h-10 border-l-2 border-t-2 border-b-2 border-red-500/80 rounded-l-xs" />
                            <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-snug">
                              <div>FROM</div>
                              <div>CONCEPT</div>
                              <div>TO CREATION</div>
                            </div>
                          </div>

                          {/* Center Header: Category Title & Feature Pills */}
                          <div className="text-center space-y-2 max-w-3xl mx-auto">
                            {/* Top Tag: — EXPLORE OUR — */}
                            <div className="flex items-center justify-center space-x-2 text-[11px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase">
                              <span className="w-6 h-[1.5px] bg-slate-300" />
                              <span>{section.categoryTag}</span>
                              <span className="w-6 h-[1.5px] bg-slate-300" />
                            </div>

                            {/* Main Title */}
                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                              {section.titlePrimary}{' '}
                              <span className="text-blue-600">{section.titleAccent}</span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
                              {section.subtitle}
                            </p>

                            {/* Feature Highlights Bar (4 Badges with Icons) */}
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
                              {section.badges.map(b => {
                                const IconComponent = b.icon
                                return (
                                  <div
                                    key={b.label}
                                    className="flex items-center space-x-1.5 text-xs text-slate-700 font-semibold"
                                  >
                                    <IconComponent className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                    <span>{b.label}</span>
                                  </div>
                                )
                              })}
                            </div>

                            {/* Auto-Slide Carousel Controls & Interactive 3D Printer Jump Dots */}
                            <div className="flex flex-wrap items-center justify-center gap-2 pt-2.5">
                              <button
                                type="button"
                                onClick={() => setIsAutoPlay(p => !p)}
                                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-mono font-semibold shadow-xs transition-colors cursor-pointer select-none"
                                title={isAutoPlay ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
                              >
                                {isAutoPlay ? (
                                  <>
                                    <Pause className="w-3 h-3 text-cyan-400" />
                                    <span>AUTOPLAY ON</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-0.5" />
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3 h-3 text-emerald-400" />
                                    <span>PAUSED</span>
                                  </>
                                )}
                              </button>

                              {/* Progress bar line */}
                              {isAutoPlay && (
                                <div className="w-20 sm:w-28 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-cyan-500 rounded-full transition-all duration-75"
                                    style={{ width: `${Math.round(timerProgress)}%` }}
                                  />
                                </div>
                              )}

                              {/* 5 Product Jump Dots with Model Names */}
                              <div className="flex items-center space-x-1 sm:space-x-1.5 bg-white/90 border border-slate-200/90 rounded-full px-2 py-0.5 shadow-2xs">
                                {section.products.map((p, pIdx) => {
                                  const isActive = pIdx === currentIndex
                                  return (
                                    <button
                                      key={p.id}
                                      onClick={() => handleSetIndex(section.id, pIdx)}
                                      className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                        isActive
                                          ? 'bg-red-600 text-white shadow-xs scale-105'
                                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                      }`}
                                      title={`Jump to ${p.name} ${p.nameAccent || ''}`}
                                    >
                                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400'}`} />
                                      <span>0{pIdx + 1}</span>
                                      <span className="hidden md:inline font-sans font-medium text-[10px]">{p.name}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Right Decorative Side Tag & Catalog Link Button */}
                          <div className="flex flex-col items-center md:items-end space-y-2 shrink-0">
                            <Link
                              to={section.catalogLink}
                              className="px-5 py-2.5 rounded-full border border-red-500/80 hover:border-red-600 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 group cursor-pointer"
                            >
                              <span>{section.catalogText}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="hidden xl:flex items-center space-x-2.5 pt-1">
                              <div className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-snug text-right">
                                <div>INDUSTRIAL</div>
                                <div>3D PRINTING</div>
                                <div>SOLUTIONS</div>
                              </div>
                              <div className="w-1.5 h-10 border-r-2 border-t-2 border-b-2 border-red-500/80 rounded-r-xs" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* DOWN 3 CATEGORIES: ONLY DISPLAY NAME & LINK */
                      <div className="relative z-20 mb-6 sm:mb-8 text-center space-y-2">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                          {section.titlePrimary}{' '}
                          <span className="text-blue-600">{section.titleAccent}</span>
                        </h3>
                        <div>
                          <Link
                            to={section.catalogLink}
                            className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-all group"
                          >
                            <span>{section.catalogText}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* ====================================================
                        2. SHOWROOM STAGE: PRODUCTS DISPLAYED SIMULTANEOUSLY
                       ==================================================== */}
                    <div
                      className="relative z-10 w-full"
                      onMouseEnter={() => setHoveredCatId(section.id)}
                      onMouseLeave={() => setHoveredCatId(null)}
                    >
                      {/* Left / Right Navigation Chevrons */}
                      <button
                        onClick={() => handlePrev(section.id, totalProducts)}
                        aria-label="Previous Product"
                        className={`absolute ${
                          totalProducts > 2
                            ? 'left-1 sm:left-3 lg:left-[115px] xl:left-[145px] 2xl:left-[170px]'
                            : 'left-1 sm:left-3'
                        } top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/90 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105 active:scale-95`}
                      >
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                      </button>

                      <button
                        onClick={() => handleNext(section.id, totalProducts)}
                        aria-label="Next Product"
                        className={`absolute ${
                          totalProducts > 2
                            ? 'right-1 sm:right-3 lg:right-[115px] xl:right-[145px] 2xl:right-[170px]'
                            : 'right-1 sm:right-3'
                        } top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/90 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105 active:scale-95`}
                      >
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                      </button>

                  {/* 4-Product Horizontal Track */}
                  <div className="flex items-stretch justify-center gap-4 sm:gap-6 lg:gap-7 w-full">
                    {/* Card 0: Left Peeking Product */}
                    {prevProduct && totalProducts > 2 && (
                      <div
                        onClick={() => handlePrev(section.id, totalProducts)}
                        className="hidden lg:flex flex-col justify-between shrink-0 w-[140px] xl:w-[175px] 2xl:w-[210px] -ml-6 xl:-ml-10 2xl:-ml-14 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xl p-3 sm:p-4 cursor-pointer hover:bg-white/95 hover:shadow-2xl transition-all duration-300 opacity-70 hover:opacity-100 group overflow-hidden relative select-none"
                        title={`View Previous: ${prevProduct.name} ${prevProduct.nameAccent || ''}`}
                      >
                        {/* Ambient Glow */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                        {/* Top Badge */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[9px] tracking-wider uppercase rounded shadow-xs">
                            {prevProduct.modelsCount}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            {prevProductIndex + 1}/{totalProducts}
                          </span>
                        </div>

                        {/* Machine on Pedestal */}
                        <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center">
                          <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="absolute bottom-1 inset-x-2 h-7 bg-cyan-400/25 rounded-[100%] blur-sm pointer-events-none" />
                            <div className="absolute bottom-2 inset-x-3 h-4 bg-gradient-to-b from-white via-slate-100 to-sky-100 rounded-[100%] border border-cyan-200 shadow-sm pointer-events-none" />
                            <img
                              src={prevProduct.image}
                              alt={`${prevProduct.name} ${prevProduct.nameAccent || ''}`}
                              className="relative z-10 max-h-32 xl:max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-[11px] font-black text-slate-800 tracking-tight truncate">
                              {prevProduct.name} <span className="text-blue-600">{prevProduct.nameAccent}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Hint */}
                        <div className="relative z-10 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors text-[10px] font-bold">
                          <ChevronLeft className="w-3.5 h-3.5 mr-0.5 group-hover:-translate-x-0.5 transition-transform" />
                          <span>PREV</span>
                        </div>
                      </div>
                    )}

                    {/* Card 1: Main Left Full Card */}
                    <div
                      key={`card1-${firstProduct.id}`}
                      className="flex-1 min-w-[280px] max-w-[580px] 2xl:max-w-[640px] rounded-3xl bg-white/95 backdrop-blur-md border border-white shadow-xl hover:shadow-2xl transition-all duration-500 p-5 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden group relative"
                    >
                      {/* Top Red Glow Gradient */}
                      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

                      {/* Header Row: Badge & Index / Fullscreen */}
                      <div className="flex items-center justify-between relative z-10 mb-3 sm:mb-4">
                        <span className="px-3 py-1 bg-red-600 text-white font-black text-[11px] tracking-wider uppercase rounded-md shadow-xs">
                          {firstProduct.modelsCount}
                        </span>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {currentIndex + 1} / {totalProducts}
                          </span>
                          <button
                            onClick={() => setZoomItem(firstProduct)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Inspect HD Model"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Middle Body: Left Typography + Right Showroom Machine on Pedestal */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center flex-1 relative z-10 my-1">
                        {/* Left Details (col-span-7) */}
                        <div className="sm:col-span-7 space-y-3">
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                            {firstProduct.name}{' '}
                            <span className="text-blue-600">{firstProduct.nameAccent}</span>
                          </h3>

                          <div className="text-xs font-bold text-slate-700">
                            {firstProduct.subtitle}
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                            {firstProduct.description}
                          </p>

                          {/* 3 Spec Icons */}
                          <div className="space-y-2 pt-1">
                            {firstProduct.features.map(f => {
                              const FeatIcon = f.icon
                              return (
                                <div
                                  key={f.label}
                                  className="flex items-center space-x-2 text-xs text-slate-700 font-semibold"
                                >
                                  <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-600">
                                    <FeatIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <span>{f.label}</span>
                                </div>
                              )
                            })}
                          </div>

                          {/* Red Pill CTA Button - Single Row Guaranteed */}
                          <div className="pt-2 sm:pt-3">
                            <Link
                              to={firstProduct.link}
                              className="inline-flex items-center space-x-2 px-5 py-2.5 sm:py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all cursor-pointer group/btn whitespace-nowrap shrink-0 max-w-full"
                            >
                              <span className="whitespace-nowrap">Explore {firstProduct.name} {firstProduct.nameAccent}</span>
                              <ArrowRight className="w-4 h-4 shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>

                        {/* Right Machine Imagery on Lighted Circular Podium (col-span-5) */}
                        <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:h-72 xl:h-76 flex items-center justify-center pt-2 pb-4 overflow-hidden rounded-2xl">
                          {/* 3D Multi-Tier Illuminated Circular Showroom Pedestal */}
                          <div className="absolute bottom-2 inset-x-2 h-14 bg-gradient-to-t from-cyan-400/35 via-blue-500/25 to-transparent rounded-[100%] blur-md pointer-events-none" />
                          <div className="absolute bottom-4 inset-x-4 h-7 bg-gradient-to-b from-white via-slate-100 to-sky-100 rounded-[100%] border border-cyan-200/90 shadow-[0_12px_28px_rgba(56,189,248,0.3)] pointer-events-none" />
                          <div className="absolute bottom-5 inset-x-8 h-5 bg-white/95 rounded-[100%] border border-white shadow-xs pointer-events-none" />

                          {/* Rotating Holographic Build Ring */}
                          <div className="absolute bottom-3 inset-x-4 h-8 rounded-[100%] border border-cyan-400/50 animate-holographic-pedestal pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.35)]" />

                          {/* 3D Printing Active Status Pill */}
                          <div className="absolute top-2 right-2 z-20 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 shadow-md pointer-events-none">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                            </span>
                            <span className="text-[9px] font-mono font-bold tracking-wider">PRINTING ACTIVE</span>
                          </div>

                          {/* Sweeping Laser Scan Line & Extruder Nozzle Head Indicator */}
                          <div className="absolute inset-x-3 sm:inset-x-6 top-3 bottom-12 pointer-events-none overflow-hidden z-20">
                            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#38bdf8] animate-printing-scan relative">
                              <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center animate-nozzle-travel">
                                <span className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee] animate-ping opacity-75" />
                                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#38bdf8]" />
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-3.5 bg-gradient-to-b from-cyan-300 to-transparent blur-[0.5px]" />
                              </div>
                              <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-cyan-400/20 to-transparent blur-xs pointer-events-none" />
                            </div>
                          </div>

                          {/* Transparent Product Image sitting directly on the pedestal */}
                          <img
                            src={firstProduct.image}
                            alt={`${firstProduct.name} ${firstProduct.nameAccent}`}
                            className="relative z-10 max-h-56 sm:max-h-60 xl:max-h-64 w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105 select-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Main Right Full Card */}
                    {secondProduct && (
                      <div
                        key={`card2-${secondProduct.id}`}
                        className="flex-1 min-w-[280px] max-w-[580px] 2xl:max-w-[640px] rounded-3xl bg-white/95 backdrop-blur-md border border-white shadow-xl hover:shadow-2xl transition-all duration-500 p-5 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden group relative"
                      >
                        {/* Top Glow Gradient */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

                        {/* Header Row: Badge & Index / Fullscreen */}
                        <div className="flex items-center justify-between relative z-10 mb-3 sm:mb-4">
                          <span className="px-3 py-1 bg-red-600 text-white font-black text-[11px] tracking-wider uppercase rounded-md shadow-xs">
                            {secondProduct.modelsCount}
                          </span>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-slate-400">
                              {secondProductIndex + 1} / {totalProducts}
                            </span>
                            <button
                              onClick={() => setZoomItem(secondProduct)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Inspect HD Model"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Middle Body: Left Typography + Right Showroom Machine on Pedestal */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center flex-1 relative z-10 my-1">
                          {/* Left Details (col-span-7) */}
                          <div className="sm:col-span-7 space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                              {secondProduct.name}{' '}
                              <span className="text-red-600">{secondProduct.nameAccent}</span>
                            </h3>

                            <div className="text-xs font-bold text-slate-700">
                              {secondProduct.subtitle}
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                              {secondProduct.description}
                            </p>

                            {/* 3 Spec Icons */}
                            <div className="space-y-2 pt-1">
                              {secondProduct.features.map(f => {
                                const FeatIcon = f.icon
                                return (
                                  <div
                                    key={f.label}
                                    className="flex items-center space-x-2 text-xs text-slate-700 font-semibold"
                                  >
                                    <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-600">
                                      <FeatIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{f.label}</span>
                                  </div>
                                )
                              })}
                            </div>

                            {/* Red Pill CTA Button - Single Row Guaranteed */}
                            <div className="pt-2 sm:pt-3">
                              <Link
                                to={secondProduct.link}
                                className="inline-flex items-center space-x-2 px-5 py-2.5 sm:py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] transition-all cursor-pointer group/btn whitespace-nowrap shrink-0 max-w-full"
                              >
                                <span className="whitespace-nowrap">Explore {secondProduct.name} {secondProduct.nameAccent}</span>
                                <ArrowRight className="w-4 h-4 shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>

                          {/* Right Machine Imagery on Lighted Circular Podium (col-span-5) */}
                          <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:h-72 xl:h-76 flex items-center justify-center pt-2 pb-4 overflow-hidden rounded-2xl">
                            {/* 3D Multi-Tier Illuminated Circular Showroom Pedestal */}
                            <div className="absolute bottom-2 inset-x-2 h-14 bg-gradient-to-t from-red-500/25 via-rose-400/20 to-transparent rounded-[100%] blur-md pointer-events-none" />
                            <div className="absolute bottom-4 inset-x-4 h-7 bg-gradient-to-b from-white via-slate-100 to-rose-50 rounded-[100%] border border-red-200/80 shadow-[0_12px_28px_rgba(244,63,94,0.25)] pointer-events-none" />
                            <div className="absolute bottom-5 inset-x-8 h-5 bg-white/95 rounded-[100%] border border-white shadow-xs pointer-events-none" />

                            {/* Rotating Holographic Build Ring */}
                            <div className="absolute bottom-3 inset-x-4 h-8 rounded-[100%] border border-red-400/50 animate-holographic-pedestal pointer-events-none shadow-[0_0_15px_rgba(244,63,94,0.35)]" />

                            {/* 3D Printing Active Status Pill */}
                            <div className="absolute top-2 right-2 z-20 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-red-500/40 text-red-300 shadow-md pointer-events-none">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                              </span>
                              <span className="text-[9px] font-mono font-bold tracking-wider">PRINTING ACTIVE</span>
                            </div>

                            {/* Sweeping Laser Scan Line & Extruder Nozzle Head Indicator */}
                            <div className="absolute inset-x-3 sm:inset-x-6 top-3 bottom-12 pointer-events-none overflow-hidden z-20">
                              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_14px_#f43f5e] animate-printing-scan relative">
                                <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center animate-nozzle-travel">
                                  <span className="w-3 h-3 rounded-full bg-rose-300 shadow-[0_0_12px_#fb7185] animate-ping opacity-75" />
                                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#f43f5e]" />
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-3.5 bg-gradient-to-b from-rose-300 to-transparent blur-[0.5px]" />
                                </div>
                                <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-red-400/20 to-transparent blur-xs pointer-events-none" />
                              </div>
                            </div>

                            {/* Transparent Product Image sitting directly on the pedestal */}
                            <img
                              src={secondProduct.image}
                              alt={`${secondProduct.name} ${secondProduct.nameAccent}`}
                              className="relative z-10 max-h-56 sm:max-h-60 xl:max-h-64 w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105 select-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card 3: Right Peeking Product */}
                    {nextProduct && totalProducts > 2 && (
                      <div
                        onClick={() => handleNext(section.id, totalProducts)}
                        className="hidden lg:flex flex-col justify-between shrink-0 w-[140px] xl:w-[175px] 2xl:w-[210px] -mr-6 xl:-mr-10 2xl:-mr-14 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xl p-3 sm:p-4 cursor-pointer hover:bg-white/95 hover:shadow-2xl transition-all duration-300 opacity-70 hover:opacity-100 group overflow-hidden relative select-none"
                        title={`View Next: ${nextProduct.name} ${nextProduct.nameAccent || ''}`}
                      >
                        {/* Ambient Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-xl pointer-events-none" />

                        {/* Top Badge */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[9px] tracking-wider uppercase rounded shadow-xs">
                            {nextProduct.modelsCount}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            {nextProductIndex + 1}/{totalProducts}
                          </span>
                        </div>

                        {/* Machine on Pedestal */}
                        <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center">
                          <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="absolute bottom-1 inset-x-2 h-7 bg-red-400/25 rounded-[100%] blur-sm pointer-events-none" />
                            <div className="absolute bottom-2 inset-x-3 h-4 bg-gradient-to-b from-white via-slate-100 to-rose-100 rounded-[100%] border border-red-200 shadow-sm pointer-events-none" />
                            <img
                              src={nextProduct.image}
                              alt={`${nextProduct.name} ${nextProduct.nameAccent || ''}`}
                              className="relative z-10 max-h-32 xl:max-h-40 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-center mt-2">
                            <div className="text-[11px] font-black text-slate-800 tracking-tight truncate">
                              {nextProduct.name} <span className="text-red-600">{nextProduct.nameAccent}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Hint */}
                        <div className="relative z-10 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors text-[10px] font-bold">
                          <span>NEXT</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Pagination Dots with Active Red Pill */}
                  <div className="flex items-center justify-center space-x-2 mt-6 sm:mt-8">
                    {section.products.map((p, pIdx) => {
                      const isActive = pIdx === currentIndex
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSetIndex(section.id, pIdx)}
                          aria-label={`Go to ${p.name}`}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            isActive
                              ? 'w-7 h-2 bg-red-600 shadow-sm shadow-red-500/50'
                              : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </section>

      {/* FULLSCREEN ZOOM MODAL */}
      {zoomItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider">
                  {zoomItem.modelsCount} • {zoomItem.subtitle}
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-0.5">
                  {zoomItem.name} {zoomItem.nameAccent}
                </h3>
              </div>
              <button
                onClick={() => setZoomItem(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[320px] max-h-[60vh] overflow-hidden border border-slate-100">
              <img
                src={zoomItem.image}
                alt={`${zoomItem.name} ${zoomItem.nameAccent}`}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-500">{zoomItem.description}</p>
              <div className="flex items-center space-x-2 shrink-0">
                <Link
                  to={zoomItem.link}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  View Product Page
                </Link>
                <button
                  onClick={() => {
                    openQuoteModal(zoomItem.quoteInquiry)
                    setZoomItem(null)
                  }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShowroomSolutionsSection
