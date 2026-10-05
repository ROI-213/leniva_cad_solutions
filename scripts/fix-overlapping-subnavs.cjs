/**
 * fix-overlapping-subnavs.cjs
 * Removes sticky positioning from product sub-navigation bars across all product pages
 * so they scroll naturally with the page and NEVER overlap with the main website header.
 * Also adds whitespace-nowrap and shrink-0 to badges to prevent vertical text wrapping.
 */
const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');

const files = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(PAGES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove sticky from subnav divs/navs
  // Pattern matches: className="sticky top-[...] ... z-..." or className="sticky top-16 ... z-..."
  content = content.replace(
    /className=(["'])sticky top-(?:\[[^\]]+\]|16)\s+(?:z-\d+\s+)?bg-white(?:\/95)?\s+(?:backdrop-blur-md\s+)?border-b border-slate-200(?:\/90|\/80)?\s+(?:shadow-[a-z0-9]+\s+)?(?:transition-all\s*)?\1/g,
    'className=$1w-full bg-white border-b border-slate-200 shadow-xs$1'
  );

  // Catch any remaining sticky subnav wrappers
  content = content.replace(
    /className=(["'])bg-white border-b border-slate-200\/80 sticky top-(?:\[[^\]]+\]|16)\s+z-\d+\s+shadow-xs\1/g,
    'className=$1w-full bg-white border-b border-slate-200 shadow-xs$1'
  );

  // Catch sticky nav in AresElectricalPage and AresStandardPage
  content = content.replace(
    /<nav className=(["'])sticky top-(?:\[[^\]]+\]|16)\s+z-\d+\s+bg-white(?:\/95)?\s+(?:backdrop-blur-md\s+)?border-b border-slate-200\s+(?:shadow-[a-z0-9]+\s+)?transition-all\1/g,
    '<nav className=$1w-full bg-white border-b border-slate-200 shadow-xs$1'
  );

  // 2. Prevent badges from wrapping vertically
  content = content.replace(
    /text-\[10px\] font-mono uppercase bg-red-100 text-red-700 px-2 py-0\.5 rounded-full font-bold(?! whitespace-nowrap)/g,
    'text-[10px] font-mono uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap shrink-0'
  );

  content = content.replace(
    /px-2\.5 py-0\.5 rounded-full bg-amber-100 text-amber-900 text-\[10px\] font-mono font-bold uppercase tracking-wider(?! whitespace-nowrap)/g,
    'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0'
  );

  content = content.replace(
    /px-2\.5 py-0\.5 rounded-full bg-blue-100 text-blue-800 text-\[10px\] font-mono font-bold uppercase tracking-wider(?! whitespace-nowrap)/g,
    'px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap shrink-0'
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`✅ Fixed subnav in: ${file}`);
  }
}

console.log(`\nDone. Fixed ${modifiedCount} files.`);
