const fs = require('fs');
const zlib = require('zlib');

function decodePNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8, width, height, idats = [];
  while (pos < buf.length) {
    const chunkLen = buf.readUInt32BE(pos);
    const chunkType = buf.toString('ascii', pos + 4, pos + 8);
    const chunkData = buf.subarray(pos + 8, pos + 8 + chunkLen);
    pos += 12 + chunkLen;
    if (chunkType === 'IHDR') {
      width = chunkData.readUInt32BE(0);
      height = chunkData.readUInt32BE(4);
    } else if (chunkType === 'IDAT') {
      idats.push(chunkData);
    }
  }

  const uncomp = zlib.inflateSync(Buffer.concat(idats));
  const stride = 1 + width * 4;
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const filter = uncomp[y * stride];
    const prevRow = y > 0 ? (y - 1) * width * 4 : null;
    const currRow = y * width * 4;
    const srcRow = y * stride + 1;

    for (let x = 0; x < width * 4; x++) {
      const raw = uncomp[srcRow + x];
      const a = x >= 4 ? rgba[currRow + x - 4] : 0;
      const b = prevRow !== null ? rgba[prevRow + x] : 0;
      const c = prevRow !== null && x >= 4 ? rgba[prevRow + x - 4] : 0;

      let val = raw;
      if (filter === 1) val = (raw + a) & 0xff;
      else if (filter === 2) val = (raw + b) & 0xff;
      else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        const pr = pa <= pb && pa <= pc ? a : (pb <= pc ? b : c);
        val = (raw + pr) & 0xff;
      }
      rgba[currRow + x] = val;
    }
  }

  return { width, height, rgba };
}

function getPixel(img, x, y) {
  const idx = (y * img.width + x) * 4;
  return [img.rgba[idx], img.rgba[idx + 1], img.rgba[idx + 2]];
}

const b1 = decodePNG('public/images/banners/promo-banner-1-hd.png');
console.log('--- B1 Pillar background at x=1750, y=70..210: ---');
for (let y = 70; y <= 210; y += 30) {
  console.log(`y=${y}:`, getPixel(b1, 1750, y));
}

console.log('\n--- B1 Pillar text sample at x=1800..1880, y=70 (ENGINEER): ---');
for (let x = 1785; x <= 1820; x += 5) {
  console.log(`x=${x}, y=70:`, getPixel(b1, x, 70));
}

console.log('\n--- B1 Bottom-Left text at y=760: ---');
for (let x = 90; x <= 300; x += 15) {
  console.log(`x=${x}, y=760:`, getPixel(b1, x, 760));
}

console.log('\n--- B1 Planter at x=2420, y=700..800: ---');
for (let y = 700; y <= 800; y += 20) {
  console.log(`y=${y}:`, getPixel(b1, 2420, y));
}
