import React, { useState, useRef } from 'react'
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
  Heart,
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
  // 1. FDM 3D PRINTING (All FDM Products)
  {
    id: 'fdm',
    categoryTag: 'EXPLORE OUR',
    titlePrimary: 'FDM 3D PRINTING',
    titleAccent: 'TECHNOLOGY',
    subtitle: 'Industrial-grade FDM 3D printers for functional prototyping, production tooling and large-format manufacturing.',
    catalogLink: '/products/fdm-3d-printers',
    catalogText: 'View All FDM Printers',
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
        modelsCount: '600 × 600 × 600 mm',
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
        id: 'pratham-5-0',
        name: 'Pratham',
        nameAccent: '5.0',
        subtitle: 'Enclosed Engineering FDM',
        description: 'Heated chamber industrial 3D printing engineered for ABS, PC, Nylon and carbon composites.',
        modelsCount: '500 × 500 × 500 mm',
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
        modelsCount: '300 × 300 × 300 mm',
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
        id: 'pratham-mini',
        name: 'Pratham',
        nameAccent: 'Mini',
        subtitle: 'Compact Learning & Prototyping FDM',
        description: 'Compact educational and lab 3D printing system with flexible magnetic PEI bed and quiet motor drivers.',
        modelsCount: '170 × 170 × 170 mm',
        badgeLabel: 'Compact Series',
        image: '/images/products/pratham-mini.png',
        link: '/products/pratham-mini',
        quoteInquiry: 'Pratham Mini FDM Inquiry',
        features: [
          { icon: Sparkles, label: 'Flexible Magnetic PEI' },
          { icon: Target, label: '0.1mm Precision Layer' },
          { icon: ShieldCheck, label: 'Power-Loss Resume' },
        ],
      },
      {
        id: 'pratham-desktop',
        name: 'Pratham',
        nameAccent: 'Desktop',
        subtitle: 'Compact Industrial Platform',
        description: 'High-accuracy desktop industrial printing tailored for design studios, labs and universities.',
        modelsCount: '200 × 200 × 250 mm',
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
      {
        id: 'pratham-x-600',
        name: 'Pratham',
        nameAccent: 'X (600 mm)',
        subtitle: 'Extra-Large Format FDM',
        description: 'Monolithic extra-large capacity engineered for flat body panels and sand tooling.',
        modelsCount: '1000 × 1000 × 600 mm',
        badgeLabel: 'Wide Footprint',
        image: '/images/products/pratham-x.png',
        link: '/products/pratham-x-600',
        quoteInquiry: 'Pratham X 600mm FDM Inquiry',
        features: [
          { icon: Box, label: '600 Liters Capacity' },
          { icon: Settings, label: 'Helical Rack & Pinion' },
          { icon: Flame, label: 'Multi-Zone Heated Bed' },
        ],
      },
      {
        id: 'pratham-x-1000',
        name: 'Pratham',
        nameAccent: 'X (1000 mm)',
        subtitle: '1 Cubic Meter Industrial Giant',
        description: 'Full 1-meter cubic envelope for monolithic manufacturing without sectioning.',
        modelsCount: '1000 × 1000 × 1000 mm',
        badgeLabel: '1 m³ Capacity',
        image: '/images/products/pratham-x.png',
        link: '/products/pratham-x',
        quoteInquiry: 'Pratham X 1000mm FDM Inquiry',
        features: [
          { icon: Box, label: '1,000 Liters (1 m³)' },
          { icon: Settings, label: 'Helical Rack & Pinion' },
          { icon: ShieldCheck, label: 'Industrial PLC Control' },
        ],
      },
      {
        id: 'pratham-3-rapid',
        name: 'Pratham',
        nameAccent: '3 Rapid',
        subtitle: 'High Speed Industrial 3D Printer',
        description: 'CoreXY kinematic system achieving speeds up to 500 mm/s with active vibration compensation.',
        modelsCount: '350 × 350 × 350 mm',
        badgeLabel: 'High Speed',
        image: '/images/products/pratham-3-rapid.png',
        link: '/products/pratham-3-rapid',
        quoteInquiry: 'Pratham 3 Rapid Inquiry',
        features: [
          { icon: Box, label: '350 × 350 × 350 mm' },
          { icon: Zap, label: '500 mm/s Rapid Output' },
          { icon: Flame, label: 'High-Flow Hotend' },
        ],
      },
    ],
  },

  // 2. RESIN-BASED 3D PRINTERS – ENGINEERING INDUSTRY (XLE, GT MAX)
  {
    id: 'resin-engineering',
    categoryTag: 'HIGH-PRECISION PHOTOPOLYMER',
    titlePrimary: 'Resin-Based 3D Printers',
    titleAccent: '– Engineering Industry',
    subtitle: 'Industrial DLP & LCD resin systems delivering tight dimensional tolerances for engineering prototypes and functional parts.',
    catalogLink: '/products/dlp-3d-printers',
    catalogText: 'Explore Engineering Resin Printers',
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
        description: 'High-speed, high-precision DLP printing for detailed functional engineering parts and R&D.',
        modelsCount: 'Engineering DLP',
        badgeLabel: 'Flagship Production',
        image: '/images/products/eka-xle.png',
        link: '/products/eka-xle',
        quoteInquiry: 'EKA XLE Production DLP Inquiry',
        features: [
          { icon: Sparkles, label: 'Micro-Fluidics Ready' },
          { icon: Flame, label: 'Active Heated Vat' },
          { icon: Settings, label: '±0.005mm Z Repeatability' },
        ],
      },
      {
        id: 'eka-gt-max',
        name: 'EKA',
        nameAccent: 'GT MAX',
        subtitle: '8K Industrial MSLA Resin Printer',
        description: 'High-resolution industrial MSLA system with 8K monochrome LCD and uniform parallel light collimation.',
        modelsCount: '8K Industrial LCD',
        badgeLabel: 'High Productivity',
        image: '/images/products/eka-gt-max.png',
        link: '/products/eka-gt-max',
        quoteInquiry: 'EKA GT MAX 8K MSLA Inquiry',
        features: [
          { icon: Sparkles, label: '8K Monochrome Screen' },
          { icon: Layers, label: 'Uniform UV Array' },
          { icon: Box, label: 'Large Build Envelope' },
        ],
      },
    ],
  },

  // 3. RESIN-BASED 3D PRINTERS – JEWELLERY (HT, XL, F1 16K)
  {
    id: 'resin-jewellery',
    categoryTag: 'FINE CASTING & ULTRA-RESOLUTION',
    titlePrimary: 'Resin-Based 3D Printers',
    titleAccent: '– Jewellery',
    subtitle: 'Ultra-high resolution DLP & LCD systems tailored for zero-ash direct investment casting and intricate jewellery masters.',
    catalogLink: '/products/dlp-3d-printers',
    catalogText: 'Explore Jewellery Resin Printers',
    accentColor: '#0284c7',
    badges: [
      { icon: Target, label: 'Down to 16K Precision' },
      { icon: Sparkles, label: 'Zero-Ash Burnout' },
      { icon: Zap, label: 'Fast Layer Curing' },
      { icon: TrendingUp, label: 'High Batch Yield' },
    ],
    products: [
      {
        id: 'eka-ht',
        name: 'EKA',
        nameAccent: 'HT',
        subtitle: 'Jewellery Direct Casting DLP',
        description: 'High-precision jewellery DLP printing with zero-ash burnout for gold and silver direct investment casting.',
        modelsCount: 'Jewellery DLP',
        badgeLabel: 'Direct Casting',
        image: '/images/products/eka-ht.png',
        link: '/products/eka-ht',
        quoteInquiry: 'EKA HT Jewellery DLP Inquiry',
        features: [
          { icon: Sparkles, label: '35 µm XY Resolution' },
          { icon: Flame, label: 'Zero Ash Wax Burnout' },
          { icon: Zap, label: 'Gentle Peeling Kinematics' },
        ],
      },
      {
        id: 'eka-xl',
        name: 'EKA',
        nameAccent: 'XL',
        subtitle: 'Large-Format Jewellery DLP',
        description: 'Expanded DLP build envelope engineered for large jewellery production batches, bangles, and statuettes.',
        modelsCount: 'Large Format DLP',
        badgeLabel: 'Batch Production',
        image: '/images/products/eka-xl.png',
        link: '/products/eka-xl',
        quoteInquiry: 'EKA XL Large-Format DLP Inquiry',
        features: [
          { icon: Box, label: 'Expanded Build Area' },
          { icon: Target, label: 'Telecentric Optical Lens' },
          { icon: ShieldCheck, label: 'Dual Ball-Screw Z-Axis' },
        ],
      },
      {
        id: 'eka-f1-16k',
        name: 'EKA',
        nameAccent: 'F1 16K',
        subtitle: '16K Ultra-Fine Resolution System',
        description: 'Groundbreaking 16K ultra-high resolution resin 3D printer delivering glass-smooth curves and invisible layer lines.',
        modelsCount: '16K Ultra-Dense Panel',
        badgeLabel: '16K Micro-Fidelity',
        image: '/images/products/eka-f1-16k.png',
        link: '/products/eka-f1-16k',
        quoteInquiry: 'EKA F1 16K Inquiry',
        features: [
          { icon: Target, label: 'Sub-20 µm Micro Pixels' },
          { icon: Zap, label: 'Rapid Layer Curing' },
          { icon: Settings, label: 'Micron Layer Consistency' },
        ],
      },
    ],
  },

  // 4. 3D SCANNERS (HIGHLIGHTED)
  {
    id: 'scanners',
    categoryTag: '★ HIGHLIGHTED SOLUTION — PRECISION METROLOGY',
    titlePrimary: '3D Scanners',
    titleAccent: 'Technology',
    subtitle: 'Metrology-grade optical, laser & infrared digitizing systems for inspection, CMM and reverse engineering.',
    catalogLink: '/products/3d-scanners',
    catalogText: 'Explore All 3D Scanners',
    accentColor: '#dc2626',
    badges: [
      { icon: Award, label: '0.015mm Accuracy' },
      { icon: Zap, label: 'Fast Acquisition' },
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
        modelsCount: '0.08 mm Accuracy',
        badgeLabel: 'Color 3D',
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
        modelsCount: '0.04 mm Accuracy',
        badgeLabel: 'Metrology Flagship',
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
        id: 'einstar',
        name: 'EINSTAR',
        nameAccent: '3D Scanner',
        subtitle: 'Handheld Structured Light Scanner',
        description: 'Portable, versatile handheld 3D scanner capturing high-density point clouds with true color texture.',
        modelsCount: 'Handheld 3D',
        badgeLabel: 'Portable',
        image: '/images/scanners/einstar.png',
        link: '/products/einscan',
        quoteInquiry: 'EINSTAR 3D Scanner Inquiry',
        isContain: true,
        features: [
          { icon: Eye, label: 'RGB Color Camera' },
          { icon: Target, label: 'Up to 0.1mm Point Distance' },
          { icon: Sparkles, label: 'Lightweight 0.5 kg' },
        ],
      },
    ],
  },
]

export const ShowroomSolutionsSection: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [zoomItem, setZoomItem] = useState<ShowcaseProductItem | null>(null)
  const trackRefs = useRef<{ [catId: string]: HTMLDivElement | null }>({})

  const scrollTrack = (catId: string, direction: 'left' | 'right') => {
    const el = trackRefs.current[catId]
    if (!el) return
    const scrollAmount = direction === 'left' ? -300 : 300
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <>
      <section id="showroom-solutions" className="w-full bg-white py-10 sm:py-16 border-y border-slate-200">
        <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {showcaseCategories.map((section, catIndex) => {
            const isScanners = section.id === 'scanners'

            return (
              <div
                key={section.id}
                id={`showcase-${section.id}`}
                className="w-full scroll-mt-24"
              >
                {/* Subtle Divider between categories */}
                {catIndex > 0 && (
                  <div className="border-t border-slate-200 mb-10 sm:mb-14" />
                )}

                {/* ====================================================
                    CATEGORY HEADER (matching Image 2)
                    Icon/Badge + Category Title + Total count | Catalog Link + Chevrons
                   ==================================================== */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      {isScanners && (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                          ★ Highlighted Solution
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                        {section.titlePrimary}{' '}
                        <span className="text-red-600">{section.titleAccent}</span>
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                        {section.products.length} Models Available
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl">
                      {section.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 self-end md:self-auto">
                    <Link
                      to={section.catalogLink}
                      className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center space-x-1 group"
                    >
                      <span>{section.catalogText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Compact Chevrons */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => scrollTrack(section.id, 'left')}
                        className="w-8 h-8 rounded-full bg-white hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Scroll Left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollTrack(section.id, 'right')}
                        className="w-8 h-8 rounded-full bg-white hover:bg-red-600 text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Scroll Right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ====================================================
                    HORIZONTAL PRODUCT TRACK (matching Image 2)
                    Feature Banner Card on Left + Small Vertical Product Cards
                   ==================================================== */}
                <div
                  ref={el => {
                    trackRefs.current[section.id] = el
                  }}
                  className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-none py-2 px-1 snap-x"
                >
                  {/* Left Spotlight / Feature Card (matching Image 2's feature card) */}
                  <div className="relative w-[260px] sm:w-[280px] shrink-0 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-sm snap-start border border-slate-800 group">
                    {/* Top Tag & Bullet Features */}
                    <div className="relative z-10 space-y-3">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-600 text-white font-mono font-bold text-[10px] tracking-wider uppercase shadow-2xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{section.categoryTag}</span>
                      </span>

                      <div className="space-y-2 pt-1">
                        {section.badges.map(b => (
                          <div
                            key={b.label}
                            className="flex items-center space-x-2 text-xs text-slate-300 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span className="truncate">{b.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Card Inset */}
                    <div className="relative z-10 mt-6 p-4 rounded-xl bg-white text-slate-900 space-y-2 shadow-md">
                      <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                        Leniva Showcase Series
                      </div>
                      <h4 className="text-sm font-black text-slate-950 leading-tight">
                        {section.titlePrimary}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                        {section.subtitle}
                      </p>
                      <div className="pt-1">
                        <Link
                          to={section.catalogLink}
                          className="w-full py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg text-center transition-colors flex items-center justify-center space-x-1 shadow-2xs cursor-pointer"
                        >
                          <span>Explore All</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Product Cards (matching Image 2: compact vertical card style) */}
                  {section.products.map(product => (
                    <div
                      key={product.id}
                      className="w-[220px] sm:w-[240px] md:w-[250px] shrink-0 bg-white rounded-2xl border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group snap-start"
                    >
                      {/* Top Image Box with corner badges & actions */}
                      <div className="relative aspect-[4/3] bg-slate-50/80 p-3 sm:p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                        {/* Top-Left Badge (e.g. Build volume or status) */}
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-red-600 text-white rounded-md shadow-2xs z-10 max-w-[130px] truncate">
                          {product.modelsCount}
                        </span>

                        {/* Top-Right Action Circles (Zoom & Inquiry) */}
                        <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 z-10">
                          <button
                            type="button"
                            onClick={() => setZoomItem(product)}
                            className="w-7 h-7 rounded-full bg-white/95 hover:bg-red-50 hover:text-red-600 text-slate-600 border border-slate-200 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
                            title="Inspect Model Asset"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openQuoteModal(product.quoteInquiry)}
                            className="w-7 h-7 rounded-full bg-white/95 hover:bg-red-50 hover:text-red-600 text-slate-600 border border-slate-200 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
                            title="Quick Inquiry"
                          >
                            <Heart className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Centered Product Image */}
                        <img
                          src={product.image}
                          alt={`${product.name} ${product.nameAccent || ''}`}
                          className="max-h-28 sm:max-h-32 w-auto object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                          loading="lazy"
                        />
                      </div>

                      {/* Bottom Content Body */}
                      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          {/* Series / Subcategory label */}
                          <div className="text-[10px] font-bold text-red-600 uppercase tracking-wider truncate">
                            {product.subtitle}
                          </div>

                          {/* Product Title */}
                          <Link to={product.link} className="block">
                            <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight truncate">
                              {product.name} {product.nameAccent}
                            </h4>
                          </Link>

                          {/* Short Description */}
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Feature Badges */}
                        <div className="space-y-1 pt-1 border-t border-slate-100">
                          {product.features.slice(0, 2).map((f, i) => {
                            const FeatIcon = f.icon
                            return (
                              <div
                                key={i}
                                className="flex items-center space-x-1.5 text-[11px] text-slate-600 font-medium truncate"
                              >
                                <FeatIcon className="w-3 h-3 text-red-600 shrink-0" />
                                <span className="truncate">{f.label}</span>
                              </div>
                            )
                          })}
                        </div>

                        {/* Bottom Actions Row: Explore + Quote */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                          <Link
                            to={product.link}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] text-center transition-all flex items-center justify-center space-x-1 shadow-2xs group-hover:shadow-xs"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => openQuoteModal(product.quoteInquiry)}
                            className="py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] text-center transition-colors cursor-pointer"
                          >
                            Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* FULLSCREEN ZOOM MODAL */}
      {zoomItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-4"
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

            <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 flex items-center justify-center min-h-[280px] max-h-[60vh] overflow-hidden border border-slate-100">
              <img
                src={zoomItem.image}
                alt={`${zoomItem.name} ${zoomItem.nameAccent || ''}`}
                className="max-h-full max-w-full object-contain drop-shadow-xl"
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
