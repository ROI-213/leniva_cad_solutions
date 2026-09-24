const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// CRC32 implementation for PNG chunks
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

function processPNG(filePath, outPath) {
  const buf = fs.readFileSync(filePath);
  if (buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) {
    console.error('Not a PNG:', filePath);
    return false;
  }

  let pos = 8;
  let width, height, bitDepth, colorType, compression, filter, interlace;
  const idatChunks = [];

  while (pos < buf.length) {
    const chunkLen = buf.readUInt32BE(pos);
    const chunkType = buf.toString('ascii', pos + 4, pos + 8);
    const chunkData = buf.subarray(pos + 8, pos + 8 + chunkLen);
    pos += 12 + chunkLen;

    if (chunkType === 'IHDR') {
      width = chunkData.readUInt32BE(0);
      height = chunkData.readUInt32BE(4);
      bitDepth = chunkData[8];
      colorType = chunkData[9];
      compression = chunkData[10];
      filter = chunkData[11];
      interlace = chunkData[12];
    } else if (chunkType === 'IDAT') {
      idatChunks.push(chunkData);
    }
  }

  if (colorType !== 6 && colorType !== 2) {
    console.log(`Skipping ${filePath}: unsupported colorType ${colorType}`);
    return false;
  }

  if (bitDepth !== 8 || interlace !== 0) {
    console.log(`Skipping ${filePath}: unsupported bitDepth ${bitDepth} or interlaced ${interlace}`);
    return false;
  }

  const rawData = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const stride = 1 + width * bytesPerPixel;
  const newScanlines = [];

  // Sample top-left corner background color
  // Scanline 0: byte 0 is filter type. If filter is 0 (None):
  let bgR = 0, bgG = 0, bgB = 0;
  // If first filter type is 0:
  if (rawData[0] === 0) {
    bgR = rawData[1];
    bgG = rawData[2];
    bgB = rawData[3];
  } else {
    // default known background for these renders: approx [219, 227, 232]
    bgR = 219;
    bgG = 227;
    bgB = 232;
  }
  console.log(`${path.basename(filePath)}: Detected BG color ~ [${bgR}, ${bgG}, ${bgB}]`);

  // Unfilter scanlines to get true RGB values
  // We recreate filtered scanlines as RGBA (colorType 6) with filter = 0 (None)
  const prevRow = Buffer.alloc(width * 4);
  const currRow = Buffer.alloc(width * 4);

  // We decode the original image row by row
  const decodedRows = [];
  let rawPos = 0;

  for (let y = 0; y < height; y++) {
    const filterType = rawData[rawPos++];
    const row = Buffer.alloc(width * 4);
    const prevDecoded = y > 0 ? decodedRows[y - 1] : null;

    for (let x = 0; x < width; x++) {
      for (let c = 0; c < bytesPerPixel; c++) {
        let val = rawData[rawPos++];
        const a = x > 0 ? row[x * 4 + c - 4] : 0;
        const b = prevDecoded ? prevDecoded[x * 4 + c] : 0;
        const c_corner = (x > 0 && prevDecoded) ? prevDecoded[x * 4 + c - 4] : 0;

        if (filterType === 1) { // Sub
          val = (val + a) & 0xff;
        } else if (filterType === 2) { // Up
          val = (val + b) & 0xff;
        } else if (filterType === 3) { // Average
          val = (val + Math.floor((a + b) / 2)) & 0xff;
        } else if (filterType === 4) { // Paeth
          const p = a + b - c_corner;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c_corner);
          let pr;
          if (pa <= pb && pa <= pc) pr = a;
          else if (pb <= pc) pr = b;
          else pr = c_corner;
          val = (val + pr) & 0xff;
        }
        row[x * 4 + c] = val;
      }

      if (bytesPerPixel === 3) {
        row[x * 4 + 3] = 255; // Alpha
      }
    }
    decodedRows.push(row);
  }

  // Refine BG color from top-left 5x5 corner average
  let sumR = 0, sumG = 0, sumB = 0, count = 0;
  for (let y = 0; y < Math.min(8, height); y++) {
    for (let x = 0; x < Math.min(8, width); x++) {
      sumR += decodedRows[y][x * 4];
      sumG += decodedRows[y][x * 4 + 1];
      sumB += decodedRows[y][x * 4 + 2];
      count++;
    }
  }
  bgR = Math.round(sumR / count);
  bgG = Math.round(sumG / count);
  bgB = Math.round(sumB / count);
  console.log(`Refined BG Color: rgb(${bgR}, ${bgG}, ${bgB})`);

  // Flood fill / color distance mask from outer border
  // Check if pixel is within color distance of background
  const isBgColor = (r, g, b) => {
    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    return dist < 22; // tolerance for soft compression artifacts
  };

  // BFS flood-fill from borders so inside of machines (e.g. gray parts) are NOT removed!
  const mask = new Uint8Array(width * height); // 1 = background to remove
  const queue = [];

  const addQueue = (x, y) => {
    const idx = y * width + x;
    if (mask[idx] === 0) {
      const r = decodedRows[y][x * 4];
      const g = decodedRows[y][x * 4 + 1];
      const b = decodedRows[y][x * 4 + 2];
      if (isBgColor(r, g, b)) {
        mask[idx] = 1;
        queue.push((y << 16) | x);
      }
    }
  };

  // Seed with all borders (top, bottom, left, right)
  for (let x = 0; x < width; x++) {
    addQueue(x, 0);
    addQueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    addQueue(0, y);
    addQueue(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const val = queue[head++];
    const x = val & 0xffff;
    const y = val >>> 16;

    if (x > 0) addQueue(x - 1, y);
    if (x < width - 1) addQueue(x + 1, y);
    if (y > 0) addQueue(x, y - 1);
    if (y < height - 1) addQueue(x, y + 1);
  }

  // Apply transparency to mask and smooth edges
  const outputScanlines = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const r = decodedRows[y][x * 4];
      const g = decodedRows[y][x * 4 + 1];
      const b = decodedRows[y][x * 4 + 2];
      let a = decodedRows[y][x * 4 + 3];

      if (mask[idx] === 1) {
        a = 0;
      } else {
        // Soft edge antialiasing: if adjacent to background
        let bgNeighbors = 0;
        if (x > 0 && mask[idx - 1] === 1) bgNeighbors++;
        if (x < width - 1 && mask[idx + 1] === 1) bgNeighbors++;
        if (y > 0 && mask[idx - width] === 1) bgNeighbors++;
        if (y < height - 1 && mask[idx + width] === 1) bgNeighbors++;

        if (bgNeighbors > 0) {
          const dr = r - bgR;
          const dg = g - bgG;
          const db = b - bgB;
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);
          if (dist < 32) {
            a = Math.min(255, Math.max(0, Math.round((dist / 32) * 255)));
          }
        }
      }

      row[1 + x * 4] = r;
      row[1 + x * 4 + 1] = g;
      row[1 + x * 4 + 2] = b;
      row[1 + x * 4 + 3] = a;
    }
    outputScanlines.push(row);
  }

  // Build new PNG
  const newIHDR = Buffer.alloc(13);
  newIHDR.writeUInt32BE(width, 0);
  newIHDR.writeUInt32BE(height, 4);
  newIHDR[8] = 8; // 8-bit
  newIHDR[9] = 6; // RGBA
  newIHDR[10] = 0;
  newIHDR[11] = 0;
  newIHDR[12] = 0;

  const compressedData = zlib.deflateSync(Buffer.concat(outputScanlines), { level: 9 });
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const outBuf = Buffer.concat([
    pngSignature,
    makeChunk('IHDR', newIHDR),
    makeChunk('IDAT', compressedData),
    makeChunk('IEND', Buffer.alloc(0))
  ]);

  fs.writeFileSync(outPath, outBuf);
  console.log(`Saved transparent PNG: ${outPath} (${outBuf.length} bytes)`);
  return true;
}

const targetImages = [
  'public/images/products/pratham-6-0.png',
  'public/images/products/pratham-5-0.png',
  'public/images/products/pratham-3-0.png',
  'public/images/products/pratham-desktop.png',
  'public/images/products/eka-xle.png',
  'public/images/products/eka-xl.png',
  'public/images/products/eka-ht.png',
  'public/images/products/eka-gt-max.png',
  'public/images/products/eka-f1-16k.png'
];

for (const img of targetImages) {
  if (fs.existsSync(img)) {
    try {
      processPNG(img, img);
      // also copy to dist if dist exists
      const distPath = img.replace(/^public/, 'dist');
      if (fs.existsSync(path.dirname(distPath))) {
        fs.copyFileSync(img, distPath);
      }
    } catch (err) {
      console.error(`Error processing ${img}:`, err.message);
    }
  }
}
