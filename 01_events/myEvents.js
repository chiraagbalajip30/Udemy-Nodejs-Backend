// Basic understanding with def: emitters emits the event to the listeners

// eventEmitter     → is the "emitter" (the object that can announce things)
// "greet"          → is the named event (the specific signal/name it shouts)
// () => console.log("Hello!")   → is the listener (the function that gets called when the event happens)

// import events module
// this gives you the constructor function / class
// const EventEmiiter = require("events");

// as we creating a fresh instance of this class we use new keyword
// new creates a fresh, independent object
// const eventEmitter = new EventEmiiter();

// eventEmitter.on('greet', () => {
//     console.log("Hello, welcome to Events in Node.js");
// })

// // Emit the event

// eventEmitter.emit('greet');

// with arguments

const EventEmiiter = require("events");

// as we creating a fresh instance of this class we use new keyword
// new creates a fresh, independent object
const eventEmitter = new EventEmiiter();

eventEmitter.on("greet", (username) => {
  console.log(`Hello ${username}, welcome to Events in Node.js`);
});

// added the same one to check how many listeners are listening to this function
eventEmitter.on("greet", (username) => {
  console.log(`Hey ${username}, welcome to Node.js Udemy course`);
});

// this is used to execute the event only once
eventEmitter.once("pushnotify", () => {
  console.log("This event will run only once");
});

// more event methods
const myListener = () => {
    console.log("I am a Test Listener");
}
eventEmitter.on("test", myListener)

// Emit the event

eventEmitter.emit("greet", "mourya");
eventEmitter.emit("greet", "mcb");
eventEmitter.emit("pushnotify");
eventEmitter.emit("pushnotify"); // this won't run again hence no output

// trying to emit first, then remove and see that it won't run when emitted again
eventEmitter.emit("test");
eventEmitter.emit("test");
eventEmitter.removeListener("test", myListener);
eventEmitter.emit("test");

console.log(eventEmitter.listeners("test")); // []
console.log(eventEmitter.listeners("greet")); // [ [Function (anonymous)], [Function (anonymous)] ]
