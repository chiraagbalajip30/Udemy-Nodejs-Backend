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

// const http = require("node:http");

// const server = http.createServer((req, res) => {
//   console.log("Incoming Request at ${Datew.now()}");
//   console.log(req.headers);
//   console.log(req.method);
//   console.log(req.url);

//   // send the response
//   //   res.writeHead(200);

//   // this is how you write switch cases in node.js for routes
//   switch (req.url) {
//     case "/":
//       res.writeHead(200);
//       return res.end("Home Page");

//     case "/contact-us":
//       res.writeHead(200);
//       return res.end("Contact Us Page");

//     case "/about-us":
//       res.writeHead(200);
//       return res.end("About Us Page");

//     default:
//       res.writeHead(400);
//       return res.end("Page Not Found");
//   }

//   //   res.end("OK!");
//   res.end(
//     `Hey, you can accept or view the encoding type from the headers ${req.headers["accept-language"]}`,
//   );
// });

// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });

// --------------------------------------------------

// Video - 34
// -------------
// Build a custom task with native http server using Node.js

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = req.url;

  const log = `\n[${Date.now()}]: ${method} ${path}`;
  fs.appendFileSync("log.txt", log, "utf-8");

  switch (method) {
    case "GET":
      {
        switch (path) {
          case "/":
            return res.writeHead(200).end("Hello from the Server"); // Task-1

          case "/contact-us":
            return res
              .writeHead(200)
              .end(
                "Send your email to mcb@gmail.com and contact to 9611614859",
              ); // Task-2

          case "/tweet":
            return res.writeHead(200).end("Tweet-1\nTweet-2"); // Task-4
        }
      }
      break;
    case "POST":
      switch (path) {
        case "/tweet":
          return res.writeHead(201).end("Your tweet was created!"); // Task-3
      }
  }
  return res.writeHead(404).end("You're lost man!");
});

server.listen(8000, () => {
  console.log("HTTP Server is running on PORT 8000");
});
