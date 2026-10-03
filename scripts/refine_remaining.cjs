const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

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

function encodePNG(width, height, rgba, outputPath) {
  const stride = 1 + width * 4;
  const filtered = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    filtered[y * stride] = 0;
    rgba.copy(filtered, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const out = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, out);
}

function getPixel(img, x, y) {
  const clx = Math.max(0, Math.min(img.width - 1, Math.round(x)));
  const cly = Math.max(0, Math.min(img.height - 1, Math.round(y)));
  const idx = (cly * img.width + clx) * 4;
  return [img.rgba[idx], img.rgba[idx + 1], img.rgba[idx + 2], img.rgba[idx + 3]];
}

function setPixel(img, x, y, r, g, b, a = 255) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  const idx = (y * img.width + x) * 4;
  img.rgba[idx] = Math.max(0, Math.min(255, Math.round(r)));
  img.rgba[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
  img.rgba[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
  img.rgba[idx + 3] = a;
}

// ====================================================
// BANNER 1 (promo-banner-1-hd.png)
// ====================================================
console.log('Refining Banner 1...');
const b1 = decodePNG('public/images/banners/promo-banner-1-hd.png');

// 1. Make3d.in on Pratham X printer body:
// Directly copy the clean white metal row from y=622 down to y=625..655
for (let y = 625; y <= 654; y++) {
  for (let x = 1850; x <= 2005; x++) {
    const [r, g, b] = getPixel(b1, x, 621);
    setPixel(b1, x, y, r, g, b);
  }
}

// 2. Top-right pillar: ENGINEER CREATE INNOVATE SCALE (x: 1775..1930, y: 65..215)
// Copy clean concrete pillar from x: 1640..1760 with feather
const pWidth = 1930 - 1775 + 1;
for (let dy = 0; dy <= (215 - 65); dy++) {
  const y = 65 + dy;
  for (let dx = 0; dx < pWidth; dx++) {
    const x = 1775 + dx;
    const sx = 1640 + (dx % 120);
    const [r, g, b] = getPixel(b1, sx, y);
    setPixel(b1, x, y, r, g, b);
  }
}

// 3. Bottom-right planter: IDEAS TODAY. A BRIGHTER TOMORROW. (x: 2370..2515, y: 720..815)
// Copy clean stone planter from y: 640..710
const plH = 815 - 720 + 1;
for (let dy = 0; dy < plH; dy++) {
  const y = 720 + dy;
  const sy = 640 + (dy % 70);
  for (let x = 2370; x <= 2515; x++) {
    const [r, g, b] = getPixel(b1, x, sy);
    setPixel(b1, x, y, r, g, b);
  }
}

// 4. Bottom-left floor: FROM CONCEPT TO CREATION (x: 95..420, y: 742..810)
// Copy clean floor from x: 440..580 (feathering at right edge)
for (let y = 742; y <= 810; y++) {
  for (let x = 95; x <= 420; x++) {
    const sx = 440 + ((x - 95) % 140);
    const [r, g, b] = getPixel(b1, sx, y);
    setPixel(b1, x, y, r, g, b);
  }
}

encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/promo-banner-1-hd.png');
encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/promo-banner-1.png');

// ====================================================
// BANNER 2 (promo-banner-2-hd.png)
// ====================================================
console.log('Refining Banner 2...');
const b2 = decodePNG('public/images/banners/promo-banner-2-hd.png');

// Bottom-left floor: IDEAS TODAY. A BRIGHTER TOMORROW. (x: 85..450, y: 742..812)
// Copy clean floor from x: 460..600
for (let y = 742; y <= 812; y++) {
  for (let x = 85; x <= 445; x++) {
    const sx = 460 + ((x - 85) % 140);
    const [r, g, b] = getPixel(b2, sx, y);
    setPixel(b2, x, y, r, g, b);
  }
}

encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/promo-banner-2-hd.png');
encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/promo-banner-2.png');

// ====================================================
// BANNER 3 (promo-banner-3-hd.png)
// ====================================================
console.log('Refining Banner 3...');
const b3 = decodePNG('public/images/banners/promo-banner-3-hd.png');

// Bottom-left floor: IDEAS TODAY. A STRONGER TOMORROW. (x: 85..460, y: 730..810)
// Copy clean floor from x: 470..610
for (let y = 730; y <= 810; y++) {
  for (let x = 85; x <= 455; x++) {
    const sx = 470 + ((x - 85) % 140);
    const [r, g, b] = getPixel(b3, sx, y);
    setPixel(b3, x, y, r, g, b);
  }
}

encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/promo-banner-3-hd.png');
encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/promo-banner-3.png');

// Mirror all to dist
for (let i = 1; i <= 3; i++) {
  const srcHd = `public/images/banners/promo-banner-${i}-hd.png`;
  const distHd = `dist/images/banners/promo-banner-${i}-hd.png`;
  if (fs.existsSync(path.dirname(distHd))) {
    fs.copyFileSync(srcHd, distHd);
  }
  const srcStd = `public/images/banners/promo-banner-${i}.png`;
  const distStd = `dist/images/banners/promo-banner-${i}.png`;
  if (fs.existsSync(path.dirname(distStd))) {
    fs.copyFileSync(srcStd, distStd);
  }
}

console.log('Refinements complete!');
