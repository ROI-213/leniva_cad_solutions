// scripts/add-sketchup-advanced-product.cjs
// Safely patches src/data/products.ts to add sketchup-advanced product entry.
// Uses a CJS script (not replace_file_content) to avoid charset errors.

const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'products.ts')

// Read with UTF-8 first, fall back to latin1 if needed
let content
try {
  content = fs.readFileSync(filePath, 'utf8')
} catch {
  content = fs.readFileSync(filePath, 'latin1')
}

const newEntry = `
  {
    id: 'sketchup-advanced',
    name: 'SketchUp Pro Advanced Workflows',
    slug: 'sketchup-pro-advanced-workflows',
    category: 'cad-software',
    technology: 'CAD Software',
    brand: 'SketchUp by Trimble',
    shortDescription: 'Professional 3D modeling with Revit interoperability and point cloud workflows. Windows only.',
    description:
      'SketchUp Pro Advanced Workflows includes everything in SketchUp Pro plus Scan Essentials (point cloud modeling with E57/LAS support) and Revit Importer (.rvt/.rfa). Designed for professionals who work with Revit-based workflows or need to model against existing scan data. Available for Windows only.',
    image: '/images/software/sketchup-advanced.jpg',
    images: ['/images/software/sketchup-advanced.jpg'],
    price: 49.92,
    priceUnit: 'user/month (billed annually)',
    inStock: true,
    featured: true,
    tags: ['sketchup', 'revit', 'point cloud', 'scan essentials', 'bim', 'cad', 'windows'],
    specs: {
      platform: 'Windows Only',
      revitImporter: '.rvt / .rfa',
      pointCloud: 'E57 / LAS / LAZ',
      layout: 'Included',
      trimbleConnect: '1 GB storage',
      subscription: 'Annual or Monthly',
    },
    link: '/products/sketchup-pro-advanced-workflows',
  },`

// Check if already added
if (content.includes("id: 'sketchup-advanced'")) {
  console.log('✅ sketchup-advanced entry already exists, skipping.')
  process.exit(0)
}

// Insert before the closing bracket/end of the products array
// Look for the sketchup-scan entry as an anchor point (insert after it)
const anchor = "id: 'sketchup-scan'"
const anchorIdx = content.indexOf(anchor)
if (anchorIdx === -1) {
  console.error('❌ Could not find anchor "id: \'sketchup-scan\'" in products.ts')
  process.exit(1)
}

// Find the next ',' after the object closes (closing brace of the scan object)
// Walk forward from anchor to find closing brace + comma
let depth = 0
let insertPos = -1
for (let i = anchorIdx; i < content.length; i++) {
  if (content[i] === '{') depth++
  if (content[i] === '}') {
    depth--
    if (depth < 0) {
      // Found the closing } of the object — now find the comma after it (if any)
      let j = i + 1
      while (j < content.length && (content[j] === ' ' || content[j] === '\r' || content[j] === '\n')) j++
      if (content[j] === ',') {
        insertPos = j + 1
      } else {
        insertPos = i + 1
      }
      break
    }
  }
}

if (insertPos === -1) {
  console.error('❌ Could not determine insert position.')
  process.exit(1)
}

const updatedContent = content.slice(0, insertPos) + '\n' + newEntry + content.slice(insertPos)

fs.writeFileSync(filePath, updatedContent, 'utf8')
console.log('✅ sketchup-advanced product entry added to products.ts successfully.')
