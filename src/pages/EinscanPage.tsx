import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Scan,
  Maximize2,
  X,
  Phone,
  FileText,
  Filter,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

interface ScannerItem {
  id: string
  name: string
  category: 'desktop' | 'handheld' | 'multifunctional'
  categoryLabel: string
  subtitle: string
  bullets: string[]
  image: string
  badge?: string
  objectSizeRange?: string
}

const einscanProducts: ScannerItem[] = [
  // 1. Desktop & Multi-FOV
  {
    id: 'einscan-spv2',
    name: 'EinScan SPV2',
    category: 'desktop',
    categoryLabel: 'Desktop & Multi-FOV 3D Scanners',
    subtitle: 'Tripod Based 3D Scanner | Structured Light / White Light Technology',
    bullets: [
      'Accuracy – 50 microns per shot',
      'Field of View – 200×150 mm',
      'COLOR OUTPUT – YES',
      'Resolution – 0.17 mm – 0.2 mm',
      'Recommended object size: 25 mm to 500 mm',
    ],
    image: '/images/scanners/einscan-spv2.png',
    badge: 'Desktop Turntable',
    objectSizeRange: '25 mm – 500 mm',
  },
  {
    id: 'transcan-c',
    name: 'TranScan C',
    category: 'desktop',
    categoryLabel: 'Desktop & Multi-FOV 3D Scanners',
    subtitle: 'Multi FOV 3D Scanner | 12 MP Camera, Tripod & Turntable',
    bullets: [
      'Accuracy – 35 microns per shot',
      'Field of View – 300×190 mm & 150×96 mm',
      'COLOR OUTPUT – YES',
      'Resolution – 0.035 mm',
      'Recommended object size: 10 mm to 800 mm',
    ],
    image: '/images/scanners/transcan-c.png',
    badge: '12 MP Dual FOV',
    objectSizeRange: '10 mm – 800 mm',
  },

  // 2. Pure Handheld 3D Scanner
  {
    id: 'einstar',
    name: 'Einstar',
    category: 'handheld',
    categoryLabel: 'Pure Handheld 3D Scanner',
    subtitle: 'Most Affordable 3D Scanner | Ideal for Education Use',
    bullets: [
      'EINSTAR is our most affordable 3D scanner ever!',
      'Digitize the world with stable and clear detail capture.',
      'Start 3D scanning at ease with high quality data outputs.',
      'Best 3D Scanner for Education use case.',
    ],
    image: '/images/scanners/einstar.png',
    badge: 'Best Value',
    objectSizeRange: 'Freeform / Human Body',
  },
  {
    id: 'einscan-h2',
    name: 'Einscan - H2',
    category: 'handheld',
    categoryLabel: 'Pure Handheld 3D Scanner',
    subtitle: 'Dual Mode Handheld Scanner | Infra Red and Structured Light Technology',
    bullets: [
      'Accuracy – 50 microns',
      'Volumetric Accuracy – 0.15 mm / M',
      'Requires chalk powder for shiny/black parts',
      'Cannot scan parts < 10-20 mm',
    ],
    image: '/images/scanners/einscan-h2.png',
    badge: 'Dual Mode IR+LED',
    objectSizeRange: 'Medium to Large',
  },
  {
    id: 'einscan-hx',
    name: 'Einscan - HX',
    category: 'handheld',
    categoryLabel: 'Pure Handheld 3D Scanner',
    subtitle: 'Dual Mode Scanner | Blue LASER and BLUE Light for Shiny & Black Parts',
    bullets: [
      'Accuracy – 40 microns (Laser), 50 microns (Rapid)',
      'Volumetric Accuracy – 0.04–0.066 mm/m (Laser), 0.05–0.1 mm (Rapid)',
      'No chalk powder needed for shiny/black parts',
      'Can scan parts > 50 mm; best for large parts',
      'Field of View – 420×440 mm (Rapid), 380×400 mm (Laser)',
      'COLOR OUTPUT – YES',
      'Resolution – 0.05 mm to 3 mm (Laser) / 0.25 mm to 3 mm (Rapid)',
      'Recommended object size: 1 ft to 10 ft',
    ],
    image: '/images/scanners/einscan-hx.png',
    badge: 'Blue Laser Hybrid',
    objectSizeRange: '1 ft to 10 ft',
  },

  // 3. Multi Functional 3D scanner
  {
    id: 'einscan-pro-2xv2',
    name: 'EinScan Pro 2xV2',
    category: 'multifunctional',
    categoryLabel: 'Multi Functional 3D scanner',
    subtitle: 'Multi Utility 3D Scanner | Structured Light / White Light | Handheld & Tripod Modes',
    bullets: [
      'Accuracy – 40 microns per shot',
      'Field of View – 150×120 mm to 250×200 mm',
      'COLOR OUTPUT – YES (With Extra Color Camera / Color Pack)',
      'Resolution – 0.16 mm (Fixed), 0.2 mm to 2 mm (Handheld)',
      'Volumetric Accuracy – 0.3 mm/m',
      'Suitable for object sizes: 5 mm to 500 mm',
    ],
    image: '/images/scanners/einscan-pro-2xv2.png',
    badge: 'Multi-Utility',
    objectSizeRange: '5 mm – 500 mm',
  },
  {
    id: 'einscan-pro-hd',
    name: 'EinScan Pro HD',
    category: 'multifunctional',
    categoryLabel: 'Multi Functional 3D scanner',
    subtitle: 'Multi Utility 3D Scanner | Structured Light / White Light | Handheld & Tripod Modes',
    bullets: [
      'Accuracy – 40 microns per shot',
      'Field of View – 209×160 mm to 310×240 mm',
      'COLOR OUTPUT – YES (With Extra Color Camera / Color Pack)',
      'Resolution – 0.24 mm (Fixed), 0.2 mm to 3 mm (Handheld)',
      'Volumetric Accuracy – 0.3 mm/m',
      'Suitable for object sizes: 10 mm to 1000 mm',
    ],
    image: '/images/scanners/einscan-pro-hd.png',
    badge: 'High Definition',
    objectSizeRange: '10 mm – 1000 mm',
  },
]

export const EinscanPage: React.FC = () => {
  const { openQuoteModal } = useApp()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'desktop' | 'handheld' | 'multifunctional'>('all')
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)

  const filteredProducts =
    selectedCategory === 'all'
      ? einscanProducts
      : einscanProducts.filter(p => p.category === selectedCategory)

  // Group items by category when 'all' is selected
  const categoriesList: { id: 'desktop' | 'handheld' | 'multifunctional'; label: string }[] = [
    { id: 'desktop', label: 'Tripod & Desktop 3D Scanners' },
    { id: 'handheld', label: 'Pure Handheld 3D Scanner' },
    { id: 'multifunctional', label: 'Multi Functional 3D scanner' },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      {/* ====================================================
          1. HERO HEADER: EINSCAN 3D SCANNER
         ==================================================== */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-12 sm:pt-10 sm:pb-14 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/3d-scanners" className="hover:text-red-600 transition-colors">3D Scanners</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">EINSCAN 3D Scanner</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Scan className="w-3.5 h-3.5" />
                <span>Optical & Blue Laser 3D Digitization</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                EINSCAN 3D Scanner
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Discover the comprehensive series of Shining 3D EinScan scanners at Leniva CAD Solutions. From classroom education and creative CGI to reverse engineering and metrology-grade factory inspection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => openQuoteModal('EinScan Full Catalog Brochure')}
                className="px-6 py-3 bg-[#0062cc] hover:bg-[#004fa8] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Full Brochure</span>
              </button>
              <button
                onClick={() => openQuoteModal('EinScan Live Consultation')}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Filter Series:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Models ({einscanProducts.length})
            </button>
            <button
              onClick={() => setSelectedCategory('desktop')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'desktop'
                  ? 'bg-[#0062cc] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Desktop & Multi-FOV (2)
            </button>
            <button
              onClick={() => setSelectedCategory('handheld')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'handheld'
                  ? 'bg-[#0062cc] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pure Handheld (3)
            </button>
            <button
              onClick={() => setSelectedCategory('multifunctional')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'multifunctional'
                  ? 'bg-[#0062cc] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Multi Functional (2)
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. PRODUCTS LIST BY CATEGORY
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {selectedCategory === 'all' ? (
          // Grouped Display exactly matching user's 4 screenshots
          <div className="space-y-16">
            {categoriesList.map(cat => {
              const items = einscanProducts.filter(p => p.category === cat.id)
              if (items.length === 0) return null

              return (
                <div key={cat.id} className="space-y-6">
                  {/* Category Header Banner */}
                  <div className="text-center py-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight inline-block relative">
                      {cat.label}
                    </h2>
                  </div>

                  {/* Product Cards Stack */}
                  <div className="space-y-6">
                    {items.map(item => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onEnlarge={() => setEnlargedImage(item.image)}
                        onBrochure={() => openQuoteModal(`${item.name} - Product Brochure Request`)}
                        onDemo={() => openQuoteModal(`${item.name} - Demo Request`)}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          // Filtered view
          <div className="space-y-6">
            {filteredProducts.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                onEnlarge={() => setEnlargedImage(item.image)}
                onBrochure={() => openQuoteModal(`${item.name} - Product Brochure Request`)}
                onDemo={() => openQuoteModal(`${item.name} - Demo Request`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ====================================================
          3. BOTTOM CONSULTATION BANNER
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 font-mono">
              Authorized Technical Partner
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Not Sure Which EinScan Model Fits Your Parts?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Leniva CAD Solutions provides live on-site and remote benchmark scans. Send us your sample workpiece or request an engineer consultation to verify accuracy, cycle time, and CAD mesh reconstruction.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openQuoteModal('EinScan General Inquiry - Sample Scan')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
            >
              Request Sample Part Scan
            </button>
            <button
              onClick={() => openQuoteModal('EinScan General Inquiry - Live Demo')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all text-center cursor-pointer"
            >
              Schedule Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setEnlargedImage(null)}
        >
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={enlargedImage}
            alt="EinScan Hardware Enlarged"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  item: ScannerItem
  onEnlarge: () => void
  onBrochure: () => void
  onDemo: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onEnlarge, onBrochure, onDemo }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12 group">
      {/* Product Image Box (Matching the light neutral backdrop in user screenshot) */}
      <div className="md:col-span-4 bg-stone-100/70 p-6 sm:p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-200/80">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 sm:h-64 object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Zoom Icon */}
        <button
          onClick={onEnlarge}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/80 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center shadow transition-all cursor-pointer"
          title="Enlarge image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {item.badge && (
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded shadow-sm">
            {item.badge}
          </span>
        )}
      </div>

      {/* Product Content Details (Matching user's screenshots exactly) */}
      <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {item.subtitle}
            </p>
          </div>

          {/* Bulleted Specifications */}
          <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-700">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-slate-400 font-bold select-none shrink-0">•</span>
                <span className="font-normal leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button Row */}
        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={onBrochure}
            className="px-6 py-2.5 bg-[#0062cc] hover:bg-[#004fa8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Get Product Brochure
          </button>
          <button
            onClick={onDemo}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Request Live Demo
          </button>
        </div>
      </div>
    </div>
  )
}

export default EinscanPage
