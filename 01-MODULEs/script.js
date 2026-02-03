const fs = require("node:fs");

// Task: Read the contents of copy.txt


console.log("Start of Script");

// Synchronous Way

// const contents = fs.readFileSync("copy.txt", "utf-8");

// console.log("Contents", contents);


// Asynchronous Way

fs.readFile("copy.txt", "utf-8", function(error, data) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("COntent got: ", data);
    }
})


console.log("End of Script");
