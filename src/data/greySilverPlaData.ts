// Make3D PLA+ Grey/Silver Product Data
import filamentGreySilver from '../assets/filaments/filament-grey-silver.png'
import filamentWhite from '../assets/filaments/filament-white.png'
import filamentGold from '../assets/filaments/filament-gold.png'
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

export interface GreySilverProductData {
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

export const initialGreySilverData: GreySilverProductData = {
  id: 'filament-plaplus-grey',
  slug: 'pla-plus-3d-printer-filament-grey-silver',
  sku: 'MK3D-PLAPLUS-175-GRY-1KG',
  name: 'PLA+ 3D Printer Filament – Grey/Silver',
  fullTitle: 'PLA+ 3D Printer Filament – Grey/Silver | 1KG | 1.75mm',
  category: 'Make3D Filament',
  brand: 'Make3D',
  badge: 'MAKE3D FILAMENT',
  material: 'PLA+ (Enhanced PLA)',
  color: 'Grey / Silver',
  colorHex: '#9E9E9E',
  diameter: '1.75 mm',
  weight: '1 KG',
  compatibility: 'Most FDM 3D printers',
  mrp: 1500,
  price: 1400,
  discountAmount: 100,
  discountText: 'Available on Request',
  rating: 5.0,
  reviewsCount: 5,
  productType: '3D Printer Filament',
  primaryUse: 'FDM 3D Printing',
  stockStatus: 'Available for Order',
  inStock: true,
  shortDescription:
    'Premium PLA+ filament designed for smooth, reliable and visually appealing FDM 3D printing. The Grey/Silver finish is suitable for prototypes, models, functional concepts, educational projects and everyday 3D printing.',
  descriptionHeading: 'Reliable PLA+ Filament for Everyday 3D Printing',
  descriptionParagraphs: [
    'PLA+ Grey/Silver filament is designed for users looking for a reliable and visually refined material for FDM 3D printing. Its Grey/Silver appearance gives printed models a clean, professional look, making it suitable for prototypes, models, educational projects, design concepts and everyday 3D printing applications.',
    'With a 1.75 mm filament diameter and 1 KG spool, it is designed for use with most compatible FDM 3D printers.',
    'Whether you are a beginner, student, designer, maker or professional, this filament provides a practical option for producing clean and visually appealing 3D printed parts.',
  ],
  images: [
    {
      id: 'img-1',
      title: 'Front View',
      src: filamentGreySilver,
      alt: 'PLA+ 3D Printer Filament – Grey/Silver front studio view on transparent polycarbonate spool',
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
      src: filamentGreySilver,
      alt: 'Close-up of Grey/Silver PLA+ filament strand consistency',
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
      alt: 'Grey/Silver PLA+ filament being fed into an FDM 3D printer extruder',
      tag: 'In 3D Printer',
    },
    {
      id: 'img-6',
      title: 'Finished 3D Print',
      src: '/images/products/pratham-mini-gear.png',
      alt: 'Finished 3D printed mechanical model produced with Grey/Silver PLA+',
      tag: 'Finished Print',
    },
  ],
  productHighlights: [
    { label: 'MATERIAL', value: 'PLA+ / Enhanced PLA', iconName: 'Layers' },
    { label: 'COLOUR', value: 'Grey / Silver', iconName: 'Palette' },
    { label: 'DIAMETER', value: '1.75 mm', iconName: 'Gauge' },
    { label: 'WEIGHT', value: '1 KG', iconName: 'Scale' },
    { label: 'PRINTING TECHNOLOGY', value: 'FDM', iconName: 'Printer' },
    { label: 'COMPATIBILITY', value: 'Most FDM 3D Printers', iconName: 'CheckCircle2' },
  ],
  whyChooseCards: [
    {
      number: '01',
      title: 'EASY TO USE',
      description:
        'PLA+ is a practical choice for everyday FDM 3D printing and is suitable for both beginners and experienced users.',
      iconName: 'Smile',
    },
    {
      number: '02',
      title: 'SMOOTH PRINT APPEARANCE',
      description:
        'The Grey/Silver colour provides a clean and professional appearance for finished models.',
      iconName: 'Sparkles',
    },
    {
      number: '03',
      title: 'VERSATILE APPLICATIONS',
      description:
        'Suitable for prototypes, models, educational projects, design concepts and creative prints.',
      iconName: 'Layers',
    },
    {
      number: '04',
      title: 'CONSISTENT FORMAT',
      description:
        '1.75 mm filament diameter provides compatibility with printers designed for this filament size.',
      iconName: 'Maximize2',
    },
    {
      number: '05',
      title: '1 KG SPOOL',
      description:
        'The 1 KG spool provides a practical quantity for regular printing requirements.',
      iconName: 'Package',
    },
    {
      number: '06',
      title: 'FDM COMPATIBILITY',
      description:
        'Designed for use with most FDM 3D printers that support 1.75 mm filament.',
      iconName: 'CheckCircle2',
    },
  ],
  applicationCards: [
    {
      title: 'PROTOTYPING',
      description: 'Create early-stage product concepts and physical prototypes.',
      iconName: 'Lightbulb',
    },
    {
      title: 'PRODUCT MODELS',
      description: 'Produce detailed visual models for design and presentation.',
      iconName: 'Box',
    },
    {
      title: 'EDUCATIONAL PROJECTS',
      description: 'Useful for schools, colleges, laboratories and learning projects.',
      iconName: 'GraduationCap',
    },
    {
      title: 'ARCHITECTURAL MODELS',
      description: 'Create scale models, structural concepts and presentation models.',
      iconName: 'Layers',
    },
    {
      title: 'DESIGN & CREATIVE PROJECTS',
      description: 'Ideal for makers, designers and hobbyists creating custom objects.',
      iconName: 'Palette',
    },
    {
      title: 'EVERYDAY 3D PRINTING',
      description: 'Suitable for general-purpose FDM printing requirements.',
      iconName: 'Wrench',
    },
  ],
  whatIsPlaPlus: {
    heading: 'What is PLA+?',
    overview:
      'PLA+ is an enhanced form of PLA filament developed to provide a more refined printing experience than standard PLA. It is widely used in FDM 3D printing for prototypes, models, educational projects and general-purpose printed parts. Its popularity comes from its practical printability, attractive surface appearance and broad range of applications.',
    comparison: [
      {
        feature: 'Core Polymer',
        standardPla: 'Standard Polylactic Acid',
        plaPlus: 'Enhanced PLA Formulation',
      },
      {
        feature: 'Surface Aesthetics',
        standardPla: 'Glossy / Standard',
        plaPlus: 'Refined, Uniform Matte-Metallic Look',
      },
      {
        feature: 'Application Range',
        standardPla: 'Basic models & concepting',
        plaPlus: 'Prototypes, presentation models & functional concepts',
      },
      {
        feature: 'Printer Compatibility',
        standardPla: 'Most 1.75mm FDM Printers',
        plaPlus: 'Most 1.75mm FDM Printers',
      },
    ],
  },
  technicalSpecs: [
    { property: 'Product Name', value: 'PLA+ 3D Printer Filament – Grey/Silver' },
    { property: 'Material', value: 'PLA+ (Enhanced PLA)' },
    { property: 'Colour', value: 'Grey / Silver' },
    { property: 'Filament Diameter', value: '1.75 mm' },
    { property: 'Net Weight', value: '1 KG' },
    { property: 'Printing Technology', value: 'FDM' },
    { property: 'Compatibility', value: 'Most FDM 3D Printers' },
    { property: 'Product Category', value: 'Make3D Filament' },
    {
      property: 'Use Case',
      value: 'Prototyping, Models, Education, Design & General 3D Printing',
    },
  ],
  faqs: [
    {
      question: 'What material is this filament?',
      answer: 'This product is made from PLA+ (Enhanced PLA).',
    },
    {
      question: 'What is the filament diameter?',
      answer: 'The filament diameter is 1.75 mm.',
    },
    {
      question: 'How much filament is included?',
      answer: 'The spool contains 1 KG of net filament.',
    },
    {
      question: 'What colour is this filament?',
      answer: 'The filament is Grey/Silver.',
    },
    {
      question: 'Which printers can use this filament?',
      answer: 'It is designed for most FDM 3D printers that support 1.75 mm filament.',
    },
    {
      question: 'What can I print with this filament?',
      answer:
        'It can be used for prototypes, models, educational projects, design concepts and general-purpose FDM 3D printing.',
    },
    {
      question: 'Is this suitable for beginners?',
      answer:
        'Yes. PLA+ is a practical filament choice for users who are starting with FDM 3D printing as well as experienced users.',
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
      id: 'filament-plaplus-gold',
      slug: 'plaplus-gold-1kg-175mm',
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
    title: 'PLA+ 3D Printer Filament Grey/Silver 1KG 1.75mm | Make3D',
    description:
      'Shop PLA+ Grey/Silver 3D printer filament in a 1KG spool with 1.75mm diameter. Ideal for FDM 3D printing, prototypes, models, educational projects and everyday printing.',
    canonicalUrl: '/product/pla-plus-3d-printer-filament-grey-silver/',
    keywords: [
      'PLA+ filament',
      'Grey PLA+ filament',
      'Silver PLA filament',
      'PLA+ 1.75mm',
      '1KG PLA filament',
      'Grey 3D printer filament',
      'FDM filament',
      '3D printer filament India',
      'PLA+ filament India',
      '3D printing filament',
    ],
  },
}
