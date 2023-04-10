const { createWorker } = require('tesseract.js');

async function run() {
  const worker = await createWorker({
    logger: m => console.log(m),
  });

  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('/workspace/app/samples/passport.jpg');
  console.log(text);

  await worker.terminate();
}

run();
