const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\7a53ac6c-4bd9-4559-a2da-64003d1a9164\\.system_generated\\steps\\3113\\content.md', 'utf8');

// Find youtube links
const ytMatches = [...content.matchAll(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g)];
const uniqueYt = [...new Set(ytMatches.map(m => m[0]))];
console.log('YouTube links:', uniqueYt);

// Find brochure link
const pdfMatches = [...content.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)];
console.log('PDF links:', [...new Set(pdfMatches.map(m => m[0]))]);

// Find image links
const imgMatches = [...content.matchAll(/https?:\/\/make3d\.in\/wp-content\/uploads\/[^\s"'<>]+(?:\.png|\.jpg|\.webp|\.jpeg)/gi)];
const cleanImgs = [...new Set(imgMatches.map(m => m[0]))].filter(x => !x.includes('al_opt_content'));
console.log('Clean images count:', cleanImgs.length);
console.log('Clean images:', cleanImgs);

// Strip script and style tags first!
const cleanHtml = content
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

const textOnly = cleanHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
fs.writeFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\7a53ac6c-4bd9-4559-a2da-64003d1a9164\\pratham3_rapid_text.txt', textOnly);
console.log('Clean text length without scripts/styles:', textOnly.length);

const keywords = [
  'Rule the Sky',
  '500 mm',
  'Normal-Speed',
  'High-Speed vs',
  'Key Features',
  'Orca',
  '30 mm',
  '5-inch',
  'HEPA',
  '2500+',
  'Applications',
  'Frequently Asked Questions',
  'Brochure',
  'Demo',
  '0.1–0.2'
];

for (const kw of keywords) {
  let idx = 0;
  let count = 0;
  while ((idx = textOnly.indexOf(kw, idx)) !== -1 && count < 2) {
    console.log(`\n=== FOUND [${kw}] at ${idx} ===`);
    console.log(textOnly.substring(Math.max(0, idx - 40), Math.min(textOnly.length, idx + 250)));
    idx += kw.length;
    count++;
  }
}


