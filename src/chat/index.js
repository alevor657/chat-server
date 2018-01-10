let users = [];
let sockets = {};
let io = null;

function generateUsersArray() {
    return users.map(user => Object.values(user)[0]);
}

class Chat {
    constructor(socketio) {
        io = socketio;

        this.onConnection = this.onConnection.bind(this);

        io.on('connection', this.onConnection);
    }

    onConnection(socket) {
        console.log('CONNECTION');

        socket.on('new user', this.onNewUser);
        socket.on('disconnect', this.onDisconnect);
        socket.on('message', this.onMessage);
    }

    onMessage(data) {
        console.log('MESSAGE');
        console.log(data);

        data.message.trim();

        if (data.message.substr(0, 3) === '/w ') {
            let msg = data.message.substr(3);

            if (msg.indexOf(' ') !== -1) {
                let recipient = msg.substr(0, msg.indexOf(' '));
                let message = msg.substr(msg.indexOf(' ') + 1);

                data.message = message;
                console.log('EMITTING PM');
                sockets[recipient].emit('message', data);
            } else {
                // TODO:
            }
        } else {
            // Save to db
            io.sockets.emit('message', data);
        }
    }

    onNewUser(user) {
        console.log('NEW USER');
        this.username = user.username;
        users.push({[user.username]: user});
        sockets[user.username] = this;
        io.sockets.emit('update usernames', generateUsersArray.call(this));
        console.log('Users: ', users);
        console.log('Sockets nr:', Object.keys(sockets).length);
    }

    onDisconnect() {
        console.log('DISCONNECT');
        users = users.filter(user => {
            return Object.keys(user)[0] !== this.username;
            // return Object.keys(user)[0] !== this.id;
        });
        delete sockets[this.username];
        io.sockets.emit('update usernames', generateUsersArray.call(this));
        console.log('Users', users);
        console.log('Sockets nr:', Object.keys(sockets).length);
    }
}

export default Chat;
