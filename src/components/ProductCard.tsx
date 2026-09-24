import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Product } from '../types'
import { useApp } from '../context/AppContext'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openQuoteModal, toggleWishlist, isInWishlist } = useApp()
  const inWishlist = isInWishlist(product.id)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Card Image Container */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <img
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-sm text-white rounded-md shadow-sm">
            {product.technology}
          </span>
          {product.isNew && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-md shadow-sm">
              New Launch
            </span>
          )}
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white rounded-md shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist({
              id: product.id,
              type: 'product',
              name: product.name,
              slug: product.slug,
              image: product.heroImage,
              category: product.category,
              isQuoteRequired: true,
            })
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 shadow'
              : 'bg-white/80 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
            {product.brand}
          </div>
          <Link to={`/products/${product.slug}`} className="block mt-0.5">
            <h3 className="text-base font-bold text-slate-950 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specs Tags */}
          {product.keySpecs && product.keySpecs.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
              {product.keySpecs.slice(0, 2).map((s, idx) => (
                <div key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                  <div className="text-slate-400 font-medium text-[10px]">{s.label}</div>
                  <div className="font-semibold text-slate-800 truncate">{s.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="flex-1 py-2 px-3 text-center text-xs font-semibold text-slate-700 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-lg transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => openQuoteModal(product.name)}
            className="flex-1 py-2 px-3 text-center text-xs font-bold text-white bg-slate-900 hover:bg-red-600 rounded-lg shadow-sm transition-colors"
          >
            Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard
