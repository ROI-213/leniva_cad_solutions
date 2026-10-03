const sharp = require('sharp');
const path = 'C:/Users/LENOVO/.gemini/antigravity/brain/7a53ac6c-4bd9-4559-a2da-64003d1a9164/.user_uploaded/media_1791020693297.png';

sharp(path).metadata().then(meta => {
  console.log('Image dimensions:', meta.width, 'x', meta.height);
}).catch(err => {
  console.error(err);
});
