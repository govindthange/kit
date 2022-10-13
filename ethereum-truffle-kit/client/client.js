const http = require('http');

const options = {
  hostname: process.env.TEST_HOST,
  port: process.env.TEST_PORT,
  path: '/',
  method: 'GET'
};

console.log('Service Configuration: ', options);

const request = http.request(options, response => {
  console.log(`statusCode: ${response.statusCode}`);

  response.on('data', d => {
    process.stdout.write(d);
  });
});

request.on('error', error => {
  console.error(error);
});

request.end();
