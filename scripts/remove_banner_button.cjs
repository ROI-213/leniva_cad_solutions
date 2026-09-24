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

// Inpaint function: interpolates background from top and bottom border pixels
function inpaintRegion(img, box) {
  const { x1, y1, x2, y2 } = box;
  const pad = 6;
  const topY = Math.max(0, y1 - pad);
  const bottomY = Math.min(img.height - 1, y2 + pad);

  for (let y = y1 - pad; y <= y2 + pad; y++) {
    const t = (y - topY) / (bottomY - topY); // 0 at top, 1 at bottom
    for (let x = x1 - pad; x <= x2 + pad; x++) {
      const topIdx = (topY * img.width + x) * 4;
      const botIdx = (bottomY * img.width + x) * 4;

      const r = Math.round((1 - t) * img.rgba[topIdx] + t * img.rgba[botIdx]);
      const g = Math.round((1 - t) * img.rgba[topIdx + 1] + t * img.rgba[botIdx + 1]);
      const b = Math.round((1 - t) * img.rgba[topIdx + 2] + t * img.rgba[botIdx + 2]);
      const a = 255;

      const currIdx = (y * img.width + x) * 4;
      img.rgba[currIdx] = r;
      img.rgba[currIdx + 1] = g;
      img.rgba[currIdx + 2] = b;
      img.rgba[currIdx + 3] = a;
    }
  }
}

// Process all 3 banners
const banners = [
  {
    path: 'public/images/banners/promo-banner-1-hd.png',
    box: { x1: 110, y1: 605, x2: 570, y2: 686 },
  },
  {
    path: 'public/images/banners/promo-banner-2-hd.png',
    box: { x1: 95, y1: 610, x2: 555, y2: 692 },
  },
  {
    path: 'public/images/banners/promo-banner-3-hd.png',
    box: { x1: 90, y1: 585, x2: 500, y2: 660 },
  },
];

for (const b of banners) {
  console.log('Processing:', b.path);
  const img = decodePNG(b.path);
  inpaintRegion(img, b.box);
  encodePNG(img.width, img.height, img.rgba, b.path);

  // Also copy to dist and standard (non-hd) names if exist
  const distPath = b.path.replace('public/', 'dist/');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.copyFileSync(b.path, distPath);
  }

  const nonHdPath = b.path.replace('-hd.png', '.png');
  fs.copyFileSync(b.path, nonHdPath);
  const distNonHd = nonHdPath.replace('public/', 'dist/');
  if (fs.existsSync(path.dirname(distNonHd))) {
    fs.copyFileSync(b.path, distNonHd);
  }

  console.log('Finished:', b.path);
}
console.log('All 3 banners processed successfully!');
