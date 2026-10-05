const fs = require('fs');

// ============================================================================
// 1. GoldPlaPage.tsx
// ============================================================================
let gold = fs.readFileSync('src/pages/GoldPlaPage.tsx', 'utf8');

// Remove price box in hero
gold = gold.replace(
  /<div className="space-y-1[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Short Description \*\/}/,
  '{/* Short Description */}'
);

// Fix related products in GoldPlaPage
gold = gold.replace(
  /<div className="pt-1 flex items-baseline space-x-2">[\s\S]*?<\/div>/g,
  `<div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Quote on Request
                      </span>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 flex items-center gap-0.5">
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>`
);

// Fix sticky mobile bar in GoldPlaPage
gold = gold.replace(
  /<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{productData.name}</span>
          <span className="text-xs font-bold text-slate-700">{activeVariant.name} • {quantity} KG Net</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openQuoteModal(\`[Filament Inquiry] \${productData.name} - \${activeVariant.color} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
            className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>REQUEST QUOTE</span>
          </button>
        </div>
      </div>`
);

fs.writeFileSync('src/pages/GoldPlaPage.tsx', gold, 'utf8');
console.log('Cleaned GoldPlaPage.tsx');

// ============================================================================
// 2. GreySilverPlaPage.tsx
// ============================================================================
let grey = fs.readFileSync('src/pages/GreySilverPlaPage.tsx', 'utf8');

// Remove price box in hero
grey = grey.replace(
  /<div className="space-y-1[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Short Description \*\/}/,
  '{/* Short Description */}'
);

// Fix related products in GreySilverPlaPage
grey = grey.replace(
  /<div className="pt-1 flex items-baseline space-x-2">[\s\S]*?<\/div>/g,
  `<div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        Quote on Request
                      </span>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 flex items-center gap-0.5">
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>`
);

// Fix sticky mobile bar in GreySilverPlaPage
grey = grey.replace(
  /<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{productData.name}</span>
          <span className="text-xs font-bold text-slate-700">{activeVariant.name} • {quantity} KG Net</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openQuoteModal(\`[Filament Inquiry] \${productData.name} - \${activeVariant.color} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>REQUEST QUOTE</span>
          </button>
        </div>
      </div>`
);

fs.writeFileSync('src/pages/GreySilverPlaPage.tsx', grey, 'utf8');
console.log('Cleaned GreySilverPlaPage.tsx');

// ============================================================================
// 3. WhitePlaDetailPage.tsx
// ============================================================================
let white = fs.readFileSync('src/pages/WhitePlaDetailPage.tsx', 'utf8');

// Remove price box in hero
white = white.replace(
  /<div className="space-y-1[\s\S]*?<\/div>\s*<\/div>\s*{\/\* Short Description \*\/}/,
  '{/* Short Description */}'
);

// Fix related products in WhitePlaDetailPage
white = white.replace(
  /<div className="pt-1 flex items-baseline space-x-2">[\s\S]*?<\/div>/g,
  `<div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          Quote on Request
                        </span>
                        <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 flex items-center gap-0.5">
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>`
);

// Fix sticky mobile bar in WhitePlaDetailPage
white = white.replace(
  /<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{product.name}</span>
          <span className="text-xs font-bold text-slate-700">{quantity} KG Spool</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openQuoteModal(\`[Filament Inquiry] \${product.name} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>REQUEST QUOTE</span>
          </button>
        </div>
      </div>`
);

fs.writeFileSync('src/pages/WhitePlaDetailPage.tsx', white, 'utf8');
console.log('Cleaned WhitePlaDetailPage.tsx');

// ============================================================================
// 4. FilamentCategoryPage.tsx (Generic Detail Page inside it)
// ============================================================================
let fcat = fs.readFileSync('src/pages/FilamentCategoryPage.tsx', 'utf8');

// Remove price section in FilamentDetailPage
fcat = fcat.replace(
  /<div className="space-y-1\.5 bg-slate-50[\s\S]*?<\/p>\s*<\/div>/,
  ''
);

fs.writeFileSync('src/pages/FilamentCategoryPage.tsx', fcat, 'utf8');
console.log('Cleaned FilamentCategoryPage.tsx');

// ============================================================================
// 5. Clean discountText in goldPlaData.ts & greySilverPlaData.ts
// ============================================================================
let goldData = fs.readFileSync('src/data/goldPlaData.ts', 'utf8');
goldData = goldData.replace("discountText: 'SAVE ₹100',", "discountText: 'Available on Request',");
fs.writeFileSync('src/data/goldPlaData.ts', goldData, 'utf8');

let greyData = fs.readFileSync('src/data/greySilverPlaData.ts', 'utf8');
greyData = greyData.replace("discountText: 'SAVE ₹100',", "discountText: 'Available on Request',");
fs.writeFileSync('src/data/greySilverPlaData.ts', greyData, 'utf8');

console.log('All filament price references cleaned successfully!');
