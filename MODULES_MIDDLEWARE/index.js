// Named Export 1st way

// const value = require("./math");

// // console.log(add(2, 5));
// console.log(value.myAddFunction(2, 5));

// console.log(value.mySubtractFunction(10, 5));

// console.log(value.myMultiplyFunction(10, 5));

// console.log(value.myDivideFunction(10, 5));

// Named Export 2nd way
// const { myAddFunction, mySubtractFunction, myMultiplyFunction, myDivideFunction } = require("./math");

// console.log(myAddFunction(2, 5));
// console.log(mySubtractFunction(10, 5));
// console.log(myMultiplyFunction(10, 5));
// console.log(myDivideFunction(10, 5));

// Default Export

const value = require("./math");

console.log(value());
