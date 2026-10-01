import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Download,
  Sparkles,
  Box,
  Layers,
  Zap,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Flame,
  PhoneCall,
  Award,
  Factory,
  Wrench,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Settings,
  Maximize2,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham5Page: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'build' | 'extrusion' | 'motion' | 'software'>('build')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ABS')

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const mechanicsRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Inject SEO Structured Data
  useEffect(() => {
    document.title = 'Pratham 5.0 Industrial 3D Printer | 500×500×500 mm Large Format FDM | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Pratham 5.0 is an industrial large-format FDM 3D printer featuring a 500×500×500 mm (125 Liters) build volume, dual-zone AC silicone heated bed, quad ball-screw Z axis, and 320°C high-flow hotend.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 5.0 Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-5-0.png',
      description:
        'Pratham 5.0 is an industrial-grade large-format FDM 3D printer with 500 × 500 × 500 mm build envelope, quad ball screws, dual-zone heated bed, and 320°C high-temperature extrusion.',
      brand: { '@type': 'Brand', name: 'Pratham 3D' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'INR',
        price: 'Contact for Quote',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(productSchema)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  const materialsInfo: Record<
    string,
    { title: string; bedTemp: string; nozzleTemp: string; desc: string; advantage: string }
  > = {
    ABS: {
      title: 'Acrylonitrile Butadiene Styrene (ABS / CF-ABS)',
      bedTemp: '100 – 110 °C',
      nozzleTemp: '240 – 260 °C',
      desc: 'High impact resistance, thermal endurance, and rigidity. Pratham 5.0 enclosed chamber and dual-zone 120°C silicone bed eliminate edge warping on large 500mm footprints.',
      advantage: 'Ideal for automotive exterior parts, functional housings, and snap-fit assemblies.',
    },
    PETG: {
      title: 'Polyethylene Terephthalate Glycol (PETG / Carbon PETG)',
      bedTemp: '75 – 85 °C',
      nozzleTemp: '230 – 250 °C',
      desc: 'Superb chemical resistance, zero odor, UV resistance, and layer bond tenacity. Prints seamlessly across massive cross-sections without shrinkage.',
      advantage: 'Excellent for fluid tanks, outdoor casings, and ducting fixtures.',
    },
    PLA: {
      title: 'Tough PLA / PLA-CF (Carbon Fiber Reinforced)',
      bedTemp: '55 – 65 °C',
      nozzleTemp: '205 – 225 °C',
      desc: 'High tensile strength, rapid layer cooling, and crisp dimensional precision. Perfect for large architectural models, full-scale concept visualizers, and jigs.',
      advantage: 'High speed and ultra-stable dimensional fidelity on large volumetric prints.',
    },
    Nylon: {
      title: 'PA12 / Polyamide (Nylon & Nylon-CF)',
      bedTemp: '100 – 120 °C',
      nozzleTemp: '260 – 290 °C',
      desc: 'Extreme abrasion wear resistance, low friction coefficient, and high impact damping. Supported by Pratham 5.0 up to 320°C high-flow hotend.',
      advantage: 'Unmatched durability for gears, wear pads, manufacturing jigs, and robotic grippers.',
    },
    TPU: {
      title: 'Thermoplastic Polyurethane (TPU 95A / 85A)',
      bedTemp: '50 – 60 °C',
      nozzleTemp: '220 – 240 °C',
      desc: 'Direct-drive extrusion path enables smooth feeding of elastomeric filaments without buckling or clogging across large protective boots and vibration pads.',
      advantage: 'Impact absorbers, protective seals, customized gaskets, and flexible bellows.',
    },
  }

  const faqs = [
    {
      q: 'Why is the 500 × 500 × 500 mm build volume significant for industrial production?',
      a: 'A 125-liter cubic build volume eliminates the need to slice large engineering assemblies into smaller segments that require manual gluing or solvent welding. Single-piece prints retain full mechanical integrity, uniform grain strength, and significantly tighter overall dimensional tolerances.',
    },
    {
      q: 'How does the Independent Dual-Zone AC Silicone Heated Bed work?',
      a: 'The 500 × 500 mm bed is split into two independent heating zones: an inner core zone for standard and medium prints, and an outer zone that energizes when using the full 500mm platform. This saves up to 40% in electrical consumption during daily prototyping and delivers rapid warm-up to 120°C in under 6 minutes.',
    },
    {
      q: 'What makes the Quad Ball-Screw Z-Axis superior to lead-screw systems?',
      a: 'Industrial parts with heights up to 500 mm can weigh several kilograms on the bed. Lead screws or cantilever beds can sag or vibrate under high mass. Pratham 5.0 employs four heavy-duty ground industrial ball screws synchronized with dual high-torque steppers to guarantee absolute micron-level layer consistency from layer 1 to layer 5000.',
    },
    {
      q: 'Can Pratham 5.0 print abrasive materials like Carbon Fiber or Glass Fiber composites?',
      a: 'Yes. Pratham 5.0 features an all-metal hotend rated to 320°C with optional hardened steel or ruby nozzles. When combined with our direct-drive dual-gear extruder, it handles continuous fiber and carbon-infused filaments (CF-ABS, CF-PETG, PA-CF) with exceptional wear resistance.',
    },
    {
      q: 'What warranty, delivery, and commissioning support does Leniva CAD Solutions provide?',
      a: 'Leniva CAD Solutions provides end-to-end industrial delivery, on-site installation, factory calibration, operator training, slicing optimization profiles, and a comprehensive 1-year warranty backed by rapid local spares and technical field engineers across India.',
    },
  ]

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20 selection:bg-red-600 selection:text-white">
      {/* ====================================================
          STICKY PRODUCT SUB-NAV BAR
         ==================================================== */}
      <div className="sticky top-[var(--site-header-height,118px)] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-slate-950 tracking-tight">Pratham 5.0</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              500 × 500 × 500 mm
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500">
              125 Liters • Quad Ball-Screw
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Key Features
            </button>
            <button onClick={() => scrollTo(mechanicsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Industrial Mechanics
            </button>
            <button onClick={() => scrollTo(materialsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Materials
            </button>
            <button onClick={() => scrollTo(specsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Specifications
            </button>
            <button onClick={() => scrollTo(faqRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/brochures/pratham-5.pdf"
              download
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham 5.0 Industrial 3D Printer')}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================
          BREADCRUMBS & HERO SECTION
         ==================================================== */}
      <div ref={overviewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/products/fdm-3d-printers" className="hover:text-slate-900 transition-colors">FDM 3D Printers</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Pratham 5.0</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold text-red-800 tracking-wide uppercase">
                Large-Format Industrial Additive System
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pratham 5.0 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                500 × 500 × 500 mm
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Eliminate assembly seams, post-processing joints, and weakness lines. The Pratham 5.0 delivers 
              a massive <strong>125-liter monolithic build volume</strong> engineered with quad ball-screw Z stabilization, 
              dual-zone silicone AC bed heating, and a 320°C high-flow hotend for heavy production tooling and automotive mockups.
            </p>

            {/* Key Specs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Build Envelope</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">500³ mm</div>
                <div className="text-[11px] font-semibold text-red-600">125 Liters Volume</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bed Heating</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">120°C Fast</div>
                <div className="text-[11px] font-semibold text-emerald-600">Dual-Zone AC Mat</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Z-Axis Rigidity</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">Quad Ball-Screw</div>
                <div className="text-[11px] font-semibold text-slate-600">Zero Bed Slump</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hotend Temp</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">320°C Max</div>
                <div className="text-[11px] font-semibold text-amber-600">High-Flow Volcano</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openQuoteModal('Pratham 5.0 Industrial 3D Printer')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request Quotation & Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/brochures/pratham-5.pdf"
                download
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Tech Brochure</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-6 pt-3 text-xs font-semibold text-slate-500">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1-Year Industrial Warranty</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Factory className="w-4 h-4 text-red-600" />
                <span>Made in India • On-Site Commissioning</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Continuous 24/7 Production Duty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Machine Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-3xl p-8 border border-slate-200/80 shadow-xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <img
                src="/images/products/pratham-5-0.png"
                alt="Pratham 5.0 Industrial 3D Printer"
                className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold text-slate-500 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 text-red-600" />
                  <span>Envelope: 500 × 500 × 500 mm</span>
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  In Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 2: KEY INDUSTRIAL ADVANTAGES
         ==================================================== */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Engineering Pillars</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Engineered for Continuous Large-Scale Additive Workloads
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Why automotive suppliers, foundries, and tooling manufacturers choose Pratham 5.0 for mission-critical parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Monolithic 125L Build Volume</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Print whole full-scale intake manifolds, automotive dash sections, foundry sand cores, and industrial enclosures in one piece. No weak adhesive seams or manual dowel alignments.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Single-setup production saves days of assembly</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Uniform isotropic strength throughout component</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Independent Dual-Zone Silicone Bed</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Energy-smart high-wattage AC silicone heaters reach 120°C rapidly. Use only the center 250×250 mm zone for small prototypes to conserve energy, or activate the full 500mm perimeter for giant parts.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast thermal soak across thick aluminum tooling plate</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eliminates thermal warping on ABS, PC, and Nylon</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Quad Industrial Ball-Screw Z</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Four precision-ground industrial ball screws positioned at every corner of the platform maintain absolute parallelism even when supporting 30+ kg plastic workpieces during 72-hour prints.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero cantilever deflection or bed shudder</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Consistent 10-micron positional repeatability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 3: INDUSTRIAL MECHANICS DEEP DIVE
         ==================================================== */}
      <div ref={mechanicsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Heavy-Duty Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Built Like a CNC Machine, Not a Desktop Toy
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Pratham 5.0 is built on a heavy welded steel tubular base with stress-relieved structural uprights. 
                Dual Hiwin-grade industrial linear guides on the X and Y axes ensure high tracking precision, eliminating 
                resonance ripples even when moving high-volume volcano print heads.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Maximize2 className="w-4 h-4 text-red-400" />
                    <span>Volcano High-Flow Melt Chamber</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Delivers up to 30 mm³/s volumetric extrusion rate. Supports 0.6 mm, 0.8 mm, 1.0 mm, and 1.2 mm nozzles to drastically accelerate print jobs on massive parts.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Auto-Mesh Bed Compensation</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Multi-point matrix leveling probe automatically maps bed topography and corrects Z-height dynamically on every layer for flawless adhesion.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Filament Runout & Power Resume Protection</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Optoelectronic filament sensor pauses operations immediately if filament expires. Integrated non-volatile memory resumes printing exactly where it paused after power outages.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Target Applications</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-600/30 text-red-300 text-[11px] font-bold">Industrial</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Automotive</div>
                    <div className="text-slate-400 mt-0.5">Bumpers, Grilles, Ducting & Interior Panels</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Foundry & Tooling</div>
                    <div className="text-slate-400 mt-0.5">Full-Scale Sand Casting Patterns & Matchplates</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Jigs & Fixtures</div>
                    <div className="text-slate-400 mt-0.5">Welding Cradles, CMM Inspection Nests</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Product Prototypes</div>
                    <div className="text-slate-400 mt-0.5">Full-Scale Vacuum Cleaner & White Goods Casings</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-800/90 border border-red-500/30 space-y-3">
                <div className="text-sm font-bold text-white">Have a Specific Component to 3D Print?</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Send us your CAD file (STEP, IGES, or STL). Our applications engineering team will generate a complimentary print-time estimate, material recommendation, and feasibility report.
                </p>
                <button
                  onClick={() => openQuoteModal('Pratham 5.0 CAD Feasibility')}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Send CAD File for Print Feasibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 4: MATERIALS COMPATIBILITY
         ==================================================== */}
      <div ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>Industrial Polymer Capabilities</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Engineering Materials Supported by Pratham 5.0
          </h2>
          <p className="text-slate-600 text-sm">
            Open-filament ecosystem compatible with any standard 1.75 mm polymer, high-performance composite, and flexible elastomer.
          </p>
        </div>

        {/* Material Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(materialsInfo).map((matKey) => (
            <button
              key={matKey}
              onClick={() => setSelectedMaterial(matKey)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedMaterial === matKey
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {matKey}
            </button>
          ))}
        </div>

        {/* Selected Material Card */}
        {materialsInfo[selectedMaterial] && (
          <div className="max-w-3xl mx-auto p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  {materialsInfo[selectedMaterial].title}
                </h3>
                <span className="text-xs font-semibold text-red-600">
                  Thermal Window: Bed {materialsInfo[selectedMaterial].bedTemp} • Nozzle {materialsInfo[selectedMaterial].nozzleTemp}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                100% Validated Profile
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {materialsInfo[selectedMaterial].desc}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-start space-x-2">
              <Award className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span><strong>Key Advantage:</strong> {materialsInfo[selectedMaterial].advantage}</span>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================
          SECTION 5: SPECIFICATIONS TABLE
         ==================================================== */}
      <div ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-red-600" />
            <span>Verified Datasheet</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Pratham 5.0 Technical Specifications
          </h2>
          <p className="text-slate-600 text-sm">
            Comprehensive hardware, motion system, thermal capabilities, and software specifications.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveSpecTab('build')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'build'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Build & Thermal
            </button>
            <button
              onClick={() => setActiveSpecTab('extrusion')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'extrusion'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Extrusion System
            </button>
            <button
              onClick={() => setActiveSpecTab('motion')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'motion'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Motion & Mechanics
            </button>
            <button
              onClick={() => setActiveSpecTab('software')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'software'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Software & General
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            {activeSpecTab === 'build' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Build Volume (XYZ)</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">500 × 500 × 500 mm (125 Liters)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Heated Bed Technology</div>
                  <div className="sm:col-span-2 text-slate-900">Independent Dual-Zone 220V AC Silicone Heater</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Max Bed Temperature</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 120°C (Rapid uniform surface conduction)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Build Surface Plate</div>
                  <div className="sm:col-span-2 text-slate-900">Precision ground 8 mm MIC-6 cast aluminum plate + BuildTak / Magnetic PEI sheet</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Bed Leveling</div>
                  <div className="sm:col-span-2 text-slate-900">Automatic multi-point matrix mesh calibration sensor</div>
                </div>
              </>
            )}

            {activeSpecTab === 'extrusion' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Extrusion Architecture</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Direct-Drive High-Torque Dual-Gear Extruder</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Maximum Hotend Temp</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 320°C (All-Metal Titanium Heatbreak)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Nozzle Sizes Supported</div>
                  <div className="sm:col-span-2 text-slate-900">0.4 mm, 0.6 mm, 0.8 mm, 1.0 mm, 1.2 mm high-flow Volcano</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Layer Resolution Range</div>
                  <div className="sm:col-span-2 text-slate-900">0.08 mm (80 µm) to 0.8 mm (800 µm)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Filament Compatibility</div>
                  <div className="sm:col-span-2 text-slate-900">1.75 mm open filament: PLA, ABS, PETG, TPU, Nylon, Carbon Fiber CF-ABS, Polycarbonate</div>
                </div>
              </>
            )}

            {activeSpecTab === 'motion' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Z-Axis Motion System</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Quad Industrial Ground Ball Screws with 4-corner synchronization</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">X / Y Motion Mechanism</div>
                  <div className="sm:col-span-2 text-slate-900">Hiwin-grade hardened steel linear guideways</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Positioning Accuracy</div>
                  <div className="sm:col-span-2 text-slate-900">X/Y: 10 µm (0.01 mm), Z: 2.5 µm (0.0025 mm)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Maximum Travel Speed</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 150 mm/s (Operational: 40 – 100 mm/s depending on material & layer height)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Chassis Construction</div>
                  <div className="sm:col-span-2 text-slate-900">Heavy-gauge welded tubular steel frame with anti-vibration industrial feet</div>
                </div>
              </>
            )}

            {activeSpecTab === 'software' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Display & Interface</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">5-inch Full Color Industrial Touch Screen</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Slicing Software</div>
                  <div className="sm:col-span-2 text-slate-900">Simplify3D / Cura / PrusaSlicer (Pre-configured Leniva engineering profiles included)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">File Formats</div>
                  <div className="sm:col-span-2 text-slate-900">STL, OBJ, 3MF, STEP, G-Code</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Connectivity</div>
                  <div className="sm:col-span-2 text-slate-900">USB Drive / SD Card / Network Ethernet / Wi-Fi (optional)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Power Input</div>
                  <div className="sm:col-span-2 text-slate-900">220 – 240V AC, 50/60 Hz, Single Phase</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS
         ==================================================== */}
      <div ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span>Industrial Buying Guide</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about the Pratham 5.0 industrial large-format 3D printer.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ml-4 ${
                    openFaq === idx ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          SECTION 7: BOTTOM CTA CARD
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Immediate Deployment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Scale Your Industrial Manufacturing with Pratham 5.0
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect with Leniva CAD Solutions technical experts today. We provide live machine demonstrations, benchmark print testing, and nationwide Indian field support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('Pratham 5.0 Deployment')}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Price & Demo</span>
            </button>
            <a
              href="/brochures/pratham-5.pdf"
              download
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Brochure (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pratham5Page
