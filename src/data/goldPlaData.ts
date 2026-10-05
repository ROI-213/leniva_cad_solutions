// Make3D PLA+ Gold Product Data
import filamentGold from '../assets/filaments/filament-gold.png'
import filamentGreySilver from '../assets/filaments/filament-grey-silver.png'
import filamentWhite from '../assets/filaments/filament-white.png'
import filamentOrange from '../assets/filaments/filament-orange.png'
import filamentYellow from '../assets/filaments/filament-yellow.png'
import filamentBlue from '../assets/filaments/filament-blue.png'
import filamentBlack from '../assets/filaments/filament-black.png'
import filamentRed from '../assets/filaments/filament-red.png'

export interface FilamentVariant {
  id: string
  slug: string
  name: string
  color: string
  colorHex: string
  material: string
  mrp: number
  price: number
  inStock: boolean
  sku: string
  image: string
}

export interface GoldProductData {
  id: string
  slug: string
  sku: string
  name: string
  fullTitle: string
  category: string
  brand: string
  badge: string
  material: string
  color: string
  colorHex: string
  diameter: string
  weight: string
  compatibility: string
  mrp: number
  price: number
  discountAmount: number
  discountText: string
  rating: number
  reviewsCount: number
  productType: string
  primaryUse: string
  stockStatus: string
  inStock: boolean
  shortDescription: string
  descriptionHeading: string
  descriptionParagraphs: string[]
  images: {
    id: string
    title: string
    src: string
    alt: string
    tag: string
  }[]
  productHighlights: {
    label: string
    value: string
    iconName: string
  }[]
  whyChooseCards: {
    number: string
    title: string
    description: string
    iconName: string
  }[]
  applicationCards: {
    title: string
    description: string
    iconName: string
  }[]
  whatIsPlaPlus: {
    heading: string
    overview: string
    comparison: {
      feature: string
      standardPla: string
      plaPlus: string
    }[]
  }
  whoIsItFor: {
    title: string
    description: string
    iconName: string
  }[]
  technicalSpecs: {
    property: string
    value: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  trustCards: {
    title: string
    description: string
    iconName: string
  }[]
  variants: FilamentVariant[]
  seo: {
    title: string
    description: string
    canonicalUrl: string
    keywords: string[]
  }
}

export const initialGoldData: GoldProductData = {
  id: 'filament-plaplus-gold',
  slug: 'pla-plus-3d-printer-filament-gold',
  sku: 'MK3D-PLAPLUS-175-GLD-1KG',
  name: 'PLA+ 3D Printer Filament (Gold Color)',
  fullTitle: 'PLA+ 3D Printer Filament (Gold Color) | 1 KG | 1.75 mm',
  category: 'Make3D Filament',
  brand: 'Make3D',
  badge: 'MAKE3D FILAMENT',
  material: 'PLA+ / Enhanced PLA',
  color: 'Gold',
  colorHex: '#D4AF37',
  diameter: '1.75 mm',
  weight: '1 KG',
  compatibility: 'Most FDM 3D printers',
  mrp: 1500,
  price: 1400,
  discountAmount: 100,
  discountText: 'SAVE ₹100',
  rating: 0,
  reviewsCount: 0,
  productType: '3D Printer Filament',
  primaryUse: 'FDM 3D Printing',
  stockStatus: 'Available for Order',
  inStock: true,
  shortDescription:
    'High-quality Gold PLA+ filament offering better strength, smooth finish, and reliable printing performance for FDM 3D printing. Ideal for prototypes, display models, decorative designs, and everyday creative projects.',
  descriptionHeading: 'Gold PLA+ Filament for Reliable 3D Printing',
  descriptionParagraphs: [
    'PLA+ Filament 1.75mm Gold is positioned as a high-quality filament offering better strength, smooth finish and reliable printing performance compared with standard PLA.',
    'It is suitable for both beginners and professionals looking for visually appealing and durable 3D printed results. Its rich gold finish imparts a refined aesthetic to finished models without requiring post-processing or painting.',
    'With a standardized 1.75 mm diameter and 1 KG spool, this filament is engineered for smooth extrusion and broad compatibility across most FDM 3D printers.',
  ],
  images: [
    {
      id: 'img-1',
      title: 'Front View',
      src: filamentGold,
      alt: 'PLA+ 3D Printer Filament (Gold Color) front studio view on transparent polycarbonate spool',
      tag: 'Front View',
    },
    {
      id: 'img-2',
      title: 'Angled Studio View',
      src: '/images/products/materials-spools-hd.jpg',
      alt: 'PLA+ 3D Printer Filament 3/4 angle spool display in engineering workshop',
      tag: '3/4 Angle Spool',
    },
    {
      id: 'img-3',
      title: 'Filament Texture',
      src: filamentGold,
      alt: 'Close-up of Gold PLA+ filament strand consistency and winding',
      tag: 'Close-Up',
    },
    {
      id: 'img-4',
      title: 'Spool Specifications',
      src: '/images/products/pratham-mini.png',
      alt: 'Make3D 1 KG spool with dimensional specifications visual',
      tag: 'Dimensional Visual',
    },
    {
      id: 'img-5',
      title: 'In 3D Printer',
      src: '/images/products/pratham-mini.png',
      alt: 'Gold PLA+ filament being fed into an FDM 3D printer extruder',
      tag: 'In 3D Printer',
    },
    {
      id: 'img-6',
      title: 'Finished 3D Print',
      src: '/images/products/pratham-mini-gear.png',
      alt: 'Finished 3D printed mechanical model produced with Gold PLA+',
      tag: 'Finished Print',
    },
  ],
  productHighlights: [
    { label: 'MATERIAL', value: 'PLA+ / Enhanced PLA', iconName: 'Layers' },
    { label: 'COLOUR', value: 'Gold', iconName: 'Palette' },
    { label: 'DIAMETER', value: '1.75 mm', iconName: 'Gauge' },
    { label: 'WEIGHT', value: '1 KG', iconName: 'Scale' },
    { label: 'PRINTING TECHNOLOGY', value: 'FDM', iconName: 'Printer' },
    { label: 'COMPATIBILITY', value: 'Most FDM 3D Printers', iconName: 'CheckCircle2' },
  ],
  whyChooseCards: [
    {
      number: '01',
      title: 'BETTER STRENGTH',
      description:
        'Enhanced PLA formulation engineered to provide greater structural strength and layer adhesion compared to conventional PLA.',
      iconName: 'Smile',
    },
    {
      number: '02',
      title: 'SMOOTH GOLD FINISH',
      description:
        'The Gold finish provides a rich, smooth, and visually appealing appearance that elevates the aesthetic value of your printed models.',
      iconName: 'Sparkles',
    },
    {
      number: '03',
      title: 'RELIABLE PERFORMANCE',
      description:
        'Designed for dependable extrusion and consistent layer deposition, making it suitable for both beginners and experienced makers.',
      iconName: 'Layers',
    },
    {
      number: '04',
      title: '1.75 MM DIAMETER',
      description:
        'Standard 1.75 mm filament diameter provides broad compatibility with printers designed for this filament size.',
      iconName: 'Maximize2',
    },
    {
      number: '05',
      title: '1 KG NET WEIGHT',
      description:
        'The 1 KG spool provides a generous quantity of filament for sustained prototyping, design projects, and production runs.',
      iconName: 'Package',
    },
    {
      number: '06',
      title: 'BROAD FDM COMPATIBILITY',
      description:
        'Engineered for seamless operation on most open-material FDM 3D printers supporting 1.75 mm filaments.',
      iconName: 'CheckCircle2',
    },
  ],
  applicationCards: [
    {
      title: 'PROTOTYPING',
      description: 'Create durable early-stage product concepts, functional prototypes, and proof-of-design assemblies.',
      iconName: 'Lightbulb',
    },
    {
      title: 'DISPLAY & PRESENTATION',
      description: 'Produce striking display models, design showpieces, and architectural presentation concepts.',
      iconName: 'Box',
    },
    {
      title: 'AWARDS & TROPHIES',
      description: 'Ideal for custom trophies, medals, recognition plaques, and decorative commemorative artifacts.',
      iconName: 'Sparkles',
    },
    {
      title: 'ARTISTIC & DECORATIVE',
      description: 'Perfect for sculptures, decorative figurines, jewelry prototypes, and creative maker crafts.',
      iconName: 'Palette',
    },
    {
      title: 'EDUCATIONAL PROJECTS',
      description: 'Ideal for schools, colleges, laboratories, and training centers demonstrating 3D printing concepts.',
      iconName: 'GraduationCap',
    },
    {
      title: 'EVERYDAY 3D PRINTING',
      description: 'Practical and reliable for general-purpose printing, custom enclosures, and daily workshop builds.',
      iconName: 'Wrench',
    },
  ],
  whatIsPlaPlus: {
    heading: 'What is PLA+?',
    overview:
      'PLA+ is an enhanced version of standard Polylactic Acid (PLA) filament, engineered to deliver better mechanical strength, layer-to-layer adhesion, and surface finish while retaining the straightforward, reliable printability that makes PLA popular. It is favored by both beginners and professional makers for producing visually appealing and resilient 3D prints.',
    comparison: [
      {
        feature: 'Polymer Formulation',
        standardPla: 'Standard Polylactic Acid',
        plaPlus: 'Enhanced PLA Formulation',
      },
      {
        feature: 'Mechanical Strength',
        standardPla: 'Standard impact resistance',
        plaPlus: 'Improved strength & layer bonding',
      },
      {
        feature: 'Surface Finish',
        standardPla: 'Standard glossy finish',
        plaPlus: 'Smooth, lustrous gold finish',
      },
      {
        feature: 'Print Reliability',
        standardPla: 'Easy to print',
        plaPlus: 'Enhanced flow stability & consistency',
      },
      {
        feature: 'Printer Compatibility',
        standardPla: 'Most 1.75 mm FDM printers',
        plaPlus: 'Most 1.75 mm FDM printers',
      },
    ],
  },
  whoIsItFor: [
    {
      title: 'Makers & Hobbyists',
      description: 'Create decorative objects, customized gifts, collectibles, and creative models with a distinguished gold finish.',
      iconName: 'Smile',
    },
    {
      title: 'Designers & Architects',
      description: 'Produce aesthetic client presentations and architectural models that demand premium visual quality.',
      iconName: 'Layers',
    },
    {
      title: 'Engineers & Prototypers',
      description: 'Build durable visual prototypes with better layer bonding and resilience than standard PLA.',
      iconName: 'Wrench',
    },
    {
      title: 'Educators & Students',
      description: 'Easy-to-use material for school projects, design labs, and creative engineering challenges.',
      iconName: 'GraduationCap',
    },
  ],
  technicalSpecs: [
    { property: 'Product Name', value: 'PLA+ 3D Printer Filament (Gold Color)' },
    { property: 'Display Title', value: 'PLA+ 3D Printer Filament (Gold Color) | 1 KG | 1.75 mm' },
    { property: 'Material', value: 'PLA+ / Enhanced PLA' },
    { property: 'Colour', value: 'Gold' },
    { property: 'Filament Diameter', value: '1.75 mm' },
    { property: 'Net Weight', value: '1 KG Net' },
    { property: 'Printing Technology', value: 'FDM' },
    { property: 'Product Category', value: 'Make3D Filament' },
    { property: 'Primary Use', value: 'FDM 3D Printing' },
    { property: 'Printer Compatibility', value: 'Most FDM 3D Printers' },
    { property: 'Spool Type', value: 'Standard 1 KG Spool' },
  ],
  faqs: [
    {
      question: 'What material is this filament made from?',
      answer: 'This product is made from PLA+ (Enhanced PLA), offering better strength and a smooth finish compared with standard PLA.',
    },
    {
      question: 'What is the diameter and weight of this spool?',
      answer: 'The filament diameter is 1.75 mm and the spool contains 1 KG net weight of filament.',
    },
    {
      question: 'What colour is this filament?',
      answer: 'The filament is Gold, delivering a rich and visually appealing finish for 3D printed models.',
    },
    {
      question: 'Which 3D printers can use this filament?',
      answer: 'It is compatible with most FDM 3D printers that support standard 1.75 mm filament.',
    },
    {
      question: 'What can I print with Gold PLA+ filament?',
      answer: 'It is suitable for prototypes, display models, trophies, decorative crafts, educational projects, and general-purpose FDM printing.',
    },
    {
      question: 'Is this filament suitable for beginners?',
      answer: 'Yes. PLA+ is an accessible and practical filament for users starting with FDM 3D printing while also satisfying the durability and finish standards required by professionals.',
    },
    {
      question: 'Does this filament require specialized 3D printing equipment?',
      answer: 'No. PLA+ prints reliably on standard FDM 3D printers supporting 1.75 mm filament without needing specialized nozzles or heated chambers.',
    },
  ],
  trustCards: [
    {
      title: 'FAST SHIPPING',
      description: 'Free & fast shipping across India.',
      iconName: 'Truck',
    },
    {
      title: 'SECURE PAYMENT',
      description: 'Secure online payment experience.',
      iconName: 'Lock',
    },
    {
      title: 'QUALITY PRODUCT',
      description: 'Quality and genuine product assurance.',
      iconName: 'ShieldCheck',
    },
    {
      title: '1 KG SPOOL',
      description: 'Convenient 1 KG filament spool.',
      iconName: 'Package',
    },
  ],
  variants: [
    {
      id: 'filament-plaplus-gold',
      slug: 'pla-plus-3d-printer-filament-gold',
      name: 'Gold',
      color: 'Gold',
      colorHex: '#D4AF37',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-GLD-1KG',
      image: filamentGold,
    },
    {
      id: 'filament-plaplus-grey',
      slug: 'pla-plus-3d-printer-filament-grey-silver',
      name: 'Grey / Silver',
      color: 'Grey / Silver',
      colorHex: '#9E9E9E',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-GRY-1KG',
      image: filamentGreySilver,
    },
    {
      id: 'filament-plaplus-black',
      slug: 'plaplus-black-1kg-175mm',
      name: 'Black',
      color: 'Black',
      colorHex: '#1A1A1A',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-BLK-1KG',
      image: filamentBlack,
    },
    {
      id: 'filament-plaplus-blue',
      slug: 'plaplus-blue-1kg-175mm',
      name: 'Blue',
      color: 'Blue',
      colorHex: '#1E40AF',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-BLU-1KG',
      image: filamentBlue,
    },
    {
      id: 'filament-plaplus-red',
      slug: 'plaplus-red-1kg-175mm',
      name: 'Red',
      color: 'Red',
      colorHex: '#DC2626',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-RED-1KG',
      image: filamentRed,
    },
    {
      id: 'filament-plaplus-yellow',
      slug: 'plaplus-yellow-1kg-175mm',
      name: 'Yellow',
      color: 'Yellow',
      colorHex: '#EAB308',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-YEL-1KG',
      image: filamentYellow,
    },
    {
      id: 'filament-plaplus-orange',
      slug: 'plaplus-orange-1kg-175mm',
      name: 'Orange',
      color: 'Orange',
      colorHex: '#EA580C',
      material: 'PLA+',
      mrp: 1500,
      price: 1400,
      inStock: true,
      sku: 'MK3D-PLAPLUS-175-ORG-1KG',
      image: filamentOrange,
    },
    {
      id: 'filament-pla-white',
      slug: 'pla-3d-printer-filament-white',
      name: 'White',
      color: 'White',
      colorHex: '#F8F9FA',
      material: 'PLA',
      mrp: 1600,
      price: 1399,
      inStock: true,
      sku: 'MK3D-PLA-175-WHT-1KG',
      image: filamentWhite,
    },
  ],
  seo: {
    title: 'PLA+ 3D Printer Filament (Gold Color) | 1 KG | 1.75 mm | Make3D',
    description:
      'Buy Make3D PLA+ Gold 3D printer filament (1 KG, 1.75 mm). High-quality enhanced PLA with better strength, smooth gold finish, and reliable printing performance for FDM 3D printing.',
    canonicalUrl: '/product/pla-plus-3d-printer-filament-gold',
    keywords: [
      'PLA+ Gold filament',
      'Gold PLA filament',
      'PLA+ 1.75mm',
      '1KG Gold filament',
      'Make3D filament',
      'FDM 3D printing filament',
      'Gold 3D printer filament India',
      'Enhanced PLA Gold',
    ],
  },
}
