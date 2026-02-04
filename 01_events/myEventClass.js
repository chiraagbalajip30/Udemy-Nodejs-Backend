const EventEmitter = require("events");

class Chat extends EventEmitter {
    sendMessage(msg) {
        console.log(`Message sent: ${msg}`);
        this.emit('messageRecieved', msg);
    }
}

const chat = new Chat();
chat.on('messageRecieved', (msg) => {
    console.log(`New Mesaage: ${msg}`);
})

// trigger event
chat.sendMessage('Hello');