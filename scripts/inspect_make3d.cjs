const fs = require('fs');
const html = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity/brain/7a53ac6c-4bd9-4559-a2da-64003d1a9164/.system_generated/steps/2913/content.md', 'utf8');

const regex = /(https?:\/\/[^\s"'<>)]+\.(?:png|jpg|jpeg|webp))/gi;
let match;
const urls = new Set();
while ((match = regex.exec(html)) !== null) {
  urls.add(match[1]);
}
console.log('--- ALL RELEVANT IMAGES ---');
for (const u of urls) {
  if (u.includes('pratham') || u.includes('6.0') || u.includes('2024') || u.includes('2025') || u.includes('2026') || u.includes('uploads')) {
    console.log(u);
  }
}
