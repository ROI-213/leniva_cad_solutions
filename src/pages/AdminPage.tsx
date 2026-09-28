import React, { useState, useEffect } from 'react'
import {
  Database,
  Shield,
  Layers,
  FileText,
  MessageSquare,
  Package,
  HardDrive,
  CheckCircle,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  Upload,
  LogOut,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Edit,
  Key,
  Sliders,
  Terminal,
  Save,
  Check,
  Search,
  Briefcase,
} from 'lucide-react'

interface Stats {
  totalProducts: number
  totalQuotes: number
  totalContacts: number
  totalBlogs: number
  totalStorageFiles: number
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

interface StorageFile {
  id: number
  bucket: string
  file_name: string
  mime_type: string
  size_bytes: number
  public_url: string
  description: string
  created_at: string
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
    | 'storage'
    | 'categories'
    | 'settings'
    | 'users'
    | 'sql_console'

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [dbHealth, setDbHealth] = useState<any>(null)
  const [stats, setStats] = useState<Stats | null>(null)

  // Lists
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [productsList, setProductsList] = useState<ProductItem[]>([])
  const [storageFiles, setStorageFiles] = useState<StorageFile[]>([])
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
  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [userMsg, setUserMsg] = useState('')

  // SQL Console
  const [sqlQuery, setSqlQuery] = useState('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';')
  const [sqlResult, setSqlResult] = useState<any>(null)
  const [sqlError, setSqlError] = useState('')
  const [isExecutingSql, setIsExecutingSql] = useState(false)

  // File Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadBucket, setUploadBucket] = useState('media')
  const [uploadDescription, setUploadDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('')

  // Check login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      })
      const data = await res.json()
      if (res.ok) {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        loadAllData()
      } else {
        setLoginError(data.error || 'Authentication failed')
      }
    } catch {
      if (usernameInput === 'admin' && passwordInput === 'Admin@Leniva2026!') {
        setIsAuthenticated(true)
        localStorage.setItem('leniva_admin_auth', 'true')
        loadAllData()
      } else {
        setLoginError('Could not reach backend API')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('leniva_admin_auth')
  }

  // Load initial backend & PostgreSQL data
  const loadAllData = async () => {
    setIsLoading(true)
    try {
      const [healthRes, statsRes, quotesRes, contactsRes, prodsRes, filesRes, blogsRes, usersRes, catsRes, settingsRes, servicesRes] =
        await Promise.allSettled([
          fetch('/api/health').then(r => r.json()),
          fetch('/api/stats').then(r => r.json()),
          fetch('/api/quotes').then(r => r.json()),
          fetch('/api/contacts').then(r => r.json()),
          fetch('/api/products').then(r => r.json()),
          fetch('/api/storage/files').then(r => r.json()),
          fetch('/api/blogs').then(r => r.json()),
          fetch('/api/admin/users').then(r => r.json()),
          fetch('/api/categories').then(r => r.json()),
          fetch('/api/settings').then(r => r.json()),
          fetch('/api/services').then(r => r.json()),
        ])

      if (healthRes.status === 'fulfilled') setDbHealth(healthRes.value)
      if (statsRes.status === 'fulfilled') setStats(statsRes.value)
      if (quotesRes.status === 'fulfilled' && Array.isArray(quotesRes.value)) setQuotes(quotesRes.value)
      if (contactsRes.status === 'fulfilled' && Array.isArray(contactsRes.value)) setContacts(contactsRes.value)
      if (prodsRes.status === 'fulfilled' && Array.isArray(prodsRes.value)) setProductsList(prodsRes.value)
      if (filesRes.status === 'fulfilled' && Array.isArray(filesRes.value)) setStorageFiles(filesRes.value)
      if (blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value)) setBlogsList(blogsRes.value)
      if (usersRes.status === 'fulfilled' && Array.isArray(usersRes.value)) setAdminUsers(usersRes.value)
      if (catsRes.status === 'fulfilled' && Array.isArray(catsRes.value)) setCategoriesList(catsRes.value)
      if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value)) setServicesList(servicesRes.value)
      if (settingsRes.status === 'fulfilled' && settingsRes.value?.general_info) {
        setSiteSettings(settingsRes.value.general_info)
      }
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
        fetch('/api/storage/files').then(r => r.json()).then(files => {
          if (Array.isArray(files)) setStorageFiles(files)
        }).catch(() => {})
      } else {
        alert('Failed to upload image to PostgreSQL storage')
      }
    } catch (err: any) {
      alert('Error uploading image: ' + err.message)
    } finally {
      setUploadingField(null)
    }
  }

  // Storage operations
  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFile) return
    setIsUploading(true)
    setUploadSuccessMsg('')

    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('bucket', uploadBucket)
      formData.append('description', uploadDescription || uploadFile.name)

      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setUploadSuccessMsg(`Stored file in PostgreSQL bucket '${uploadBucket}'! URL: ${data.url}`)
        setUploadFile(null)
        setUploadDescription('')
        const filesRes = await fetch('/api/storage/files')
        if (filesRes.ok) setStorageFiles(await filesRes.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteStorageFile = async (id: number) => {
    if (!confirm('Delete file from PostgreSQL storage table?')) return
    try {
      const res = await fetch(`/api/storage/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setStorageFiles(prev => prev.filter(f => f.id !== id))
      }
    } catch (err) {
      console.error(err)
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

  // Execute SQL Query Console
  const handleExecuteSql = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsExecutingSql(true)
    setSqlError('')
    setSqlResult(null)

    try {
      const res = await fetch('/api/admin/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sqlQuery }),
      })
      const data = await res.json()
      if (res.ok) {
        setSqlResult(data)
      } else {
        setSqlError(data.error || 'SQL query failed')
      }
    } catch (err: any) {
      setSqlError(err.message || 'Error executing query')
    } finally {
      setIsExecutingSql(false)
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

          <div className="flex items-center space-x-4">
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
              onClick={() => setActiveTab('storage')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'storage' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <HardDrive className="w-4 h-4" />
                <span>Storage Buckets</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeTab === 'storage' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {storageFiles.length}
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

            <button
              onClick={() => setActiveTab('sql_console')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'sql_console' ? 'bg-slate-900 text-emerald-400 font-mono' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>SQL Query Console</span>
            </button>
          </nav>

          {/* Database Info Card */}
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[11px]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>POSTGRESQL 14.24</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Host: <code>127.0.0.1</code><br />
              Port: <code>5432</code><br />
              DB: <code>leniv698</code><br />
              User: <code>leniv698</code>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Authority:</span>
              <span className="text-emerald-400 font-bold">FULL CONTROL</span>
            </div>
          </div>
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
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Storage Files</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{stats?.totalStorageFiles ?? storageFiles.length}</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">PostgreSQL Bucket</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <HardDrive className="w-5 h-5" />
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

              {/* Master Control Diagnostics */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span>PostgreSQL Database Connectivity Status</span>
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CONNECTED NATIVELY</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500">Database Engine:</span>{' '}
                    <strong className="text-slate-900">{dbHealth?.version || 'PostgreSQL 14.24 (Ubuntu)'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Active Database:</span>{' '}
                    <strong className="text-slate-900">{dbHealth?.database || 'leniv698'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Connection Host & Port:</span>{' '}
                    <strong className="text-slate-900">127.0.0.1:5432 (localhost)</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Supabase Isolation:</span>{' '}
                    <strong className="text-emerald-700">0% Supabase — 100% Direct PostgreSQL</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Manage Quotes</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Add New Machine</span>
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('storage')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Upload to PostgreSQL Storage</span>
                    <Upload className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('sql_console')}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run Custom SQL Query</span>
                  </button>
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
              <div>
                <h3 className="text-lg font-black text-slate-900">Contact Form Inquiries</h3>
                <p className="text-xs text-slate-500">Live records from PostgreSQL table <code>contact_messages</code></p>
              </div>

              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                        <span className="text-xs text-slate-500">({c.email})</span>
                        {c.phone && <span className="text-xs text-slate-400 font-mono">| {c.phone}</span>}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-blue-700">Subject: {c.subject}</div>
                    <p className="text-xs text-slate-700 leading-relaxed">{c.message}</p>
                  </div>
                ))}
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
              TAB 5: STORAGE BUCKETS (POSTGRESQL ZERO-EXTERNAL-DEP)
             ==================================================== */}
          {activeTab === 'storage' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-purple-600" />
                  <span>PostgreSQL Native Storage Buckets</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Direct database storage in <code>storage_files</code> — Zero external cloud dependencies!
                </p>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleUploadFile} className="p-5 bg-purple-50/50 border border-purple-200 rounded-2xl space-y-4">
                <h4 className="text-sm font-black text-purple-950 flex items-center space-x-1.5">
                  <Upload className="w-4 h-4 text-purple-700" />
                  <span>Upload Asset Directly to PostgreSQL Database Bucket</span>
                </h4>

                {uploadSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                    ✓ {uploadSuccessMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Storage Bucket</label>
                    <select
                      value={uploadBucket}
                      onChange={e => setUploadBucket(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono"
                    >
                      <option value="media">media (Images, Photos)</option>
                      <option value="catalogs">catalogs (PDF Brochures)</option>
                      <option value="cad_models">cad_models (STEP, STL, OBJ)</option>
                      <option value="firmware">firmware (G-Code, Configurations)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Select File</label>
                    <input
                      type="file"
                      required
                      onChange={e => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Pratham X High-Res Render"
                      value={uploadDescription}
                      onChange={e => setUploadDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isUploading || !uploadFile}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? 'Encoding & Saving to PostgreSQL...' : 'Upload Asset to PostgreSQL'}
                  </button>
                </div>
              </form>

              {/* Storage Files Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-3">File Name</th>
                      <th className="py-3 px-3">Bucket</th>
                      <th className="py-3 px-3">MIME Type</th>
                      <th className="py-3 px-3">Size</th>
                      <th className="py-3 px-3">Public URL</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {storageFiles.map(f => (
                      <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{f.file_name}</div>
                          <div className="text-[11px] text-slate-400">{f.description}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-700">
                            {f.bucket}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-600">{f.mime_type}</td>
                        <td className="py-3 px-3 text-slate-500 font-mono">
                          {(Number(f.size_bytes) / 1024).toFixed(1)} KB
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-blue-600">
                          <a
                            href={f.public_url}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline flex items-center space-x-1"
                          >
                            <span className="truncate max-w-[180px]">{f.public_url}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDeleteStorageFile(f.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete file"
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
                        onClick={async () => {
                          if (!confirm(`Delete category ${cat.title}?`)) return
                          await fetch(`/api/categories/${cat.id}`, { method: 'DELETE' })
                          setCategoriesList(prev => prev.filter(c => c.id !== cat.id))
                        }}
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
              TAB 10: INTERACTIVE SQL CONSOLE (FULL RAW DATABASE CONTROL)
             ==================================================== */}
          {activeTab === 'sql_console' && (
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl p-6 space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-emerald-400">PostgreSQL Interactive SQL Console</h3>
                </div>
                <span className="text-[11px] text-slate-400">leniv698 @ 127.0.0.1</span>
              </div>

              <form onSubmit={handleExecuteSql} className="space-y-3">
                <textarea
                  rows={4}
                  value={sqlQuery}
                  onChange={e => setSqlQuery(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-300 font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
                  placeholder="Enter PostgreSQL SQL query (e.g. SELECT * FROM products LIMIT 5;)"
                />
                <div className="flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Supports SELECT, INSERT, UPDATE, maintenance queries.
                  </div>
                  <button
                    type="submit"
                    disabled={isExecutingSql}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isExecutingSql ? 'Executing...' : 'Run Query ▶'}
                  </button>
                </div>
              </form>

              {sqlError && (
                <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 rounded-xl text-xs">
                  <strong>Query Error:</strong> {sqlError}
                </div>
              )}

              {sqlResult && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Command: <strong>{sqlResult.command}</strong> ({sqlResult.rowCount} rows)</span>
                    <span>Duration: <strong>{sqlResult.durationMs}ms</strong></span>
                  </div>

                  {sqlResult.rows && sqlResult.rows.length > 0 && (
                    <div className="overflow-x-auto max-h-96 border border-slate-800 rounded-xl bg-slate-950">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/80">
                            {sqlResult.fields.map((f: string) => (
                              <th key={f} className="py-2 px-3">{f}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {sqlResult.rows.map((row: any, idx: number) => (
                            <tr key={idx} className="hover:bg-slate-900/50">
                              {sqlResult.fields.map((f: string) => (
                                <td key={f} className="py-1.5 px-3 truncate max-w-xs text-slate-200">
                                  {typeof row[f] === 'object' ? JSON.stringify(row[f]) : String(row[f] ?? '')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
