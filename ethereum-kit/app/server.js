const http = require("http");

const options = {
  port: process.env.TEST_PORT,
  path: "/",
  method: "GET",
};

console.log("App Container Configuration: ", options);

http
  .createServer(function (req, res) {
    console.log("Received request...");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("App container is alive and reachable!");
    res.end();
  })
  .listen(options.port);
