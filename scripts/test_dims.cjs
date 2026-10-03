const fs = require('fs');

const files = [
  'public/images/banners/promo-banner-1-hd.png',
  'public/images/banners/promo-banner-2-hd.png',
  'public/images/banners/promo-banner-3-hd.png',
  'public/hero-banner-1.png',
  'public/hero-banner-2.png',
  'public/hero-banner-3.png',
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const buf = fs.readFileSync(f);
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    console.log(f, w, 'x', h);
  } else {
    console.log(f, 'MISSING');
  }
}
