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
  Maximize2,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const Pratham6Page: React.FC = () => {
  const { openQuoteModal } = useApp()

  // Interactive State
  const [activeSpecTab, setActiveSpecTab] = useState<'build' | 'servos' | 'extrusion' | 'software'>('build')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedMaterial, setSelectedMaterial] = useState<string>('CF-ABS')

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
    document.title = 'Pratham 6.0 Industrial 3D Printer | 600×600×600 mm Closed-Loop Hybrid Servos | Leniva CAD Solutions'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Pratham 6.0 is a 600×600×600 mm (216 Liters) industrial production FDM 3D printer featuring closed-loop hybrid servo motors with optical encoders, 350°C high-temp extrusion, and integrated filament dry box.'
      )
    }

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Pratham 6.0 Industrial 3D Printer',
      image: 'https://lenivacadsolution.com/images/products/pratham-6-0.png',
      description:
        'Pratham 6.0 is an industrial large-format FDM 3D printer with 600 × 600 × 600 mm (216L) build envelope, optical encoder closed-loop servo motors, and 350°C high-temperature extrusion.',
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
    'CF-ABS': {
      title: 'CarbonX CF-ABS (Carbon Fiber Reinforced ABS)',
      bedTemp: '105 – 115 °C',
      nozzleTemp: '250 – 275 °C',
      desc: 'High stiffness, exceptional strength-to-weight ratio, and zero warping. The 350°C hardened hotend easily extrudes abrasive carbon fibers across massive 600mm structural parts.',
      advantage: 'Ideal for automotive brackets, drone chassis, and structural manufacturing jigs.',
    },
    Nylon: {
      title: 'PA6 / PA12 (Industrial Polyamide & Carbon-Nylon)',
      bedTemp: '100 – 120 °C',
      nozzleTemp: '270 – 310 °C',
      desc: 'Extreme chemical endurance, impact resistance, and cyclic fatigue resilience. Supported by Pratham 6.0 integrated active dry box to prevent moisture absorption during multi-day prints.',
      advantage: 'Heavy-duty industrial gears, intake manifolds, snap-fits, and production tools.',
    },
    PC: {
      title: 'Polycarbonate (PC & PC-ABS Blends)',
      bedTemp: '110 – 120 °C',
      nozzleTemp: '280 – 320 °C',
      desc: 'Crystal-clear impact toughness and high thermal heat deflection over 110°C. Fully enclosed thermally stabilized chamber prevents layer splitting on large industrial cross-sections.',
      advantage: 'High-voltage electrical switchgear enclosures, aerospace ducts, and transparent covers.',
    },
    PETG: {
      title: 'Industrial PETG / PETG-ESD',
      bedTemp: '75 – 90 °C',
      nozzleTemp: '235 – 255 °C',
      desc: 'Impervious to oils, lubricants, and mild acids. Delivers high dimensional stability and superior interlayer adhesion across large volume batch manufacturing.',
      advantage: 'Fluid delivery reservoirs, factory plant fixtures, and electro-static discharge trays.',
    },
    TPU: {
      title: 'Industrial Elastomers (TPU 95A / 85A / 64D)',
      bedTemp: '50 – 65 °C',
      nozzleTemp: '220 – 245 °C',
      desc: 'High-torque direct-drive dual-drive gear feeding delivers reliable extrusion of elastomeric filaments without buckling or under-extrusion.',
      advantage: 'Custom damping pads, heavy robotic end-effector grippers, and automotive sealing boots.',
    },
  }

  const faqs = [
    {
      q: 'Why are Closed-Loop Hybrid Servos critical for a 600 × 600 × 600 mm 3D printer?',
      a: 'On a large-format 600mm printer, print heads and gantries carry significant momentum during rapid accelerations. Traditional open-loop stepper motors can lose steps if encountering resistance, which ruins a 60-hour print. Pratham 6.0 uses hybrid closed-loop servos with high-resolution optical encoders that monitor real-time position 20,000 times per second, guaranteeing zero lost steps and eliminating layer shifting.',
    },
    {
      q: 'What is the advantage of the 216-Liter monolithic print envelope?',
      a: 'A 600mm cubic envelope (216 Liters) enables full-scale industrial component manufacturing such as foundry sand casting masters, automotive bumpers, HVAC ducting assemblies, and industrial machinery housings in a single continuous printing cycle without sectioning.',
    },
    {
      q: 'How does the Integrated Filament Dry Box operate?',
      a: 'Engineering polymers such as Nylon, CF-Nylon, and Polycarbonate degrade rapidly when exposed to ambient humidity. Pratham 6.0 features a dedicated sealed multi-spool dry cabinet that actively circulates desiccated warm air, keeping hygroscopic engineering filaments bone dry throughout 100-hour continuous print jobs.',
    },
    {
      q: 'Can the hotend reach 350°C safely?',
      a: 'Yes. Pratham 6.0 features an all-metal bimetallic heatbreak with copper-alloy heater block, high-precision PT1000 thermocouple, and high-wattage cartridge rated for continuous operation up to 350°C. This unlocks engineering filaments including PA-CF, PC, high-temp ABS, and composite polymers.',
    },
    {
      q: 'Does Leniva CAD Solutions provide on-site setup and operator certification?',
      a: 'Yes. Our experienced field engineers handle complete on-site machine commissioning, leveling verification, slicer software installation on company workstations, and comprehensive operator training covering maintenance and material optimization.',
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
            <span className="text-sm font-black text-slate-950 tracking-tight">Pratham 6.0</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              600 × 600 × 600 mm
            </span>
            <span className="hidden md:inline-block text-xs font-bold text-slate-500">
              216 Liters • Closed-Loop Servos
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
              Servo Dynamics
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
              href="/brochures/pratham-6.pdf"
              download
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Brochure</span>
            </a>
            <button
              onClick={() => openQuoteModal('Pratham 6.0 Industrial 3D Printer')}
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
          <span className="text-slate-900 font-bold">Pratham 6.0</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold text-red-800 tracking-wide uppercase">
                Closed-Loop Hybrid Servo Production System
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Pratham 6.0 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                600 × 600 × 600 mm
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Designed for demanding 24/7 manufacturing environments, the Pratham 6.0 delivers 
              a colossal <strong>216-liter build volume</strong>. Powered by optical-encoder closed-loop hybrid 
              servos, 350°C high-temperature extrusion, and an active filament dry cabinet, it guarantees 
              fail-safe accuracy on long multi-day industrial production runs.
            </p>

            {/* Key Specs Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Build Volume</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">600³ mm</div>
                <div className="text-[11px] font-semibold text-red-600">216 Liters Envelope</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Motion Control</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">Closed-Loop</div>
                <div className="text-[11px] font-semibold text-emerald-600">Optical Encoders</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hotend Thermal</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">350°C Max</div>
                <div className="text-[11px] font-semibold text-amber-600">Carbon & PC Ready</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Filament Bay</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">Integrated Dry</div>
                <div className="text-[11px] font-semibold text-blue-600">Active Dehumidifier</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openQuoteModal('Pratham 6.0 Industrial 3D Printer')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Request Price & Technical Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/brochures/pratham-6.pdf"
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
                <span>Zero Layer Shift Guarantee</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Factory className="w-4 h-4 text-red-600" />
                <span>Industrial Plant Grade • Continuous 24/7 Duty</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Turnkey On-Site Deployment & Training</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Machine Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-3xl p-8 border border-slate-200/80 shadow-xl overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <img
                src="/images/products/pratham-6-0.png"
                alt="Pratham 6.0 Industrial 3D Printer"
                className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />

              <div className="mt-4 flex items-center justify-between text-xs font-mono font-bold text-slate-500 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200">
                <span className="flex items-center space-x-1.5">
                  <Box className="w-3.5 h-3.5 text-red-600" />
                  <span>Envelope: 600 × 600 × 600 mm</span>
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  Production Heavy
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
            <span>Production Heavy Engineering</span>
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            Built for Extreme Industrial Throughput and Dimensional Precision
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered from ground up to solve the vibration, thermal shrinkage, and inertia challenges of large 600mm additive manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Optical Encoder Closed-Loop Servos</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time closed-loop position monitoring eliminates step loss completely. If an external nozzle collision or resistance occurs, the servos apply instant torque correction in microseconds.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero ruined prints from lost steps on 80+ hour jobs</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Whisper-quiet high-torque operation</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">350°C High-Temp Extruder</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Industrial bimetallic hotend rated up to 350°C paired with an abrasion-resistant hardened nozzle allows printing high-performance engineering thermoplastics without wear.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Handles CarbonX CF-ABS, Nylon PA12-CF, PC, and blends</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>High melt rate sustains continuous large-nozzle output</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">Integrated Multi-Spool Dry Cabinet</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Keep your sensitive engineering spools protected from ambient humidity. The integrated active heating dry box ensures dry filament feed directly into the enclosed chamber.
            </p>
            <ul className="space-y-2 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eliminates moisture bubbling, brittleness & stringing</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Holds up to 4 large 5kg / 2.5kg spools simultaneously</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================================================
          SECTION 3: SERVO DYNAMICS & CHASSIS ARCHITECTURE
         ==================================================== */}
      <div ref={mechanicsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Motion Science</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                High-Inertia Control for 600 mm Structural Precision
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Moving a print head across 600 mm spans requires overcoming substantial inertia. 
                Pratham 6.0 combines industrial hybrid servos with high-rigidity linear guideways and 
                a massive tubular steel chassis to absorb harmonic resonance and deliver mirror-smooth surface finishes.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-red-400" />
                    <span>Optical Feedback Loop</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Continuous 1000-line optical encoder feedback calculates position error and applies dynamic corrective current to the motor stator in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Synchronized Z-Axis Drive</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Quad industrial ball screws synchronized with high-torque geared motors ensure the heavy 600×600 mm heated build table maintains plane flatness without tilting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>UPS Power Interruption Defense</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Integrates seamlessly with industrial online UPS systems and features automated resume-on-interruption firmware memory.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Applications Portfolio</span>
                  <span className="px-2 py-0.5 rounded-md bg-red-600/30 text-red-300 text-[11px] font-bold">216L Envelope</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Foundry Masters</div>
                    <div className="text-slate-400 mt-0.5">Engine blocks, pump housings & valves for sand casting</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Automotive & Aerospace</div>
                    <div className="text-slate-400 mt-0.5">Air intake ducts, aerodynamic spoilers & seat framing</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Factory Automation</div>
                    <div className="text-slate-400 mt-0.5">Heavy robotic arm grippers & pick-and-place end-effectors</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/60">
                    <div className="font-bold text-white">Industrial Housings</div>
                    <div className="text-slate-400 mt-0.5">IP65 electrical control boxes & outdoor instrument pods</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/60 to-slate-800/90 border border-red-500/30 space-y-3">
                <div className="text-sm font-bold text-white">Book a Benchmark Print on Pratham 6.0</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Send your CAD drawing to Leniva CAD Solutions. We will run a benchmark print on our factory machine and ship the physical sample to your facility.
                </p>
                <button
                  onClick={() => openQuoteModal('Pratham 6.0 Benchmark')}
                  className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Request Benchmark Sample Print
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
            High-Performance Materials Supported by Pratham 6.0
          </h2>
          <p className="text-slate-600 text-sm">
            Full support for continuous carbon-reinforced composites, polyamides, polycarbonates, and standard engineering polymers.
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
            Pratham 6.0 Technical Specifications
          </h2>
          <p className="text-slate-600 text-sm">
            Complete technical specifications for the Pratham 6.0 large-format industrial 3D printer.
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
              onClick={() => setActiveSpecTab('servos')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeSpecTab === 'servos'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Drive & Servos
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
                  <div className="sm:col-span-2 text-slate-900 font-semibold">600 × 600 × 600 mm (216 Liters)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Heated Bed System</div>
                  <div className="sm:col-span-2 text-slate-900">High-wattage multi-zone AC silicone heating with cast tooling aluminum sub-plate</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Max Bed Temperature</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 120°C (Rapid uniform thermal saturation)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Build Surface Plate</div>
                  <div className="sm:col-span-2 text-slate-900">10 mm Cast Tooling Aluminum Plate + Textured Magnetic Spring Steel PEI Sheet</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Auto Bed Leveling</div>
                  <div className="sm:col-span-2 text-slate-900">High-precision inductive sensor matrix mapping 36 individual points</div>
                </div>
              </>
            )}

            {activeSpecTab === 'servos' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Motion Drive Motors</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Industrial Closed-Loop Hybrid Servos with 1000-line optical encoders</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Linear Guides</div>
                  <div className="sm:col-span-2 text-slate-900">Hiwin Heavy-Duty Linear Motion Guide Rails on X, Y, and Z axes</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Z-Axis Stabilization</div>
                  <div className="sm:col-span-2 text-slate-900">Quad Ground Industrial Ball Screws synchronized via dual heavy geared motors</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Positioning Accuracy</div>
                  <div className="sm:col-span-2 text-slate-900">X-Y: 10 Microns (0.01 mm), Z: 2.5 Microns (0.0025 mm)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Max Travel Speed</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 150 mm/sec (Operational printing: 40 – 120 mm/s)</div>
                </div>
              </>
            )}

            {activeSpecTab === 'extrusion' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Extruder Type</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">Direct-Drive High-Torque Dual-Drive Hardened Steel Gears</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Max Hotend Temp</div>
                  <div className="sm:col-span-2 text-slate-900">Up to 350°C (All-metal titanium heatbreak + copper-alloy heater block)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Nozzle Sizes</div>
                  <div className="sm:col-span-2 text-slate-900">0.4 mm, 0.6 mm, 0.8 mm, 1.0 mm, 1.2 mm (Standard: 0.6 mm Hardened Steel)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Filament Cabinet</div>
                  <div className="sm:col-span-2 text-slate-900">Integrated sealed multi-spool dry cabinet with active thermostatic dehumidifier</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Layer Resolution</div>
                  <div className="sm:col-span-2 text-slate-900">0.08 mm to 0.8 mm (80 to 800 microns)</div>
                </div>
              </>
            )}

            {activeSpecTab === 'software' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">User Interface</div>
                  <div className="sm:col-span-2 text-slate-900 font-semibold">7-inch Full Color Industrial Capacitive Touch Screen</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Compatible Slicers</div>
                  <div className="sm:col-span-2 text-slate-900">Simplify3D, PrusaSlicer, Cura, OrcaSlicer (Pre-tuned profiles supplied)</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Supported Formats</div>
                  <div className="sm:col-span-2 text-slate-900">STL, STEP, OBJ, 3MF, G-Code</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50">
                  <div className="font-bold text-slate-700">Machine Weight & Frame</div>
                  <div className="sm:col-span-2 text-slate-900">Welded tubular steel industrial chassis (~185 KG) with vibration dampening pads</div>
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
            Essential information regarding the Pratham 6.0 large-format industrial 3D printer.
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
              <span>Industrial Production Ready</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Bring 216-Liter Monolithic Additive Manufacturing to Your Plant
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connect with Leniva CAD Solutions technical experts today for technical datasheets, machine demonstrations, and customized financing options.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openQuoteModal('Pratham 6.0 Deployment')}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Request Price & Demo</span>
            </button>
            <a
              href="/brochures/pratham-6.pdf"
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

export default Pratham6Page
