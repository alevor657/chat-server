var socketio = require('socket.io');

function Chat(server, params = {}) {
    this.io = socketio(server, params);
    this.sockets = {};
    this.users = [];
    this.rooms = [];

    this.onNewRoom = roomName => {
        console.log('NEW ROOM', roomName);

        this.rooms.push(roomName);
        this.io.sockets.emit("rooms", JSON.stringify(this.rooms));
    };

    this.onMessage = (data) => {
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
                this.sockets[recipient].emit('message', data);
            } else {
                // TODO:
            }
        } else {
            // Save to db

            this.io.sockets.emit('message', data);
        }
    };

    this.onNewUser = (socket, user) => {
        console.log('NEW USER');

        socket.username = user.username;
        this.users.push({ [user.username]: user });
        this.sockets[user.username] = socket;
        this.io.sockets.emit('update usernames', this._generateUsersArray());
        console.log('Users: ', this.users);
        console.log('Sockets nr:', Object.keys(this.sockets).length);
    };

    this.onDisconnect = (socket) => {
        console.log('DISCONNECT');

        this.users = this.users.filter(user => {
            return Object.keys(user)[0] !== socket.username;
        });
        delete this.sockets[this.username];
        this.io.sockets.emit('update usernames', this.generateUsersArray());
        console.log('Users', this.users);
        console.log('Sockets nr:', Object.keys(this.sockets).length);
    };

    this.onGetRooms = socket => {
        console.log('ON GET ROOMS');

        socket.emit('rooms', JSON.stringify(this.rooms));
    };

    this.generateUsersArray = () => {
        return this.users.map(user => Object.values(user)[0]);
    };

    this.onConnection = socket => {
        console.log('CONNECTION');

        socket.on('new user', this.onNewUser);
        socket.on('disconnect', this.onDisconnect);
        socket.on('message', this.onMessage);
        socket.on('get rooms', roomName => this.onGetRooms.bind(this, roomName));
        socket.on('new room', this.onNewRoom);
    };

    this.io.on('connection', this.onConnection);

    return server;
}

module.exports = Chat;
