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
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, out);
}

function crop(src, x1, y1, x2, y2) {
  const w = x2 - x1;
  const h = y2 - y1;
  const dst = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    const srcOffset = ((y1 + y) * src.width + x1) * 4;
    const dstOffset = (y * w) * 4;
    src.rgba.copy(dst, dstOffset, srcOffset, srcOffset + w * 4);
  }
  return { width: w, height: h, rgba: dst };
}

const srcImg = decodePNG('C:/Users/LENOVO/.gemini/antigravity/brain/7a53ac6c-4bd9-4559-a2da-64003d1a9164/.user_uploaded/media_1791010157565.png');
console.log('Source loaded:', srcImg.width, srcImg.height);

const cardItems = [
  { name: 'functional-prototypes', x1: 8, x2: 249, y1: 147, y2: 330 },
  { name: 'end-use-components', x1: 264, x2: 505, y1: 147, y2: 330 },
  { name: 'educational-models', x1: 520, x2: 761, y1: 147, y2: 330 },
  { name: 'custom-complex-designs', x1: 776, x2: 1017, y1: 147, y2: 330 },
];

for (const item of cardItems) {
  const cropped = crop(srcImg, item.x1, item.y1, item.x2, item.y2);
  const outPublic = path.join('public/images/desktop-work', `${item.name}.png`);
  encodePNG(cropped.width, cropped.height, cropped.rgba, outPublic);
  console.log(`Saved ${outPublic}: ${cropped.width}x${cropped.height}`);

  const outDist = path.join('dist/images/desktop-work', `${item.name}.png`);
  if (fs.existsSync('dist/images')) {
    encodePNG(cropped.width, cropped.height, cropped.rgba, outDist);
  }
}

// Also save full banner reference
fs.copyFileSync(
  'C:/Users/LENOVO/.gemini/antigravity/brain/7a53ac6c-4bd9-4559-a2da-64003d1a9164/.user_uploaded/media_1791010157565.png',
  'public/images/desktop-work/work-from-pratham-desktop-full.png'
);
if (fs.existsSync('dist/images')) {
  fs.copyFileSync(
    'public/images/desktop-work/work-from-pratham-desktop-full.png',
    'dist/images/desktop-work/work-from-pratham-desktop-full.png'
  );
}
console.log('All desktop work images cropped and saved successfully!');
