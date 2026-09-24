import React, { useState, useMemo } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'

export const ProductsPage: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured')

  // Derive unique technologies and brands
  const technologies = useMemo(() => {
    return Array.from(new Set(products.map(p => p.technology)))
  }, [])

  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand)))
  }, [])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedTech !== 'all' && p.technology !== selectedTech) return false
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.technology.toLowerCase().includes(q)
          )
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        }
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
        return 0
      })
  }, [selectedTech, selectedBrand, searchQuery, sortBy])

  const resetFilters = () => {
    setSelectedTech('all')
    setSelectedBrand('all')
    setSearchQuery('')
    setSortBy('featured')
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">Hardware & Software Directory</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            3D Printers & Digital Manufacturing Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Explore professional additive manufacturing technologies for prototyping, engineering, production and specialized applications.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search models, specs, or technologies..."
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
            </div>

            {/* Filter Dropdowns and Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end text-xs">
              {/* Technology Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Tech:</span>
                <select
                  value={selectedTech}
                  onChange={e => setSelectedTech(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-slate-800"
                >
                  <option value="all">All Technologies</option>
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-slate-800"
                >
                  <option value="all">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center space-x-1.5">
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-slate-800"
                >
                  <option value="featured">Featured First</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              {(selectedTech !== 'all' || selectedBrand !== 'all' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center space-x-1"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Technology Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => setSelectedTech('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                selectedTech === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Systems ({products.length})
            </button>
            {technologies.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium ${
                  selectedTech === tech
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> engineering solutions</span>
          <span>Verified Make3D Hardware & Official Leniva CAD Portfolio</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-base font-bold text-slate-800">No products match your current filter selections.</p>
            <p className="text-xs text-slate-500">Try broadening your search query or reset your filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductsPage
