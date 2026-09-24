import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Search,
  Heart,
  Eye,
  X,
  Star,
  ChevronRight,
  Package,
  ArrowRight,
} from 'lucide-react'
import { shopItems } from '../data/shop'
import { useApp } from '../context/AppContext'
import { ShopItem } from '../types'

interface ShopPageProps {
  forcedCategory?: string
}

export const ShopPage: React.FC<ShopPageProps> = ({ forcedCategory }) => {
  const { category: paramCategory } = useParams<{ category: any }>()
  const activeCategory = forcedCategory || paramCategory || 'all'

  const { toggleWishlist, isInWishlist, openQuoteModal } = useApp()

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [quickViewItem, setQuickViewItem] = useState<ShopItem | null>(null)

  useEffect(() => {
    if (forcedCategory) {
      setSelectedCategory(forcedCategory)
    } else if (paramCategory) {
      setSelectedCategory(paramCategory)
    }
  }, [forcedCategory, paramCategory])

  const categories = [
    { id: 'all', label: 'All Products & Equipment' },
    { id: 'fdm', label: 'FDM 3D Printers' },
    { id: 'dlp', label: 'DLP 3D Printers' },
    { id: 'lcd', label: 'Industrial LCD Printers' },
    { id: 'scanners', label: '3D Scanners' },
    { id: 'filaments', label: 'Standard Filaments' },
    { id: 'special-filaments', label: 'CarbonX Specialty Filaments' },
    { id: 'resin', label: '3D Printer Resins' },
    { id: 'accessories', label: 'Printer Accessories & Parts' },
  ]

  const filteredItems = useMemo(() => {
    return shopItems.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
      if (inStockOnly && !item.inStock) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          item.name.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [selectedCategory, inStockOnly, searchQuery])



  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">


        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-slate-900">Shop</Link>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-900 capitalize">{selectedCategory.replace('-', ' ')}</span>
            </>
          )}
        </nav>

        {/* Shop Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Hardware, Scanners & Consumables Catalog
            </span>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              3D Printers, 3D Scanners & Engineering Materials
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explore industrial Make3D additive machines, 3DeVOK metrology scanners, tested engineering filaments, and genuine replacement parts with PAN-India support.
            </p>
          </div>
          <div className="flex items-center space-x-6 text-xs text-slate-500 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div>
              <strong className="block text-slate-900 font-bold text-sm">Official Partner</strong>
              <span>Make3D & 3DeVOK authorized</span>
            </div>
            <div>
              <strong className="block text-slate-900 font-bold text-sm">PAN-India Service</strong>
              <span>On-site training & warranty</span>
            </div>
          </div>
        </div>

        {/* Shop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR FILTER */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Category
              </h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-red-50 text-red-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Only Checkbox */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700">In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID */}
          <main className="lg:col-span-9 space-y-6">
            {/* Search and Sort Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 3D printers, scanners, filaments, resins..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              </div>

              <div className="text-xs text-slate-500">
                Showing <strong className="text-slate-900 font-semibold">{filteredItems.length}</strong> items
              </div>
            </div>

            {/* Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => {
                  const inWishlist = isInWishlist(item.id)
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                    >
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-full h-full ${
                            item.isContain ? 'object-contain p-2' : 'object-cover'
                          } group-hover:scale-105 transition-transform duration-500`}
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded">
                            {item.categoryName}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white rounded shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Quick View & Wishlist Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col space-y-1.5 z-10">
                          <button
                            onClick={() =>
                              toggleWishlist({
                                id: item.id,
                                type: 'shop',
                                name: item.name,
                                slug: item.slug,
                                image: item.image,
                                category: item.categoryName,
                                price: item.price,
                              })
                            }
                            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                              inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-slate-500 hover:bg-white'
                            }`}
                            aria-label="Toggle wishlist"
                          >
                            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => setQuickViewItem(item)}
                            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-red-600 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                            aria-label="Quick preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold text-slate-800 text-[11px]">{item.rating}</span>
                            <span className="text-slate-400 text-[10px]">({item.reviewsCount})</span>
                          </div>
                          {item.productSlug ? (
                            <Link to={`/products/${item.productSlug}`}>
                              <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
                                {item.name}
                              </h4>
                            </Link>
                          ) : (
                            <h4 className="text-sm font-bold text-slate-950 group-hover:text-red-600 transition-colors line-clamp-2">
                              {item.name}
                            </h4>
                          )}
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {item.shortDescription}
                          </p>
                        </div>

                        <div>
                          {/* Action Button — Request Quote only */}
                          <div className="pt-3">
                            <button
                              onClick={() => openQuoteModal(item.name)}
                              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                            >
                              <span>Request Quote</span>
                            </button>
                            {item.productSlug && (
                              <Link
                                to={`/products/${item.productSlug}`}
                                className="mt-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                              >
                                <span>View Specs</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <Package className="w-10 h-10 mx-auto text-slate-300" />
                <h4 className="text-base font-bold text-slate-900">No items match your filter criteria</h4>
                <p className="text-xs text-slate-500">Try selecting another category or clearing the search query.</p>
              </div>
            )}
          </main>
        </div>

        {/* QUICK VIEW MODAL */}
        {quickViewItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setQuickViewItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">Quick Preview</span>
                <button
                  onClick={() => setQuickViewItem(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-3">
                  <img
                    src={quickViewItem.image}
                    alt={quickViewItem.name}
                    className={`w-full h-full ${
                      quickViewItem.isContain ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {quickViewItem.categoryName} • {quickViewItem.brand}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950">{quickViewItem.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{quickViewItem.shortDescription}</p>

                    {/* Quick Specs */}
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      {Object.entries(quickViewItem.specifications).slice(0, 4).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{k}:</span>
                          <span className="font-semibold text-slate-800">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        setQuickViewItem(null)
                        openQuoteModal(quickViewItem.name)
                      }}
                      className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Request Quote</span>
                    </button>
                    {quickViewItem.productSlug && (
                      <Link
                        to={`/products/${quickViewItem.productSlug}`}
                        onClick={() => setQuickViewItem(null)}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <span>View Full Details</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShopPage
