/**
 * compress-images.cjs
 * Converts all PNG/JPG in public/images to compressed WebP
 * and also overwrites originals with compressed versions.
 * Run once: node scripts/compress-images.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const MAX_WIDTH = 1920; // never upscale, just cap oversized images

let processed = 0;
let skipped = 0;
let totalSavedKB = 0;

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);

  try {
    let pipeline = sharp(filePath).resize({ width: MAX_WIDTH, withoutEnlargement: true });

    let outBuffer;
    if (ext === '.png') {
      outBuffer = await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true }).toBuffer();
    } else {
      outBuffer = await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true }).toBuffer();
    }

    const newSize = outBuffer.length;
    const savedKB = Math.round((originalSize - newSize) / 1024);

    if (newSize < originalSize) {
      fs.writeFileSync(filePath, outBuffer);
      totalSavedKB += savedKB;
      console.log(`✅ ${path.relative(process.cwd(), filePath)} | ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB (saved ${savedKB}KB)`);
    } else {
      console.log(`⏭  ${path.relative(process.cwd(), filePath)} | already optimised`);
    }

    processed++;
  } catch (e) {
    console.error(`❌ ${filePath}: ${e.message}`);
    skipped++;
  }
}

async function main() {
  const files = getFiles(IMAGE_DIR);
  console.log(`Found ${files.length} files in public/images\n`);

  for (const f of files) {
    await compressImage(f);
  }

  console.log(`\n✅ Done. Processed: ${processed} | Skipped: ${skipped} | Total saved: ${Math.round(totalSavedKB/1024*10)/10} MB`);
}

main().catch(console.error);
