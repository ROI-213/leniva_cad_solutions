// White PLA Product Data Model
import filamentWhite from '../assets/filaments/filament-white.png'
import filamentSpoolWhite from '../assets/filaments/filament-spool-white.jpg'
import filamentGreySilver from '../assets/filaments/filament-grey-silver.png'
import filamentGold from '../assets/filaments/filament-gold.png'
import filamentOrange from '../assets/filaments/filament-orange.png'
import filamentYellow from '../assets/filaments/filament-yellow.png'
import filamentBlue from '../assets/filaments/filament-blue.png'
import filamentBlack from '../assets/filaments/filament-black.png'
import filamentRed from '../assets/filaments/filament-red.png'

export interface WhitePlaProductData {
  id: string
  sku: string
  name: string
  fullTitle: string
  brand: string
  badge: string
  material: string
  color: string
  colorHex: string
  diameter: string
  weight: string
  technology: string
  productType: string
  category: string
  userLevel: string
  mrp: number
  price: number
  discountPercent: number
  stockStatus: string
  inStock: boolean
  rating: number
  reviewsCount: number
  shortDescription: string
  descriptionParagraphs: string[]
  images: {
    id: string
    title: string
    src: string
    alt: string
    tag: string
  }[]
  quickSpecifications: {
    label: string
    value: string
    iconName: string
  }[]
  whyChooseCards: {
    id: string
    title: string
    description: string
    iconName: string
  }[]
  applicationCards: {
    id: string
    title: string
    subtitle: string
    description: string
    iconName: string
  }[]
  whatIsPlaPoints: string[]
  targetAudience: {
    category: string
    title: string
    description: string
    iconName: string
  }[]
  compatibilityInfo: {
    title: string
    supportedTechnology: string
    diameter: string
    badge: string
    guidance: string
  }
  technicalSpecsTable: {
    property: string
    value: string
  }[]
  trustPillars: {
    title: string
    subtitle: string
    iconName: string
  }[]
  seo: {
    title: string
    description: string
    canonicalUrl: string
    keywords: string[]
  }
  relatedProducts: {
    id: string
    slug: string
    name: string
    material: string
    color: string
    colorHex: string
    price: number
    originalPrice: number
    rating: number
    reviewsCount: number
    image: string
  }[]
}

export const initialWhitePlaData: WhitePlaProductData = {
  id: 'filament-pla-white',
  sku: 'MK3D-PLA-175-WHT-1KG',
  name: 'PLA 3D Printer Filament (White)',
  fullTitle: 'PLA 3D Printer Filament (White) | 1KG | 1.75mm | High-Quality PLA Filament',
  brand: 'Make3D',
  badge: 'MAKE3D FILAMENT',
  material: 'PLA',
  color: 'White',
  colorHex: '#F8F9FA',
  diameter: '1.75 mm',
  weight: '1 KG',
  technology: 'FDM / FFF',
  productType: '3D Printer Filament',
  category: 'Make3D Filament',
  userLevel: 'Beginner to Professional',
  mrp: 1600,
  price: 1399,
  discountPercent: 13,
  stockStatus: 'Available for Order',
  inStock: true,
  rating: 5.0,
  reviewsCount: 5,
  shortDescription:
    'Reliable, easy-to-print white PLA filament designed for consistent FDM/FFF 3D printing, prototypes, models, educational projects, decorative parts, and everyday printing.',
  descriptionParagraphs: [
    'Make3D White PLA 3D printer filament is manufactured specifically for makers, students, designers, and engineering teams seeking dependable, straightforward FDM/FFF extrusion across everyday printing jobs.',
    'Produced with strict dimensional monitoring, each spool delivers uniform 1.75 mm filament diameter to avoid feeding slips and nozzle clogging. The crisp opaque white finish highlights subtle geometric contours and surface transitions on architectural layouts, early design mockups, and artistic prints.',
    'Because PLA prints comfortably at standard thermal settings without demanding specialized enclosed build chambers, it serves as the ideal foundational material for classroom learning, rapid desktop concepting, and visual display models.',
  ],
  images: [
    {
      id: 'gallery-1',
      title: 'Front View',
      src: filamentWhite,
      alt: 'Make3D White PLA 1.75mm 1KG filament spool front studio view',
      tag: 'Front View',
    },
    {
      id: 'gallery-2',
      title: 'Studio Angled View',
      src: filamentSpoolWhite,
      alt: 'White PLA 3D printer filament spool angled desktop view',
      tag: 'Angled View',
    },
    {
      id: 'gallery-3',
      title: 'Printed Prototype Gear',
      src: '/images/products/pratham-mini-gear.png',
      alt: 'Clean white PLA 3D printed precision mechanical gear component',
      tag: 'Printed Part',
    },
    {
      id: 'gallery-4',
      title: 'Desktop 3D Printer Spool Mounting',
      src: '/images/products/pratham-mini.png',
      alt: 'White PLA spool loaded on desktop FDM 3D printer',
      tag: 'On Printer',
    },
    {
      id: 'gallery-5',
      title: 'Architectural Model Print',
      src: '/images/products/pratham-mini-house.png',
      alt: 'White PLA 3D printed architectural concept model with crisp surface finish',
      tag: 'Application',
    },
  ],
  quickSpecifications: [
    { label: 'Material', value: 'PLA', iconName: 'Layers' },
    { label: 'Colour', value: 'White', iconName: 'Palette' },
    { label: 'Filament Diameter', value: '1.75 mm', iconName: 'Gauge' },
    { label: 'Net Weight', value: '1 KG', iconName: 'Scale' },
    { label: 'Printing Technology', value: 'FDM / FFF', iconName: 'Printer' },
    { label: 'Product Type', value: '3D Printer Filament', iconName: 'Box' },
    { label: 'Application', value: 'General-purpose 3D printing', iconName: 'Sparkles' },
    { label: 'User Level', value: 'Beginner to Professional', iconName: 'Users' },
  ],
  whyChooseCards: [
    {
      id: 'why-1',
      title: 'Easy to Print',
      description:
        'PLA is renowned for its straightforward printing characteristics, requiring minimal setup and offering wide thermal tolerance for beginners and veterans alike.',
      iconName: 'Smile',
    },
    {
      id: 'why-2',
      title: 'Consistent Extrusion',
      description:
        'Controlled melt viscosity and precise winding ensure steady, predictable material feeding through direct-drive and Bowden extruders.',
      iconName: 'Repeat',
    },
    {
      id: 'why-3',
      title: 'Smooth Finish',
      description:
        'Yields clean, uniform surface textures that accentuate surface details, layer consistency, and crisp part perimeters.',
      iconName: 'Sparkles',
    },
    {
      id: 'why-4',
      title: 'Reliable Performance',
      description:
        'Engineered for repeatable results across daily desktop 3D printing routines without sudden brittleness or feeding jams.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'why-5',
      title: '1.75mm Standard',
      description:
        'Engineered to strict ±0.03 mm dimensional tolerance, guaranteeing compatibility with all standard 1.75 mm FDM printer hotends.',
      iconName: 'Maximize2',
    },
    {
      id: 'why-6',
      title: '1KG Spool',
      description:
        'A full 1,000-gram net spool delivers ample material to complete multiple medium and large printing projects without frequent spool swaps.',
      iconName: 'Package',
    },
  ],
  applicationCards: [
    {
      id: 'app-1',
      title: 'Prototyping',
      subtitle: 'Early Design Stages',
      description:
        'Quickly evaluate ergonomics, spatial fit, and form factors of newly modeled product assemblies before initiating production tooling.',
      iconName: 'Lightbulb',
    },
    {
      id: 'app-2',
      title: 'Models',
      subtitle: 'Physical Visualization',
      description:
        'Transform complex CAD geometries and architectural mockups into clean, high-contrast physical models for stakeholder presentations.',
      iconName: 'Box',
    },
    {
      id: 'app-3',
      title: 'Educational Projects',
      subtitle: 'STEM & Maker Labs',
      description:
        'Safe, user-friendly material well suited for schools, engineering colleges, robotics clubs, and university research workshops.',
      iconName: 'GraduationCap',
    },
    {
      id: 'app-4',
      title: 'Decorative Prints',
      subtitle: 'Display & Art',
      description:
        'Create aesthetic sculptures, architectural miniatures, display figurines, and craft designs with an appealing, uniform white tone.',
      iconName: 'Sparkles',
    },
    {
      id: 'app-5',
      title: 'Functional Prints',
      subtitle: 'Everyday Enclosures & Jigs',
      description:
        'Produce desktop organizers, brackets, cable routing clips, and non-stressed utility hardware where PLA properties are appropriate.',
      iconName: 'Wrench',
    },
    {
      id: 'app-6',
      title: 'Creative Projects',
      subtitle: 'Hobbies & Makerspaces',
      description:
        'Ideal medium for DIY enthusiasts, model train hobbyists, cosplay prop builders, and electronic enclosure experimenters.',
      iconName: 'Palette',
    },
  ],
  whatIsPlaPoints: [
    'PLA stands for Polylactic Acid, a thermoplastic polyester widely recognized as the standard introductory and workhorse polymer in FDM/FFF additive manufacturing.',
    'It processes at relatively moderate printing temperatures compared with high-temperature engineering plastics such as Polycarbonate, PEEK, or Nylon.',
    'Offers lower thermal shrinkage during layer cooling, which minimizes perimeter warping and helps maintain flat base layers on standard heated print beds.',
    'Possesses high surface hardness and dimensional predictability, making it favored for concept modeling, educational demonstrations, and visual design validation.',
    'Note: Standard PLA is designed for ambient temperature environments and is not intended for high-heat automotive engine compartments or severe chemical immersion.',
  ],
  targetAudience: [
    {
      category: 'BEGINNERS',
      title: 'Beginners & First-Time Printers',
      description:
        'An accessible, forgiving starting filament for anyone learning the fundamentals of FDM 3D printing and bed leveling.',
      iconName: 'Smile',
    },
    {
      category: 'STUDENTS',
      title: 'Students & Educators',
      description:
        'Reliable material for academic research, STEM competitions, engineering coursework, and makerspace laboratory projects.',
      iconName: 'GraduationCap',
    },
    {
      category: 'MAKERS & HOBBYISTS',
      title: 'Makers & DIY Enthusiasts',
      description:
        'Versatile, hassle-free filament for hobbyist models, electronic project enclosures, cosplay accents, and home organizers.',
      iconName: 'Palette',
    },
    {
      category: 'DESIGNERS & PROFESSIONALS',
      title: 'Designers & Engineers',
      description:
        'Fast and dependable medium for physical concept iterations, aesthetic sign-offs, and general-purpose workspace prototyping.',
      iconName: 'Briefcase',
    },
  ],
  compatibilityInfo: {
    title: 'Printer Compatibility',
    supportedTechnology: 'FDM / FFF 3D Printers',
    diameter: '1.75 mm',
    badge: '1.75 mm filament systems',
    guidance:
      'Compatible with open-material FDM / FFF desktop and industrial 3D printers equipped with standard 1.75 mm extruders and hotends. Please verify your machine utilizes 1.75 mm diameter feedstock rather than 2.85 mm.',
  },
  technicalSpecsTable: [
    { property: 'Product', value: 'PLA 3D Printer Filament – White' },
    { property: 'Material', value: 'PLA (Polylactic Acid)' },
    { property: 'Colour', value: 'White' },
    { property: 'Diameter', value: '1.75 mm (±0.03 mm tolerance)' },
    { property: 'Net Weight', value: '1 KG (1,000 grams / 2.2 lbs)' },
    { property: 'Printing Technology', value: 'FDM / FFF (Fused Deposition Modeling)' },
    { property: 'Category', value: 'Make3D Filament' },
    { property: 'Spool Type', value: 'Clear Polycarbonate Reel' },
    {
      property: 'Recommended Application',
      value: 'Prototypes, models, educational projects, decorative parts and general-purpose printing',
    },
    { property: 'User Level', value: 'Beginner, Student, Maker, Professional' },
    { property: 'Packaging', value: 'Vacuum-sealed moisture barrier bag with desiccant pouch' },
  ],
  trustPillars: [
    {
      title: 'Quality & Genuine Product',
      subtitle: 'Authentic Make3D certified filament tested for consistent extrusion',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Free & Fast Shipping Across India',
      subtitle: 'Dispatched in protective packaging with tracking support',
      iconName: 'Truck',
    },
    {
      title: '100% Secure Online Payments',
      subtitle: 'Encrypted checkout with GST invoice available on request',
      iconName: 'Lock',
    },
  ],
  seo: {
    title: 'PLA 3D Printer Filament White 1KG 1.75mm | Make3D',
    description:
      'Shop white PLA 3D printer filament in 1KG spool with 1.75mm diameter. Easy-to-print filament for FDM/FFF printers, prototypes, models, educational and creative projects.',
    canonicalUrl: '/product/pla-3d-printer-filament-white/',
    keywords: [
      'PLA 3D printer filament',
      'White PLA filament',
      'PLA filament 1.75mm',
      '1KG PLA filament',
      '3D printer filament India',
      'FDM filament',
      'FFF filament',
      'white 3D printing filament',
    ],
  },
  relatedProducts: [
    {
      id: 'filament-plaplus-grey',
      slug: 'plaplus-grey-silver-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Grey / Silver',
      material: 'PLA+',
      color: 'Grey / Silver',
      colorHex: '#9E9E9E',
      price: 899,
      originalPrice: 1099,
      rating: 4.8,
      reviewsCount: 176,
      image: filamentGreySilver,
    },
    {
      id: 'filament-plaplus-black',
      slug: 'plaplus-black-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Black',
      material: 'PLA+',
      color: 'Black',
      colorHex: '#1A1A1A',
      price: 899,
      originalPrice: 1049,
      rating: 4.9,
      reviewsCount: 189,
      image: filamentBlack,
    },
    {
      id: 'filament-plaplus-blue',
      slug: 'plaplus-blue-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Blue',
      material: 'PLA+',
      color: 'Blue',
      colorHex: '#1E40AF',
      price: 899,
      originalPrice: 1049,
      rating: 4.8,
      reviewsCount: 143,
      image: filamentBlue,
    },
    {
      id: 'filament-plaplus-red',
      slug: 'plaplus-red-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Red',
      material: 'PLA+',
      color: 'Red',
      colorHex: '#DC2626',
      price: 899,
      originalPrice: 1049,
      rating: 4.8,
      reviewsCount: 121,
      image: filamentRed,
    },
    {
      id: 'filament-plaplus-yellow',
      slug: 'plaplus-yellow-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Yellow',
      material: 'PLA+',
      color: 'Yellow',
      colorHex: '#EAB308',
      price: 899,
      originalPrice: 1049,
      rating: 4.7,
      reviewsCount: 87,
      image: filamentYellow,
    },
    {
      id: 'filament-plaplus-gold',
      slug: 'plaplus-gold-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Gold',
      material: 'PLA+',
      color: 'Gold',
      colorHex: '#D4AF37',
      price: 899,
      originalPrice: 1099,
      rating: 4.9,
      reviewsCount: 132,
      image: filamentGold,
    },
    {
      id: 'filament-plaplus-orange',
      slug: 'plaplus-orange-1kg-175mm',
      name: 'PLA+ 3D Printer Filament – Orange',
      material: 'PLA+',
      color: 'Orange',
      colorHex: '#EA580C',
      price: 899,
      originalPrice: 1049,
      rating: 4.7,
      reviewsCount: 98,
      image: filamentOrange,
    },
  ],
}
