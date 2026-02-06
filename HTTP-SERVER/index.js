const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log("I got an incoming request");
  // insteasd of console, you can do db operastins, etc.
  res.writeHead(200);
  res.end("Thanks for visitng my server");
});

// server.listen(8000, function() {
//     console.log('Listening on port 8000');
// }) or we can use arrow functions

server.listen(8000, () => {
  console.log("Listening on port 8000");
});
