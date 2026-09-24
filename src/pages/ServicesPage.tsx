import React from 'react'
import { Phone } from 'lucide-react'
import { services } from '../data/services'
import { ServiceCard } from '../components/ServiceCard'
import { useApp } from '../context/AppContext'

export const ServicesPage: React.FC = () => {
  const { openQuoteModal } = useApp()

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Engineering & Contract Additive Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Professional 3D Printing & Digital Manufacturing Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            From initial metrology 3D scanning and parametric reverse engineering to high-precision contract 3D printing and CAD training, Leniva CAD Solutions supports your complete product lifecycle.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openQuoteModal('Services Overview Quote')}
              className="px-6 py-2.5 bg-slate-950 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Upload CAD for Quotation
            </button>
            <button
              onClick={() => openQuoteModal('Services Technical Call')}
              className="px-6 py-2.5 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Speak with an Application Engineer</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Technical Workflow Overview */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Quality Assured</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Our 6-Step Engineering Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every job processed at our facility undergoes rigorous Design for Additive Manufacturing (DfAM) evaluation and metrology verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">1</span>
              <h4 className="text-sm font-bold text-white">CAD File Review</h4>
              <p className="text-slate-400">Geometry validation, wall thickness analysis, and tolerance feasibility audit.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">2</span>
              <h4 className="text-sm font-bold text-white">Process Selection</h4>
              <p className="text-slate-400">Selecting optimal technology (FDM, SLA, DLP) and polymer grade for thermal/mechanical load.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">3</span>
              <h4 className="text-sm font-bold text-white">Precision Slicing</h4>
              <p className="text-slate-400">Toolpath generation, support strategy, and orientation to minimize anisotropic stress.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">4</span>
              <h4 className="text-sm font-bold text-white">Industrial Manufacturing</h4>
              <p className="text-slate-400">Continuous chamber temperature regulation and layer-by-layer optical monitoring.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">5</span>
              <h4 className="text-sm font-bold text-white">Post-Processing</h4>
              <p className="text-slate-400">Solvent washing, UV curing, bead blasting, insert installation, and surface finishing.</p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">6</span>
              <h4 className="text-sm font-bold text-white">Inspection & Dispatch</h4>
              <p className="text-slate-400">Calibrated dimensional verification against nominal 3D CAD data before expedited dispatch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ServicesPage
