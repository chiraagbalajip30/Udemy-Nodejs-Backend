// This has all the functionalities

const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
    constructor() {
        super()
        this.users = new Set(); // to create all the active users
    }

    join(user) {
        this.users.add(user) //add method to add user
        this.emit('join', user); //announces the user to everyone in the chat
    }

    sendMessage(user, message) {
        if (this.users.has(user)) {
            this.emit('message', user, message);
        }
        else {
            console.log(`${user} is not in the chat`);
        }
    }

    leave(user) {
        if (this.users.has(user)) {
            this.users.delete(user);
            this.emit('leave', user);
        }
        else {
            console.log(`${user} is not in the chat`);
        }
    }
}


module.exports = ChatRoom;