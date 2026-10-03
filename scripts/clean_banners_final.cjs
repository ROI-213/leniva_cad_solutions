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

// Inward Propagation Inpainting (Fast Marching / Boundary Inflow)
function inpaintInwardPropagation(img, box, isTarget, dilation = 3, maxPasses = 100) {
  const { x1, y1, x2, y2 } = box;
  const w = x2 - x1 + 1;
  const h = y2 - y1 + 1;

  // 1. Mark target pixels
  const mask = new Uint8Array(w * h);
  for (let dy = 0; dy < h; dy++) {
    const y = y1 + dy;
    for (let dx = 0; dx < w; dx++) {
      const x = x1 + dx;
      const rgb = getPixel(img, x, y);
      if (isTarget(rgb, x, y)) {
        mask[dy * w + dx] = 1;
      }
    }
  }

  // 2. Dilate mask
  const dilated = new Uint8Array(w * h);
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      if (mask[dy * w + dx] === 1) {
        for (let ddy = -dilation; ddy <= dilation; ddy++) {
          const ny = dy + ddy;
          if (ny < 0 || ny >= h) continue;
          for (let ddx = -dilation; ddx <= dilation; ddx++) {
            const nx = dx + ddx;
            if (nx < 0 || nx >= w) continue;
            if (ddx * ddx + ddy * ddy <= dilation * dilation + 1) {
              dilated[ny * w + nx] = 1;
            }
          }
        }
      }
    }
  }

  let remaining = 0;
  for (let i = 0; i < w * h; i++) {
    if (dilated[i] === 1) remaining++;
  }
  if (remaining === 0) return;

  // 3. Inward propagation loop
  let passes = 0;
  while (remaining > 0 && passes < maxPasses) {
    passes++;
    const boundary = [];

    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        if (dilated[dy * w + dx] === 1) {
          let hasUnmaskedNeighbor = false;
          for (let ddy = -1; ddy <= 1 && !hasUnmaskedNeighbor; ddy++) {
            const ny = dy + ddy;
            if (ny < 0 || ny >= h) {
              hasUnmaskedNeighbor = true;
              break;
            }
            for (let ddx = -1; ddx <= 1; ddx++) {
              const nx = dx + ddx;
              if (nx < 0 || nx >= w || dilated[ny * w + nx] === 0) {
                hasUnmaskedNeighbor = true;
                break;
              }
            }
          }
          if (hasUnmaskedNeighbor) {
            boundary.push([dx, dy]);
          }
        }
      }
    }

    if (boundary.length === 0) break;

    const newColors = [];
    for (const [dx, dy] of boundary) {
      const x = x1 + dx;
      const y = y1 + dy;
      let sumR = 0, sumG = 0, sumB = 0, count = 0;

      for (let ry = -2; ry <= 2; ry++) {
        const sy = y + ry;
        const sdy = sy - y1;
        for (let rx = -2; rx <= 2; rx++) {
          const sx = x + rx;
          const sdx = sx - x1;

          const isInsideBox = (sdx >= 0 && sdx < w && sdy >= 0 && sdy < h);
          const isUnmasked = !isInsideBox || dilated[sdy * w + sdx] === 0;

          if (isUnmasked) {
            const [r, g, b] = getPixel(img, sx, sy);
            const isLeaf = (g > r + 15 && g > b + 10) || (g > 60 && r < 100 && b < 100);
            if (!isLeaf) {
              const wgt = 1 / (1 + Math.sqrt(rx * rx + ry * ry));
              sumR += r * wgt;
              sumG += g * wgt;
              sumB += b * wgt;
              count += wgt;
            }
          }
        }
      }

      if (count > 0) {
        newColors.push([x, y, dx, dy, sumR / count, sumG / count, sumB / count]);
      }
    }

    for (const [x, y, dx, dy, r, g, b] of newColors) {
      setPixel(img, x, y, r, g, b);
      dilated[dy * w + dx] = 0;
      remaining--;
    }
  }
}

// ====================================================
// BANNER 1 (promo-banner-1-hd.png): "POWERING BIGGER IDEAS"
// ====================================================
console.log('Processing Banner 1: POWERING BIGGER IDEAS...');
const b1 = decodePNG('public/images/banners/promo-banner-1-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintVerticalExact(b1, 95, 745, 52, 115, 48, 122);

// 2. Left 4 feature badges (HIGH ACCURACY, INDUSTRIAL PERFORMANCE, etc.)
inpaintVerticalExact(b1, 85, 790, 425, 590, 418, 598);

// 3. Bottom-left "FROM CONCEPT TO CREATION" + blue accent bar
inpaintInwardPropagation(b1, { x1: 90, y1: 735, x2: 430, y2: 812 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10);
  if (isLeaf) return false;
  return rgb[0] < 190 || rgb[1] < 190 || rgb[2] > rgb[0] + 15;
}, 3);

// 4. Top-right pillar: "ENGINEER CREATE INNOVATE SCALE"
inpaintInwardPropagation(b1, { x1: 1770, y1: 60, x2: 1935, y2: 220 }, (rgb) => {
  return rgb[0] < 175 && rgb[1] < 175 && rgb[2] < 175;
}, 3);

// 5. Under Pratham X printer: "Make3d.in"
inpaintInwardPropagation(b1, { x1: 1850, y1: 622, x2: 2005, y2: 656 }, (rgb) => {
  return rgb[0] < 225 || rgb[1] < 225 || rgb[2] < 225;
}, 3);

// 6. Bottom-right pillar: "IDEAS TODAY. A BRIGHTER TOMORROW."
inpaintInwardPropagation(b1, { x1: 2370, y1: 715, x2: 2515, y2: 815 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10);
  if (isLeaf) return false;
  return rgb[0] < 205 || rgb[1] < 205 || rgb[2] > rgb[0] + 15;
}, 3);

encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/promo-banner-1-hd.png');
encodePNG(b1.width, b1.height, b1.rgba, 'public/images/banners/promo-banner-1.png');

// ====================================================
// BANNER 2 (promo-banner-2-hd.png): "PRECISION SPEED LIMITLESS POSSIBILITIES"
// ====================================================
console.log('Processing Banner 2: PRECISION SPEED LIMITLESS POSSIBILITIES...');
const b2 = decodePNG('public/images/banners/promo-banner-2-hd.png');

// 1. Top-left "PROFESSIONAL RESIN 3D PRINTING SOLUTIONS" + red line
inpaintVerticalExact(b2, 95, 750, 52, 120, 48, 126);

// 2. Left 4 feature badges (ULTRA-HIGH DETAIL, SMOOTH SURFACES, etc.)
inpaintVerticalExact(b2, 85, 820, 425, 590, 418, 598);

// 3. Bottom-left "IDEAS TODAY. A BRIGHTER TOMORROW." + red accent bar
inpaintInwardPropagation(b2, { x1: 85, y1: 735, x2: 450, y2: 815 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10);
  if (isLeaf) return false;
  return rgb[0] < 190 || rgb[1] < 190 || rgb[0] > rgb[2] + 20;
}, 3);

// 4. Right column 4 icons & labels + "FROM CONCEPT TO CREATION"
inpaintInwardPropagation(b2, { x1: 2240, y1: 135, x2: 2540, y2: 770 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10) || (rgb[1] > 60 && rgb[0] < 100 && rgb[2] < 100);
  if (isLeaf) return false;
  return rgb[0] < 205 || rgb[1] < 205 || rgb[2] < 205;
}, 3);

encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/promo-banner-2-hd.png');
encodePNG(b2.width, b2.height, b2.rgba, 'public/images/banners/promo-banner-2.png');

// ====================================================
// BANNER 3 (promo-banner-3-hd.png): "LARGE IDEAS. REAL RESULTS."
// ====================================================
console.log('Processing Banner 3: LARGE IDEAS. REAL RESULTS....');
const b3 = decodePNG('public/images/banners/promo-banner-3-hd.png');

// 1. Top-left "INDUSTRIAL 3D PRINTING SOLUTIONS" + blue line
inpaintVerticalExact(b3, 85, 705, 52, 118, 48, 124);

// 2. Left 4 feature badges (HIGH ACCURACY, LARGE BUILD VOLUME, etc.)
inpaintVerticalExact(b3, 85, 820, 425, 590, 418, 598);

// 3. Bottom-left "IDEAS TODAY. A STRONGER TOMORROW." + blue accent bar
inpaintInwardPropagation(b3, { x1: 85, y1: 725, x2: 460, y2: 812 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10);
  if (isLeaf) return false;
  return rgb[0] < 190 || rgb[1] < 190 || rgb[2] > rgb[0] + 15;
}, 3);

// 4. Center podium front: "INNOVATE | MANUFACTURE | SCALE"
inpaintInwardPropagation(b3, { x1: 960, y1: 735, x2: 1640, y2: 785 }, (rgb) => {
  return rgb[0] < 135 || (rgb[2] > rgb[0] + 10 && rgb[0] < 155);
}, 3);

// 5. Right column: FROM CONCEPT TO CREATION + 4 icons & labels + Print A Smarter Future
inpaintInwardPropagation(b3, { x1: 2130, y1: 50, x2: 2540, y2: 770 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10) || (rgb[1] > 60 && rgb[0] < 100 && rgb[2] < 100);
  if (isLeaf) return false;
  return rgb[0] < 195 || rgb[1] < 195 || (rgb[2] > rgb[0] + 15);
}, 3);

encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/promo-banner-3-hd.png');
encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/promo-banner-3.png');

console.log('All 3 HD & standard banners cleaned and saved successfully!');

// Also mirror to dist if exists
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
console.log('Dist mirrors updated.');
