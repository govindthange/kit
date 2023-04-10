const Tesseract = require('tesseract.js');

Tesseract.recognize(
  // '/workspace/app/samples/eng_bw.png',
  '/workspace/app/samples/passport.jpg',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})
