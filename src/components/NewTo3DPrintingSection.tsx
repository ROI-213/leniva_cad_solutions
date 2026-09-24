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
  const [selectedZoomImg, setSelectedZoomImg] = useState<{ src: string; title: string } | null>(null)
  const [showFullBannerModal, setShowFullBannerModal] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0.2)
  const [manualOffset, setManualOffset] = useState(0)

  // Track scroll position: as user scrolls DOWN, the track glides smoothly to the RIGHT
  useEffect(() => {
    let animFrame: number

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const totalDistance = windowHeight + rect.height
        const currentDistance = windowHeight - rect.top
        const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1)
        setScrollProgress(progress)
      }
    }

    const throttledScroll = () => {
      cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  const nextSlide = useCallback(() => {
    setManualOffset(prev => prev + 280)
  }, [])

  const prevSlide = useCallback(() => {
    setManualOffset(prev => prev - 280)
  }, [])

  // Calculate total translation: scroll down moves to the RIGHT
  const totalTranslateX = (scrollProgress - 0.25) * 580 + manualOffset

  // Jump to specific card by index
  const jumpToCard = (index: number) => {
    // Center the chosen card
    setManualOffset(-index * 420 + 200)
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#f8fafc] via-[#f0f7ff]/40 to-[#e2e8f0]/40 py-16 sm:py-24 border-y border-slate-200/80 overflow-hidden"
    >
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

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ====================================================
            SECTION HEADER (EXACT REPLICA OF THE 1ST REFERENCE IMAGE)
           ==================================================== */}
        <div className="relative mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Bracket Tag: ADVANCED 3D PRINTING SOLUTIONS */}
            <div className="hidden md:flex items-center space-x-2.5">
              <div className="w-1.5 h-11 border-l-2 border-t-2 border-b-2 border-blue-500/70 rounded-l-xs" />
              <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase leading-snug">
                <div>ADVANCED</div>
                <div>3D PRINTING</div>
                <div>SOLUTIONS</div>
              </div>
            </div>

            {/* Center Header Details */}
            <div className="text-center space-y-1.5 max-w-2xl mx-auto">
              <div className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                EXPLORE &nbsp;|&nbsp; LEARN &nbsp;|&nbsp; CREATE
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                New to <span className="text-blue-600">3D Printing?</span> This Is the Place to Start
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-500 font-normal leading-relaxed pt-1">
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
              <div className="w-1.5 h-11 border-r-2 border-t-2 border-b-2 border-blue-500/70 rounded-r-xs" />
            </div>
          </div>

          {/* Quick Controls Bar */}
          <div className="flex items-center justify-center space-x-3 mt-5">
            <button
              onClick={() => setShowFullBannerModal(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              title="View full 5-card panoramic banner"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
              <span>View Full Master Banner</span>
            </button>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50/80 border border-blue-200/80 rounded-lg text-xs font-semibold text-blue-700">
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Scroll down to glide through roadmap →</span>
            </div>
          </div>
        </div>

        {/* ====================================================
            3 CARDS STYLE (ONE AFTER ANOTHER AUTO-SLIDER)
            PIXEL-PERFECT REPLICA OF THE 1ST REFERENCE IMAGE
            (NO NESTED BOXES, NO BLUE PILLS, 100% ULTRA-HD)
           ==================================================== */}
        <div className="relative">
          {/* Card Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Step"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Step"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-xl flex items-center justify-center transition-all cursor-pointer group hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Panoramic Horizontal Ribbon Track with Real-Time Scroll-to-Right Motion */}
          <div className="overflow-visible py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div
              className="flex items-stretch gap-6 sm:gap-8 will-change-transform transition-transform duration-200 ease-out"
              style={{
                transform: `translateX(${totalTranslateX}px)`,
                width: 'max-content',
              }}
            >
              {guideCards.map((card) => {
                const HeaderIcon = card.headerIcon

                const cardContent = (
                  <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 h-full min-h-[500px]">
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
                    <div className="relative z-10">
                      <div className="flex items-center gap-3.5 mb-2.5">
                        {/* Step Pill */}
                        <span
                          className={`text-xs font-mono font-black px-2.5 py-1 rounded-full border ${card.accentBg} ${card.accentText} ${card.accentBorder} shadow-2xs`}
                        >
                          {card.step}
                        </span>

                        {/* Squircle Category Icon */}
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs ${card.accentBg} ${card.accentText} ${card.accentBorder}`}
                        >
                          <HeaderIcon className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed line-clamp-2 mt-2">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* 2. Middle Section: Seamless Product Floor (NO INNER BOXES!) + Clean Vector Bullets */}
                    <div className="relative z-10 my-4 flex items-center justify-between gap-4 flex-1">
                      {/* Left: Ultra-HD Product Photography sitting directly on the card */}
                      <div className="relative w-[56%] h-48 sm:h-52 flex items-center justify-center select-none">
                        <img
                          src={card.image}
                          alt={card.imageAlt}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Zoom Trigger Button */}
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

                      {/* Right: Clean Vector Bullet Points (Matching Reference Exactly) */}
                      <div className="w-[44%] flex flex-col justify-center space-y-3 pl-1">
                        {card.bullets.map(bullet => {
                          const BulletIcon = bullet.icon
                          return (
                            <div
                              key={bullet.label}
                              className="flex items-center space-x-2 text-slate-700 group/bullet"
                            >
                              <BulletIcon className="w-4 h-4 text-slate-500 group-hover/bullet:text-blue-600 shrink-0 transition-colors" />
                              <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-tight">
                                {bullet.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 3. Bottom: Full-Width Vibrant Pill Button */}
                    <div className="relative z-10 w-full pt-2">
                      <button
                        className="w-full py-3.5 px-6 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-[1.01] cursor-pointer"
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
                    <div key={card.id} className="w-[330px] sm:w-[380px] lg:w-[410px] shrink-0 h-full">
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
                  <div key={card.id} className="w-[330px] sm:w-[380px] lg:w-[410px] shrink-0 h-full">
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

          {/* Interactive 5-Step Indicators (Click to Center Any Step) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            {guideCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => jumpToCard(idx)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs hover:scale-105"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: card.accentColor }}
                />
                <span>Step {card.step}</span>
                <span className="hidden md:inline font-sans font-medium text-slate-400">
                  • {card.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ====================================================
            BOTTOM BANNER SIGNATURE (MATCHING ATTACHED IMAGE 1)
           ==================================================== */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 flex items-center justify-center">
          <div className="flex items-center space-x-4 text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-500 uppercase">
            <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-blue-500" />
            <span>INNOVATION TODAY &nbsp;|&nbsp; A BRIGHTER TOMORROW</span>
            <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-blue-500" />
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
