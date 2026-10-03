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

// Inpaint using Vertical interpolation from yA to yB
function inpaintVerticalExact(img, x1, x2, y1, y2, yA, yB) {
  for (let y = y1; y <= y2; y++) {
    const v = (y - yA) / (yB - yA);
    for (let x = x1; x <= x2; x++) {
      const cT = getPixel(img, x, yA);
      const cB = getPixel(img, x, yB);
      const r = (1 - v) * cT[0] + v * cB[0];
      const g = (1 - v) * cT[1] + v * cB[1];
      const b = (1 - v) * cT[2] + v * cB[2];
      setPixel(img, x, y, r, g, b);
    }
  }
}

// Inpaint using Horizontal interpolation from xA to xB
function inpaintHorizontalExact(img, x1, x2, y1, y2, xA, xB) {
  for (let y = y1; y <= y2; y++) {
    const cL = getPixel(img, xA, y);
    const cR = getPixel(img, xB, y);
    for (let x = x1; x <= x2; x++) {
      const u = (x - xA) / (xB - xA);
      const r = (1 - u) * cL[0] + u * cR[0];
      const g = (1 - u) * cL[1] + u * cR[1];
      const b = (1 - u) * cL[2] + u * cR[2];
      setPixel(img, x, y, r, g, b);
    }
  }
}

// Inpaint 2D Coons patch
function inpaintCoonsExact(img, x1, x2, y1, y2, xA, xB, yA, yB) {
  const cTL = getPixel(img, xA, yA);
  const cTR = getPixel(img, xB, yA);
  const cBL = getPixel(img, xA, yB);
  const cBR = getPixel(img, xB, yB);

  for (let y = y1; y <= y2; y++) {
    const v = (y - yA) / (yB - yA);
    const cL = getPixel(img, xA, y);
    const cR = getPixel(img, xB, y);

    for (let x = x1; x <= x2; x++) {
      const u = (x - xA) / (xB - xA);
      const cT = getPixel(img, x, yA);
      const cB = getPixel(img, x, yB);

      const hr = (1 - u) * cL[0] + u * cR[0];
      const hg = (1 - u) * cL[1] + u * cR[1];
      const hb = (1 - u) * cL[2] + u * cR[2];

      const vr = (1 - v) * cT[0] + v * cB[0];
      const vg = (1 - v) * cT[1] + v * cB[1];
      const vb = (1 - v) * cT[2] + v * cB[2];

      const cr = (1 - u) * (1 - v) * cTL[0] + u * (1 - v) * cTR[0] + (1 - u) * v * cBL[0] + u * v * cBR[0];
      const cg = (1 - u) * (1 - v) * cTL[1] + u * (1 - v) * cTR[1] + (1 - u) * v * cBL[1] + u * v * cBR[1];
      const cb = (1 - u) * (1 - v) * cTL[2] + u * (1 - v) * cTR[2] + (1 - u) * v * cBL[2] + u * v * cBR[2];

      const r = hr + vr - cr;
      const g = hg + vg - cg;
      const b = hb + vb - cb;

      setPixel(img, x, y, r, g, b);
    }
  }
}

// ----------------------------------------------------
// BANNER 1 (promo-banner-1-hd.png): "POWERING BIGGER IDEAS"
// ----------------------------------------------------
console.log('Processing Banner 1 (POWERING BIGGER IDEAS)...');
const b1 = decodePNG('public/images/banners/promo-banner-1-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintVerticalExact(b1, 95, 745, 52, 115, 48, 122);

// 2. Left 4 feature badges (HIGH ACCURACY, INDUSTRIAL PERFORMANCE, etc.)
inpaintVerticalExact(b1, 85, 790, 425, 590, 418, 598);

// 3. Bottom-left "FROM CONCEPT TO CREATION" + blue accent bar
inpaintVerticalExact(b1, 95, 400, 745, 805, 738, 812);

// 4. Top-right pillar: "ENGINEER CREATE INNOVATE SCALE" (horizontal interpolation along pillar)
inpaintHorizontalExact(b1, 1780, 1925, 65, 215, 1770, 1935);

// 5. Under Pratham X printer: "Make3d.in"
inpaintVerticalExact(b1, 1850, 2005, 630, 655, 625, 660);

// 6. Bottom-right pillar: "IDEAS TODAY. A BRIGHTER TOMORROW."
inpaintCoonsExact(b1, 2375, 2525, 720, 825, 2370, 2530, 715, 830);

encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/test-banner-1.png');

// ----------------------------------------------------
// BANNER 2 (promo-banner-2-hd.png): "PRECISION SPEED LIMITLESS POSSIBILITIES"
// ----------------------------------------------------
console.log('Processing Banner 2 (PRECISION SPEED LIMITLESS POSSIBILITIES)...');
const b2 = decodePNG('public/images/banners/promo-banner-2-hd.png');

// 1. Top-left "PROFESSIONAL RESIN 3D PRINTING SOLUTIONS" + red line
inpaintVerticalExact(b2, 95, 750, 52, 120, 48, 126);

// 2. Left 4 feature badges (ULTRA-HIGH DETAIL, SMOOTH SURFACES, etc.)
inpaintVerticalExact(b2, 85, 820, 425, 590, 418, 598);

// 3. Bottom-left "IDEAS TODAY. A BRIGHTER TOMORROW." + red accent bar
inpaintVerticalExact(b2, 90, 440, 742, 810, 736, 816);

// 4. Right column 4 icons & labels
inpaintHorizontalExact(b2, 2270, 2515, 145, 580, 2260, 2525);

// 5. Right column bottom text ("FROM CONCEPT TO CREATION")
inpaintHorizontalExact(b2, 2260, 2480, 670, 765, 2250, 2490);

encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/test-banner-2.png');

// ----------------------------------------------------
// BANNER 3 (promo-banner-3-hd.png): "LARGE IDEAS. REAL RESULTS."
// ----------------------------------------------------
console.log('Processing Banner 3 (LARGE IDEAS. REAL RESULTS.)...');
const b3 = decodePNG('public/images/banners/promo-banner-3-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintVerticalExact(b3, 85, 705, 52, 118, 48, 124);

// 2. Left 4 feature badges (HIGH ACCURACY, LARGE BUILD VOLUME, etc.)
inpaintVerticalExact(b3, 85, 820, 425, 590, 418, 598);

// 3. Bottom-left "IDEAS TODAY. A STRONGER TOMORROW." + blue accent bar
inpaintVerticalExact(b3, 85, 450, 730, 805, 724, 812);

// 4. Center podium front: "INNOVATE | MANUFACTURE | SCALE" (horizontal interpolation along concrete step face)
inpaintHorizontalExact(b3, 970, 1630, 740, 780, 960, 1640);

// 5. Right column: top text + 4 icons & labels
inpaintHorizontalExact(b3, 2160, 2520, 55, 540, 2150, 2530);

// 6. Right column: bottom script "Print A Smarter Future" (stays left of plant leaves)
inpaintHorizontalExact(b3, 2160, 2460, 630, 755, 2150, 2470);

encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/test-banner-3.png');

console.log('All v2 test banners generated successfully!');
