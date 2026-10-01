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
  Activity,
  Award,
  Factory,
  Wrench,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Gauge,
  Video,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham3RapidPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'speed' | 'kinematics' | 'extrusion' | 'software'>('speed')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [speedGauge, setSpeedGauge] = useState<number>(500)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Hyper PLA')

  // Section Refs for Sticky Nav
  const overviewRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef<HTMLDivElement>(null)
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
    document.title = 'Pratham 3 Rapid High Speed 3D Printer | 500 mm/s CoreXY 350×350×350 mm | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Pratham 3 Rapid is a high-speed industrial FDM 3D printer featuring 500 mm/s print speed, 20,000 mm/s² acceleration, 350×350×350 mm build volume, active vibration compensation (input shaping), and 32 mm³/s ceramic hotend.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 3 Rapid High-Speed Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-3-rapid.png',
      description:
        'Pratham 3 Rapid delivers blazing 500 mm/s print speed and 20,000 mm/s² acceleration with 350 × 350 × 350 mm build volume, active input shaping vibration compensation, and 32 mm³/s ceramic high-flow hotend.',
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
    'Hyper PLA': {
      title: 'Hyper-Speed Rapid PLA / PLA-CF',
      bedTemp: '50 – 60 °C',
      nozzleTemp: '210 – 230 °C',
      desc: 'Formulated with low melt viscosity and rapid crystallization polymers. Melts instantaneously in the 32 mm³/s ceramic hotend and solidifies sharply under twin high-flow centrifugal fans.',
      advantage: 'Maintains crisp 0.1 mm layer lines and sharp corners even at full 500 mm/s speeds.',
    },
    PETG: {
      title: 'High-Speed PETG (Rapid PETG)',
      bedTemp: '75 – 85 °C',
      nozzleTemp: '235 – 255 °C',
      desc: 'High interlayer adhesion without stringing at fast travel speeds. Outstanding chemical resilience, UV resistance, and structural strength for functional enclosures.',
      advantage: 'Ideal for water-tight casings, chemical fixtures, and snap-fit electronic enclosures.',
    },
    ABS: {
      title: 'High-Flow ABS & ASA',
      bedTemp: '95 – 110 °C',
      nozzleTemp: '245 – 265 °C',
      desc: 'Enclosed build chamber retains heat to prevent high-speed layer delamination and warping on technical end-use parts. Great heat resistance up to 95°C.',
      advantage: 'Automotive clips, outdoor enclosures, drone brackets, and functional jigs.',
    },
    TPU: {
      title: 'High-Speed Flexible TPU (95A / 90A)',
      bedTemp: '45 – 55 °C',
      nozzleTemp: '220 – 240 °C',
      desc: 'Direct-drive dual-gear extruder ensures constrained filament pathway, preventing flexible elastomeric buckling during rapid retractions.',
      advantage: 'Rapid production of shock absorbers, vibration dampers, protective bumpers, and seals.',
    },
  }

  const faqs = [
    {
      q: 'How does Pratham 3 Rapid achieve 500 mm/s print speed without compromising quality?',
      a: 'High-speed printing requires three synchronized technologies: (1) An ultra-rigid CoreXY kinematic structure that moves only the lightweight print head while keeping the heavy bed steady, (2) Active Vibration Compensation (Input Shaping) via onboard accelerometers to cancel resonance frequencies and eliminate ghosting, and (3) A 32 mm³/s Ceramic Core High-Flow hotend that can melt plastic fast enough to sustain high volumetric delivery.',
    },
    {
      q: 'What is the acceleration rating of the Pratham 3 Rapid?',
      a: 'The Pratham 3 Rapid reaches up to 20,000 mm/s² acceleration. This means the print head reaches top cruising speeds almost instantaneously even on small, intricate geometry, delivering up to 5X speedups compared to traditional FDM printers.',
    },
    {
      q: 'What build volume does the Pratham 3 Rapid offer?',
      a: 'It offers a spacious 350 × 350 × 350 mm cubic build envelope, allowing you to print large engineering parts and full-plate batch production runs in a fraction of traditional build times.',
    },
    {
      q: 'Does it include smart monitoring features?',
      a: 'Yes. Pratham 3 Rapid is equipped with an integrated 1080p AI Camera for real-time remote video monitoring, first-layer defect detection, and automated time-lapse generation, accessible over local network and Wi-Fi.',
    },
    {
      q: 'What warranty and on-site support are provided?',
      a: 'Leniva CAD Solutions provides a comprehensive 1-year industrial warranty, lifetime firmware updates, slicing profiles pre-configured for high-speed materials, and nationwide Indian field engineering support.',
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
            <span className="text-sm font-black text-slate-950 tracking-tight">Pratham 3 Rapid</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              500 mm/s • 20K Accel
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500">
              350 × 350 × 350 mm • CoreXY
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <button onClick={() => scrollTo(overviewRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollTo(speedRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Speed Simulator
            </button>
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              Key Features
            </button>
            <button onClick={() => scrollTo(mechanicsRef)} className="hover:text-red-700 transition-colors cursor-pointer">
              CoreXY Dynamics
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
              href="/brochures/pratham-3-rapid.pdf"
              download
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham 3 Rapid 3D Printer')}
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
          <span className="text-slate-900 font-bold">Pratham 3 Rapid</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold text-red-800 tracking-wide uppercase">
                High-Speed Industrial 3D Printer — 500 mm/s
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pratham 3 Rapid <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                500 mm/s • CoreXY
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Compress design iteration cycles and multiply production throughput. Engineered with 
              <strong> 500 mm/s print speeds</strong> and <strong>20,000 mm/s² acceleration</strong>, 
              Pratham 3 Rapid combines an ultra-rigid CoreXY kinematic structure, active vibration compensation (input shaping), 
              and a 32 mm³/s ceramic high-flow hotend across a generous 350 × 350 × 350 mm build volume.
            </p>

            {/* Key Specs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Print Speed</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">500 mm/s</div>
                <div className="text-[11px] font-semibold text-red-600">Up to 5X Faster</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Acceleration</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">20,000</div>
                <div className="text-[11px] font-semibold text-emerald-600">mm/s² Extreme</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Build Volume</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">350³ mm</div>
                <div className="text-[11px] font-semibold text-slate-600">Enclosed Chamber</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Flow Melt Rate</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">32 mm³/s</div>
                <div className="text-[11px] font-semibold text-amber-600">Ceramic Hotend</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openQuoteModal('Pratham 3 Rapid 3D Printer')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request Price & Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/brochures/pratham-3-rapid.pdf"
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
                <span>Active Input Shaping (No Ghosting)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Factory className="w-4 h-4 text-red-600" />
                <span>Industrial CoreXY Linear Rail Rigidity</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>AI 1080p Camera Remote Monitoring</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Machine Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-3xl p-8 border border-slate-200/80 shadow-xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <img
                src="/images/products/pratham-3-rapid.png"
                alt="Pratham 3 Rapid High Speed 3D Printer"
                className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold text-slate-500 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Gauge className="w-3.5 h-3.5 text-red-600" />
                  <span>Velocity: Up to 500 mm/s</span>
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  High Speed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 2: INTERACTIVE SPEED BENCHMARK SIMULATOR
         ==================================================== */}
      <div ref={speedRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Gauge className="w-3.5 h-3.5" />
              <span>Throughput Acceleration Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              See How Much Faster Your Production Runs
            </h2>
            <p className="text-slate-300 text-sm">
              Adjust the print speed slider below to observe print time reduction and production volume output comparison.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-bold mb-2">
                  <span className="text-slate-300">Pratham 3 Rapid Operational Speed:</span>
                  <span className="text-red-400 text-xl font-mono">{speedGauge} mm/s</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="500"
                  step="20"
                  value={speedGauge}
                  onChange={(e) => setSpeedGauge(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>Standard FDM (60 mm/s)</span>
                  <span>Industrial Rapid (300 mm/s)</span>
                  <span>Max Velocity (500 mm/s)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Time Savings Ratio</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {Math.round((speedGauge / 60) * 10) / 10}x Faster
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">vs. standard 60 mm/s printer</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 font-bold uppercase">Typical 12h Print Finishes In</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {Math.max(1.5, Math.round((12 / (speedGauge / 60)) * 10) / 10)} Hours
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Same day part turnaround</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="text-sm font-bold text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  <span>Input Shaping Active Resonance Cancellation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-speed movements traditionally cause ripples ("ghosting" or "ringing") on corners. Pratham 3 Rapid’s 32-bit motion controller uses active accelerometers to measure frame vibration frequencies and dynamically cancels them out in the stepper pulses.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="text-sm font-bold text-white flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Ceramic 32 mm³/s Volumetric Melt Zone</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conventional hotends fail at 150+ mm/s because plastic cannot melt quickly enough. Our 360-degree ceramic cylinder element provides uniform 32 mm³/s thermal transfer for uninterrupted extrusion without underflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 3: KEY INDUSTRIAL ADVANTAGES
         ==================================================== */}
      <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Speed & Precision Engineering</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Next-Generation High-Speed FDM Architecture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every component engineered to withstand rapid direction changes and sustain tight dimensional tolerances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Ultra-Rigid CoreXY Gantry</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Motors stay fixed to the heavy frame while an ultra-light carbon-reinforced carriage traverses precision linear guideways. Minimizing moving mass allows instantaneous 20,000 mm/s² directional acceleration.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stationary motors reduce gantry inertia</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hiwin-grade hardened steel linear rails</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Active Input Shaping</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time resonance compensation eliminates ghosting, ringing, and corner overshoot. Delivers crisp sharp 90-degree corners, pristine fillets, and mirror-smooth vertical walls at full speed.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero ringing on embossed lettering and edges</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated frequency tuning and calibration</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">1080p AI Camera & Wi-Fi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Integrated HD camera monitors build progress, detects first-layer adhesion anomalies or spaghetti faults, and creates automated time-lapse videos of every print job for quality control records.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Browser and network remote monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automatic job pause if defects are detected</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 4: COREXY DYNAMICS & CHASSIS DEEP DIVE
         ==================================================== */}
      <div ref={mechanicsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>High-Speed Dynamics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Designed to Move Fast Without Moving Your Workspace
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Pratham 3 Rapid’s welded unibody frame features thick aluminum extrusion profiles and heavy gusset plates. 
                Even during rapid 20,000 mm/s² direction reversals, the machine chassis remains completely rigid and vibration-damped.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-red-400" />
                    <span>Twin High-Pressure Cooling Fans</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Dual 5015 high-CFM blower fans direct targeted micro-jets of air directly beneath the nozzle, instantly freezing overhangs up to 75 degrees without droop.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>300°C All-Metal Extruder</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Bimetallic heatbreak handles technical engineering filaments including ABS, ASA, PETG, TPU, and composite carbon blends.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Box className="w-4 h-4 text-emerald-400" />
                    <span>PEI Spring Steel Magnetic Sheet</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Textured magnetic spring steel sheet provides tenacious first-layer grip when hot, and allows finished prints to pop off effortlessly when cooled and flexed.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Applications Portfolio</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-600/30 text-red-300 text-[11px] font-bold">500 mm/s Speed</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Rapid Concept Iteration</div>
                    <div className="text-slate-400 mt-0.5">3 to 4 design revisions printed in a single 8-hour workday</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Batch On-Demand Production</div>
                    <div className="text-slate-400 mt-0.5">Fast production runs of 20 to 50 end-use parts on the 350mm bed</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Manufacturing Tooling & Jigs</div>
                    <div className="text-slate-400 mt-0.5">Custom assembly nests and alignment fixtures delivered same-shift</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Functional Drone & Robotics</div>
                    <div className="text-slate-400 mt-0.5">Lightweight Carbon-PLA and PETG aerodynamic structural arms</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-800/90 border border-red-500/30 space-y-3">
                <div className="text-sm font-bold text-white">Watch a Live Speed Demo</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Request a live video demonstration or visit Leniva CAD Solutions to see Pratham 3 Rapid print your custom CAD file at 500 mm/s in real time.
                </p>
                <button
                  onClick={() => openQuoteModal('Pratham 3 Rapid Live Demo')}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Schedule Live High-Speed Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 5: MATERIALS COMPATIBILITY
         ==================================================== */}
      <div ref={materialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>High-Speed Filaments</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Materials Compatibility for Pratham 3 Rapid
          </h2>
          <p className="text-slate-600 text-sm">
            Tuned profiles for high-speed rapid-crystallizing filaments as well as standard engineering polymers.
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
                High-Speed Slicing Profile Included
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
          SECTION 6: SPECIFICATIONS TABLE
         ==================================================== */}
      <div ref={specsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Monitor className="w-3.5 h-3.5 text-red-600" />
            <span>Verified Datasheet</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Pratham 3 Rapid Technical Specifications
          </h2>
          <p className="text-slate-600 text-sm">
            Comprehensive specifications for the 500 mm/s high-speed CoreXY 3D printer.
          </p>
        </div>

        {/* Spec Tabs */}
        <div className="flex justify-center border-b border-slate-200 mb-8">
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveSpecTab('speed')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'speed'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Speed & Volume
            </button>
            <button
              onClick={() => setActiveSpecTab('kinematics')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'kinematics'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Kinematics & Motion
            </button>
            <button
              onClick={() => setActiveSpecTab('extrusion')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'extrusion'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Hotend & Extrusion
            </button>
            <button
              onClick={() => setActiveSpecTab('software')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'software'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Software & Smart Sensors
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100 text-sm">
            {activeSpecTab === 'speed' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Maximum Print Speed</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Up to 500 mm/s (Operational: 200 – 350 mm/s)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Maximum Acceleration</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold text-red-600">Up to 20,000 mm/s²</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Build Envelope (XYZ)</div>
                  <div className="sm:col-span-2 text-slate-900">350 × 350 × 350 mm (42.8 Liters)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Chamber Design</div>
                  <div className="sm:col-span-2 text-slate-900">Fully enclosed thermal chamber with transparent acrylic access doors</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Layer Resolution Range</div>
                  <div className="sm:col-span-2 text-slate-900">0.05 mm (50 µm) to 0.4 mm (400 µm)</div>
                </div>
              </>
            )}

            {activeSpecTab === 'kinematics' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Kinematic Architecture</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">High-Tension Precision CoreXY Structure</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Vibration Compensation</div>
                  <div className="sm:col-span-2 text-slate-900">Integrated ADXL345 Accelerometer with Active Input Shaping</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Linear Guide Rails</div>
                  <div className="sm:col-span-2 text-slate-900">Industrial hardened steel linear rails on X and Y axes</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Z-Axis System</div>
                  <div className="sm:col-span-2 text-slate-900">Dual synchronized lead screws with anti-backlash nuts</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Positional Repeatability</div>
                  <div className="sm:col-span-2 text-slate-900">X/Y: 10 µm, Z: 5 µm</div>
                </div>
              </>
            )}

            {activeSpecTab === 'extrusion' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Hotend Flow Capacity</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold text-red-600">32 mm³/s (Ceramic 360° Ring Heater Core)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Maximum Hotend Temp</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 300°C (All-Metal Bimetallic Heatbreak)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Print Bed Max Temp</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 110°C (High-wattage silicone mat with rapid heating)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Nozzle Sizes</div>
                  <div className="sm:col-span-2 text-slate-900">0.4 mm Standard (0.2, 0.6, 0.8 mm high-speed interchangeable)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Filament Diameter</div>
                  <div className="sm:col-span-2 text-slate-900">1.75 mm (Direct-Drive Dual-Gear Extruder)</div>
                </div>
              </>
            )}

            {activeSpecTab === 'software' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">AI Camera System</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Integrated 1080p HD camera with failure detection & time-lapse</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Display & Interface</div>
                  <div className="sm:col-span-2 text-slate-900">5-inch Full Color Capacitive Touch Screen</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Auto Bed Leveling</div>
                  <div className="sm:col-span-2 text-slate-900">Automated 36-point mesh leveling with dynamic Z-offset</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Connectivity</div>
                  <div className="sm:col-span-2 text-slate-900">Wi-Fi / Ethernet / USB Drive</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Compatible Slicers</div>
                  <div className="sm:col-span-2 text-slate-900">OrcaSlicer, PrusaSlicer, Cura, Simplify3D (High-speed profiles included)</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS
         ==================================================== */}
      <div ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-red-600" />
            <span>High Speed Buying Guide</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about high-speed CoreXY printing with the Pratham 3 Rapid.
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
          SECTION 8: BOTTOM CTA CARD
         ==================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>500 mm/s Additive Speed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Compress Iteration Cycles with Pratham 3 Rapid
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect with Leniva CAD Solutions technical experts today for technical datasheets, machine demonstrations, and customized financing options.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('Pratham 3 Rapid Deployment')}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Price & Demo</span>
            </button>
            <a
              href="/brochures/pratham-3-rapid.pdf"
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

export default Pratham3RapidPage
