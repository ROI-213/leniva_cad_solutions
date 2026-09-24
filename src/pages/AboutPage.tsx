import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Cpu,
  Workflow,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export const AboutPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Section */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md border border-red-400/30">
              Corporate Overview
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Engineering Technology for the Next Generation of Design
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Leniva CAD Solutions bridges the transition from traditional 2D drafting and prototyping to advanced 3D parametric engineering, optical metrology, and high-throughput additive manufacturing.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => openQuoteModal('About Page Consultation')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
              >
                Schedule Engineering Consultation
              </button>
              <Link
                to="/contact"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
              >
                Contact Our Offices
              </Link>
            </div>
          </div>
        </div>

        {/* Who We Are & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Our Identity</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Who We Are
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Headquartered in Bengaluru with support engineers operating across major Indian manufacturing corridors, Leniva CAD Solutions is an engineering technology provider. We specialize in official CAD and rendering software deployment, 3D laser/optical metrology scanners, and industrial 3D printing equipment.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Rather than merely acting as an equipment reseller, our core engineering team partners with automotive suppliers, aerospace contractors, architectural studios, and educational labs to solve practical production challenges through Design for Additive Manufacturing (DfAM) and reverse engineering.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Authentic Licensing</strong>
                <span className="text-slate-500">Official Trimble SketchUp and Chaos V-Ray partners</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">On-Site Commissioning</strong>
                <span className="text-slate-500">Every machine calibrated by field engineers</span>
              </div>
            </div>
          </div>

          <div className="aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
            <img
              src="/images/about/about-leniva-poster.jpg"
              alt="Leniva CAD Solutions — Your Partner for Advanced 3D Solutions"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Technology Portfolio & Solutions Grid */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Complete Capability</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
              Our Technology Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              End-to-end integration covering software, hardware, metrology, and consumables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Cpu className="w-8 h-8 text-red-600" />
              <h3 className="text-base font-bold text-slate-900">Additive Manufacturing Hardware</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pratham high-speed FDM systems (up to 1-meter cubic volume), EKA micro-precision DLP/LCD resin printers, and ZRapid industrial large-format laser SLA printers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">3D Scanning & Metrology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                EinScan multi-functional scanners and 3DeVOK high-accuracy blue-light inspection scanners for non-contact GD&T inspection and legacy CAD reconstruction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <Workflow className="w-8 h-8 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">CAD & Visualization Software</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trimble SketchUp Pro, Chaos Enscape real-time VR, Chaos V-Ray & Corona rendering engines, and QuickSurface parametric scan-to-CAD software.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Support Commitment */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Customer Commitment</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Technical Support & Service Level Agreement
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We understand that downtime in an additive production cell directly impacts client delivery. Every hardware deployment is supported by genuine spare parts inventory in India and factory-trained technical support engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">1-Year Warranty</h4>
              <p className="text-[11px] text-slate-500 mt-1">Full parts and labor warranty on all industrial additive hardware.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Operator Training</h4>
              <p className="text-[11px] text-slate-500 mt-1">Hands-on machine and software training during installation.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Direct Helpline</h4>
              <p className="text-[11px] text-slate-500 mt-1">Dedicated phone, WhatsApp, and email technical support desks.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Genuine Spares</h4>
              <p className="text-[11px] text-slate-500 mt-1">Local inventory of hotends, nozzles, belts, and laser optics.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutPage
