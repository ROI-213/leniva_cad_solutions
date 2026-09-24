import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import QuoteModal from './components/QuoteModal'
import SearchModal from './components/SearchModal'
import ScrollToTop from './components/ScrollToTop'

// Pages
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import ShopPage from './pages/ShopPage'
import MaterialsPage from './pages/MaterialsPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import ResellerPage from './pages/ResellerPage'
import LegalPage from './pages/LegalPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import MyAccountPage from './pages/MyAccountPage'
import ScannersCategoryPage from './pages/ScannersCategoryPage'
import DevokMQPage from './pages/DevokMQPage'
import DevokMTPage from './pages/DevokMTPage'
import EinscanPage from './pages/EinscanPage'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-600 selection:text-white font-inter">
        <ScrollToTop />
        <Header />

        <main className="flex-1">
          <Routes>
            {/* 1. Home */}
            <Route path="/" element={<HomePage />} />

            {/* Dedicated 3D Scanners Category & Product Sub-pages */}
            <Route path="/3d-scanners" element={<ScannersCategoryPage />} />
            <Route path="/products/3d-scanners" element={<ScannersCategoryPage />} />
            <Route path="/3d-scanners/3devok-mq" element={<DevokMQPage />} />
            <Route path="/products/3devok-mq" element={<DevokMQPage />} />
            <Route path="/3d-scanners/3devok-mt" element={<DevokMTPage />} />
            <Route path="/products/3devok-mt" element={<DevokMTPage />} />
            <Route path="/3d-scanners/einscan" element={<EinscanPage />} />
            <Route path="/products/einscan" element={<EinscanPage />} />
            <Route path="/einscan" element={<EinscanPage />} />

            {/* 2. Products Hub */}
            <Route path="/products" element={<ProductsPage />} />

            {/* Specific Categories */}
            <Route
              path="/products/fdm-3d-printers"
              element={<CategoryDetailPage forcedSlug="fdm-3d-printers" />}
            />
            <Route
              path="/products/dlp-3d-printers"
              element={<CategoryDetailPage forcedSlug="dlp-3d-printers" />}
            />
            <Route
              path="/products/industrial-lcd-3d-printers"
              element={<CategoryDetailPage forcedSlug="industrial-lcd-3d-printers" />}
            />
            <Route
              path="/products/cad-software"
              element={<CategoryDetailPage forcedSlug="cad-software" />}
            />

            {/* Materials under /products */}
            <Route path="/products/materials" element={<MaterialsPage />} />
            <Route
              path="/products/filaments"
              element={<MaterialsPage forcedCategory="filaments" />}
            />
            <Route
              path="/products/resins"
              element={<MaterialsPage forcedCategory="resins" />}
            />
            <Route
              path="/products/accessories"
              element={<MaterialsPage forcedCategory="accessories" />}
            />

            {/* Universal Product Detail (handles pratham-mini, pratham-3-rapid, eka-ht, einscan, sketchup, etc.) */}
            <Route path="/products/:slug" element={<ProductDetailPage />} />

            {/* 3. Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route
              path="/services/3d-printing"
              element={<ServiceDetailPage forcedSlug="3d-printing" />}
            />
            <Route
              path="/services/fdm-3d-printing"
              element={<ServiceDetailPage forcedSlug="fdm-3d-printing" />}
            />
            <Route
              path="/services/sla-3d-printing"
              element={<ServiceDetailPage forcedSlug="sla-3d-printing" />}
            />
            <Route
              path="/services/dlp-3d-printing"
              element={<ServiceDetailPage forcedSlug="dlp-3d-printing" />}
            />
            <Route
              path="/services/3d-scanning"
              element={<ServiceDetailPage forcedSlug="3d-scanning" />}
            />
            <Route
              path="/services/reverse-engineering"
              element={<ServiceDetailPage forcedSlug="reverse-engineering" />}
            />
            <Route
              path="/services/cad-training"
              element={<ServiceDetailPage forcedSlug="cad-training" />}
            />
            <Route
              path="/services/cad-consulting"
              element={<ServiceDetailPage forcedSlug="cad-consulting" />}
            />
            <Route
              path="/services/3d-visualization"
              element={<ServiceDetailPage forcedSlug="3d-visualization" />}
            />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* 4. Shop */}
            <Route path="/shop" element={<ShopPage />} />
            <Route
              path="/shop/fdm"
              element={<ShopPage forcedCategory="fdm" />}
            />
            <Route
              path="/shop/dlp"
              element={<ShopPage forcedCategory="dlp" />}
            />
            <Route
              path="/shop/lcd"
              element={<ShopPage forcedCategory="lcd" />}
            />
            <Route
              path="/shop/scanners"
              element={<ShopPage forcedCategory="scanners" />}
            />
            <Route
              path="/shop/filaments"
              element={<ShopPage forcedCategory="filaments" />}
            />
            <Route
              path="/shop/special-filaments"
              element={<ShopPage forcedCategory="special-filaments" />}
            />
            <Route
              path="/shop/resin"
              element={<ShopPage forcedCategory="resin" />}
            />
            <Route
              path="/shop/accessories"
              element={<ShopPage forcedCategory="accessories" />}
            />
            <Route
              path="/shop/miniatures"
              element={<ShopPage forcedCategory="miniatures" />}
            />
            <Route path="/shop/:category" element={<ShopPage />} />

            {/* 5. Materials Hub */}
            <Route path="/materials" element={<MaterialsPage />} />

            {/* 6. Blogs */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/blogs" element={<Navigate to="/blog" replace />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />

            {/* 7. Company & Support */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/become-a-reseller" element={<ResellerPage />} />

            {/* 8. Policies & Legal */}
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/return-policy" element={<LegalPage />} />
            <Route path="/warranty" element={<LegalPage />} />

            {/* 9. E-Commerce & Account */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />

            {/* 10. Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <QuoteModal />
        <SearchModal />
      </div>
    </AppProvider>
  )
}
