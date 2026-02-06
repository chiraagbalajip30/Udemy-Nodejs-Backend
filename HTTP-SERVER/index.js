// Video-31
// Creating a basic HTTP Server with core NODE.js Modules

// const http = require("node:http");

// const server = http.createServer(function (req, res) {
//   console.log("I got an incoming request");
//   // insteasd of console, you can do db operastins, etc.
//   res.writeHead(200);
//   res.end("Thanks for visitng my server");
// });

// // server.listen(8000, function() {
// //     console.log('Listening on port 8000');
// // }) or we can use arrow functions

// server.listen(8000, () => {
//   console.log("Listening on port 8000");
// });

// ----------------------------------------------
// Video-33
// Building a Custom Server - Hands on

const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log("Incoming Request at ${Datew.now()}");
  console.log(req.headers);
  console.log(req.method);
  console.log(req.url);

  // send the response
  //   res.writeHead(200);

  // this is how you write switch cases in node.js for routes
  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end("Home Page");

    case "/contact-us":
      res.writeHead(200);
      return res.end("Contact Us Page");

    case "/about-us":
      res.writeHead(200);
      return res.end("About Us Page");

    default:
      res.writeHead(400);
      return res.end("Page Not Found");
  }

  //   res.end("OK!");
  res.end(
    `Hey, you can accept or view the encofdin type from the heasders ${req.headers["accept-language"]}`,
  );
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
