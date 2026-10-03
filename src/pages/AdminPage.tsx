import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Database,
  Shield,
  Layers,
  FileText,
  MessageSquare,
  Package,
  CheckCircle,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  Upload,
  LogOut,
  AlertCircle,
  Edit,
  Key,
  Sliders,
  Save,
  Check,
  Search,
  Briefcase,
  Home,
} from 'lucide-react'
import { products as fallbackProducts } from '../data/products'
import { services as fallbackServices } from '../data/services'
import { blogPosts as fallbackBlogs } from '../data/blogs'
import { productCategories as fallbackCategories } from '../data/categories'

interface Stats {
  totalProducts: number
  totalQuotes: number
  totalContacts: number
  totalBlogs: number
  recentQuotes: any[]
}

interface QuoteRequest {
  id: number
  name: string
  email: string
  phone: string
  company: string
  service_or_product: string
  quantity: string
  timeline: string
  message: string
  status: string
  notes?: string
  created_at: string
}

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}

interface ProductItem {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  category_slug: string
  technology: string
  tagline: string
  short_description?: string
  description?: string
  hero_image: string
  price: number
  in_stock: boolean
  is_featured: boolean
}



interface BlogPostItem {
  id: string
  slug: string
  title: string
  category: string
  read_time: string
  date: string
  excerpt?: string
  content?: string
  image?: string
  published: boolean
}

interface AdminUser {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  created_at: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('leniva_admin_auth') === 'true'
  })
  const [usernameInput, setUsernameInput] = useState('admin')
  const [passwordInput, setPasswordInput] = useState('Admin@Leniva2026!')
  const [loginError, setLoginError] = useState('')

  type AdminTab =
    | 'dashboard'
    | 'quotes'
    | 'contacts'
    | 'products'
    | 'services'
    | 'blogs'
    | 'categories'
    | 'cad_software'
    | 'settings'
    | 'users'

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)

  // Lists
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [productsList, setProductsList] = useState<ProductItem[]>([])
  const [blogsList, setBlogsList] = useState<BlogPostItem[]>([])
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [categoriesList, setCategoriesList] = useState<any[]>([])

  // Search & Filter
  const [productSearch, setProductSearch] = useState('')
  const [quoteFilter, setQuoteFilter] = useState('all')

  // Modals / Forms
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteNotesInput, setQuoteNotesInput] = useState('')
  const [isNewProductOpen, setIsNewProductOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [servicesList, setServicesList] = useState<any[]>([])
  const [editingService, setEditingService] = useState<any>(null)
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false)
  const [newService, setNewService] = useState({
    title: '',
    slug: '',
    badge: 'Industrial Grade',
    short_description: '',
    description: '',
    image: '/images/services/scanning.jpg',
  })
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Leniva',
    category: 'FDM 3D Printers',
    categorySlug: 'fdm-3d-printers',
    technology: 'Industrial FDM',
    tagline: 'High Speed Precision System',
    description: '',
    short_description: '',
    price: 95000,
    original_price: 110000,
    heroImage: '/images/products/pratham-mini.png',
  })

  // Blog Form
  const [isNewBlogOpen, setIsNewBlogOpen] = useState(false)
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: '3D Printing Innovations',
    read_time: '5 min read',
    excerpt: '',
    content: '',
    image: '/images/showcase/pratham-showcase.png',
  })

  // Category Form
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    title: '',
    slug: '',
    description: '',
    image: '',
  })

  // Settings State
  const [siteSettings, setSiteSettings] = useState<any>({
    companyName: 'Leniva CAD Solutions',
    phone: '+91 90234 56789',
    email: 'contact@lenivacadsolution.in',
    address: 'Bengaluru Technology Center, Karnataka, India',
    workingHours: 'Mon – Sat: 9:00 AM – 6:30 PM IST',
    whatsapp: '919023456789',
    bannerNotice: 'Now Delivering Advanced 3D Scanners & Industrial Printers PAN-India',
  })
  const [settingsSavedMsg, setSettingsSavedMsg] = useState('')

  // User Management Form
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', fullName: '', role: 'admin' })
  const [passwordChangeId, setPasswordChangeId] = useState<number | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null)
  const [contactNotesInput, setContactNotesInput] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [newPasswordValue, setNewPasswordValue] = useState('')

  // ─── CAD Software Editor ────────────────────────────────────────────────────
  const CAD_PRODUCTS = [
    { key: 'ares_mechanical',  label: 'ARES Mechanical',       brand: 'Graebert', route: '/products/ares-mechanical',  color: 'blue'   },
    { key: 'ares_electrical',  label: 'ARES Electrical',       brand: 'Graebert', route: '/products/ares-electrical',  color: 'yellow' },
    { key: 'ares_standard',    label: 'ARES Standard',         brand: 'Graebert', route: '/products/ares-standard',    color: 'slate'  },
    { key: 'chaos_enscape',    label: 'Chaos Enscape',         brand: 'Chaos',    route: '/products/enscape',          color: 'purple' },
    { key: 'chaos_vray',       label: 'Chaos V-Ray',           brand: 'Chaos',    route: '/products/vray',             color: 'orange' },
    { key: 'sketchup_studio',  label: 'SketchUp Studio',       brand: 'Trimble',  route: '/products/sketchup-studio',  color: 'green'  },
    { key: 'sketchup_proscan', label: 'SketchUp Pro + Scan',   brand: 'Trimble',  route: '/products/sketchup-proscan', color: 'teal'   },
  ] as const

  type CadProductKey = typeof CAD_PRODUCTS[number]['key']

  const CAD_DEFAULTS: Record<string, any> = {
    ares_mechanical: {
      productName: 'ARES Mechanical', brand: 'Graebert',
      headline: 'Professional 2D Mechanical CAD Software in DWG',
      supportingHeadline: 'Design. Draft. Document. With Mechanical Precision.',
      shortDescription: 'Create and modify professional 2D mechanical drawings with standards-based tools, intelligent components, mechanical annotations, and a familiar DWG-based CAD environment.',
      description: 'ARES Mechanical is a professional DWG-based mechanical CAD solution that combines the comprehensive drafting power of ARES Commander with dedicated engineering functions.',
      platform: 'Windows 64-bit', languages: 'English, German, Polish, Japanese, Korean, Traditional Chinese',
      primaryFormat: 'DWG Native', cadEngine: 'ARES Commander Engine',
      heroImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'Native DWG Mechanical Engine',
      heroHeading: 'Professional 2D Mechanical CAD in DWG',
      heroSupportingText: 'Create detailed mechanical drawings with a specialized CAD environment built for engineers and designers.',
      highlights: ['DWG-based 2D mechanical CAD','ISO, ANSI, DIN, BSI, JIS standards','Ready-to-use parts libraries','Automated layer management','Mechanical annotations & symbols','Bills of Materials (BOM)','STEP and IGES import/export','Power Trim','Balloons & revision tables'],
      trialCta: 'Get Free 30-Day Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-mechanical/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-mechanical/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Available as subscription and perpetual license. Contact us for volume and enterprise pricing.',
    },
    ares_electrical: {
      productName: 'ARES Electrical', brand: 'Graebert',
      headline: 'Modern Electrical CAD Software to Automate Electrical Schematics in DWG',
      supportingHeadline: 'Design Smarter. Automate Repetitive Tasks. Deliver Electrical Projects with Confidence.',
      shortDescription: 'Create and manage electrical schematics, wiring diagrams, control panels, and electrical project reports with a DWG-based ECAD solution.',
      description: 'ARES Electrical is a DWG-compatible ECAD solution developed to simplify electrical design and automate repetitive tasks in electrical projects.',
      platform: 'Windows 64-bit', languages: 'English, Portuguese, Spanish',
      primaryFormat: 'DWG', cadEngine: 'ARES Commander Engine',
      heroImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'DWG-Compatible ECAD',
      heroHeading: 'Automate Electrical Schematics in DWG',
      heroSupportingText: 'Design electrical projects with automatic wire numbering, component tagging, cross-referencing, and intelligent report generation.',
      highlights: ['DWG-compatible electrical CAD','Automated electrical schematics','Automatic wire numbering','Automatic component tagging','Automated cross-referencing','Control panel design','Multi-page DWG projects','Project reports (PDF/DXF)','Intelligent component libraries'],
      trialCta: 'Get Free 30-Day Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-electrical/',
      downloadUrl: 'https://www.graebert.com/in/cad-software/download/ares-electrical/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Available as subscription and perpetual license. Contact us for multi-seat and enterprise pricing.',
    },
    ares_standard: {
      productName: 'ARES Standard', brand: 'Graebert',
      headline: 'Powerful 2D CAD. Practical by Design.',
      supportingHeadline: 'Create, view and modify DWG drawings with ARES Standard.',
      shortDescription: 'Cost-effective 2D CAD software for users who need dependable 2D drafting and DWG editing without advanced features.',
      description: 'ARES Standard is cost-effective 2D CAD software built on the ARES CAD platform. Designed for users who need dependable 2D drafting and DWG editing.',
      platform: 'Windows 64-bit', languages: 'English',
      primaryFormat: 'DWG', cadEngine: 'ARES Platform',
      heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      heroBadge: 'Cost-Effective 2D DWG CAD',
      heroHeading: 'Powerful 2D CAD. Practical by Design.',
      heroSupportingText: 'Create, view and modify DWG drawings with a familiar CAD interface at a practical price point.',
      highlights: ['Native DWG support','Complete set of 2D drafting tools','Layers, blocks and dimensions','Familiar CAD interface','Windows 64-bit support','Print & plot with layouts','30-Day Free Trial'],
      trialCta: 'Get Free 30-Day Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.graebert.com/in/cad-software/ares-standard/',
      downloadUrl: 'https://www.graebert.com/cad-software/download/',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Perpetual and subscription license options. Contact us to confirm current regional availability and pricing.',
    },
    chaos_enscape: {
      productName: 'Chaos Enscape', brand: 'Chaos',
      headline: 'Real-Time Rendering That Keeps Up With Your Ideas',
      supportingHeadline: 'Design, visualize, and present — all inside your design workflow.',
      shortDescription: 'Real-time rendering and virtual reality plugin for Revit, SketchUp, Rhino, Archicad, and Vectorworks.',
      description: 'Enscape is a real-time visualization solution that connects directly with supported CAD and BIM applications.',
      platform: 'Windows', languages: 'English',
      primaryFormat: 'Plugin for Revit, SketchUp, Rhino, Archicad, Vectorworks',
      cadEngine: 'Chaos Rendering Engine',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'Real-Time Rendering & VR',
      heroHeading: 'Real-Time Rendering That Keeps Up With Your Ideas',
      heroSupportingText: 'See photorealistic results instantly as you design. No switching apps, no waiting.',
      highlights: ['Real-time rendering inside your CAD tool','Virtual Reality walkthroughs','360° panoramic exports','Standalone walkthrough EXE export','Asset library (trees, furniture, people)','Batch rendering','Revit, SketchUp, Rhino, Archicad, Vectorworks support'],
      trialCta: 'Start Free Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.chaos.com/enscape',
      downloadUrl: 'https://www.chaos.com/enscape/trial',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual subscription. Educational and multi-seat pricing available. Contact us for enterprise licensing.',
    },
    chaos_vray: {
      productName: 'Chaos V-Ray', brand: 'Chaos',
      headline: 'Create Your Most Realistic Work Yet with Chaos V-Ray',
      supportingHeadline: 'Photorealistic rendering for design, visualization, and production.',
      shortDescription: 'Physically based ray-tracing renderer for architecture, product design, VFX, and advertising.',
      description: 'V-Ray is professional 3D rendering software that helps artists and designers transform complex 3D scenes into realistic images and animations.',
      platform: 'Windows, macOS, Linux (host-dependent)', languages: 'English',
      primaryFormat: 'Plugin for 3ds Max, SketchUp, Rhino, Revit, Cinema 4D, Maya, Unreal',
      cadEngine: 'V-Ray Ray Tracing Engine',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'Photorealistic 3D Rendering',
      heroHeading: 'Create Your Most Realistic Work Yet',
      heroSupportingText: 'Physically accurate ray tracing, GPU+CPU hybrid rendering, and 18,500+ Chaos Cosmos assets.',
      highlights: ['Physically based ray tracing','GPU + CPU hybrid rendering','V-Ray Vision real-time preview','18,500+ Chaos Cosmos assets','Chaos Scatter for environments','Multi-platform support','Academy Award winning technology'],
      trialCta: 'Start Free Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.chaos.com/vray',
      downloadUrl: 'https://www.chaos.com/vray/trial',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual subscription. Priced per host application. Enterprise and educational pricing available on request.',
    },
    sketchup_studio: {
      productName: 'SketchUp Studio', brand: 'Trimble',
      headline: 'SketchUp Studio — The Complete 3D Design Suite',
      supportingHeadline: 'Model. Render. Scan. Import. All in One Subscription.',
      shortDescription: 'Trimble SketchUp Studio bundles SketchUp Pro, LayOut, V-Ray, Scan Essentials, and Revit Importer in a single Windows subscription.',
      description: "Trimble's most powerful SketchUp subscription. Includes SketchUp Pro, LayOut, V-Ray for SketchUp, Scan Essentials (point cloud), and Revit Importer.",
      platform: 'Windows (64-bit)', languages: 'English',
      primaryFormat: 'SKP, DWG, DXF, RVT, IFC, OBJ, FBX, STL',
      cadEngine: 'Trimble SketchUp Engine + V-Ray',
      heroImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'Trimble SketchUp Studio',
      heroHeading: 'The Complete 3D Design Suite from Trimble',
      heroSupportingText: 'SketchUp Pro + LayOut + V-Ray + Scan Essentials + Revit Importer in one subscription.',
      highlights: ['SketchUp Pro (full 3D modeling)','LayOut (2D documentation)','V-Ray for SketchUp (photorealistic rendering)','Scan Essentials (point cloud / LiDAR)','Revit Importer (.rvt files)','Annual subscription (Windows only)','IFC, DWG, FBX, OBJ, STL support'],
      trialCta: 'Start Free Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.sketchup.com/plans-and-pricing/sketchup-studio',
      downloadUrl: 'https://www.sketchup.com/try-sketchup',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual subscription per seat. Educational and volume pricing available. Windows only. Contact us for Indian pricing.',
    },
    sketchup_proscan: {
      productName: 'SketchUp Pro + Scan Essentials', brand: 'Trimble',
      headline: 'SketchUp Pro with Scan Essentials — Scan-to-Model Workflows',
      supportingHeadline: 'Import Point Clouds. Model Reality. Deliver Accurate As-Built Drawings.',
      shortDescription: 'SketchUp Pro bundled with Scan Essentials for scan-to-model professionals working with LiDAR and photogrammetry point clouds.',
      description: 'SketchUp Pro paired with the Scan Essentials plugin. Designed for survey, heritage, renovation, and facility management teams who capture spaces with 3D scanners.',
      platform: 'Windows 64-bit', languages: 'English',
      primaryFormat: 'SKP, E57, RCP, LAS, LAZ, DWG, DXF',
      cadEngine: 'Trimble SketchUp Engine',
      heroImage: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?auto=format&fit=crop&w=1600&q=85',
      heroBadge: 'Scan-to-Model CAD',
      heroHeading: 'Model Reality from Point Clouds',
      heroSupportingText: 'Import LiDAR and photogrammetry scans directly into SketchUp and model with real-world accuracy.',
      highlights: ['SketchUp Pro (full 3D modeling)','LayOut (2D documentation)','Scan Essentials (E57, RCP, LAS, LAZ point clouds)','Snap-to-point-cloud geometry','As-built modeling from scans','Works with FARO, Leica, Trimble scanners','IFC, DWG, FBX export'],
      trialCta: 'Start Free Trial', pricingCta: 'Enquire About Pricing',
      officialUrl: 'https://www.sketchup.com/products/scan-essentials',
      downloadUrl: 'https://www.sketchup.com/try-sketchup',
      enquiryEmail: 'contact@lenivacadsolution.in',
      licensingNote: 'Annual subscription per seat. Contact us for Indian regional pricing and volume discounts.',
    },
  }

  const loadCadEdits = (): Record<string, any> => {
    try {
      const saved = localStorage.getItem('leniva_cad_software_edits')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge: fill missing keys with defaults
        const merged: Record<string, any> = {}
        Object.keys(CAD_DEFAULTS).forEach(k => {
          merged[k] = { ...CAD_DEFAULTS[k], ...(parsed[k] || {}) }
        })
        return merged
      }
    } catch { /* ignore */ }
    return { ...CAD_DEFAULTS }
  }

  const [cadEdits, setCadEdits] = useState<Record<string, any>>(loadCadEdits)
  const [activeCadProduct, setActiveCadProduct] = useState<CadProductKey>('ares_mechanical')
  const [cadSaveMsg, setCadSaveMsg] = useState('')
  const [cadEditSection, setCadEditSection] = useState<'identity' | 'hero' | 'highlights' | 'licensing'>('identity')

  const saveCadEdits = (updatedEdits: Record<string, any>) => {
    localStorage.setItem('leniva_cad_software_edits', JSON.stringify(updatedEdits))
    setCadEdits(updatedEdits)
    setCadSaveMsg('✓ Saved to browser storage. Export JSON to apply to the site.')
    setTimeout(() => setCadSaveMsg(''), 4000)
  }

  const updateCadField = (field: string, value: any) => {
    const updated = { ...cadEdits, [activeCadProduct]: { ...cadEdits[activeCadProduct], [field]: value } }
    saveCadEdits(updated)
  }

  const updateCadHighlight = (index: number, value: string) => {
    const arr = [...(cadEdits[activeCadProduct]?.highlights || [])]
    arr[index] = value
    updateCadField('highlights', arr)
  }

  const addCadHighlight = () => {
    const arr = [...(cadEdits[activeCadProduct]?.highlights || []), 'New feature bullet']
    updateCadField('highlights', arr)
  }

  const removeCadHighlight = (index: number) => {
    const arr = (cadEdits[activeCadProduct]?.highlights || []).filter((_: any, i: number) => i !== index)
    updateCadField('highlights', arr)
  }

  const exportCadJson = () => {
    const blob = new Blob([JSON.stringify(cadEdits, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'leniva-cad-software-content.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const resetCadProduct = () => {
    const label = CAD_PRODUCTS.find(p => p.key === activeCadProduct)?.label || activeCadProduct
    if (!confirm(`Reset "${label}" to defaults? All edits for this product will be lost.`)) return
    const updated = { ...cadEdits, [activeCadProduct]: { ...CAD_DEFAULTS[activeCadProduct] } }
    saveCadEdits(updated)
  }

  // Safe JSON fetcher that handles non-JSON / HTML responses gracefully on Vercel
  const safeFetchJson = async (url: string, options?: RequestInit) => {
    try {
      const res = await fetch(url, options)
      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        return null
      }
      return await res.json()
    } catch {
      return null
    }
  }

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)

    try {
      const data = await safeFetchJson('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      })

      if (data && data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        loadAllData()
        return
      }
    } catch (err) {
      console.warn('Backend login unavailable:', err)
    }

    // Default static credential check or fallback
    if (
      (usernameInput === 'admin' && passwordInput === 'Admin@Leniva2026!') ||
      (usernameInput === 'leniva' && passwordInput === 'admin')
    ) {
      setIsAuthenticated(true)
      localStorage.setItem('leniva_admin_auth', 'true')
      loadAllData()
    } else {
      setLoginError('Invalid administrator credentials. Use default admin credentials shown below.')
    }
    setIsLoading(false)
  }

  const handleBypassLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('leniva_admin_auth', 'true')
    loadAllData()
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('leniva_admin_auth')
  }

  // Load initial backend & PostgreSQL data with comprehensive local fallbacks
  const loadAllData = async () => {
    setIsLoading(true)
    try {
      const [
        statsRes,
        quotesRes,
        contactsRes,
        prodsRes,
        blogsRes,
        usersRes,
        catsRes,
        settingsRes,
        servicesRes,
      ] = await Promise.allSettled([
        safeFetchJson('/api/stats'),
        safeFetchJson('/api/quotes'),
        safeFetchJson('/api/contacts'),
        safeFetchJson('/api/products'),
        safeFetchJson('/api/blogs'),
        safeFetchJson('/api/admin/users'),
        safeFetchJson('/api/categories'),
        safeFetchJson('/api/settings'),
        safeFetchJson('/api/services'),
      ])

      const statsVal = statsRes.status === 'fulfilled' ? statsRes.value : null
      const quotesVal = quotesRes.status === 'fulfilled' ? quotesRes.value : null
      const contactsVal = contactsRes.status === 'fulfilled' ? contactsRes.value : null
      const prodsVal = prodsRes.status === 'fulfilled' ? prodsRes.value : null
      const blogsVal = blogsRes.status === 'fulfilled' ? blogsRes.value : null
      const usersVal = usersRes.status === 'fulfilled' ? usersRes.value : null
      const catsVal = catsRes.status === 'fulfilled' ? catsRes.value : null
      const settingsVal = settingsRes.status === 'fulfilled' ? settingsRes.value : null
      const servicesVal = servicesRes.status === 'fulfilled' ? servicesRes.value : null

      // Fallback products if API not connected
      if (Array.isArray(prodsVal) && prodsVal.length > 0) {
        setProductsList(prodsVal)
      } else {
        const mappedProducts: ProductItem[] = fallbackProducts.map((p, idx) => ({
          id: p.id || `prod-${idx}`,
          slug: p.slug || p.id,
          name: p.name,
          brand: p.brand || 'Leniva',
          category: p.category || '3D Printers',
          category_slug: p.categorySlug || 'fdm-3d-printers',
          technology: p.technology || 'Additive Manufacturing',
          tagline: p.tagline || 'High Performance CAD & 3D Solution',
          short_description: p.shortDescription || '',
          description: p.description || '',
          hero_image: p.heroImage || p.images?.[0] || '/images/products/pratham-mini.png',
          price: (p as any).price || 95000,
          in_stock: p.inStock ?? true,
          is_featured: p.isFeatured ?? true,
        }))
        setProductsList(mappedProducts)
      }

      // Fallback services
      if (Array.isArray(servicesVal) && servicesVal.length > 0) {
        setServicesList(servicesVal)
      } else {
        const mappedServices = fallbackServices.map(s => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
          badge: s.badge || 'Engineering Service',
          short_description: s.shortDescription || '',
          description: s.description || '',
          image: s.image || '/images/services/scanning.jpg',
        }))
        setServicesList(mappedServices)
      }

      // Fallback blogs
      if (Array.isArray(blogsVal) && blogsVal.length > 0) {
        setBlogsList(blogsVal)
      } else {
        const mappedBlogs: BlogPostItem[] = fallbackBlogs.map(b => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          category: b.category,
          read_time: b.readTime,
          date: b.date,
          excerpt: b.excerpt,
          content: b.content,
          image: b.image,
          published: true,
        }))
        setBlogsList(mappedBlogs)
      }

      // Fallback categories
      if (Array.isArray(catsVal) && catsVal.length > 0) {
        setCategoriesList(catsVal)
      } else {
        setCategoriesList(fallbackCategories)
      }

      // Fallback Quotes
      if (Array.isArray(quotesVal) && quotesVal.length > 0) {
        setQuotes(quotesVal)
      } else {
        setQuotes([
          {
            id: 101,
            name: 'Rajesh Sharma',
            email: 'r.sharma@tata-advanced.com',
            phone: '+91 98450 12345',
            company: 'Tata Advanced Engineering',
            service_or_product: '3DeVOK MQ High-Accuracy Scanner',
            quantity: '2 Units',
            timeline: 'Within 2 Weeks',
            message: 'Looking for metrology grade scanning of automotive sheet metal dies with inspection reports.',
            status: 'pending',
            created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
            notes: 'Requires on-site demo in Bengaluru',
          },
          {
            id: 102,
            name: 'Pooja Verma',
            email: 'pooja.verma@titan.co.in',
            phone: '+91 97123 45678',
            company: 'Titan Jewellery Division',
            service_or_product: 'EKA HT DLP 3D Printer',
            quantity: '1 Unit',
            timeline: 'Immediate',
            message: 'Inquiring regarding high-precision wax direct casting resin parameters and machine delivery.',
            status: 'in_review',
            created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
            notes: 'Sent DLP sample pack via courier',
          },
          {
            id: 103,
            name: 'Vikram Patel',
            email: 'v.patel@bharatforge.com',
            phone: '+91 99234 56789',
            company: 'Bharat Forge Ltd',
            service_or_product: 'Pratham X1000 Industrial FDM',
            quantity: '1 Unit',
            timeline: '1 Month',
            message: 'Need 1-meter single piece printing for carbon-fiber nylon jigs on assembly conveyor.',
            status: 'contacted',
            created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
            notes: 'Scheduled video call with technical director',
          },
        ])
      }

      // Fallback Contacts
      if (Array.isArray(contactsVal) && contactsVal.length > 0) {
        setContacts(contactsVal)
      } else {
        setContacts([
          {
            id: 201,
            name: 'Dr. Anand Ramanathan',
            email: 'anand.r@iitb.ac.in',
            phone: '+91 98190 23456',
            subject: 'Academic Center of Excellence Quotation',
            message: 'IIT Bombay design lab seeks quote for 3D scanner suite and CAD training software package.',
            status: 'new',
            created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
          },
          {
            id: 202,
            name: 'Karthik Sundaram',
            email: 'karthik@precisiondies.in',
            phone: '+91 94440 98765',
            subject: 'ARES Mechanical Multi-Seat License Quote',
            message: 'Requesting volume pricing for 5 perpetual licenses of ARES Mechanical for our Coimbatore drafting cell.',
            status: 'read',
            created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
          },
        ])
      }


      if (Array.isArray(usersVal) && usersVal.length > 0) {
        setAdminUsers(usersVal)
      } else {
        setAdminUsers([
          {
            id: 1,
            username: 'admin',
            email: 'admin@lenivacadsolution.in',
            full_name: 'Leniva Primary Superadmin',
            role: 'superadmin',
            created_at: '2026-01-01',
          },
          {
            id: 2,
            username: 'support',
            email: 'support@lenivacadsolution.in',
            full_name: 'Technical Support Lead',
            role: 'editor',
            created_at: '2026-02-15',
          },
        ])
      }

      // Fallback Site settings
      if (settingsVal && settingsVal.general_info) {
        setSiteSettings(settingsVal.general_info)
      }

      // Set Stats
      setStats(statsVal || {
        totalProducts: prodsVal?.length || fallbackProducts.length,
        totalQuotes: quotesVal?.length || 3,
        totalContacts: contactsVal?.length || 2,
        totalBlogs: blogsVal?.length || fallbackBlogs.length,
        recentQuotes: quotesVal || [],
      })
    } catch (err) {
      console.warn('Error loading dashboard data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData()
    }
  }, [isAuthenticated])

  // Quote operations
  const handleUpdateQuoteStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      })
      if (res.ok) {
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus, notes: notes ?? q.notes } : q))
        if (selectedQuote && selectedQuote.id === id) {
          setSelectedQuote(prev => prev ? { ...prev, status: newStatus, notes: notes ?? prev.notes } : null)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteQuote = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote record from PostgreSQL?')) return
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setQuotes(prev => prev.filter(q => q.id !== id))
        if (selectedQuote?.id === id) setSelectedQuote(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Product operations
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProd, in_stock: true, is_featured: true }),
      })
      if (res.ok) {
        const created = await res.json()
        setProductsList(prev => [created, ...prev])
        setIsNewProductOpen(false)
        setNewProd({
          name: '',
          brand: 'Leniva',
          category: 'FDM 3D Printers',
          categorySlug: 'fdm-3d-printers',
          technology: 'Industrial FDM',
          tagline: 'High Speed Precision System',
          description: '',
          short_description: '',
          price: 95000,
          original_price: 110000,
          heroImage: '/images/products/pratham-mini.png',
        })
        loadAllData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      })
      if (res.ok) {
        const updated = await res.json()
        setProductsList(prev => prev.map(p => p.id === updated.id ? updated : p))
        setEditingProduct(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleStock = async (product: ProductItem) => {
    try {
      const updatedStock = !product.in_stock
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ in_stock: updatedStock }),
      })
      if (res.ok) {
        setProductsList(prev => prev.map(p => p.id === product.id ? { ...p, in_stock: updatedStock } : p))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(`Delete product ${id} permanently from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProductsList(prev => prev.filter(p => p.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Blog operations
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newBlog, published: true }),
      })
      if (res.ok) {
        const created = await res.json()
        setBlogsList(prev => [created, ...prev])
        setIsNewBlogOpen(false)
        setNewBlog({
          title: '',
          category: '3D Printing Innovations',
          read_time: '5 min read',
          excerpt: '',
          content: '',
          image: '/images/showcase/pratham-showcase.png',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteBlog = async (id: string) => {
    if (!confirm(`Delete article ${id} from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBlogsList(prev => prev.filter(b => b.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBlog) return
    try {
      const res = await fetch(`/api/blogs/${editingBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      })
      if (res.ok) {
        const updated = await res.json()
        setBlogsList(prev => prev.map(b => b.id === updated.id ? updated : b))
        setEditingBlog(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Category Edit Operation
  const handleSaveEditCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCategory) return
    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory),
      })
      if (res.ok) {
        const updated = await res.json()
        setCategoriesList(prev => prev.map(c => c.id === updated.id ? updated : c))
        setEditingCategory(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Service Operations
  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      })
      if (res.ok) {
        const created = await res.json()
        setServicesList(prev => [...prev, created])
        setIsNewServiceOpen(false)
        setNewService({
          title: '',
          slug: '',
          badge: 'Industrial Grade',
          short_description: '',
          description: '',
          image: '/images/services/scanning.jpg',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveEditService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingService) return
    try {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      })
      if (res.ok) {
        const updated = await res.json()
        setServicesList(prev => prev.map(s => s.id === updated.id ? updated : s))
        setEditingService(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm(`Delete engineering service ${id} from PostgreSQL?`)) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setServicesList(prev => prev.filter(s => s.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Direct image upload helper for all edit modals
  const handleDirectImageUpload = async (file: File, callback: (url: string) => void) => {
    try {
      setUploadingField(file.name)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'media')
      formData.append('description', file.name)
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        callback(data.url)
      } else {
        alert('Failed to upload image to PostgreSQL storage')
      }
    } catch (err: any) {
      alert('Error uploading image: ' + err.message)
    } finally {
      setUploadingField(null)
    }
  }

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsSavedMsg('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'general_info', value: siteSettings }),
      })
      if (res.ok) {
        setSettingsSavedMsg('Settings saved successfully into PostgreSQL!')
        setTimeout(() => setSettingsSavedMsg(''), 4000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Admin User operations
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setUserMsg('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (res.ok) {
        const created = await res.json()
        setAdminUsers(prev => [...prev, created])
        setNewUser({ username: '', email: '', password: '', fullName: '', role: 'admin' })
        setUserMsg('New administrator created successfully in PostgreSQL!')
      } else {
        const err = await res.json()
        setUserMsg(`Error: ${err.error}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleChangePassword = async (id: number) => {
    if (!newPasswordValue) return
    try {
      const res = await fetch(`/api/admin/users/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPasswordValue }),
      })
      if (res.ok) {
        setUserMsg(`Password updated for user ID #${id}!`)
        setPasswordChangeId(null)
        setNewPasswordValue('')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm(`Delete admin user ID #${id}?`)) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAdminUsers(prev => prev.filter(u => u.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Contact message operations
  const handleUpdateContactStatus = async (id: number, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      })
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus, notes: notes ?? (c as any).notes } : c))
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Delete this contact message from PostgreSQL?')) return
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id))
        if (selectedContact?.id === id) setSelectedContact(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category from PostgreSQL? Products using it will still exist.')) return
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategoriesList(prev => prev.filter(c => c.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Leniva CAD Admin Console</h2>
            <p className="text-xs text-slate-500 font-mono">
              Database: PostgreSQL (leniv698 @ 127.0.0.1 / localhost)
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-xs text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Username / Email
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-[11px] text-blue-900 space-y-1 font-mono">
              <div><strong>Default Superadmin:</strong> <code>admin</code></div>
              <div><strong>Default Password:</strong> <code>Admin@Leniva2026!</code></div>
              <div className="text-[10px] text-blue-700 mt-1">✓ Full Control Enabled — Direct Native PostgreSQL</div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Verifying PostgreSQL Credentials...' : 'Sign In with Full Admin Control'}
            </button>

            <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Or Direct Access
              </span>
            </div>

            <button
              type="button"
              onClick={handleBypassLogin}
              className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>1-Click Instant Preview (Bypass Sign-In)</span>
            </button>

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Main Website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Filtered Products
  const filteredProducts = productsList.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase())
  )

  // Filtered Quotes
  const filteredQuotes = quotes.filter(q => {
    if (quoteFilter === 'all') return true
    return q.status === quoteFilter
  })

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD (FULL CONTROL SUITE)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-inter">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
              L
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm">Leniva CAD Solutions</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Master Control Active
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="Return to public website"
            >
              <Home className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Visit Website</span>
            </Link>

            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              title="Refresh all PostgreSQL data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Master Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-3">
          <nav className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Overview & Diagnostics</span>
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'quotes' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4" />
                <span>Quotes & RFQs</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'quotes' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {quotes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4" />
                <span>Contact Inquiries</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'contacts' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {contacts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Product Catalog</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'products' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {productsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4" />
                <span>Services</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'services' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {servicesList.length}
              </span>
            </button>


            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Layers className="w-4 h-4" />
                <span>Engineering Blogs</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'blogs' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {blogsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'categories' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span>Categories</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'categories' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {categoriesList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Site & CMS Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Admin Accounts</span>
            </button>

            <div className="pt-2 border-t border-slate-100 mt-1">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-3.5 pb-1.5">CAD Software</p>
              <button
                onClick={() => setActiveTab('cad_software')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'cad_software' ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4" />
                  <span>CAD Software Editor</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeTab === 'cad_software' ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
                }`}>7</span>
              </button>
            </div>

          </nav>

        </aside>

        {/* Master Content Area */}
        <main className="flex-1 space-y-6">
          {/* ====================================================
              TAB 1: OVERVIEW & DASHBOARD
             ==================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Quotes</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalQuotes ?? quotes.length}</div>
                    <div className="text-[10px] text-blue-600 font-semibold mt-1">Customer RFQs</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Live Products</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalProducts ?? productsList.length}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Catalog in PostgreSQL</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Services</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{servicesList.length}</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">3D Solutions & Services</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inquiries</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalContacts ?? contacts.length}</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">Contact Messages</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
              </div>
          </div>
          )}

          {/* ====================================================
              TAB 2: QUOTES & RFQS
             ==================================================== */}
          {activeTab === 'quotes' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Customer Quote Requests & RFQs</h3>
                  <p className="text-xs text-slate-500">Full control over status, pricing notes, and records</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={quoteFilter}
                    onChange={e => setQuoteFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="all">All Statuses ({quotes.length})</option>
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="quoted">Quoted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Client & Company</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Product / Service</th>
                      <th className="py-3 px-3">Quantity & Timeline</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredQuotes.map(q => (
                      <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{q.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{q.name}</div>
                          <div className="text-[11px] text-slate-500">{q.company || 'Individual'}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>{q.email}</div>
                          <div className="text-[11px] text-slate-400">{q.phone || '—'}</div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {q.service_or_product}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <div>Qty: {q.quantity}</div>
                          <div className="text-[11px] text-slate-400">{q.timeline}</div>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={q.status}
                            onChange={e => handleUpdateQuoteStatus(q.id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 cursor-pointer focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_review">In Review</option>
                            <option value="quoted">Quoted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedQuote(q)
                              setQuoteNotesInput(q.notes || '')
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Inspect details & notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete quote"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quote Modal with Internal Notes Editing */}
          {selectedQuote && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-base font-black text-slate-900">
                    Quote Inquiry #{selectedQuote.id}
                  </h4>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Client:</span>
                    <strong className="text-sm text-slate-900">{selectedQuote.name} ({selectedQuote.company || 'Independent'})</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block">Email:</span>
                      <strong className="text-slate-800">{selectedQuote.email}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone:</span>
                      <strong className="text-slate-800">{selectedQuote.phone || 'N/A'}</strong>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Requested Product / Service:</span>
                    <strong className="text-slate-800">{selectedQuote.service_or_product}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block mb-1 font-bold">Client Requirement:</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{selectedQuote.message || 'No additional message provided.'}</p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Admin Internal Notes / Quotation Amount</label>
                    <textarea
                      rows={3}
                      value={quoteNotesInput}
                      onChange={e => setQuoteNotesInput(e.target.value)}
                      placeholder="e.g. Sent official pricing quote of ₹1,45,000 + GST on 28th Sep"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => handleUpdateQuoteStatus(selectedQuote.id, selectedQuote.status, quoteNotesInput)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Notes & Status
                  </button>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 3: CONTACT INQUIRIES
             ==================================================== */}
          {activeTab === 'contacts' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Contact Form Inquiries</h3>
                  <p className="text-xs text-slate-500">Manage status &amp; notes for each message in <code>contact_messages</code></p>
                </div>
                <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  {contacts.length} total messages
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-3">Message Preview</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contacts.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{c.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.email}</div>
                          {c.phone && <div className="text-[11px] text-slate-400 font-mono">{c.phone}</div>}
                        </td>
                        <td className="py-3 px-3 font-semibold text-blue-700">{c.subject}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs truncate">{c.message}</td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={c.status}
                            onChange={e => handleUpdateContactStatus(c.id, e.target.value)}
                            className="text-xs font-bold rounded-lg border border-slate-200 bg-white px-2 py-1 cursor-pointer focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContact(c)
                              setContactNotesInput((c as any).notes || '')
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="View details & add notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contact Message Detail Modal */}
          {selectedContact && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h4 className="text-base font-black text-slate-900">
                    Contact #{selectedContact.id}
                  </h4>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">From:</span>
                    <strong className="text-sm text-slate-900">{selectedContact.name}</strong>
                    <span className="text-slate-500 ml-2">({selectedContact.email})</span>
                    {selectedContact.phone && <span className="text-slate-400 ml-2 font-mono">{selectedContact.phone}</span>}
                  </div>
                  <div>
                    <span className="text-slate-500 block">Subject:</span>
                    <strong className="text-blue-700">{selectedContact.subject}</strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block mb-1 font-bold">Message:</span>
                    <p className="text-slate-700 leading-relaxed font-normal">{selectedContact.message}</p>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Admin Notes / Reply Reference</label>
                    <textarea
                      rows={3}
                      value={contactNotesInput}
                      onChange={e => setContactNotesInput(e.target.value)}
                      placeholder="e.g. Replied via email on 28 Sep. Referred to sales team."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => handleUpdateContactStatus(selectedContact.id, selectedContact.status, contactNotesInput)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={() => { handleUpdateContactStatus(selectedContact.id, 'replied'); setSelectedContact(null) }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Mark Replied & Close
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* ====================================================
              TAB 4: PRODUCTS CATALOG (FULL CRUD)
             ==================================================== */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Equipment Catalog Management</h3>
                  <p className="text-xs text-slate-500">Add, edit pricing, toggle stock, or delete any product</p>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search machines..."
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => setIsNewProductOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Machine</span>
                  </button>
                </div>
              </div>

              {/* Add New Product Form */}
              {isNewProductOpen && (
                <form onSubmit={handleCreateProduct} className="p-5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-blue-950">Add New 3D Printer or Scanner</h4>
                    <button
                      type="button"
                      onClick={() => setIsNewProductOpen(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Pratham Ultra Pro"
                        value={newProd.name}
                        onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newProd.categorySlug}
                        onChange={e => setNewProd({
                          ...newProd,
                          categorySlug: e.target.value,
                          category: e.target.options[e.target.selectedIndex].text,
                        })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      >
                        <option value="fdm-3d-printers">FDM 3D Printers</option>
                        <option value="dlp-3d-printers">DLP 3D Printers</option>
                        <option value="industrial-lcd-3d-printers">Industrial LCD 3D Printers</option>
                        <option value="3d-scanners">3D Scanners</option>
                        <option value="cad-software">CAD Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={newProd.tagline}
                        onChange={e => setNewProd({ ...newProd, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Price (₹ INR, or 0 for Quote)</label>
                      <input
                        type="number"
                        value={newProd.price}
                        onChange={e => setNewProd({ ...newProd, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNewProductOpen(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                    >
                      Save to PostgreSQL
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Product Modal */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditProduct} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Machine: {editingProduct.name}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingProduct.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name}
                            onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug (URL)</label>
                          <input
                            type="text"
                            value={editingProduct.slug || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Brand</label>
                          <input
                            type="text"
                            value={editingProduct.brand}
                            onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingProduct.category}
                            onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category Slug</label>
                          <input
                            type="text"
                            value={editingProduct.category_slug || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, category_slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Technology</label>
                          <input
                            type="text"
                            value={editingProduct.technology || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, technology: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                          <input
                            type="number"
                            value={editingProduct.price ?? 0}
                            onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Original / MRP Price (₹)</label>
                          <input
                            type="number"
                            value={editingProduct.original_price ?? 0}
                            onChange={e => setEditingProduct({ ...editingProduct, original_price: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProduct.tagline || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingProduct.hero_image || ''}
                            onChange={e => setEditingProduct({ ...editingProduct, hero_image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingProduct((prev: any) => ({ ...prev, hero_image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingProduct.hero_image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingProduct.hero_image}
                              alt="Hero preview"
                              className="w-12 h-12 object-contain bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingProduct.hero_image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingProduct.short_description || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                        <textarea
                          rows={4}
                          value={editingProduct.description || ''}
                          onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProduct.in_stock !== false}
                            onChange={e => setEditingProduct({ ...editingProduct, in_stock: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">In Stock (Available for Delivery)</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!editingProduct.is_featured}
                            onChange={e => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Featured Showcase</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!editingProduct.is_quote_based}
                            onChange={e => setEditingProduct({ ...editingProduct, is_quote_based: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Quote Based (Contact for Price)</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Changes to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Brand</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3">Stock Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{p.slug}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{p.category}</td>
                        <td className="py-3 px-3 text-slate-700">{p.brand}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          {p.price > 0 ? `₹${p.price.toLocaleString()}` : 'Quote Based'}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              p.in_stock !== false ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            title="Click to toggle stock availability"
                          >
                            {p.in_stock !== false ? '✓ In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit product details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB: ENGINEERING SERVICES (FULL CRUD & FULL EDIT)
             ==================================================== */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Engineering & 3D Printing Services</h3>
                  <p className="text-xs text-slate-500">Manage industrial manufacturing and scanning services in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewServiceOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Add New Service Form */}
              {isNewServiceOpen && (
                <form onSubmit={handleCreateService} className="p-5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-blue-950">Add Engineering Service</h4>
                    <button
                      type="button"
                      onClick={() => setIsNewServiceOpen(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3D Scanning & Inspection"
                        value={newService.title}
                        onChange={e => setNewService({ ...newService, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Slug</label>
                      <input
                        type="text"
                        placeholder="e.g. 3d-scanning-inspection"
                        value={newService.slug}
                        onChange={e => setNewService({ ...newService, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Industrial Precision"
                        value={newService.badge}
                        onChange={e => setNewService({ ...newService, badge: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={newService.short_description}
                      onChange={e => setNewService({ ...newService, short_description: e.target.value })}
                      placeholder="Brief overview displayed on cards..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={newService.description}
                      onChange={e => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Comprehensive technical details..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsNewServiceOpen(false)}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                    >
                      Save Service to PostgreSQL
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditService} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Service: {editingService.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingService.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Service Title</label>
                          <input
                            type="text"
                            required
                            value={editingService.title}
                            onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Badge</label>
                          <input
                            type="text"
                            value={editingService.badge || ''}
                            onChange={e => setEditingService({ ...editingService, badge: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Slug (URL)</label>
                        <input
                          type="text"
                          value={editingService.slug || ''}
                          onChange={e => setEditingService({ ...editingService, slug: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Service Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingService.image || ''}
                            onChange={e => setEditingService({ ...editingService, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingService((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingService.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingService.image}
                              alt="Service preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingService.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={editingService.short_description || ''}
                          onChange={e => setEditingService({ ...editingService, short_description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
                        <textarea
                          rows={4}
                          value={editingService.description || ''}
                          onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Service to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Badge</th>
                      <th className="py-3 px-3">Description</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {servicesList.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{s.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/services#{s.slug}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                            {s.badge || 'Industrial'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 max-w-sm">
                          <p className="line-clamp-2">{s.short_description || s.description}</p>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingService(s)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit service details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}



          {/* ====================================================
              TAB 6: BLOG ARTICLES (FULL CONTROL)
             ==================================================== */}
          {activeTab === 'blogs' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Engineering Articles & Blogs</h3>
                  <p className="text-xs text-slate-500">Publish, edit or delete articles in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewBlogOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              {isNewBlogOpen && (
                <form onSubmit={handleCreateBlog} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <h4 className="text-sm font-black text-slate-900">Publish New Engineering Post</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={newBlog.category}
                        onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt</label>
                    <input
                      type="text"
                      value={newBlog.excerpt}
                      onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Content (Markdown Supported)</label>
                    <textarea
                      rows={5}
                      required
                      value={newBlog.content}
                      onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsNewBlogOpen(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Blog Modal */}
              {editingBlog && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditBlog} className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Blog Post: {editingBlog.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingBlog.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Article Title</label>
                          <input
                            type="text"
                            required
                            value={editingBlog.title}
                            onChange={e => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug</label>
                          <input
                            type="text"
                            value={editingBlog.slug}
                            onChange={e => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={editingBlog.category}
                            onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                          <input
                            type="text"
                            value={editingBlog.read_time || '5 min read'}
                            onChange={e => setEditingBlog({ ...editingBlog, read_time: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Date Published</label>
                          <input
                            type="text"
                            value={editingBlog.date || ''}
                            onChange={e => setEditingBlog({ ...editingBlog, date: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Featured Cover Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingBlog.image || ''}
                            onChange={e => setEditingBlog({ ...editingBlog, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload Image'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingBlog((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingBlog.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingBlog.image}
                              alt="Blog preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingBlog.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Short Excerpt</label>
                        <textarea
                          rows={2}
                          value={editingBlog.excerpt || ''}
                          onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Article Content (Markdown Supported)</label>
                        <textarea
                          rows={8}
                          value={editingBlog.content || ''}
                          onChange={e => setEditingBlog({ ...editingBlog, content: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div className="pt-1">
                        <label className="flex items-center space-x-2 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <input
                            type="checkbox"
                            checked={editingBlog.published !== false}
                            onChange={e => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="font-bold text-slate-800">Article Published & Live</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Blog Post to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">Title</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {blogsList.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{b.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">/blog/{b.slug}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{b.category}</td>
                        <td className="py-3 px-3 text-slate-500">{b.date}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            Published
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingBlog(b)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 7: CATEGORIES (FULL CONTROL)
             ==================================================== */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Equipment Categories</h3>
                  <p className="text-xs text-slate-500">Manage catalog taxonomy in PostgreSQL</p>
                </div>
                <button
                  onClick={() => setIsNewCategoryOpen(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              {isNewCategoryOpen && (
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    const res = await fetch('/api/categories', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newCategory),
                    })
                    if (res.ok) {
                      const created = await res.json()
                      setCategoriesList(prev => [...prev, created])
                      setIsNewCategoryOpen(false)
                      setNewCategory({ title: '', slug: '', description: '', image: '' })
                    }
                  }}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs"
                >
                  <h4 className="font-bold text-slate-900">Create New Category</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Category Title"
                      required
                      value={newCategory.title}
                      onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Slug (e.g. metal-3d-printers)"
                      value={newCategory.slug}
                      onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsNewCategoryOpen(false)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold"
                    >
                      Save Category
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Category Modal */}
              {editingCategory && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <form onSubmit={handleSaveEditCategory} className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900">
                          Edit Category: {editingCategory.title}
                        </h4>
                        <div className="text-[11px] font-mono text-slate-400">ID: {editingCategory.id}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Category Title</label>
                          <input
                            type="text"
                            required
                            value={editingCategory.title}
                            onChange={e => setEditingCategory({ ...editingCategory, title: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Slug</label>
                          <input
                            type="text"
                            value={editingCategory.slug}
                            onChange={e => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={editingCategory.subtitle || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, subtitle: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Icon Name</label>
                          <input
                            type="text"
                            value={editingCategory.icon || 'Box'}
                            onChange={e => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Category Image (PostgreSQL Storage or URL)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingCategory.image || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                          />
                          <label className="inline-flex items-center space-x-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold">
                              {uploadingField ? 'Uploading...' : 'Upload'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleDirectImageUpload(file, url => {
                                    setEditingCategory((prev: any) => ({ ...prev, image: url }))
                                  })
                                }
                              }}
                            />
                          </label>
                        </div>
                        {editingCategory.image && (
                          <div className="mt-2 flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                            <img
                              src={editingCategory.image}
                              alt="Category preview"
                              className="w-12 h-12 object-cover bg-white rounded-lg border border-slate-200"
                              onError={e => { (e.target as HTMLElement).style.display = 'none' }}
                            />
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">{editingCategory.image}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hero Banner URL</label>
                        <input
                          type="text"
                          value={editingCategory.hero_banner || ''}
                          onChange={e => setEditingCategory({ ...editingCategory, hero_banner: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={editingCategory.description || ''}
                          onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md cursor-pointer"
                      >
                        Save Category to PostgreSQL
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoriesList.map(cat => (
                  <div key={cat.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{cat.title}</h4>
                      <div className="text-[11px] font-mono text-slate-400">slug: {cat.slug}</div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => setEditingCategory(cat)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                        title="Edit category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ====================================================
              TAB 8: SITE SETTINGS & CMS
             ==================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Site Contact & Global Settings</h3>
                <p className="text-xs text-slate-500">Stored directly in PostgreSQL table <code>site_settings</code></p>
              </div>

              {settingsSavedMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{settingsSavedMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Display Name</label>
                    <input
                      type="text"
                      value={siteSettings.companyName || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={siteSettings.phone || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Support Email</label>
                    <input
                      type="email"
                      value={siteSettings.email || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={siteSettings.whatsapp || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Office / Showroom Physical Address</label>
                  <input
                    type="text"
                    value={siteSettings.address || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Working Hours</label>
                  <input
                    type="text"
                    value={siteSettings.workingHours || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Top Announcement Notice</label>
                  <input
                    type="text"
                    value={siteSettings.bannerNotice || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, bannerNotice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Settings to PostgreSQL</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ====================================================
              TAB 9: ADMIN USERS & PASSWORDS
             ==================================================== */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">Administrator Accounts & Credentials</h3>
                <p className="text-xs text-slate-500">Manage console logins stored in PostgreSQL table <code>admin_users</code></p>
              </div>

              {userMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-semibold">
                  {userMsg}
                </div>
              )}

              {/* Password Change Sub-modal */}
              {passwordChangeId && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-amber-950">Update Password for User ID #{passwordChangeId}</h4>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Enter new strong password"
                      value={newPasswordValue}
                      onChange={e => setNewPasswordValue(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleChangePassword(passwordChangeId)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold cursor-pointer"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordChangeId(null)
                        setNewPasswordValue('')
                      }}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Create User Form */}
              <form onSubmit={handleCreateUser} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                <h4 className="font-bold text-slate-900">Add New Administrator</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold cursor-pointer"
                  >
                    Create User in PostgreSQL
                  </button>
                </div>
              </form>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">Username</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Role</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-400">#{u.id}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{u.username}</td>
                        <td className="py-3 px-3 text-slate-600">{u.email}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-700">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => setPasswordChangeId(u.id)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-md font-bold text-[11px] cursor-pointer"
                          >
                            Change Password
                          </button>
                          {u.username !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* ====================================================
              TAB: CAD SOFTWARE EDITOR
             ==================================================== */}
          {activeTab === 'cad_software' && (() => {
            const cur = cadEdits[activeCadProduct] || {}
            const activeMeta = CAD_PRODUCTS.find(p => p.key === activeCadProduct)!
            const sectionTabs = [
              { key: 'identity',   label: 'Identity & Description' },
              { key: 'hero',       label: 'Hero Section' },
              { key: 'highlights', label: 'Key Features' },
              { key: 'licensing',  label: 'CTAs & Licensing' },
            ] as const

            return (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">CAD Software Content Editor</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Edit content for all 7 CAD software product pages. Changes saved to browser storage.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportCadJson}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                    <button
                      onClick={resetCadProduct}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Product</span>
                    </button>
                  </div>
                </div>

                {/* Save message */}
                {cadSaveMsg && (
                  <div className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold">
                    <Check className="w-4 h-4" />
                    <span>{cadSaveMsg}</span>
                  </div>
                )}

                {/* Product Selector */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Select Product to Edit</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {CAD_PRODUCTS.map(p => (
                      <button
                        key={p.key}
                        onClick={() => { setActiveCadProduct(p.key as CadProductKey); setCadEditSection('identity') }}
                        className={`text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          activeCadProduct === p.key
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }`}
                      >
                        <div className={`text-[9px] font-semibold mb-0.5 ${activeCadProduct === p.key ? 'text-indigo-200' : 'text-slate-400'}`}>{p.brand}</div>
                        <div className="leading-tight">{p.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Product + Section Tabs */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  {/* Product Title Bar */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-indigo-600 text-white">
                    <div>
                      <div className="text-[10px] font-semibold text-indigo-200">{activeMeta.brand}</div>
                      <div className="text-sm font-black">{activeMeta.label}</div>
                    </div>
                    <a
                      href={activeMeta.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-indigo-200 hover:text-white flex items-center space-x-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Page</span>
                    </a>
                  </div>

                  {/* Section Tabs */}
                  <div className="flex border-b border-slate-200 bg-slate-50">
                    {sectionTabs.map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setCadEditSection(tab.key as any)}
                        className={`px-4 py-2.5 text-[11px] font-bold transition-colors cursor-pointer border-b-2 -mb-px ${
                          cadEditSection === tab.key
                            ? 'border-indigo-600 text-indigo-700 bg-white'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 space-y-5">
                    {/* ─── IDENTITY SECTION ─── */}
                    {cadEditSection === 'identity' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Product Name</label>
                            <input
                              type="text"
                              value={cur.productName || ''}
                              onChange={e => updateCadField('productName', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Brand</label>
                            <input
                              type="text"
                              value={cur.brand || ''}
                              onChange={e => updateCadField('brand', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Main Headline</label>
                          <input
                            type="text"
                            value={cur.headline || ''}
                            onChange={e => updateCadField('headline', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Supporting Headline</label>
                          <input
                            type="text"
                            value={cur.supportingHeadline || ''}
                            onChange={e => updateCadField('supportingHeadline', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Short Description (used in cards & meta)</label>
                          <textarea
                            value={cur.shortDescription || ''}
                            onChange={e => updateCadField('shortDescription', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Full Description</label>
                          <textarea
                            value={cur.description || ''}
                            onChange={e => updateCadField('description', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Platform / OS</label>
                            <input
                              type="text"
                              value={cur.platform || ''}
                              onChange={e => updateCadField('platform', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Languages</label>
                            <input
                              type="text"
                              value={cur.languages || ''}
                              onChange={e => updateCadField('languages', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary File Format</label>
                            <input
                              type="text"
                              value={cur.primaryFormat || ''}
                              onChange={e => updateCadField('primaryFormat', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">CAD Engine</label>
                            <input
                              type="text"
                              value={cur.cadEngine || ''}
                              onChange={e => updateCadField('cadEngine', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Official Product URL</label>
                            <input
                              type="url"
                              value={cur.officialUrl || ''}
                              onChange={e => updateCadField('officialUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Download / Trial URL</label>
                            <input
                              type="url"
                              value={cur.downloadUrl || ''}
                              onChange={e => updateCadField('downloadUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Enquiry Email</label>
                          <input
                            type="email"
                            value={cur.enquiryEmail || ''}
                            onChange={e => updateCadField('enquiryEmail', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* ─── HERO SECTION ─── */}
                    {cadEditSection === 'hero' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Heading</label>
                          <input
                            type="text"
                            value={cur.heroHeading || ''}
                            onChange={e => updateCadField('heroHeading', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Supporting Text</label>
                          <textarea
                            value={cur.heroSupportingText || ''}
                            onChange={e => updateCadField('heroSupportingText', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Badge Text</label>
                          <input
                            type="text"
                            value={cur.heroBadge || ''}
                            onChange={e => updateCadField('heroBadge', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            placeholder="e.g. Native DWG Mechanical Engine"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Hero Image URL</label>
                          <input
                            type="url"
                            value={cur.heroImage || ''}
                            onChange={e => updateCadField('heroImage', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            placeholder="https://..."
                          />
                          {cur.heroImage && (
                            <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 h-32 bg-slate-100">
                              <img src={cur.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ─── KEY FEATURES / HIGHLIGHTS ─── */}
                    {cadEditSection === 'highlights' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black text-slate-900">Key Feature Bullets</p>
                            <p className="text-xs text-slate-500">These appear in the hero section, overview cards, and feature summaries.</p>
                          </div>
                          <button
                            onClick={addCadHighlight}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Feature</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(cur.highlights || []).map((h: string, i: number) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                                {i + 1}
                              </div>
                              <input
                                type="text"
                                value={h}
                                onChange={e => updateCadHighlight(i, e.target.value)}
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                              />
                              <button
                                onClick={() => removeCadHighlight(i)}
                                className="flex-shrink-0 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Remove feature"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {(!cur.highlights || cur.highlights.length === 0) && (
                          <div className="text-center py-8 text-slate-400 text-sm">
                            No features added yet. Click "Add Feature" to start.
                          </div>
                        )}
                      </div>
                    )}

                    {/* ─── CTAs & LICENSING ─── */}
                    {cadEditSection === 'licensing' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary CTA Button Text</label>
                            <input
                              type="text"
                              value={cur.trialCta || ''}
                              onChange={e => updateCadField('trialCta', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                              placeholder="e.g. Get Free 30-Day Trial"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Secondary CTA Button Text</label>
                            <input
                              type="text"
                              value={cur.pricingCta || ''}
                              onChange={e => updateCadField('pricingCta', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                              placeholder="e.g. Enquire About Pricing"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Licensing & Pricing Note</label>
                          <textarea
                            value={cur.licensingNote || ''}
                            onChange={e => updateCadField('licensingNote', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                            placeholder="Describe licensing options, pricing model, trial availability..."
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Official Product URL</label>
                            <input
                              type="url"
                              value={cur.officialUrl || ''}
                              onChange={e => updateCadField('officialUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Trial / Download URL</label>
                            <input
                              type="url"
                              value={cur.downloadUrl || ''}
                              onChange={e => updateCadField('downloadUrl', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Enquiry Email Address</label>
                          <input
                            type="email"
                            value={cur.enquiryEmail || ''}
                            onChange={e => updateCadField('enquiryEmail', e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>

                        {/* Live Preview Card */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CTA Preview</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm">
                              {cur.trialCta || 'Primary CTA'}
                            </div>
                            <div className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-bold shadow-sm">
                              {cur.pricingCta || 'Secondary CTA'}
                            </div>
                          </div>
                          {cur.licensingNote && (
                            <p className="text-xs text-slate-500 italic border-t border-slate-200 pt-3">{cur.licensingNote}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* All Products Summary Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                  <h4 className="text-sm font-black text-slate-900 mb-4">All 7 Products — Quick Overview</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                          <th className="py-2 px-3">Product</th>
                          <th className="py-2 px-3">Brand</th>
                          <th className="py-2 px-3">Headline</th>
                          <th className="py-2 px-3">Platform</th>
                          <th className="py-2 px-3">Features</th>
                          <th className="py-2 px-3 text-right">Edit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {CAD_PRODUCTS.map(p => {
                          const d = cadEdits[p.key] || {}
                          return (
                            <tr key={p.key} className={`hover:bg-slate-50 transition-colors ${activeCadProduct === p.key ? 'bg-indigo-50/50' : ''}`}>
                              <td className="py-3 px-3 font-bold text-slate-900">{d.productName || p.label}</td>
                              <td className="py-3 px-3 text-slate-500">{p.brand}</td>
                              <td className="py-3 px-3 text-slate-700 max-w-xs truncate">{d.headline || '—'}</td>
                              <td className="py-3 px-3 text-slate-500">{d.platform || '—'}</td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-mono text-[10px] font-bold">
                                  {(d.highlights || []).length} items
                                </span>
                              </td>
                              <td className="py-3 px-3 text-right">
                                <button
                                  onClick={() => { setActiveCadProduct(p.key as CadProductKey); setCadEditSection('identity'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer"
                                  title={`Edit ${p.label}`}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export Info Box */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">How to Apply Edits to the Live Site</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Edits are saved to your browser's local storage and persist across sessions. 
                        To permanently apply them to the website, click <strong>"Export JSON"</strong>, download the file, 
                        and share it with your developer to update the corresponding <code className="bg-amber-100 px-1 rounded">src/data/</code> files 
                        (<code className="bg-amber-100 px-1 rounded">aresMechanicalData.ts</code>, <code className="bg-amber-100 px-1 rounded">enscapeData.ts</code>, etc.).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}


        </main>

      </div>
    </div>
  )
}
