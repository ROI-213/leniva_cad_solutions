export interface MaterialCategory {
  id: string
  title: string
  category: 'filaments' | 'resins' | 'accessories'
  description: string
  items: {
    name: string
    code?: string
    properties: string
    printTemp?: string
    bedTemp?: string
    tensileStrength?: string
    applications: string
    colorOrFinish: string
    badge?: string
  }[]
}

export const materialsData: MaterialCategory[] = [
  {
    id: 'filaments',
    title: '3D Printer Filaments (FDM)',
    category: 'filaments',
    description: 'Engineering-grade thermoplastics manufactured with tight dimensional tolerance (±0.02 mm) for reliable, clog-free 3D printing.',
    items: [
      {
        name: 'PLA (Polylactic Acid)',
        properties: 'Easy to print, minimal warping, biodegradable cornstarch base, excellent aesthetic detail',
        printTemp: '190°C – 220°C',
        bedTemp: '50°C – 60°C',
        tensileStrength: '50 MPa',
        applications: 'Concept models, educational prototypes, architectural models, visual display parts',
        colorOrFinish: 'White, Black, Grey, Blue, Red, Yellow, Silver',
        badge: 'Most Popular',
      },
      {
        name: 'PLA+ / Tough PLA',
        properties: 'Enhanced impact resistance, higher stiffness and toughness than standard PLA',
        printTemp: '205°C – 225°C',
        bedTemp: '55°C – 65°C',
        tensileStrength: '58 MPa',
        applications: 'Durable prototypes, functional parts, snap-fit components, casing shells',
        colorOrFinish: 'Matte Black, Industrial Grey, Signal Red, Pure White',
        badge: 'Enhanced Toughness',
      },
      {
        name: 'ABS (Acrylonitrile Butadiene Styrene)',
        properties: 'High impact resistance, heat deflection up to 95°C, post-processable with acetone vapor',
        printTemp: '230°C – 250°C',
        bedTemp: '90°C – 110°C (Enclosure recommended)',
        tensileStrength: '42 MPa',
        applications: 'Automotive interior parts, electronic enclosures, end-use functional brackets',
        colorOrFinish: 'Black, White, Industrial Grey, Natural',
        badge: 'Industrial Grade',
      },
      {
        name: 'PETG (Polyethylene Terephthalate Glycol)',
        properties: 'Combines ease of PLA printing with ABS-like thermal strength and water resistance',
        printTemp: '220°C – 245°C',
        bedTemp: '70°C – 80°C',
        tensileStrength: '50 MPa',
        applications: 'Water-tight containers, outdoor fixtures, mechanical gears, protective guards',
        colorOrFinish: 'Translucent Clear, Solid Black, Blue, Green',
        badge: 'Chemical Resistant',
      },
      {
        name: 'TPU 95A (Thermoplastic Polyurethane)',
        properties: 'Highly flexible elastomeric polymer, shore hardness 95A, exceptional tear and abrasion resistance',
        printTemp: '215°C – 235°C',
        bedTemp: '40°C – 60°C',
        tensileStrength: '35 MPa (Elongation at break: >450%)',
        applications: 'Gaskets, vibration dampeners, protective phone bumpers, flexible drive belts',
        colorOrFinish: 'Semi-Transparent, Black, Red',
        badge: 'Flexible',
      },
      {
        name: 'HIPS (High Impact Polystyrene)',
        properties: 'Lightweight, easily machinable, dissolves completely in Limonene for soluble support',
        printTemp: '230°C – 250°C',
        bedTemp: '90°C – 100°C',
        tensileStrength: '32 MPa',
        applications: 'Dual-extrusion soluble supports for ABS, lightweight structural shells',
        colorOrFinish: 'Natural White',
      },
      {
        name: 'PLA-CF (Carbon Fiber Reinforced PLA)',
        properties: 'Infused with 15% chopped high-modulus carbon fibers for high rigidity and matte surface finish',
        printTemp: '210°C – 235°C (Hardened nozzle required)',
        bedTemp: '55°C – 65°C',
        tensileStrength: '65 MPa',
        applications: 'Drone arms, robotic structural frames, high-load jigs, inspection gauges',
        colorOrFinish: 'Matte Textured Black',
        badge: 'High Modulus',
      },
      {
        name: 'CF-ABS / CarbonX Materials',
        properties: 'Carbon-fiber reinforced ABS polymer providing high stiffness, heat resistance, and low thermal expansion',
        printTemp: '240°C – 260°C',
        bedTemp: '100°C – 110°C',
        tensileStrength: '72 MPa',
        applications: 'Under-the-hood automotive prototypes, tooling fixtures, aerospace components',
        colorOrFinish: 'Deep Carbon Black',
        badge: 'Extreme Strength',
      },
    ],
  },
  {
    id: 'resins',
    title: '3D Printer Resins (SLA / DLP / LCD)',
    category: 'resins',
    description: 'Formulated for high photopolymerization reactivity, low shrinkage, razor-sharp detail reproduction, and specialized industrial requirements.',
    items: [
      {
        name: 'Standard Precision Resin',
        properties: 'Fast curing, crisp detail, smooth matte finish, minimal odor',
        tensileStrength: '45 MPa',
        applications: 'Concept display models, architectural miniatures, design validation',
        colorOrFinish: 'Grey, White, Black, Clear Transparent',
        badge: 'Versatile',
      },
      {
        name: 'Engineering Tough Resin (ABS-Like)',
        properties: 'High impact strength, shatter-resistant, withstands cyclic mechanical stress and snap-fits',
        tensileStrength: '55 MPa (Elongation at break: 25%)',
        applications: 'Functional snap-fit prototypes, working mechanisms, tool handles, protective cases',
        colorOrFinish: 'Industrial Black, Translucent Blue',
        badge: 'Impact Resistant',
      },
      {
        name: 'Castable Jewellery Wax Resin',
        properties: 'Contains real synthetic wax, zero ash burnout (<0.01%), preserves crisp prongs and filigree',
        tensileStrength: 'N/A (Optimized for clean burnout in standard investment)',
        applications: 'Direct investment casting of gold, silver, brass, and platinum jewellery',
        colorOrFinish: 'Emerald Green, Violet Red',
        badge: 'Zero Ash Burnout',
      },
      {
        name: 'Certified Dental Model Resin',
        properties: 'Exceptional dimensional stability (<0.1% shrinkage over 7 days), matte gypsum-like texture',
        tensileStrength: '60 MPa',
        applications: 'Thermoforming aligner master models, crown and bridge dies, diagnostic study models',
        colorOrFinish: 'Beige, Peach Skin, Light Grey',
        badge: 'Clinical Grade',
      },
      {
        name: 'Biocompatible Surgical Guide Resin',
        properties: 'Class I/IIa medical certified, autoclavable at 121°C, high optical clarity for surgical visibility',
        tensileStrength: '70 MPa',
        applications: 'Dental implant surgical drill guides, custom surgical templates',
        colorOrFinish: 'Crystal Clear',
        badge: 'Biocompatible',
      },
      {
        name: 'High Temperature Engineering Resin',
        properties: 'Heat deflection temperature up to 230°C under load, exceptional thermal stability',
        tensileStrength: '65 MPa (HDT: 230°C)',
        applications: 'Hot air duct testing, mold inserts for low-run injection molding, electronic potting',
        colorOrFinish: 'Amber Translucent',
        badge: 'High Temp 230°C',
      },
      {
        name: 'Flexible & Elastomeric Resin',
        properties: 'Shore hardness 70A–80A, high resilience, rebounds quickly under compression',
        tensileStrength: '15 MPa (Elongation: >140%)',
        applications: 'Custom wearable gaskets, vibration dampeners, soft-touch ergonomic grips',
        colorOrFinish: 'Clear, Black',
      },
      {
        name: 'Ceramic-Filled Composite Resin',
        properties: 'Reinforced with nano-ceramic particles for ultra-high stiffness and wear resistance',
        tensileStrength: '85 MPa',
        applications: 'Wear-resistant tooling, micro-fluidic testing, aerospace test fixtures',
        colorOrFinish: 'Porcelain White',
      },
    ],
  },
  {
    id: 'accessories',
    title: '3D Printer Accessories & Spare Parts',
    category: 'accessories',
    description: 'Precision replacement components, nozzles, stepper motors, sensors, and maintenance tools for uninterrupted 3D printing performance.',
    items: [
      {
        name: 'Hardened Steel & Brass Nozzles',
        properties: '0.2, 0.4, 0.6, 0.8 mm diameters; hardened steel resists abrasive carbon-fiber filaments',
        applications: 'Standard and abrasive filament extrusion',
        colorOrFinish: 'Hardened Black / Polished Brass',
      },
      {
        name: 'High-Temp Ceramic Hotend Kits',
        properties: 'All-metal bimetallic heatbreak rated up to 350°C with rapid heating cartridge',
        applications: 'High-speed extrusion and high-temp polymers (ABS, Nylon, CF-ABS)',
        colorOrFinish: 'Anodized Red & Copper',
      },
      {
        name: 'BLTouch & Inductive Auto-Leveling Sensors',
        properties: 'Micro-precision contact and non-contact bed height probing sensors',
        applications: 'Automated mesh bed leveling calibration',
        colorOrFinish: 'White / Black Sensor Housing',
      },
      {
        name: 'Industrial Gates Timing Belts & Pulleys',
        properties: 'Fiberglass reinforced rubber timing belts (2GT/GT2) for zero backlash motion',
        applications: 'X and Y axis kinematic transmission',
        colorOrFinish: 'Industrial Black Rubber',
      },
      {
        name: 'High-Torque NEMA Stepper Motors',
        properties: 'NEMA 17 and NEMA 23 precision 0.9° and 1.8° high-torque stepper motors',
        applications: 'Gantry motion, direct-drive extruders, Z-axis lead screws',
        colorOrFinish: 'Machined Aluminum / Black',
      },
      {
        name: 'Thermistors & High-Precision PT1000 Sensors',
        properties: 'High-temperature RTD sensors measuring up to 450°C with 0.1°C accuracy',
        applications: 'Precise hotend and heated bed temperature feedback',
        colorOrFinish: 'Braided Stainless Steel Wire',
      },
      {
        name: 'Optical & Mechanical Endstop Switches',
        properties: 'Dust-sealed optical and micro-switch limit sensors with LED indicators',
        applications: 'Homing and boundary limits on X, Y, Z axes',
        colorOrFinish: 'Red PCB with Black Housing',
      },
      {
        name: 'Flexible Magnetic PEI Spring Steel Sheets',
        properties: 'Textured powder-coated and smooth PEI surfaces on hardened spring steel',
        applications: 'Superb first-layer adhesion and effortless flex-to-remove part detachment',
        colorOrFinish: 'Textured Gold / Smooth Amber',
      },
    ],
  },
]
