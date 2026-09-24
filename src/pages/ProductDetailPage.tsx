import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ChevronRight,
  CheckCircle,
  Phone,
  Share2,
  Heart,
  Download,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { useApp } from '../context/AppContext'

interface ProductDetailPageProps {
  forcedSlug?: string
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ forcedSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const slug = forcedSlug || paramSlug
  const { openQuoteModal, toggleWishlist, isInWishlist } = useApp()

  const slugAliases: Record<string, string> = {
    'pratham-6-0': 'pratham-6',
    'pratham-5-0': 'pratham-5',
    'pratham-3-0': 'pratham-3',
    'pratham6': 'pratham-6',
    'pratham5': 'pratham-5',
    'pratham3': 'pratham-3',
    'pratham-6.0': 'pratham-6',
    'pratham-5.0': 'pratham-5',
    'pratham-3.0': 'pratham-3',
  }
  const resolvedSlug = slug ? (slugAliases[slug.toLowerCase()] || slug.toLowerCase()) : ''

  // Find product by slug or id or alias
  const product = products.find(
    p => p.slug.toLowerCase() === resolvedSlug || p.id.toLowerCase() === resolvedSlug
  )

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'specs' | 'applications' | 'materials' | 'who'>('overview')
  const [copiedLink, setCopiedLink] = useState(false)

  const inWishlist = isInWishlist(product.id)

  // Find related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.categorySlug === product.categorySlug || product.relatedProductSlugs?.includes(p.slug)))
    .slice(0, 3)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/products/${product.categorySlug}`} className="hover:text-slate-900 transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">{product.name}</span>
        </nav>

        {/* Product Main Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
              <img
                src={product.images[activeImageIndex] || product.heroImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-md">
                {product.technology}
              </span>
              {product.isNew && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold uppercase rounded-md shadow">
                  New Release
                </span>
              )}
            </div>

            {/* Thumbnail Selector */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-red-600 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information & Quotation CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  {product.brand}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
                    title="Share link"
                  >
                    <Share2 className="w-4 h-4" />
                    {copiedLink && (
                      <span className="absolute -top-7 right-0 text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      toggleWishlist({
                        id: product.id,
                        type: 'product',
                        name: product.name,
                        slug: product.slug,
                        image: product.heroImage,
                        category: product.category,
                        isQuoteRequired: true,
                      })
                    }
                    className={`p-2 rounded-lg transition-colors ${
                      inWishlist ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:bg-slate-100'
                    }`}
                    title="Save to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-red-600 mt-1">{product.tagline}</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Key Specs Pills Grid */}
              {product.keySpecs && product.keySpecs.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Performance Highlights
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {product.keySpecs.map((s, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <div className="text-slate-400 font-medium text-[10px] uppercase">{s.label}</div>
                        <div className="font-bold text-slate-800 text-xs mt-0.5 truncate">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Callouts */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openQuoteModal(`${product.name} Quotation Request`)}
                  className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all text-center"
                >
                  Request Quotation & Demo
                </button>

                <button
                  onClick={() => openQuoteModal(`${product.name} Technical Support Call`)}
                  className="py-3.5 px-5 border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Talk to an Expert</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>1-Year Official Warranty & PAN-India Field Support</span>
                </div>
                <button
                  onClick={() => openQuoteModal(`${product.name} Brochure Request`)}
                  className="text-red-600 font-semibold hover:underline flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Features, Specifications, Applications, Materials */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          {/* Tabs Navigation */}
          <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'features' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'specs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'applications' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Applications
            </button>
            {product.materials && (
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === 'materials' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Materials
              </button>
            )}
            {product.whoIsItFor && (
              <button
                onClick={() => setActiveTab('who')}
                className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === 'who' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Who Is It For?
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-4xl text-sm leading-relaxed text-slate-700">
              <h3 className="text-xl font-bold text-slate-950">Detailed System Overview</h3>
              <p>{product.description}</p>
              <div className="bg-red-50/60 p-5 rounded-2xl border border-red-100 space-y-2">
                <div className="flex items-center space-x-2 text-red-800 font-bold text-xs">
                  <Info className="w-4 h-4" />
                  <span>Engineering Notice</span>
                </div>
                <p className="text-xs text-red-900">
                  All machine installations by Leniva CAD Solutions include complete on-site commissioning, leveling calibration, operator software training, and sample benchmark print validation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: KEY FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-950">Engineered Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS TABLE */}
          {activeTab === 'specs' && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-950">Verified Technical Specifications</h3>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="py-3 px-4 font-bold text-slate-700 w-1/3 border-r border-slate-100">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-slate-900 font-medium">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-950">Proven Industrial Applications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center space-x-2.5">
                    <span className="w-2 h-2 bg-red-600 rounded-full" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MATERIALS */}
          {activeTab === 'materials' && product.materials && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-950">Compatible Material Formulations</h3>
              <div className="flex flex-wrap gap-2.5">
                {product.materials.map((mat, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200">
                    {mat}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 pt-2">
                Need specialized materials? Leniva also tests and validates specialty third-party engineering polymers and certified castable formulations.
              </p>
            </div>
          )}

          {/* TAB 6: WHO IS IT FOR? */}
          {activeTab === 'who' && product.whoIsItFor && (
            <div className="space-y-4 max-w-4xl">
              <h3 className="text-xl font-bold text-slate-950">Target Professionals & Teams</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.whoIsItFor.map((user, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{user}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Related & Complementary Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProductDetailPage
