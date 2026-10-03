const fs = require('fs');

function checkBanner(filePath) {
  if (!fs.existsSync(filePath)) return console.log(filePath, 'missing');
  const stat = fs.statSync(filePath);
  const buf = fs.readFileSync(filePath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  console.log(filePath, `size: ${stat.size}, dims: ${w}x${h}`);
}

[
  'public/images/banners/promo-banner-1-hd.png',
  'public/images/banners/promo-banner-2-hd.png',
  'public/images/banners/promo-banner-3-hd.png',
  'public/images/banners/promo-banner-1.png',
  'public/images/banners/promo-banner-2.png',
  'public/images/banners/promo-banner-3.png',
  'public/hero-banner-1.png',
  'public/hero-banner-2.png',
  'public/hero-banner-3.png',
  'public/hero-banner-4.png',
  'public/hero-banner-1-hd.png',
  'public/hero-banner-2-hd.png',
  'public/hero-banner-3-hd.png',
  'public/hero-banner-4-hd.png'
].forEach(checkBanner);
