import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  Box,
  Settings,
  Layers,
  Headphones,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { industriesServed } from '../data/siteConfig'
import { PromoBannerSlider } from '../components/PromoBannerSlider'
import { ShowroomSolutionsSection } from '../components/ShowroomSolutionsSection'
import { NewTo3DPrintingSection } from '../components/NewTo3DPrintingSection'

export const HomePage: React.FC = () => {
  const { openQuoteModal } = useApp()

  const slides = [
    {
      id: 1,
      image: '/hero-banner-1.png',
      alt: 'Next Generation 3D Solutions — Leniva CAD Solutions',
      title: 'Next Generation 3D Solutions',
      subtitle: 'Powering Creativity, Enabling Industry',
      tag: 'Design • Prototype • Manufacture',
      badge: 'Full Additive Ecosystem',
      primaryBtnText: 'Explore 3D Printers',
      primaryBtnLink: '/products',
      secondaryBtnText: 'Request Quote',
      quoteSubject: 'Next Generation 3D Solutions Consultation',
    },
    {
      id: 2,
      image: '/hero-banner-2.png',
      alt: 'Industrial Grade Precision Performance Possibilities — Leniva CAD Solutions',
      title: 'Precision, Performance, Possibilities',
      subtitle: 'Large Ideas, Bigger Possibilities',
      tag: 'Industrial Grade 3D Technologies',
      badge: 'Full Additive Ecosystem',
      primaryBtnText: 'Explore Our Range',
      primaryBtnLink: '/products',
      secondaryBtnText: 'Request a Demo',
      quoteSubject: 'Industrial Grade 3D Solutions Consultation',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  return (
    <div className="space-y-6 sm:space-y-8 pb-8 sm:pb-10">
      {/* ====================================================
          SECTION 1: HERO SHOWCASE CAROUSEL BANNER (WHITE BACKGROUND)
         ==================================================== */}
      <section 
        className="relative bg-white text-slate-900 pt-1 pb-2 lg:pb-3 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Main Panoramic Hero Showcase Carousel with Curved Edges */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
            {/* Slides container with exact 3:1 HD banner aspect ratio */}
            <div className="relative w-full aspect-[1024/341] bg-white">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={`${slide.image}?v=hd_master_2`}
                      alt={slide.alt}
                      className="w-full h-full object-contain bg-white"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      style={{
                        imageRendering: 'auto',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Left & Right Arrow Navigation Controls */}
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200/80 flex items-center justify-center backdrop-blur-md transition-all opacity-85 hover:opacity-100 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots at Bottom Center */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentSlide
                      ? 'w-7 h-2 bg-red-600 shadow-sm shadow-red-500/50'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Headline & Quick CTAs below the banner based on active slide */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>{slides[currentSlide].tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-snug">
                {slides[currentSlide].title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-slate-700">
                  — {slides[currentSlide].subtitle}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Industrial FDM, DLP, LCD & SLA 3D printing systems, high-precision metrology scanning, reverse engineering, and Trimble / Chaos certified software across India.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to={slides[currentSlide].primaryBtnLink}
                className="w-full px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>{slides[currentSlide].primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => openQuoteModal(slides[currentSlide].quoteSubject)}
                  className="flex-1 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all text-center cursor-pointer"
                >
                  {slides[currentSlide].secondaryBtnText}
                </button>
                <button
                  onClick={() => openQuoteModal('Talk to an Expert')}
                  className="flex-1 px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Talk to Expert</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
      {/* ====================================================
          SECTION 2: IDEAS TODAY / REAL SOLUTIONS TOMORROW
          EXACT REPLICA OF USER DESIGN MOCKUP
         ==================================================== */}
      <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="relative rounded-3xl bg-slate-50/70 p-5 sm:p-7 lg:p-8 border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Ambient subtle light glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

          {/* Upper Row: Left Pitch + Middle 4 Cards in 2x2 Grid + Right Machine Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 xl:gap-6 items-center relative z-10">
            {/* 1. Left Column: Typography & Explore Our Solutions Button (lg:col-span-4 xl:col-span-3.5) */}
            <div className="lg:col-span-4 xl:col-span-3.5 space-y-3">
              <div className="w-8 h-1 bg-red-600 rounded-full" />
              <div className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-slate-800">
                ENGINEERING BEYOND LIMITS
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[34px] xl:text-[38px] font-black tracking-tight leading-[1.08] text-slate-950">
                IDEAS TODAY <br />
                <span className="text-red-600">REAL SOLUTIONS</span> <br />
                TOMORROW
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
                From 3D scanning to CAD, from prototyping to production — we empower industries with end-to-end 3D solutions.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openQuoteModal('Explore Our Solutions')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all group cursor-pointer"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* 2. Middle Column: 4 Cards — Continuous Auto-Scrolling Marquee (lg:col-span-5 xl:col-span-5.5) */}
            <div className="lg:col-span-5 xl:col-span-5.5 flex flex-col justify-center">
              {/* Overflow mask with soft fade edges */}
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                }}
              >
                {/* Scrolling inner track — cards duplicated for seamless loop */}
                <div className="flex gap-3 animate-marquee-cards" style={{ width: 'max-content' }}>
                  {/* ── Set A ── */}
                  {/* Card 01 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200/70 flex items-center justify-center text-red-600">
                          <Box className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">01</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors mt-2.5 leading-snug">Professional Technology</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Industrial-grade FDM, SLA, DLP additive platforms and Trimble / Chaos software.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-red-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Professional Technology Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-red-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 02 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">02</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-2.5 leading-snug">Engineering Expertise</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Application engineers guiding material choice, DfAM, and parametric reconstruction.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-blue-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Engineering Expertise Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-blue-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 03 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600">
                          <Layers className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">03</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mt-2.5 leading-snug">End-to-End Solutions</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">From optical 3D scanning and CAD modeling to contract batch manufacturing and QC.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-emerald-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('End-to-End Solutions Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-emerald-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 04 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">04</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-2.5 leading-snug">Technical Support</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Dedicated warranty, calibration, machine commissioning, and corporate team training.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-amber-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Technical Support Inquiry')} className="text-[11px] font-bold text-slate-800 hover:text-amber-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* ── Set B (duplicate for seamless loop) ── */}
                  {/* Card 01 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200/70 flex items-center justify-center text-red-600">
                          <Box className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">01</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors mt-2.5 leading-snug">Professional Technology</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Industrial-grade FDM, SLA, DLP additive platforms and Trimble / Chaos software.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-red-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Professional Technology Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-red-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 02 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">02</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-2.5 leading-snug">Engineering Expertise</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Application engineers guiding material choice, DfAM, and parametric reconstruction.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-blue-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Engineering Expertise Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-blue-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 03 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-600">
                          <Layers className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">03</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mt-2.5 leading-snug">End-to-End Solutions</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">From optical 3D scanning and CAD modeling to contract batch manufacturing and QC.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-emerald-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('End-to-End Solutions Consultation')} className="text-[11px] font-bold text-slate-800 hover:text-emerald-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                  {/* Card 04 */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" style={{ minWidth: '210px', maxWidth: '210px' }}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600">
                          <Headphones className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">04</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-2.5 leading-snug">Technical Support</h3>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-2">Dedicated warranty, calibration, machine commissioning, and corporate team training.</p>
                    </div>
                    <div>
                      <div className="w-6 h-0.5 bg-amber-500 rounded-full mt-3 mb-2" />
                      <button onClick={() => openQuoteModal('Technical Support Inquiry')} className="text-[11px] font-bold text-slate-800 hover:text-amber-600 inline-flex items-center space-x-1 group/btn cursor-pointer">
                        <span>Learn More</span><ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Right Column: Pratham 6.0 3D Printer & Precision Parts (lg:col-span-3 xl:col-span-3) */}
            <div className="lg:col-span-3 xl:col-span-3 flex items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src="/images/showcase/pratham-showcase.png?v=pratham6"
                  alt="Pratham 6.0 Industrial 3D Printer - From Concept to Creation"
                  className="w-full h-auto max-h-[270px] object-contain drop-shadow-lg hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* ====================================================
          SECTION 6: COMPANY INTRODUCTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-1">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
              — ABOUT US —
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-950 tracking-tight leading-tight">
              Your Partner for <br />
              <span className="text-red-600">Advanced 3D Solutions</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Leniva CAD Solutions is a trusted supplier and solutions provider of 3D printers, 3D scanners, CAD software and related accessories. We bring global technologies to help industries, businesses and educational institutions adopt advanced 3D solutions for design, prototyping and production.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-800 pt-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>3D Printers (Global Brands)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>3D Scanners (Professional)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>Licensed CAD Software</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>Accessories & Consumables</span>
              </div>
              <div className="flex items-center space-x-2 sm:col-span-2">
                <span className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                <span>Expert Guidance & Field Support</span>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <Link
                to="/services"
                className="px-6 py-3 bg-slate-950 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Explore Solutions
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
              <img
                src="/images/about/about-leniva-poster.jpg"
                alt="Leniva CAD Solutions — Your Partner for Advanced 3D Solutions"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-200 hidden sm:block">
              <div className="text-xl font-black text-slate-950">PAN-India</div>
              <div className="text-[11px] text-slate-500 font-medium">Installation & Field Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          PROMO BANNER SLIDER SECTION
         ==================================================== */}
      <PromoBannerSlider />

      {/* ====================================================
          SECTION 8: 3D PRINTING SOLUTIONS SHOWROOM SHOWCASE
          ALL 4 PRODUCT SECTIONS DISPLAYED ONE BELOW ANOTHER
          EXACT REPLICA OF USER REFERENCE DESIGN (media_1790242733055.png)
         ==================================================== */}
      <ShowroomSolutionsSection />

      {/* ====================================================
          SECTION 9: NEW TO 3D PRINTING? ROADMAP (3 CARDS STYLE AUTO-SLIDER)
         ==================================================== */}
      <NewTo3DPrintingSection />



      {/* ====================================================
          INDUSTRIES WE EMPOWER (CONTINUOUS SLIDING MARQUEE)
         ==================================================== */}
      <section className="w-full overflow-hidden py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-5 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 font-mono">
            Cross-Sector Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
            Industries We Empower
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Delivering tailored additive manufacturing, metrology scanning, and parametric CAD workflows across diverse engineering verticals.
          </p>
        </div>

        {/* Continuous Horizontal Sliding Track */}
        <div className="relative w-full overflow-hidden">
          {/* Subtle Left & Right Edge Fade Gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee Flex Track (Cards cloned for seamless 100% infinite loop) */}
          <div className="flex w-max animate-marquee-cards space-x-5 py-3 px-4">
            {[...industriesServed, ...industriesServed].map((ind, idx) => (
              <div
                key={`${ind.name}-${idx}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-300 hover:-translate-y-1 transition-all select-none flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Sector 0{((idx % industriesServed.length) + 1)}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {ind.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-red-600">
                  <span>Explore Solutions</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          BOTTOM HIGH-IMPACT CTA STRIP
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 text-center space-y-4 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Collaborate with Leniva</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Accelerate Your Design & Manufacturing Workflow?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Consult with our application engineers for custom equipment configurations, CAD licensing, or rapid contract manufacturing quotes.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => openQuoteModal('Bottom CTA - Start Project')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              Request a Project Quote
            </button>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl transition-all"
            >
              Contact Our Engineers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default HomePage
