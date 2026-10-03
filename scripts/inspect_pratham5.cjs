const fs = require('fs');
const html = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity/brain/7a53ac6c-4bd9-4559-a2da-64003d1a9164/.system_generated/steps/3033/content.md', 'utf8');

console.log('--- YOUTUBE VIDEOS ---');
const ytRegex = /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
let match;
const yts = new Set();
while ((match = ytRegex.exec(html)) !== null) {
  yts.add(match[1]);
}
for (const yt of yts) {
  console.log('YouTube ID:', yt, '-> https://www.youtube.com/watch?v=' + yt);
}

console.log('--- IMAGES ---');
const imgRegex = /(https?:\/\/[^\s"'<>)]+\.(?:png|jpg|jpeg|webp))/gi;
const imgs = new Set();
while ((match = imgRegex.exec(html)) !== null) {
  imgs.add(match[1]);
}
for (const img of imgs) {
  if (img.includes('pratham') || img.includes('5.0') || img.includes('make3d') || img.includes('upload')) {
    console.log(img);
  }
}

// Find title / headings
const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
if (titleMatch) console.log('TITLE:', titleMatch[1]);
