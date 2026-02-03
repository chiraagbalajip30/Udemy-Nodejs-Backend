// const fs = require("fs");
// // console.log(fs);

// const content = fs.readFileSync("notes.txt", 'utf-8');

// console.log(content);

// ---------------------------------------------

// Video -21
// ----------

const fs = require("node:fs");

// read a file
const content = fs.readFileSync("notes.txt", "utf-8");

//write a file
fs.writeFileSync(
  "copy.txt",
  "I am creating a new file using writeFileSync",
  "utf-8",
);

fs.appendFileSync(
  "copy.txt",
  "I am creating a new file using appendFileSync and trying to add content to it",
  "utf-8",
);

console.log(content);
