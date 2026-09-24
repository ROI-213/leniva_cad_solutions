import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Info,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import { materialsData } from '../data/materials'
import { useApp } from '../context/AppContext'

interface MaterialsPageProps {
  forcedCategory?: 'filaments' | 'resins' | 'accessories'
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ forcedCategory }) => {
  const [activeCategory, setActiveCategory] = useState<'filaments' | 'resins' | 'accessories'>(
    forcedCategory || 'filaments'
  )
  const { openQuoteModal } = useApp()

  const currentSection = materialsData.find(m => m.category === activeCategory) || materialsData[0]

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Engineering Materials & Consumables</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Technical Polymer Guide</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            3D Printing Materials & Specifications
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            A comprehensive reference for engineering thermoplastics, functional photopolymer resins, and precision printer accessories. Verified print temperatures, tensile strengths, and industrial applications.
          </p>

          <div className="pt-2 flex items-center space-x-3">
            <Link
              to="/shop"
              className="px-6 py-2.5 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Purchase Materials in Shop</span>
            </Link>
            <button
              onClick={() => openQuoteModal('Bulk Material Quotation')}
              className="px-6 py-2.5 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Bulk Material Pricing
            </button>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center space-x-3 border-b border-slate-200 pb-2">
          {materialsData.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-5 py-3 text-xs font-bold rounded-xl transition-all ${
                activeCategory === cat.category
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Section Intro */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-950">{currentSection.title}</h2>
          <p className="text-xs sm:text-sm text-slate-600">{currentSection.description}</p>
        </div>

        {/* Technical Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSection.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-950">{item.name}</h3>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.properties}
                </p>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  {item.printTemp && (
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase block">Nozzle Temp</span>
                      <strong className="text-slate-800 text-[11px] font-semibold">{item.printTemp}</strong>
                    </div>
                  )}
                  {item.bedTemp && (
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase block">Bed Temp</span>
                      <strong className="text-slate-800 text-[11px] font-semibold">{item.bedTemp}</strong>
                    </div>
                  )}
                  {item.tensileStrength && (
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 col-span-2">
                      <span className="text-slate-400 text-[10px] uppercase block">Tensile Strength</span>
                      <strong className="text-slate-800 text-[11px] font-semibold">{item.tensileStrength}</strong>
                    </div>
                  )}
                </div>

                <div className="text-xs pt-1 space-y-1">
                  <div>
                    <strong className="text-slate-800 font-semibold">Recommended Use: </strong>
                    <span className="text-slate-500">{item.applications}</span>
                  </div>
                  <div>
                    <strong className="text-slate-800 font-semibold">Color / Surface: </strong>
                    <span className="text-slate-500">{item.colorOrFinish}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/shop"
                  className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <span>Check Shop Stock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => openQuoteModal(`${item.name} Material Enquiry`)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Request Technical Datasheet
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Storage and Handling Best Practices Advisory */}
        <div className="bg-red-950 text-white rounded-3xl p-8 sm:p-10 border border-red-900 space-y-4">
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Industrial Handling Advisory</span>
          </div>
          <h3 className="text-xl font-bold">Storage & Quality Assurance Protocols</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            All filaments supplied by Leniva CAD Solutions are dried and hermetically sealed with desiccant packs. Hygroscopic materials like Nylon, TPU, and CarbonX should be stored in dry boxes (&lt; 20% relative humidity) to prevent hydrolytic degradation during printing.
          </p>
        </div>
      </div>
    </div>
  )
}
export default MaterialsPage
