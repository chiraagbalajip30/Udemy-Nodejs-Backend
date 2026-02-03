const fs = require("fs");
// console.log(fs);

const content = fs.readFileSync("notes.txt", 'utf-8');



console.log(content);
