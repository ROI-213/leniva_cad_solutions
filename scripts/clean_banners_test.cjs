const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

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
    filtered[y * stride] = 0; // Filter 0 (None)
    rgba.copy(filtered, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

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

// Inpaint using 2D Coons patch boundary interpolation
function inpaintCoons(img, box, pad = 6) {
  const xA = Math.max(0, box.x1 - pad);
  const xB = Math.min(img.width - 1, box.x2 + pad);
  const yA = Math.max(0, box.y1 - pad);
  const yB = Math.min(img.height - 1, box.y2 + pad);

  const cTL = getPixel(img, xA, yA);
  const cTR = getPixel(img, xB, yA);
  const cBL = getPixel(img, xA, yB);
  const cBR = getPixel(img, xB, yB);

  for (let y = box.y1; y <= box.y2; y++) {
    const v = (y - yA) / (yB - yA);
    const cL = getPixel(img, xA, y);
    const cR = getPixel(img, xB, y);

    for (let x = box.x1; x <= box.x2; x++) {
      const u = (x - xA) / (xB - xA);
      const cT = getPixel(img, x, yA);
      const cB = getPixel(img, x, yB);

      // Horizontal blend
      const hr = (1 - u) * cL[0] + u * cR[0];
      const hg = (1 - u) * cL[1] + u * cR[1];
      const hb = (1 - u) * cL[2] + u * cR[2];

      // Vertical blend
      const vr = (1 - v) * cT[0] + v * cB[0];
      const vg = (1 - v) * cT[1] + v * cB[1];
      const vb = (1 - v) * cT[2] + v * cB[2];

      // Corner blend
      const cr = (1 - u) * (1 - v) * cTL[0] + u * (1 - v) * cTR[0] + (1 - u) * v * cBL[0] + u * v * cBR[0];
      const cg = (1 - u) * (1 - v) * cTL[1] + u * (1 - v) * cTR[1] + (1 - u) * v * cBL[1] + u * v * cBR[1];
      const cb = (1 - u) * (1 - v) * cTL[2] + u * (1 - v) * cTR[2] + (1 - u) * v * cBL[2] + u * v * cBR[2];

      // Final Coons blend
      const r = hr + vr - cr;
      const g = hg + vg - cg;
      const b = hb + vb - cb;

      setPixel(img, x, y, r, g, b);
    }
  }
}

// Inpaint using Vertical-only interpolation (great for regions with uniform vertical background like studio wall/gradient)
function inpaintVertical(img, box, pad = 6) {
  const yA = Math.max(0, box.y1 - pad);
  const yB = Math.min(img.height - 1, box.y2 + pad);

  for (let y = box.y1; y <= box.y2; y++) {
    const v = (y - yA) / (yB - yA);
    for (let x = box.x1; x <= box.x2; x++) {
      const cT = getPixel(img, x, yA);
      const cB = getPixel(img, x, yB);

      const r = (1 - v) * cT[0] + v * cB[0];
      const g = (1 - v) * cT[1] + v * cB[1];
      const b = (1 - v) * cT[2] + v * cB[2];

      setPixel(img, x, y, r, g, b);
    }
  }
}

// Inpaint using Horizontal-only interpolation
function inpaintHorizontal(img, box, pad = 6) {
  const xA = Math.max(0, box.x1 - pad);
  const xB = Math.min(img.width - 1, box.x2 + pad);

  for (let y = box.y1; y <= box.y2; y++) {
    const cL = getPixel(img, xA, y);
    const cR = getPixel(img, xB, y);

    for (let x = box.x1; x <= box.x2; x++) {
      const u = (x - xA) / (xB - xA);
      const r = (1 - u) * cL[0] + u * cR[0];
      const g = (1 - u) * cL[1] + u * cR[1];
      const b = (1 - u) * cL[2] + u * cR[2];

      setPixel(img, x, y, r, g, b);
    }
  }
}

console.log('Testing banner cleaning...');

// ----------------------------------------------------
// BANNER 1 (promo-banner-1-hd.png): "POWERING BIGGER IDEAS"
// ----------------------------------------------------
console.log('Processing Banner 1...');
const b1 = decodePNG('public/images/banners/promo-banner-1-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintCoons(b1, { x1: 95, y1: 52, x2: 745, y2: 115 }, 8);

// 2. Left 4 feature badges (HIGH ACCURACY, INDUSTRIAL PERFORMANCE, etc.)
// Description text ends at y=370; badges start at y=425, end at y=585; bottom space is clean down to y=615
inpaintVertical(b1, { x1: 85, y1: 420, x2: 790, y2: 590 }, 8);

// 3. Bottom-left "FROM CONCEPT TO CREATION" + blue accent bar
inpaintCoons(b1, { x1: 75, y1: 735, x2: 410, y2: 808 }, 6);

// 4. Top-right pillar: "ENGINEER CREATE INNOVATE SCALE"
inpaintCoons(b1, { x1: 1770, y1: 60, x2: 1935, y2: 215 }, 8);

// 5. Under Pratham X printer: "Make3d.in"
inpaintCoons(b1, { x1: 1845, y1: 712, x2: 1985, y2: 745 }, 6);

// 6. Bottom-right pillar: "IDEAS TODAY. A BRIGHTER TOMORROW."
inpaintCoons(b1, { x1: 2375, y1: 720, x2: 2525, y2: 825 }, 6);

encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/test-banner-1.png');
console.log('Banner 1 test saved.');

// ----------------------------------------------------
// BANNER 2 (promo-banner-2-hd.png): "PRECISION SPEED LIMITLESS POSSIBILITIES"
// ----------------------------------------------------
console.log('Processing Banner 2...');
const b2 = decodePNG('public/images/banners/promo-banner-2-hd.png');

// 1. Top-left "PROFESSIONAL RESIN 3D PRINTING SOLUTIONS" + red line
inpaintCoons(b2, { x1: 95, y1: 52, x2: 750, y2: 120 }, 8);

// 2. Left 4 feature badges (ULTRA-HIGH DETAIL, SMOOTH SURFACES, etc.)
inpaintVertical(b2, { x1: 85, y1: 415, x2: 830, y2: 590 }, 8);

// 3. Bottom-left "IDEAS TODAY. A BRIGHTER TOMORROW." + red accent bar
inpaintCoons(b2, { x1: 75, y1: 740, x2: 440, y2: 812 }, 6);

// 4. Right column (4 icons + PRECISION PRINTING, HIGH SPEED, RELIABLE PERFORMANCE, IDEAS INTO REALITY + FROM CONCEPT TO CREATION)
inpaintCoons(b2, { x1: 2260, y1: 135, x2: 2530, y2: 765 }, 8);

encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/test-banner-2.png');
console.log('Banner 2 test saved.');

// ----------------------------------------------------
// BANNER 3 (promo-banner-3-hd.png): "LARGE IDEAS. REAL RESULTS."
// ----------------------------------------------------
console.log('Processing Banner 3...');
const b3 = decodePNG('public/images/banners/promo-banner-3-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintCoons(b3, { x1: 85, y1: 52, x2: 700, y2: 118 }, 8);

// 2. Left 4 feature badges (HIGH ACCURACY, LARGE BUILD VOLUME, etc.)
inpaintVertical(b3, { x1: 85, y1: 415, x2: 830, y2: 590 }, 8);

// 3. Bottom-left "IDEAS TODAY. A STRONGER TOMORROW." + blue accent bar
inpaintCoons(b3, { x1: 75, y1: 730, x2: 445, y2: 808 }, 6);

// 4. Center podium front: "INNOVATE | MANUFACTURE | SCALE"
inpaintCoons(b3, { x1: 960, y1: 745, x2: 1630, y2: 785 }, 6);

// 5. Right column (FROM CONCEPT TO CREATION + 4 icons/labels + Print A Smarter Future)
inpaintCoons(b3, { x1: 2135, y1: 50, x2: 2530, y2: 765 }, 8);

encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/test-banner-3.png');
console.log('Banner 3 test saved.');
