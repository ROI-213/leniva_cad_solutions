import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Phone,
  Mail,
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Printer,
  Layers,
  Box,
  Scan,
  Home,
  BookOpen,
  User,
  PhoneCall,
  ShieldCheck,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
  Target,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { siteConfig } from '../data/siteConfig'

export const Header: React.FC = () => {
  const { cartCount, wishlistCount, openQuoteModal, openSearchModal } = useApp()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [activeMegaCategory, setActiveMegaCategory] = useState<'fdm' | 'dlp' | 'lcd' | 'scanners'>('fdm')
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null)

  const location = useLocation()

  // Track scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMegaMenu(null)
  }, [location])

  interface MegaProduct {
    name: string
    slug: string
    spec: string
    badge?: string
  }

  interface MegaCategory {
    id: 'fdm' | 'dlp' | 'lcd' | 'scanners'
    label: string
    icon: any
    route: string
    description: string
    products: MegaProduct[]
  }

  const megaCategories: MegaCategory[] = [
    {
      id: 'fdm' as const,
      label: 'FDM 3D Printers',
      icon: Printer,
      route: '/products/fdm-3d-printers',
      description: 'Industrial and desktop FDM systems with build volumes up to 1 meter.',
      products: [
        { name: 'Pratham Mini', slug: 'pratham-mini', spec: '170 × 170 × 170 mm' },
        { name: 'Pratham Desktop', slug: 'pratham-desktop', spec: '200 × 200 × 250 mm' },
        { name: 'Pratham 3.0', slug: 'pratham-3', spec: '300 × 300 × 300 mm' },
        { name: 'Pratham 5.0', slug: 'pratham-5', spec: '500 × 500 × 500 mm' },
        { name: 'Pratham 6.0', slug: 'pratham-6', spec: '600 × 600 × 600 mm' },
        { name: 'Pratham X', slug: 'pratham-x', spec: '1000 × 1000 × 1000 mm (1 m³)' },
        { name: 'Pratham 3 Rapid', slug: 'pratham-3-rapid', spec: '500 mm/s High Speed', badge: 'Featured' },
      ],
    },
    {
      id: 'dlp' as const,
      label: 'DLP 3D Printers',
      icon: Layers,
      route: '/products/dlp-3d-printers',
      description: 'High-precision resin systems for jewellery casting and ultra-fine precision.',
      products: [
        { name: 'EKA HT', slug: 'eka-ht', spec: 'Jewellery Direct Casting' },
        { name: 'EKA XL', slug: 'eka-xl', spec: 'Large Format Jewellery' },
        { name: 'EKA XLE', slug: 'eka-xle', spec: 'Engineering Precision' },
      ],
    },
    {
      id: 'lcd' as const,
      label: 'Industrial LCD',
      icon: Box,
      route: '/products/industrial-lcd-3d-printers',
      description: 'Ultra-high resolution 8K–16K monochrome masking arrays.',
      products: [
        { name: 'EKA GT MAX', slug: 'eka-gt-max', spec: 'Engineering LCD Production' },
        { name: 'EKA F1 16K', slug: 'eka-f1-16k', spec: '16K Ultra-Fine Detailing', badge: '16K Micro' },
      ],
    },
    {
      id: 'scanners' as const,
      label: '3D Scanners',
      icon: Scan,
      route: '/products/3d-scanners',
      description: 'Metrology-grade optical and laser scanners for reverse engineering and inspection.',
      products: [
        { name: '3DeVOK MQ Color Scanner', slug: '3devok-mq', spec: '0.08 mm • 24-Bit Color • Wireless Ready', badge: 'Color 3D' },
        { name: '3DeVOK MT Metrology Scanner', slug: '3devok-mt', spec: '0.04 mm • 34 Blue + 22 IR Lasers', badge: 'Flagship' },
        { name: 'EINSCAN 3D Scanner', slug: 'einscan', spec: 'SPV2, TranScan C, Einstar, H2, HX, Pro HD', badge: '7 Models' },
      ],
    },
  ]



  const shopLinks = [
    { name: 'Shop All Products', route: '/shop' },
    { name: '3D Printer Filaments', route: '/shop/filaments' },
    { name: 'Specialty CarbonX Materials', route: '/shop/special-filaments' },
    { name: '3D Printer Resins', route: '/shop/resin' },
    { name: 'Printer Accessories & Parts', route: '/shop/accessories' },
    { name: 'Printed Models & Miniatures', route: '/shop/miniatures' },
  ]

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(prev => (prev === section ? null : section))
  }

  return (
    <header className="w-full bg-slate-50/95 backdrop-blur-md z-40 sticky top-0 transition-all">
      {/* 1. TOP UTILITY STRIP (Light matching user mockup) */}
      <div className="border-b border-slate-200/70 text-xs text-slate-600 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left contact info */}
          <div className="flex items-center space-x-5 text-[11px] sm:text-xs">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden sm:flex items-center space-x-1.5 text-slate-600 hover:text-red-600 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>{siteConfig.phone}</span>
            </a>
            <div className="hidden md:flex items-center space-x-1.5 text-slate-600">
              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center shrink-0">
                <Target className="w-2.5 h-2.5 text-emerald-600" />
              </span>
              <span>PAN-India Support: <strong className="text-slate-800 font-semibold">{siteConfig.supportPhone}</strong></span>
            </div>
          </div>

          {/* Right Links & Social Icons */}
          <div className="flex items-center space-x-4 text-[11px] sm:text-xs text-slate-600">
            <Link to="/warranty" className="hidden lg:flex items-center space-x-1 text-slate-600 hover:text-red-600 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Warranty & Support</span>
            </Link>
            <div className="flex items-center space-x-2 text-slate-500">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5 text-[#ff0000]" />
              </a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-0.5 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (CURVED EDGES) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className={`max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between relative transition-all ${
          isScrolled ? 'shadow-xl shadow-slate-900/10 border-slate-300' : 'shadow-md'
        }`}>
          {/* Brand Logo & Slogan */}
          <div className="flex items-center shrink-0 mr-2 xl:mr-4">
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png?v=3"
                alt="LENIVA CAD SOLUTIONS"
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="h-8 w-[1.5px] bg-slate-200 mx-2.5 xl:mx-3 hidden lg:block" />
            <div className="hidden lg:flex flex-col text-[10px] leading-[1.15] text-slate-400 font-medium whitespace-nowrap">
              <span>Engineering</span>
              <span>Possibilities</span>
              <span>Together</span>
            </div>
          </div>

          {/* Desktop Navigation Links with Icon on Top */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* 1. Home */}
            <Link
              to="/"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <Home className={`w-4 h-4 transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Home
              </span>
              {location.pathname === '/' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* Products Mega Menu Trigger */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setActiveMegaMenu('products')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                to="/products"
                className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative"
              >
                <Box className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/products') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
                <div className="flex items-center space-x-0.5 mt-1">
                  <span className={`text-xs whitespace-nowrap transition-colors ${location.pathname.startsWith('/products') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                    Products
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-red-600" />
                </div>
                {location.pathname.startsWith('/products') && (
                  <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
                )}
              </Link>

              {/* MEGA MENU FLYOUT */}
              {activeMegaMenu === 'products' && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-fade-in w-[900px] max-w-[90vw]">
                  <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-12">
                    {/* Left categories column */}
                    <div className="col-span-4 bg-slate-50 p-4 border-r border-slate-200 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                        Technology Categories
                      </div>
                      {megaCategories.map(cat => {
                        const Icon = cat.icon
                        const isSelected = activeMegaCategory === cat.id
                        return (
                          <div
                            key={cat.id}
                            onMouseEnter={() => setActiveMegaCategory(cat.id)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white text-red-600 shadow-sm font-bold border border-slate-200'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                              <span className="text-xs">{cat.label}</span>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                          </div>
                        )
                      })}
                      <div className="pt-3 px-3">
                        <Link
                          to="/products"
                          className="block text-center py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Explore Full Catalog →
                        </Link>
                      </div>
                    </div>

                    {/* Right products preview panel */}
                    <div className="col-span-8 p-6 flex flex-col justify-between">
                      <div>
                        {(() => {
                          const currentCat = megaCategories.find(c => c.id === activeMegaCategory)!
                          return (
                            <>
                              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                                <div>
                                  <h4 className="text-base font-bold text-slate-950">{currentCat.label}</h4>
                                  <p className="text-xs text-slate-500 mt-0.5">{currentCat.description}</p>
                                </div>
                                <Link
                                  to={currentCat.route}
                                  className="text-xs font-semibold text-red-600 hover:underline flex items-center space-x-1"
                                >
                                  <span>View Category Page</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                {currentCat.products.map(prod => (
                                  <Link
                                    key={prod.slug}
                                    to={`/products/${prod.slug}`}
                                    className="p-2.5 rounded-lg border border-slate-100 hover:border-red-200 hover:bg-red-50/40 transition-all group"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                                        {prod.name}
                                      </span>
                                      {prod.badge && (
                                        <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                                          {prod.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-0.5">{prod.spec}</p>
                                  </Link>
                                ))}
                              </div>
                            </>
                          )
                        })()}
                      </div>

                      {/* Mega Menu Footer Banner */}
                      <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Need tailored machine specifications or CAD configuration advice?</span>
                        <button
                          onClick={() => openQuoteModal('General Inquiry')}
                          className="font-bold text-red-600 hover:text-red-800"
                        >
                          Talk to an Engineer →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* 4. Shop — plain link, no dropdown */}
            <Link
              to="/shop"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <ShoppingCart className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/shop') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname.startsWith('/shop') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Shop
              </span>
              {location.pathname.startsWith('/shop') && (
                <div className="w-6 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>



            {/* 6. Blogs */}
            <Link
              to="/blog"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <BookOpen className={`w-4 h-4 transition-colors ${location.pathname.startsWith('/blog') ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname.startsWith('/blog') ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Blogs
              </span>
              {location.pathname.startsWith('/blog') && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* 7. About Us - FORCED SINGLE LINE */}
            <Link
              to="/about"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <User className={`w-4 h-4 transition-colors ${location.pathname === '/about' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/about' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                About Us
              </span>
              {location.pathname === '/about' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>

            {/* 8. Contact */}
            <Link
              to="/contact"
              className="flex flex-col items-center group px-2 sm:px-2.5 py-1 relative shrink-0"
            >
              <PhoneCall className={`w-4 h-4 transition-colors ${location.pathname === '/contact' ? 'text-red-600' : 'text-slate-600 group-hover:text-red-600'}`} />
              <span className={`text-xs mt-1 whitespace-nowrap transition-colors ${location.pathname === '/contact' ? 'text-red-600 font-bold' : 'text-slate-700 font-medium group-hover:text-red-600'}`}>
                Contact
              </span>
              {location.pathname === '/contact' && (
                <div className="w-5 h-[2.5px] bg-red-600 rounded-full mt-0.5 absolute -bottom-1" />
              )}
            </Link>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Inline Pill Search Bar */}
            <div
              onClick={openSearchModal}
              className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-400 cursor-pointer w-32 xl:w-36 transition-all border border-slate-200/70"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400">Search...</span>
            </div>

            {/* Mobile / Tablet Search Button */}
            <button
              onClick={openSearchModal}
              className="xl:hidden p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search directory"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="p-1.5 text-slate-700 hover:text-red-600 transition-colors relative"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className="p-1.5 text-slate-700 hover:text-red-600 transition-colors relative"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* Highlighted Request a Demo Button */}
            <button
              onClick={() => openQuoteModal('3DeVOK 3D Scanner Demo Request')}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-orange-400/30"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Request a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE RESPONSIVE DRAWER ACCORDION */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[115px] bg-slate-950/60 z-50 backdrop-blur-sm">
          <div className="bg-white h-full max-w-sm w-full shadow-2xl p-4 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-sm font-semibold">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>

              {/* Products Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('products')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileSection === 'products' ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {expandedMobileSection === 'products' && (
                  <div className="pl-4 py-1 space-y-2 border-l-2 border-red-100 ml-3">
                    <Link to="/products" className="block text-xs font-bold text-red-600 py-1">
                      View All Products Catalog →
                    </Link>
                    {megaCategories.map(cat => (
                      <div key={cat.id} className="pt-1">
                        <Link
                          to={cat.route}
                          className="block text-xs font-bold text-slate-800 hover:text-red-600"
                        >
                          {cat.label}
                        </Link>
                        <div className="pl-2 pt-1 space-y-1">
                          {cat.products.slice(0, 3).map(p => (
                            <Link
                              key={p.slug}
                              to={`/products/${p.slug}`}
                              className="block text-[11px] text-slate-500 hover:text-slate-900"
                            >
                              • {p.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>



              {/* Shop Accordion */}
              <div>
                <button
                  onClick={() => toggleMobileSection('shop')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  <span>Shop Consumables</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileSection === 'shop' ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>
                {expandedMobileSection === 'shop' && (
                  <div className="pl-4 py-1 space-y-1 border-l-2 border-red-100 ml-3">
                    {shopLinks.map(s => (
                      <Link
                        key={s.route}
                        to={s.route}
                        className="block text-xs text-slate-600 hover:text-red-600 py-1"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              <Link to="/blog" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Blogs & Technical Articles
              </Link>
              <Link to="/about" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                About Us
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Contact
              </Link>
              <Link to="/cart" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Shopping Cart ({cartCount})
              </Link>
              <Link to="/wishlist" className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50">
                Wishlist ({wishlistCount})
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openQuoteModal('3DeVOK 3D Scanner Mobile Demo Request')
                }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white text-xs font-bold rounded-xl shadow-md text-center flex items-center justify-center space-x-2"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Request a Demo</span>
              </button>
              <div className="text-center text-[11px] text-slate-500 pt-2">
                Tech Support: <a href={`tel:${siteConfig.supportPhone}`} className="text-red-600 font-bold">{siteConfig.supportPhone}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
export default Header
