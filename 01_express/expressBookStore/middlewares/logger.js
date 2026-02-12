const fs = require("node:fs");

// just writing middleware to log the paths along with time like we used to do in earlier codes
exports.loggerMiddleware = function (req, res, next) {
  const log = `\n[${Date.now()}]: ${req.method} ${req.path}`;
  fs.appendFileSync("logs.txt", log, "utf-8");
  next();
};

// It used to be like this earlier in the index.js file

// function loggerMiddleware(req, res, next) {
//   const log = `\n[${Date.now()}]: ${req.method} ${req.path}`;
//   fs.appendFileSync("logs.txt", log, "utf-8");
//   next();
// }
