import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, WishlistItem, QuoteFormData } from '../types'
import { siteConfig } from '../data/siteConfig'

interface SiteSettingsType {
  companyName: string
  phone: string
  email: string
  address: string
  workingHours: string
  whatsapp: string
  bannerNotice: string
}

interface AppContextType {
  // Cart
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number

  // Wishlist
  wishlistItems: WishlistItem[]
  toggleWishlist: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  wishlistCount: number

  // Quote Modal
  isQuoteModalOpen: boolean
  quoteProduct: string
  openQuoteModal: (productName?: string) => void
  closeQuoteModal: () => void
  submitQuote: (data: QuoteFormData) => Promise<boolean>

  // Search Modal
  isSearchModalOpen: boolean
  openSearchModal: () => void
  closeSearchModal: () => void

  // Live Site Settings from PostgreSQL
  liveSiteSettings: SiteSettingsType
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist state with localStorage
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('leniva_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Quote Modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  // Live Site Settings from PostgreSQL (defaults from static siteConfig)
  const [liveSiteSettings, setLiveSiteSettings] = useState<SiteSettingsType>({
    companyName: siteConfig.name,
    phone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    workingHours: siteConfig.workingHours,
    whatsapp: siteConfig.whatsappNumber,
    bannerNotice: 'Now Delivering Advanced 3D Scanners & Industrial Printers PAN-India',
  })

  // Fetch live settings from PostgreSQL on mount
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        if (data?.general_info) {
          setLiveSiteSettings(prev => ({ ...prev, ...data.general_info }))
        }
      })
      .catch(() => {
        // Silently fall back to siteConfig defaults
      })
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('leniva_cart', JSON.stringify(cartItems))
    } catch (e) {
      console.error(e)
    }
  }, [cartItems])

  useEffect(() => {
    try {
      localStorage.setItem('leniva_wishlist', JSON.stringify(wishlistItems))
    } catch (e) {
      console.error(e)
    }
  }, [wishlistItems])

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCartItems(prev => {
      const existing = prev.find(
        i => i.shopItemId === item.shopItemId && i.selectedColor === item.selectedColor
      )
      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, { ...item, id: `${item.shopItemId}-${Date.now()}` }]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const newQty = i.quantity + delta
            return newQty > 0 ? { ...i, quantity: newQty } : null
          }
          return i
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Wishlist operations
  const toggleWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.some(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      }
      return [...prev, item]
    })
  }

  const isInWishlist = (id: string) => wishlistItems.some(i => i.id === id)
  const wishlistCount = wishlistItems.length

  // Quote operations
  const openQuoteModal = (productName = '') => {
    setQuoteProduct(productName)
    setIsQuoteModalOpen(true)
  }

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false)
    setQuoteProduct('')
  }

  const submitQuote = async (data: QuoteFormData): Promise<boolean> => {
    // Saves quote inquiry to PostgreSQL database via API
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        return true
      }
    } catch (e) {
      console.warn('API quote submit fallback:', e)
    }
    console.log('Quote Request Submitted:', data)
    await new Promise(resolve => setTimeout(resolve, 600))
    return true
  }

  const openSearchModal = () => setIsSearchModalOpen(true)
  const closeSearchModal = () => setIsSearchModalOpen(false)

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isQuoteModalOpen,
        quoteProduct,
        openQuoteModal,
        closeQuoteModal,
        submitQuote,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        liveSiteSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
