export type ProductTechnology = 
  | 'FDM 3D Printer'
  | 'DLP 3D Printer'
  | 'Industrial LCD'
  | '3D Scanner'
  | 'CAD Software'
  | 'Materials & Consumables'
  | 'Accessories'

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categorySlug: string
  technology: ProductTechnology
  tagline: string
  description: string
  shortDescription: string
  heroImage: string
  images: string[]
  keySpecs: { label: string; value: string }[]
  specifications: Record<string, string>
  features: string[]
  applications: string[]
  materials?: string[]
  whoIsItFor?: string[]
  brochureUrl?: string
  price?: number
  priceDisplay?: string
  inStock?: boolean
  isNew?: boolean
  isFeatured?: boolean
  relatedProductSlugs?: string[]
}

export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  image: string
  badge?: string
  applications: string[]
  advantages: string[]
  workflow: { step: number; title: string; description: string }[]
  deliverables?: string[]
  supportedMaterials?: string[]
  technologiesUsed?: string[]
}

export interface ShopItem {
  id: string
  slug: string
  name: string
  category: string
  categoryName: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  inStock: boolean
  rating: number
  reviewsCount: number
  shortDescription: string
  weightOrVolume?: string
  colorOptions?: string[]
  specifications: Record<string, string>
  badge?: string
  isQuoteBased?: boolean
  productSlug?: string
  isContain?: boolean
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  author: { name: string; role: string }
  image: string
  excerpt: string
  content: string
  tags: string[]
}

export interface CartItem {
  id: string
  shopItemId: string
  name: string
  price: number
  image: string
  quantity: number
  selectedColor?: string
}

export interface WishlistItem {
  id: string
  type: 'product' | 'shop'
  name: string
  slug: string
  image: string
  category: string
  price?: number
  isQuoteRequired?: boolean
}

export interface QuoteFormData {
  fullName: string
  company: string
  email: string
  phone: string
  productOrService: string
  quantity: string
  application: string
  message: string
}
