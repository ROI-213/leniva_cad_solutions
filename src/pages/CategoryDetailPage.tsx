import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  Phone,
} from 'lucide-react'
import { productCategories } from '../data/categories'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'
import DlpCategoryPage from './DlpCategoryPage'
import IndustrialLcdCategoryPage from './IndustrialLcdCategoryPage'
import ScannersCategoryPage from './ScannersCategoryPage'

interface CategoryDetailPageProps {
  forcedSlug?: string
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ forcedSlug }) => {
  const { categorySlug: paramSlug } = useParams<{ categorySlug: string }>()
  const slug = forcedSlug || paramSlug
  const { openQuoteModal } = useApp()

  if (slug === 'dlp-3d-printers' || slug === 'dlp') {
    return <DlpCategoryPage />
  }
  if (slug === 'industrial-lcd-3d-printers' || slug === 'lcd' || slug === 'industrial-lcd') {
    return <IndustrialLcdCategoryPage />
  }
  if (slug === '3d-scanners' || slug === 'scanners') {
    return <ScannersCategoryPage />
  }

  const category = productCategories.find(c => c.slug === slug)

  if (!category) {
    return <Navigate to="/products" replace />
  }

  // Find all products matching this category
  const categoryProducts = products.filter(p => p.categorySlug === slug)

  return (
    <div className="bg-slate-50 min-h-screen py-8 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{category.title}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-xl border border-slate-800">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <img
            src={category.heroBanner}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />

          <div className="relative z-20 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-400/30 text-red-400 text-xs font-bold uppercase tracking-wider rounded-md">
              {category.subtitle}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {category.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.description}
            </p>

            {slug === 'cad-software' && (
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Authorized Brand Portfolio:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/ares-cad.png" alt="ARES" className="h-full w-auto max-w-[70px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/grabert.png" alt="Graebert" className="h-full w-auto max-w-[70px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/sketchup.png" alt="Trimble SketchUp" className="h-full w-auto max-w-[75px] object-contain" />
                  </div>
                  <div className="h-7 px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <img src="/images/brands/chaos.jpg" alt="Chaos" className="h-full w-auto max-w-[65px] object-contain" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openQuoteModal(`${category.title} Category Inquiry`)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
              >
                Request Category Pricing
              </button>
              <button
                onClick={() => openQuoteModal(`${category.title} Technical Consultation`)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-colors flex items-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Talk to an Expert</span>
              </button>
            </div>
          </div>
        </div>


        {/* Product Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-950">
              {slug === 'cad-software' || category.slug === 'cad-software' || category.id === 'software'
                ? 'Available Softwares'
                : 'Available Models'}
            </h2>
            <span className="text-xs text-slate-500">
              Verified specifications and genuine manufacturer warranties
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom Consultation Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-red-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">
              {slug === 'cad-software' || category.slug === 'cad-software' || category.id === 'software'
                ? 'Uncertain Which Software Fits Your Requirements?'
                : 'Uncertain Which Model Fits Your Requirements?'}
            </h4>
            <p className="text-xs text-slate-300">
              {slug === 'cad-software' || category.slug === 'cad-software' || category.id === 'software'
                ? 'Our technical sales consultants provide licensing guidance, feature comparisons, and multi-seat enterprise quotations.'
                : 'Our application engineers provide benchmark print tests, build volume analysis, and total cost of ownership estimates.'}
            </p>
          </div>
          <button
            onClick={() => openQuoteModal(`${category.title} Engineering Benchmark`)}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 text-xs font-bold rounded-xl shrink-0 transition-colors"
          >
            Request Benchmark Part
          </button>
        </div>
      </div>
    </div>
  )
}
export default CategoryDetailPage
