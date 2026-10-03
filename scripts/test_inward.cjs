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

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

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

// Inward propagation inpainting (Fast Marching / Onion Peeling)
function inpaintInwardPropagation(img, box, isTarget, dilation = 3) {
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

  // 3. Count remaining masked pixels
  let remaining = 0;
  for (let i = 0; i < w * h; i++) {
    if (dilated[i] === 1) remaining++;
  }
  console.log(`Mask created: ${remaining} pixels to inpaint`);

  // 4. Inward propagation loop
  let passes = 0;
  while (remaining > 0 && passes < 100) {
    passes++;
    const boundary = [];

    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        if (dilated[dy * w + dx] === 1) {
          // Check if it has any unmasked neighbor
          let hasUnmaskedNeighbor = false;
          for (let ddy = -1; ddy <= 1 && !hasUnmaskedNeighbor; ddy++) {
            const ny = dy + ddy;
            if (ny < 0 || ny >= h) {
              hasUnmaskedNeighbor = true; // boundary of box
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

    // Fill each boundary pixel from unmasked neighbors within radius 2
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

    // Apply new colors and mark as unmasked
    for (const [x, y, dx, dy, r, g, b] of newColors) {
      setPixel(img, x, y, r, g, b);
      dilated[dy * w + dx] = 0;
      remaining--;
    }
  }

  console.log(`Inward propagation finished in ${passes} passes.`);
}

const b3 = decodePNG('public/images/banners/promo-banner-3-hd.png');

// Test on B3 Right column
console.log('Testing inward propagation on B3 right column...');
inpaintInwardPropagation(b3, { x1: 2130, y1: 50, x2: 2540, y2: 770 }, (rgb) => {
  const isLeaf = (rgb[1] > rgb[0] + 15 && rgb[1] > rgb[2] + 10) || (rgb[1] > 60 && rgb[0] < 100 && rgb[2] < 100);
  if (isLeaf) return false;
  // dark text/icons OR blue text/script
  return rgb[0] < 195 || rgb[1] < 195 || (rgb[2] > rgb[0] + 15);
}, 3);

encodePNG(b3.width, b3.height, b3.rgba, 'public/images/banners/test-inward-b3.png');
console.log('Saved test-inward-b3.png');
