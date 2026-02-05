const { Buffer } = require("buffer");

// alloc to allocate memory of the mentioned size
// const buf = Buffer.alloc(4);
// console.log(buf);  // <Buffer 00 00 00 00>
// console.log(buf[0]);  // 0

// const buf = Buffer.from("Hello Chai");
// console.log(buf);
// console.log(buf.toString());
// Output - <Buffer 48 65 6c 6c 6f 20 43 68 61 69>
// Hello Chai

// const buffTwo = Buffer.allocUnsafe(10);
// console.log(buffTwo);
// <Buffer 00 00 00 00 00 00 00 00 00 00>
// here it is clean, but there might be some data which are blank. (Garbage Value)



// const buff = Buffer.alloc(10);
// buff.write("Hello");
// console.log(buff.toString());
// // Hello
// console.log(buff.toString('utf8', 0, 4));
// // Hell



// const buff = Buffer.from("Chai");
// console.log(buff);
// <Buffer 43 68 61 69> capital-C - 43, Small-c - 63


// const buff = Buffer.from("Chai");
// console.log(buff);  // <Buffer 43 68 61 69>
// buff[0] = 0X4A
// console.log(buff);  // <Buffer 4a 68 61 69>
// console.log(buff.toString());  // Jhai



const buf1 = Buffer.from("Chai aur");
const buf2 = Buffer.from("code");
const merged = Buffer.concat([buf1, buf2]);
console.log(merged.toString());  // Chai aurcode
console.log(merged.length);  // 12



