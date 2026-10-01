export interface LcdProductFeature {
  id: string
  title: string
  description: string
  visualHighlight?: string
  badge?: string
}

export interface LcdProductSpec {
  property: string
  value: string
  highlight?: boolean
}

export interface LcdGalleryItem {
  id: string
  title: string
  category: string
  material: string
  image: string
  notes: string
}

// -----------------------------------------------------------------------------
// 1. EKA GT MAX DATA (Engineering Industrial LCD 3D Printer)
// -----------------------------------------------------------------------------
export const ekaGtMaxData = {
  id: 'eka-gt-max',
  slug: 'industrial-lcd-3d-printers-eka-gt-max',
  shortSlug: 'eka-gt-max',
  name: 'EKA GT MAX',
  category: 'Industrial LCD 3D Printer',
  heroH1: 'Industrial LCD 3D Printers',
  productHeading: 'EKA GT MAX – Industrial LCD 3D Printers Built for Precision and Power',
  mainDescription:
    'The EKA GT MAX from Make3D represents the next generation of Industrial LCD 3D Printers, engineered for professional-grade precision, speed, and reliability.',
  secondParagraph:
    'Equipped with a massive 16-inch 8K monochrome LCD screen with 7680×4320 resolution, it achieves ultra-fine 46μm pixel accuracy, enabling you to print intricate details with remarkable clarity.',
  buildVolume: '353 × 198 × 400 mm',
  supportingDescription:
    'With an impressive build volume of 353×198×400 mm, the EKA GT MAX supports large parts, batch production, and detailed prototypes.',
  applications: ['Engineering', 'Dental', 'Product Design', 'Drones'],
  heroImage: '/images/products/eka-gt-max.png',
  brochureUrl: '/brochures/eka-gt-max.pdf',
  specificationsFile: '/brochures/eka-gt-max-specs.pdf',

  keyFeatures: [
    {
      id: 'feat-1',
      title: '16” 8K Ultra-HD Resolution',
      description:
        'Eka GT Max 8K features a massive 16-inch UV-curable LCD screen with an outstanding 7680×4320 resolution, delivering crisp details and exceptional surface quality, even on the most intricate parts.',
      visualHighlight: '16" 8K • 7680 × 4320',
      badge: '8K Display',
    },
    {
      id: 'feat-2',
      title: 'Ultra-Fine 46μm Pixel Precision',
      description:
        'With a pixel size of just 46 microns, Eka GT Max 8K provides very fine detailing and dimensional accuracy.',
      visualHighlight: '46 μm Pixel Pitch',
      badge: 'Micro Precision',
    },
    {
      id: 'feat-3',
      title: 'Beginner-Friendly & Pro-Ready',
      description:
        'Whether you’re a seasoned professional or just starting your 3D printing journey, Eka GT Max 8K is designed for quick setup and intuitive use.',
      visualHighlight: 'Plug-and-Print Setup',
      badge: 'Ease of Use',
    },
    {
      id: 'feat-4',
      title: 'Hassle-Free Support',
      description:
        'Backed by responsive and professional after-sales service. Our expert team is ready to assist you promptly whenever you need help.',
      visualHighlight: '24×7 Engineering Desk',
      badge: 'PAN-India Support',
    },
    {
      id: 'feat-5',
      title: 'Automatic Resin Feeding',
      description:
        'Smart auto resin feeding system maintains uninterrupted printing and reduces manual intervention during large or continuous prints.',
      visualHighlight: 'Auto Vat Level Sensor',
      badge: 'Smart Automation',
    },
    {
      id: 'feat-6',
      title: 'Massive Build Volume',
      description:
        'Industry-leading 353×198×400 mm build area, perfect for large-scale models or batch production in one go.',
      visualHighlight: '353 × 198 × 400 mm (28 L)',
      badge: 'Large Envelope',
    },
    {
      id: 'feat-7',
      title: 'High-Speed Printing',
      description:
        'Achieves up to 50 mm/hr print speed without compromising detail, ideal for time-sensitive prototyping and production.',
      visualHighlight: 'Up to 50 mm/h Rapid Cure',
      badge: 'High Throughput',
    },
  ] as LcdProductFeature[],

  specifications: [
    { property: 'Technology', value: 'UV Surface Exposure LCD' },
    { property: 'Build Volume', value: '353 × 198 × 400 mm', highlight: true },
    { property: 'Printer Dimensions', value: '600 × 480 × 880 mm' },
    { property: 'Net Weight', value: '52 kg' },
    { property: 'Gross Weight', value: '65 kg' },
    { property: 'Max Printing Speed', value: 'Up to 50 mm/h', highlight: true },
    { property: 'LCD Screen', value: '16-inch Monochrome Screen' },
    { property: 'LCD Resolution', value: '8K (7680 × 4320)', highlight: true },
    { property: 'Pixel Size', value: '46 µm', highlight: true },
    { property: 'Layer Thickness', value: '0.01 – 0.3 mm' },
    { property: 'Light Source', value: '405 nm UV LED' },
    { property: 'Release Film', value: 'High-Speed TSP Film' },
    { property: 'Resin Feeding', value: 'Automatic' },
    { property: 'Temperature Control', value: 'Resin Tank Heating' },
    { property: 'Platform Calibration', value: 'Factory Pre-Calibrated' },
    { property: 'Slicing Software', value: 'Chitubox' },
    { property: 'Operation', value: '7-inch Touchscreen' },
    { property: 'Supported Materials', value: 'UV-Curable Resin' },
    { property: 'Supported File Types', value: '.stl, .obj, .slc' },
    { property: 'Connectivity', value: 'Wi-Fi, USB' },
    { property: 'Power Consumption', value: '300 W' },
  ] as LcdProductSpec[],

  gallery: [
    {
      id: 'gt-1',
      title: 'Drone Frame Arm & Core Structure',
      category: 'Drones & Aerospace',
      material: 'Engineering Tough Resin',
      image: '/images/showcase/app-functional-components.png',
      notes: 'Full 350 mm monolithic carbon-like chassis printed without seam cuts.',
    },
    {
      id: 'gt-2',
      title: 'Automotive Dashboard HVAC Air Duct',
      category: 'Automotive Prototyping',
      material: 'High Temperature Resin',
      image: '/images/showcase/app-prototyping-projects.png',
      notes: 'Complex internal vane louvers with smooth airtight fluid surfaces.',
    },
    {
      id: 'gt-3',
      title: 'High-Volume Dental Arch Batch (36 Units)',
      category: 'Dental Batch Production',
      material: 'Dental Model Pro Resin',
      image: '/images/showcase/showcase-1.png',
      notes: 'Full plate array cured in under 45 minutes with uniform 46 μm consistency.',
    },
    {
      id: 'gt-4',
      title: 'Industrial Hydraulic Valve Housing',
      category: 'Mechanical Engineering',
      material: 'Rigid Mechanical Resin',
      image: '/images/products/pratham-mini-gear.png',
      notes: 'Pressure tested housing with fine internal thread bosses and O-ring seats.',
    },
    {
      id: 'gt-5',
      title: 'Ergonomic Power Drill Enclosure Mockup',
      category: 'Product Design',
      material: 'ABS-like Tough Resin',
      image: '/images/showcase/showcase-4.png',
      notes: 'Functional snap-fit shells ready for silicone soft-touch overmolding.',
    },
    {
      id: 'gt-6',
      title: 'Robotic End-Effector Gripper Body',
      category: 'Industrial Automation',
      material: 'Tough Black Resin',
      image: '/images/showcase/showcase-2.png',
      notes: 'Lightweight high-rigidity structural body for robotic pick-and-place arm.',
    },
  ] as LcdGalleryItem[],
}

// -----------------------------------------------------------------------------
// 2. EKA F1 16K DATA (Jewelry Ultra-High Precision LCD 3D Printer)
// -----------------------------------------------------------------------------
export const ekaF116kData = {
  id: 'eka-f1-16k',
  slug: 'eka-f1-16k-industrial-lcd-jewelry-3d-printer',
  shortSlug: 'eka-f1-16k',
  name: 'EKA F1 16K',
  category: 'Industrial LCD 3D Printer',
  mainProductHeading:
    'EKA F1 16K Resin 3D Printer Ultra-High Precision for Jewelry & Industrial Applications',
  description:
    'The EKA F1 16K Resin 3D Printer is engineered for professionals who demand exceptional accuracy and fine detail.',
  secondDescription:
    'With a 16K resolution LCD screen, this printer produces models with incredible sharpness and smooth surface finish, making it the ideal choice for jewelry design, dental models, miniatures, and engineering prototypes.',
  thirdDescription:
    'Designed and manufactured proudly in India, the EKA F1 16K combines advanced technology with user-friendly operation.',
  supportHighlights: ['Lifetime service support', 'Free software updates'],
  buildVolume: '212 × 118 × 240 mm',
  applications: ['Jewelry Design', 'Dental Models', 'Miniatures', 'Engineering Prototypes'],
  heroImage: '/images/products/eka-f1-16k.png',
  brochureUrl: '/brochures/eka-f1-16k.pdf',
  specificationsFile: '/brochures/eka-f1-16k-specs.pdf',

  keyFeatures: [
    {
      id: 'f1-1',
      title: '16K Ultra-High Resolution LCD',
      description: 'Exceptional detail and sharp prints.',
      visualHighlight: '16K Pixel Grid • 15120 × 6230',
      badge: '16K Ultra-HD',
    },
    {
      id: 'f1-2',
      title: 'Build Volume',
      description: 'Large enough for complex parts.',
      visualHighlight: '212 × 118 × 240 mm',
      badge: 'Generous Capacity',
    },
    {
      id: 'f1-3',
      title: 'Material Compatibility',
      description: 'Works with a wide range of resins for jewelry, dental, and industrial use.',
      visualHighlight: 'Castable & Technical Resins',
      badge: 'Versatile Resins',
    },
    {
      id: 'f1-4',
      title: 'Free Lifetime Software Updates',
      description: 'Always stay ahead with the latest features.',
      visualHighlight: 'Continuous Slicer & Firmware Upgrades',
      badge: 'Free Lifetime Updates',
    },
    {
      id: 'f1-5',
      title: 'Made in India',
      description: 'Proudly developed and manufactured locally.',
      visualHighlight: '100% Indigenous Engineering',
      badge: 'Made in India',
    },
    {
      id: 'f1-6',
      title: '24×7 Online Support',
      description: 'Lifetime service assistance for hassle-free printing.',
      visualHighlight: 'Dedicated Specialist Hotline',
      badge: '24×7 Assistance',
    },
  ] as LcdProductFeature[],

  specifications: [
    { property: 'Model', value: 'EKA F1 16K' },
    { property: 'Technology', value: 'LCD SE Technology' },
    { property: 'Platform Size', value: '212 × 118 × 240 mm', highlight: true },
    { property: 'XY Resolution', value: '14 – 19 Micron', highlight: true },
    { property: 'Z Resolution', value: '20 – 70 Micron' },
    { property: 'Pixel Size', value: '15120 × 6230', highlight: true },
    { property: 'Print Speed', value: '700 Layers per Hour', highlight: true },
    { property: 'Input Files', value: 'STL' },
    { property: 'Operating System', value: 'Windows' },
    { property: 'Weight', value: '22 kg' },
    { property: 'Dimensions', value: '330 × 312 × 525 mm' },
    { property: 'Print Head', value: 'CNC Anodize Head' },
    { property: 'UV Curing Oven', value: 'Yes Included' },
    { property: 'Resin Tray', value: '1 Tray' },
    { property: 'Resin Direct Castable', value: '500 g Free Included' },
    { property: 'Software', value: 'Yes Included' },
    { property: 'Onsite Training', value: 'Chargeable' },
    { property: 'Shipping', value: 'Free' },
    { property: 'File Input Command', value: 'Wireless | USB' },
  ] as LcdProductSpec[],

  gallery: [
    {
      id: 'f1-g1',
      title: 'Micro-Pavé Diamond Halo Ring Wax Pattern',
      category: 'Jewelry Masters',
      material: 'Direct Castable Wax Resin',
      image: '/images/showcase/showcase-1.png',
      notes: 'Razor-sharp 14-micron stone prongs with zero hand clean-up needed.',
    },
    {
      id: 'f1-g2',
      title: 'Intricate Royal Filigree Choker Section',
      category: 'Fine Ornaments',
      material: 'High-Definition Castable Wax',
      image: '/images/showcase/showcase-2.png',
      notes: 'Sub-0.2 mm wire mesh details that burn out cleanly with zero ash.',
    },
    {
      id: 'f1-g3',
      title: 'Orthodontic Dental Study Model with Removable Die',
      category: 'Dental Precision',
      material: 'Dental Beige Model Resin',
      image: '/images/showcase/showcase-3.png',
      notes: 'Crisp gingival margins and exact friction-fit dental insert fitment.',
    },
    {
      id: 'f1-g4',
      title: 'High-Density Wax Casting Ring Tree (48 Pieces)',
      category: 'Jewelry Production',
      material: 'Direct Castable Wax Resin',
      image: '/images/showcase/showcase-4.png',
      notes: 'Dense batch array cured simultaneously across 212 × 118 mm bed.',
    },
    {
      id: 'f1-g5',
      title: 'Collector-Grade Miniature Figurine (75 mm)',
      category: 'Miniatures',
      material: 'Ultra-Fine Gray Resin',
      image: '/images/showcase/app-creative-art.png',
      notes: 'Microscopic fabric textures, facial expressions, and razor-sharp weapons.',
    },
    {
      id: 'f1-g6',
      title: 'Micro-Mechanical Gear & Escapement Mechanism',
      category: 'Engineering Prototypes',
      material: 'Technical Precision Resin',
      image: '/images/products/pratham-mini-gear.png',
      notes: 'Fine pitch teeth operating smoothly without post-cure burring.',
    },
  ] as LcdGalleryItem[],
}

// -----------------------------------------------------------------------------
// 3. INDUSTRIAL LCD CATEGORY DATA
// -----------------------------------------------------------------------------
export const lcdCategoryData = {
  heroTitle: 'Industrial LCD Resin 3D Printers for High-Precision Manufacturing',
  heroDesc:
    'Discover next-generation Industrial LCD 3D Printers designed for exceptional accuracy, sharp detailing, and reliable production performance.',
  cta1: 'Request a Quote',
  cta2: 'Talk to an Expert',

  introHeading: 'Ultra-High Resolution LCD 3D Printing for Engineering & Jewelry Applications',
  introSubheading: 'Our Industrial LCD 3D Printer Range',
  introDesc:
    'Industrial LCD technology uses high-resolution monochrome LCD screens combined with powerful UV light sources to achieve high-precision resin printing.',

  trustHeading: 'Why Our Clients Trust Make3D',
  trustDesc: 'Trusted by engineers, designers, manufacturers and leading institutions across India.',

  clientHeading: 'Our Valuable Clients.',
  clientSubheading: 'Trusted by India’s Leading Organizations',
  clientDesc: 'Proudly working with top institutions, research labs & manufacturing industries.',

  finalCtaHeading: 'Start Your 3D Printing Journey with Make3D',
  finalCtaDesc: 'Connect with our experts for printers, services or custom manufacturing solutions.',
}
