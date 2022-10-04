const http = require("http");

const options = {
  port: process.env.TEST_PORT,
  path: "/",
  method: "GET",
};

console.log("Service Configuration: ", options);

http.createServer(function (req, res) {
    console.log("Received request...")
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World!');
    res.end();
}).listen(options.port);