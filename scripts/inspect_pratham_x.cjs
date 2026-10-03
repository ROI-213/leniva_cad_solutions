const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\7a53ac6c-4bd9-4559-a2da-64003d1a9164\\.system_generated\\steps\\3238\\content.md', 'utf8');

// YouTube links
const ytMatches = [...content.matchAll(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g)];
const uniqueYt = [...new Set(ytMatches.map(m => m[0]))];
console.log('YouTube links:', uniqueYt);

// PDF links
const pdfMatches = [...content.matchAll(/https?:\/\/[^\s"'<>]+\.pdf/gi)];
console.log('PDF links:', [...new Set(pdfMatches.map(m => m[0]))]);

// Images
const imgMatches = [...content.matchAll(/https?:\/\/make3d\.in\/wp-content\/uploads\/[^\s"'<>]+(?:\.png|\.jpg|\.webp|\.jpeg)/gi)];
const cleanImgs = [...new Set(imgMatches.map(m => m[0]))].filter(x => !x.includes('al_opt_content'));
console.log('Clean images count:', cleanImgs.length);
console.log('Clean images:', cleanImgs);

// Clean text
const cleanHtml = content
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
const textOnly = cleanHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
fs.writeFileSync('C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\7a53ac6c-4bd9-4559-a2da-64003d1a9164\\pratham_x_text.txt', textOnly);
console.log('Saved clean text length:', textOnly.length);
