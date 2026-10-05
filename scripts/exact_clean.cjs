const fs = require('fs');

// 1. GoldPlaPage.tsx
let gold = fs.readFileSync('src/pages/GoldPlaPage.tsx', 'utf8');

// replace handleBuyNow
gold = gold.replace(
  /`\[Immediate Order\] \${productData\.name}[\s\S]*?\* quantity\s*}`/g,
  "`[Filament Quote Request] ${productData.name} - ${activeVariant.color} (Qty: ${quantity} Spools)`"
);

// replace related products price
gold = gold.replace(
  `<div className="flex items-baseline space-x-2 pt-0.5">
                      <span className="text-sm font-black text-slate-950">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{rel.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>`,
  `<div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Price on Request
                      </span>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-amber-600 flex items-center gap-0.5">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>`
);

// replace sticky mobile bar in GoldPlaPage
gold = gold.replace(
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Gold Total</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-black text-slate-950">
              ₹{(productData.price * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              ₹{(productData.mrp * quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      </div>`,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{productData.name}</span>
          <span className="text-xs font-bold text-slate-900">Price on Request</span>
        </div>
        <button
          onClick={() => openQuoteModal(\`[Filament Quote Request] \${productData.name} - \${activeVariant.color} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
          className="py-2.5 px-5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>REQUEST QUOTE</span>
        </button>
      </div>`
);

fs.writeFileSync('src/pages/GoldPlaPage.tsx', gold, 'utf8');
console.log('Fixed GoldPlaPage.tsx');

// 2. GreySilverPlaPage.tsx
let grey = fs.readFileSync('src/pages/GreySilverPlaPage.tsx', 'utf8');

// replace handleBuyNow
grey = grey.replace(
  /`\[Immediate Order\] \${productData\.name}[\s\S]*?\* quantity\s*}`/g,
  "`[Filament Quote Request] ${productData.name} - ${activeVariant.color} (Qty: ${quantity} Spools)`"
);

// replace related products price in GreySilverPlaPage
grey = grey.replace(
  `<div className="flex items-baseline space-x-2 pt-0.5">
                      <span className="text-sm font-black text-slate-950">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{rel.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>`,
  `<div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        Price on Request
                      </span>
                      <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 flex items-center gap-0.5">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>`
);

// replace sticky mobile bar in GreySilverPlaPage
grey = grey.replace(
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Grey/Silver Total</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-black text-slate-950">
              ₹{(productData.price * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              ₹{(productData.mrp * quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
          >
            BUY NOW
          </button>
        </div>
      </div>`,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{productData.name}</span>
          <span className="text-xs font-bold text-slate-900">Price on Request</span>
        </div>
        <button
          onClick={() => openQuoteModal(\`[Filament Quote Request] \${productData.name} - \${activeVariant.color} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
          className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>REQUEST QUOTE</span>
        </button>
      </div>`
);

fs.writeFileSync('src/pages/GreySilverPlaPage.tsx', grey, 'utf8');
console.log('Fixed GreySilverPlaPage.tsx');

// 3. WhitePlaDetailPage.tsx
let white = fs.readFileSync('src/pages/WhitePlaDetailPage.tsx', 'utf8');

// replace related products price in WhitePlaDetailPage
white = white.replace(
  `<div className="flex items-baseline space-x-2 pt-0.5">
                        <span className="text-sm font-black text-slate-950 font-mono">
                          ₹{rel.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through font-mono">
                          ₹{rel.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>`,
  `<div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          Price on Request
                        </span>
                        <span className="text-xs font-bold text-slate-700 group-hover:text-red-600 flex items-center gap-0.5">
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>`
);

// replace sticky mobile bar in WhitePlaDetailPage
white = white.replace(
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Price</span>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-black text-slate-950">
              ₹{(product.price * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              ₹{(product.mrp * quantity).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="py-2.5 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart ({quantity})</span>
        </button>
      </div>`,
  `<div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold block">{product.name}</span>
          <span className="text-xs font-bold text-slate-900">Price on Request</span>
        </div>
        <button
          onClick={() => openQuoteModal(\`[Filament Quote Request] \${product.name} (\${quantity} Spool\${quantity > 1 ? 's' : ''})\`)}
          className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>REQUEST QUOTE</span>
        </button>
      </div>`
);

fs.writeFileSync('src/pages/WhitePlaDetailPage.tsx', white, 'utf8');
console.log('Fixed WhitePlaDetailPage.tsx');
