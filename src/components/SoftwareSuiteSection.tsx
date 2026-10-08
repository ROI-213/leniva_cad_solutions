import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Layers,
} from 'lucide-react'

interface SoftwareProduct {
  id: string
  name: string
  subtitle: string
  image: string
  link: string
  badgeBrand: 'graebert' | 'sketchup' | 'chaos'
}

const aresProducts: SoftwareProduct[] = [
  {
    id: 'ares-standard',
    name: 'ARES Standard',
    subtitle: 'Affordable 2D/3D CAD',
    image: '/images/software/ares-standard.jpg',
    link: '/ares-standard',
    badgeBrand: 'graebert',
  },
  {
    id: 'ares-commander',
    name: 'ARES Commander',
    subtitle: 'Professional DWG-Native...',
    image: '/images/software/ares-commander.jpg',
    link: '/ares-commander',
    badgeBrand: 'graebert',
  },
  {
    id: 'ares-kudo',
    name: 'ARES Kudo',
    subtitle: 'Online DWG CAD &...',
    image: '/images/software/ares-kudo.jpg',
    link: '/ares-kudo',
    badgeBrand: 'graebert',
  },
  {
    id: 'ares-touch',
    name: 'ARES Touch',
    subtitle: 'Mobile DWG CAD & Field',
    image: '/images/software/ares-touch.jpg',
    link: '/ares-touch',
    badgeBrand: 'graebert',
  },
  {
    id: 'ares-mechanical',
    name: 'ARES Mechanical',
    subtitle: 'Mechanical Design CAD',
    image: '/images/software/ares-mechanical.jpg',
    link: '/ares-mechanical',
    badgeBrand: 'graebert',
  },
  {
    id: 'ares-electrical',
    name: 'ARES Electrical',
    subtitle: 'Electrical Schematics...',
    image: '/images/software/ares-electrical.jpg',
    link: '/ares-electrical',
    badgeBrand: 'graebert',
  },
]

const sketchupProducts: SoftwareProduct[] = [
  {
    id: 'sketchup-pro',
    name: 'SketchUp Pro',
    subtitle: 'Professional 3D...',
    image: '/images/software/sketchup-pro.jpg',
    link: '/sketchup-pro',
    badgeBrand: 'sketchup',
  },
  {
    id: 'sketchup-scan',
    name: 'SketchUp Pro Scan',
    subtitle: 'Scan-to-BIM...',
    image: '/images/software/sketchup-scan.jpg',
    link: '/sketchup-pro-scan',
    badgeBrand: 'sketchup',
  },
  {
    id: 'sketchup-advanced',
    name: 'SketchUp Pro Advanced',
    subtitle: 'BIM & Advanced...',
    image: '/images/software/sketchup-advanced.jpg',
    link: '/sketchup-pro-advanced',
    badgeBrand: 'sketchup',
  },
  {
    id: 'sketchup-studio',
    name: 'SketchUp Studio',
    subtitle: 'Full Professional...',
    image: '/images/software/sketchup-studio.jpg',
    link: '/sketchup-studio',
    badgeBrand: 'sketchup',
  },
]

const chaosProducts: SoftwareProduct[] = [
  {
    id: 'enscape',
    name: 'Enscape',
    subtitle: 'Real-Time Rendering &...',
    image: '/images/software/enscape-3d.jpg',
    link: '/enscape',
    badgeBrand: 'chaos',
  },
  {
    id: 'vray',
    name: 'V-Ray',
    subtitle: 'Photorealistic Rendering...',
    image: '/images/software/chaos-vray.jpg',
    link: '/vray',
    badgeBrand: 'chaos',
  },
  {
    id: 'corona',
    name: 'Corona',
    subtitle: 'ArchViz CPU Rendering',
    image: '/images/software/chaos-corona.jpg',
    link: '/corona',
    badgeBrand: 'chaos',
  },
]

export const SoftwareSuiteSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* ====================================================
            HEADER: Compact & HD (matching reference image)
           ==================================================== */}
        <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent border border-slate-200/80 overflow-hidden">
          {/* Architectural Background Graphic on Right */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-5/12 hidden md:block pointer-events-none">
            <img
              src="/images/software/sections/aec-construction.jpg"
              alt="Architecture, Engineering & Visualization"
              className="w-full h-full object-cover object-left opacity-25 lg:opacity-35 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,black_40%)]"
              loading="lazy"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-0.5 bg-red-600 rounded-full" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-600">
                PROFESSIONAL SOFTWARE SUITE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Design. <span className="text-red-600">Model. Render.</span> Build.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-xl">
              Explore industry-leading software solutions for architecture, engineering, construction and visualization.
            </p>

            {/* 4 Trust Badges in compact inline layout */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-slate-900">Trusted Brands</div>
                  <div className="text-[10px] text-slate-500">Industry leaders</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-slate-900">Genuine Licensing</div>
                  <div className="text-[10px] text-slate-500">100% authentic software</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-slate-900">Expert Support</div>
                  <div className="text-[10px] text-slate-500">Installation & guidance</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold text-slate-900">End-to-End Solutions</div>
                  <div className="text-[10px] text-slate-500">Design to visualization</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            3 SOFTWARE COLUMNS: ARES, SKETCHUP, CHAOS
           ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          
          {/* ────────────────────────────────────────────────
              COLUMN 1: ARES – Graebert (6 Products)
             ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3.5">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="h-7 w-auto px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[9px] font-black uppercase flex items-center justify-center shrink-0">
                  Gräibert
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-950 truncate">ARES – Graebert</h3>
                  <p className="text-[11px] text-slate-500 truncate">Professional DWG CAD, Trinity...</p>
                </div>
              </div>
              <Link
                to="/ares-commander"
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline flex items-center space-x-0.5 shrink-0"
              >
                <span>View Category</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 6 Products Grid (2 columns x 3 rows) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
              {aresProducts.map(product => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="group bg-slate-50/70 hover:bg-white rounded-xl p-2 border border-slate-200/80 hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Small brand watermark badge */}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/95 rounded text-[8px] font-bold text-red-600 shadow-xs border border-slate-100 flex items-center space-x-1">
                      <span>ARES</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ────────────────────────────────────────────────
              COLUMN 2: SketchUp – Trimble (4 Products)
             ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3.5">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <img
                  src="/images/brands/sketchup.png"
                  alt="Trimble SketchUp"
                  className="h-6 w-auto object-contain shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-950 truncate">SketchUp – Trimble</h3>
                  <p className="text-[11px] text-slate-500 truncate">Industry-standard 3D modeling...</p>
                </div>
              </div>
              <Link
                to="/sketchup-pro"
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline flex items-center space-x-0.5 shrink-0"
              >
                <span>View Category</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 4 Products Grid (2 columns x 2 rows) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
              {sketchupProducts.map(product => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="group bg-slate-50/70 hover:bg-white rounded-xl p-2 border border-slate-200/80 hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Small brand watermark badge */}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/95 rounded text-[8px] font-bold text-slate-800 shadow-xs border border-slate-100 flex items-center space-x-0.5">
                      <span className="text-[7px] text-slate-400">Trimble</span>
                      <span className="font-semibold text-blue-700">SketchUp</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ────────────────────────────────────────────────
              COLUMN 3: Chaos (Enscape, V-Ray, Corona)
             ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3.5">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-xs uppercase tracking-tight shrink-0 shadow-2xs">
                  chaos
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-slate-950 truncate">Chaos</h3>
                  <p className="text-[11px] text-slate-500 truncate">World-leading real-time rendering...</p>
                </div>
              </div>
              <Link
                to="/vray"
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline flex items-center space-x-0.5 shrink-0"
              >
                <span>View Category</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Chaos Products Layout: 2 items on top row + 1 wide item on bottom row matching reference */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 flex-1">
              {/* Enscape & V-Ray */}
              {chaosProducts.slice(0, 2).map(product => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="group bg-slate-50/70 hover:bg-white rounded-xl p-2 border border-slate-200/80 hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-red-600 rounded text-[8px] font-bold text-white shadow-xs">
                      chaos
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Corona (Wide Card Spanning 2 Columns, matching reference image) */}
              {chaosProducts.slice(2, 3).map(product => (
                <Link
                  key={product.id}
                  to={product.link}
                  className="col-span-2 group bg-slate-50/70 hover:bg-white rounded-xl p-2 border border-slate-200/80 hover:border-red-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[21/9] sm:aspect-[24/9] rounded-lg overflow-hidden bg-slate-950 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-red-600 rounded text-[9px] font-bold text-white shadow-xs">
                      chaos
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SoftwareSuiteSection
