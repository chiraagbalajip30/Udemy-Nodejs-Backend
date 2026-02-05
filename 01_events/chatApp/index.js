// Driver Code which drives and utilises all these functionality

const ChatRoom = require("./chatRoom.js");

const chat = new ChatRoom();

chat.on("join", (user) => {
  console.log(`${user} joined the chat`);
});

chat.on("message", (user, message) => {
  console.log(`${user} : ${message}`);
});

chat.on("leave", (user) => {
  console.log(`${user} left the chat`);
});

// Simulating the chat

chat.join("Alice");
chat.join("Bob");

chat.sendMessage("Alice", "Hello from Alice");
chat.sendMessage("Bob", "Hello from Bob");

chat.leave("Alice");

chat.sendMessage("Alice", "This message wont be sent once you leave the chat");

chat.leave("Bob");

// Output

// Alice joined the chat
// Bob joined the chat
// Alice : Hello from Alice
// Bob : Hello from Bob
// Alice left the chat
// Alice is not in the chat
