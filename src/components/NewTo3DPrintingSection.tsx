import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  ArrowRight,
  GraduationCap,
  Car,
  Plane,
  HeartPulse,
  Factory,
  Settings,
  Droplet,
  Box,
  Sliders,
  Sparkles,
  Square,
  Lightbulb,
  PenTool,
  Cog,
  Cpu,
  Headphones,
  Award,
  Wrench,
  Compass,
  Users,
  Zap,
  TrendingUp,
  Workflow,
  LucideIcon,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export interface CardBulletItem {
  label: string
  icon: LucideIcon
}

export interface GuideStepCard {
  id: number
  step: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
  headerIcon: LucideIcon
  accentColor: string
  accentBg: string
  accentText: string
  accentBorder: string
  glowGradient: string
  ctaText: string
  bullets: CardBulletItem[]
  linkTo?: string
  quoteInquiry?: string
}

const guideCards: GuideStepCard[] = [
  {
    id: 1,
    step: '01',
    title: 'Learn 3D Printing Applications',
    subtitle: 'Explore real-world applications across automotive, aerospace, healthcare, education and more.',
    image: '/images/products/pratham-3-0.png',
    imageAlt: 'Pratham 3.0 Industrial 3D Printer Applications',
    headerIcon: GraduationCap,
    accentColor: '#dc2626',
    accentBg: 'bg-red-50',
    accentText: 'text-red-600',
    accentBorder: 'border-red-200',
    glowGradient: 'from-red-500/15 via-red-500/5 to-transparent',
    ctaText: 'Explore Applications',
    linkTo: '/applications',
    bullets: [
      { label: 'Automotive', icon: Car },
      { label: 'Aerospace', icon: Plane },
      { label: 'Healthcare', icon: HeartPulse },
      { label: 'Education', icon: GraduationCap },
      { label: 'Manufacturing', icon: Factory },
    ],
  },
  {
    id: 2,
    step: '02',
    title: 'Choose the Right Materials & Accessories',
    subtitle: 'High-performance filaments, resins and accessories for every project.',
    image: '/images/products/materials-spools-hd.jpg',
    imageAlt: 'Engineering Filaments, Resins and 3D Printing Accessories',
    headerIcon: Settings,
    accentColor: '#2563eb',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-200',
    glowGradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    ctaText: 'View Materials',
    linkTo: '/materials',
    bullets: [
      { label: 'Filaments', icon: Box },
      { label: 'Resins', icon: Droplet },
      { label: 'Accessories', icon: Sliders },
      { label: 'Spare Parts', icon: Sparkles },
      { label: 'Build Plates', icon: Square },
    ],
  },
  {
    id: 3,
    step: '03',
    title: 'Turn Your Ideas into Reality',
    subtitle: 'From concept to prototype, bring your ideas to life with reliable 3D printing technology.',
    image: '/images/products/pratham-desktop.png',
    imageAlt: 'Pratham Desktop 3D Printer Prototyping',
    headerIcon: Lightbulb,
    accentColor: '#059669',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-200',
    glowGradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    ctaText: 'Start Creating',
    linkTo: '/services',
    quoteInquiry: 'Turn Ideas into Reality - Prototyping & Custom Project Inquiry',
    bullets: [
      { label: 'Prototyping', icon: Sparkles },
      { label: 'Product Design', icon: PenTool },
      { label: 'Functional Parts', icon: Cog },
      { label: 'Custom Solutions', icon: Cpu },
      { label: 'Research & Education', icon: GraduationCap },
    ],
  },
  {
    id: 4,
    step: '04',
    title: 'Get Expert Support',
    subtitle: 'Our team is here to help with installation, training, maintenance and application guidance.',
    image: '/images/products/pratham-x.png',
    imageAlt: 'Pratham X Large-Format Industrial 3D Printer Support',
    headerIcon: Headphones,
    accentColor: '#4f46e5',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-600',
    accentBorder: 'border-indigo-200',
    glowGradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    ctaText: 'Get Support',
    linkTo: '/contact',
    quoteInquiry: 'Expert Technical Support, Maintenance & Training Inquiry',
    bullets: [
      { label: 'Installation & Training', icon: Award },
      { label: 'Maintenance & AMC', icon: Wrench },
      { label: 'Application Guidance', icon: Compass },
      { label: 'Technical Support', icon: Headphones },
      { label: 'Consult Our Experts', icon: Users },
    ],
  },
  {
    id: 5,
    step: '05',
    title: 'Scale Your Business with 3D Printing',
    subtitle: 'End-to-end solutions for startups, businesses and institutions.',
    image: '/images/products/eka-ht.png',
    imageAlt: 'Eka HT Industrial Resin 3D Printer Enterprise Scaling',
    headerIcon: TrendingUp,
    accentColor: '#ea580c',
    accentBg: 'bg-orange-50',
    accentText: 'text-orange-600',
    accentBorder: 'border-orange-200',
    glowGradient: 'from-orange-500/15 via-orange-500/5 to-transparent',
    ctaText: 'Grow With Us',
    linkTo: '/contact',
    quoteInquiry: 'Scale Your Business - Enterprise 3D Printing Solutions',
    bullets: [
      { label: 'High Productivity', icon: Zap },
      { label: 'Industrial Grade', icon: Award },
      { label: 'Custom Workflows', icon: Workflow },
      { label: 'Scalable Solutions', icon: TrendingUp },
      { label: 'Partner With Us', icon: Users },
    ],
  },
]

export const NewTo3DPrintingSection: React.FC = () => {
  const { openQuoteModal } = useApp()
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [selectedZoomImg, setSelectedZoomImg] = useState<{ src: string; title: string } | null>(null)
  const [showFullBannerModal, setShowFullBannerModal] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  // Scroll-tied horizontal track animation:
  // When scrolling DOWN, this section stays pinned, and the cards track glides to the LEFT.
  // Once the end of the cards is reached, the pinning releases and scrolling continues DOWN.
  useEffect(() => {
    let animFrame: number

    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const headerOffset = window.innerWidth >= 1024 ? 100 : 85
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight
      const stickyHeight = windowHeight - headerOffset
      const scrollableDistance = sectionHeight - stickyHeight

      if (scrollableDistance <= 0) return

      // Distance scrolled past the pinning point
      const scrolled = headerOffset - rect.top
      const rawProgress = scrolled / scrollableDistance
      const p = Math.min(1, Math.max(0, rawProgress))

      // Total track scrollable width
      const trackScrollWidth = trackRef.current.scrollWidth
      const containerWidth = trackRef.current.parentElement?.clientWidth || window.innerWidth
      const maxTranslate = Math.max(0, trackScrollWidth - containerWidth + 48)

      // Scrolling down moves the track to the LEFT
      const translateX = p * maxTranslate
      trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`

      setProgress(p)
      setActiveStep(Math.min(guideCards.length - 1, Math.floor(p * guideCards.length)))
    }

    const onScroll = () => {
      cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  const nextSlide = useCallback(() => {
    if (!sectionRef.current) return
    const headerOffset = window.innerWidth >= 1024 ? 100 : 85
    const stickyHeight = window.innerHeight - headerOffset
    const scrollableDistance = sectionRef.current.offsetHeight - stickyHeight
    const step = scrollableDistance / (guideCards.length - 1)
    window.scrollBy({ top: step, behavior: 'smooth' })
  }, [])

  const prevSlide = useCallback(() => {
    if (!sectionRef.current) return
    const headerOffset = window.innerWidth >= 1024 ? 100 : 85
    const stickyHeight = window.innerHeight - headerOffset
    const scrollableDistance = sectionRef.current.offsetHeight - stickyHeight
    const step = scrollableDistance / (guideCards.length - 1)
    window.scrollBy({ top: -step, behavior: 'smooth' })
  }, [])

  const jumpToCard = (index: number) => {
    if (!sectionRef.current) return
    const headerOffset = window.innerWidth >= 1024 ? 100 : 85
    const stickyHeight = window.innerHeight - headerOffset
    const scrollableDistance = sectionRef.current.offsetHeight - stickyHeight
    const targetProgress = index / (guideCards.length - 1)
    const sectionTopAbs = window.scrollY + sectionRef.current.getBoundingClientRect().top
    const targetScrollY = sectionTopAbs - headerOffset + (targetProgress * scrollableDistance)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#f8fafc] via-[#f0f7ff]/40 to-[#e2e8f0]/40 border-y border-slate-200/80"
      style={{ height: '220vh' }}
    >
      {/* Sticky Viewport Stage: Pinned as user scrolls down through the 320vh height */}
      <div className="sticky top-[75px] sm:top-[90px] lg:top-[100px] h-[calc(100vh-75px)] sm:h-[calc(100vh-90px)] lg:h-[calc(100vh-100px)] max-h-[940px] flex flex-col justify-between py-3 sm:py-5 overflow-hidden z-20">
        {/* Subtle technical background grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient background glows matching design */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-between h-full">
          {/* ====================================================
              SECTION HEADER
             ==================================================== */}
          <div className="relative shrink-0 mb-2 sm:mb-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
              {/* Left Bracket Tag: ADVANCED 3D PRINTING SOLUTIONS */}
              <div className="hidden md:flex items-center space-x-2.5">
                <div className="w-1.5 h-10 border-l-2 border-t-2 border-b-2 border-blue-500/70 rounded-l-xs" />
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-snug">
                  <div>ADVANCED</div>
                  <div>3D PRINTING</div>
                  <div>SOLUTIONS</div>
                </div>
              </div>

              {/* Center Header Details */}
              <div className="text-center space-y-1 max-w-2xl mx-auto">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  EXPLORE &nbsp;|&nbsp; LEARN &nbsp;|&nbsp; CREATE
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                  New to <span className="text-blue-600">3D Printing?</span> This Is the Place to Start
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  Discover industry-grade machines, applications and materials — all in one place.
                </p>
              </div>

              {/* Right Bracket Tag: FROM IDEAS TO REAL-WORLD IMPACT */}
              <div className="hidden md:flex items-center space-x-2.5">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-snug text-right">
                  <div>FROM IDEAS</div>
                  <div>TO REAL-WORLD</div>
                  <div>IMPACT</div>
                </div>
                <div className="w-1.5 h-10 border-r-2 border-t-2 border-b-2 border-blue-500/70 rounded-r-xs" />
              </div>
            </div>

            {/* Quick Controls & Real-Time Progress Bar */}
            <div className="flex items-center justify-center space-x-3 mt-3">
              <button
                onClick={() => setShowFullBannerModal(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
                title="View full 5-card panoramic banner"
              >
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">View Full Master Banner</span>
                <span className="sm:hidden">Full Banner</span>
              </button>

              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50/90 border border-blue-200/90 rounded-lg text-xs font-semibold text-blue-700">
                <div className="w-20 sm:w-28 h-1.5 bg-blue-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-75"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <span>Step 0{activeStep + 1} of 05</span>
                <span className="hidden sm:inline text-blue-500 font-normal">({Math.round(progress * 100)}%)</span>
              </div>
            </div>
          </div>

          {/* ====================================================
              3 CARDS STYLE HORIZONTAL TRACK (TRANSLATES TO LEFT ON SCROLL DOWN)
             ==================================================== */}
          <div className="relative flex-1 flex items-center my-auto min-h-0">
            {/* Card Navigation Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous Step"
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Step"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Horizontal Track Wrapper */}
            <div className="w-full overflow-hidden py-2 px-2 sm:px-4">
              <div
                ref={trackRef}
                className="flex items-stretch gap-5 sm:gap-7 will-change-transform"
                style={{
                  width: 'max-content',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                {guideCards.map((card) => {
                  const HeaderIcon = card.headerIcon

                  const cardContent = (
                    <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 h-[420px] sm:h-[450px] lg:h-[470px]">
                      {/* Top Colored Accent Line */}
                      <div
                        className="absolute top-0 inset-x-0 h-1.5 w-full"
                        style={{ backgroundColor: card.accentColor }}
                      />

                      {/* Top Subtle Aura Glow Matching Theme Color */}
                      <div
                        className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${card.glowGradient} rounded-full blur-2xl pointer-events-none -mr-16 -mt-16`}
                      />

                      {/* 1. Header: Step Number, Squircle Icon, Title, and Subtitle */}
                      <div className="relative z-10 shrink-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`text-xs font-mono font-black px-2.5 py-1 rounded-full border ${card.accentBg} ${card.accentText} ${card.accentBorder} shadow-2xs`}
                          >
                            {card.step}
                          </span>

                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border shadow-xs ${card.accentBg} ${card.accentText} ${card.accentBorder}`}
                          >
                            <HeaderIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors truncate">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* 2. Middle Section: Seamless Product Floor + Bullets */}
                      <div className="relative z-10 my-2 flex items-center justify-between gap-3 flex-1 min-h-0">
                        <div className="relative w-[54%] h-36 sm:h-44 flex items-center justify-center select-none">
                          <img
                            src={card.image}
                            alt={card.imageAlt}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                          />

                          <button
                            type="button"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              setSelectedZoomImg({ src: card.image, title: card.title })
                            }}
                            className="absolute bottom-1 right-1 w-6 h-6 rounded-md bg-slate-900/60 hover:bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm z-20"
                            title="View Full Resolution Asset"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="w-[46%] flex flex-col justify-center space-y-2 sm:space-y-2.5 pl-1">
                          {card.bullets.map(bullet => {
                            const BulletIcon = bullet.icon
                            return (
                              <div
                                key={bullet.label}
                                className="flex items-center space-x-1.5 sm:space-x-2 text-slate-700 group/bullet"
                              >
                                <BulletIcon className="w-3.5 h-3.5 text-slate-500 group-hover/bullet:text-blue-600 shrink-0 transition-colors" />
                                <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight truncate">
                                  {bullet.label}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* 3. Bottom: Full-Width Vibrant Pill Button */}
                      <div className="relative z-10 w-full pt-2 shrink-0">
                        <button
                          className="w-full py-2.5 sm:py-3 px-4 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-[1.01] cursor-pointer"
                          style={{ backgroundColor: card.accentColor }}
                        >
                          <span>{card.ctaText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  )

                  if (card.linkTo) {
                    return (
                      <div key={card.id} className="w-[320px] sm:w-[370px] lg:w-[400px] shrink-0 h-full">
                        <Link
                          to={card.linkTo}
                          className="block cursor-pointer focus:outline-hidden h-full"
                        >
                          {cardContent}
                        </Link>
                      </div>
                    )
                  }

                  return (
                    <div key={card.id} className="w-[320px] sm:w-[370px] lg:w-[400px] shrink-0 h-full">
                      <div
                        onClick={() => openQuoteModal(card.quoteInquiry || card.title)}
                        className="cursor-pointer focus:outline-hidden h-full"
                      >
                        {cardContent}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Interactive 5-Step Indicators (Click to Jump Directly to Any Step) */}
          <div className="shrink-0 pt-2 pb-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
              {guideCards.map((card, idx) => {
                const isCurrent = idx === activeStep
                return (
                  <button
                    key={card.id}
                    onClick={() => jumpToCard(idx)}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 border shadow-xs ${
                      isCurrent
                        ? `${card.accentBg} ${card.accentText} ${card.accentBorder} ring-2 ring-blue-400/40 shadow-sm scale-105`
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span>Step {card.step}</span>
                    <span className="hidden md:inline font-sans font-medium text-slate-400">
                      • {card.title.split(' ')[0]}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-blue-400" />
                <span>INNOVATION TODAY &nbsp;|&nbsp; A BRIGHTER TOMORROW</span>
                <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          HD SINGLE CARD ZOOM LIGHTBOX MODAL
         ==================================================== */}
      {selectedZoomImg && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedZoomImg(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {selectedZoomImg.title} — Ultra HD Product Asset
              </h3>
              <button
                onClick={() => setSelectedZoomImg(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center overflow-hidden max-h-[70vh]">
              <img
                src={selectedZoomImg.src}
                alt={selectedZoomImg.title}
                className="max-h-[65vh] w-auto object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Retina High-Definition Product Studio Asset</span>
              <button
                onClick={() => setSelectedZoomImg(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          FULL HD MASTER BANNER LIGHTBOX MODAL
         ==================================================== */}
      {showFullBannerModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowFullBannerModal(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Full Master Banner: New to 3D Printing?</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Original high-definition 5-card comprehensive layout roadmap
                </p>
              </div>
              <button
                onClick={() => setShowFullBannerModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src="/images/banners/new-to-3d-printing-banner.png"
                alt="New to 3D Printing Full Banner"
                className="w-full h-auto max-h-[65vh] object-contain drop-shadow-xl"
              />
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowFullBannerModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
