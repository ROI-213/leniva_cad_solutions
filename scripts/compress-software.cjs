/**
 * compress-software.cjs
 * Retry compression for the software images that failed
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'public', 'images', 'software'),
];

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;

  try {
    // Read file into buffer first to avoid file lock issues
    const inputBuffer = fs.readFileSync(filePath);
    let outBuffer;

    if (ext === '.png') {
      outBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9, palette: true })
        .toBuffer();
    } else {
      outBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();
    }

    const newSize = outBuffer.length;
    const savedKB = Math.round((originalSize - newSize) / 1024);

    if (newSize < originalSize) {
      // Write to temp file, then rename (avoids overwrite-while-open error)
      const tmp = filePath + '.tmp';
      fs.writeFileSync(tmp, outBuffer);
      fs.unlinkSync(filePath);
      fs.renameSync(tmp, filePath);
      console.log(`✅ ${path.relative(process.cwd(), filePath)} | ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB (saved ${savedKB}KB)`);
    } else {
      console.log(`⏭  already optimised: ${path.basename(filePath)}`);
    }
  } catch (e) {
    console.error(`❌ ${filePath}: ${e.message}`);
  }
}

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) results = results.concat(getFiles(full));
    else results.push(full);
  }
  return results;
}

async function main() {
  let files = [];
  for (const d of dirs) files = files.concat(getFiles(d));
  console.log(`Processing ${files.length} files in software folder...\n`);
  for (const f of files) await compressImage(f);
  console.log('\nDone!');
}

main().catch(console.error);
