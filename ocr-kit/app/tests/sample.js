const { createWorker } = require('tesseract.js');

// Define the path to your ID card image
const imagePath = './passport.jpg';

// Initialize a Tesseract worker
const worker = createWorker();

// Define a function to process the image
async function processImage() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imagePath);
  console.log(text);
  await worker.terminate();
}

// Call the processImage function
processImage();
// console.log("Its working!")