var socketio = require('socket.io');

// Constants. Move to a different file
const ERR_ROOM_EXISTS = "ERR_ROOM_EXISTS";

function Chat(server, params = {}) {
    this.io = socketio(server, params);
    this.sockets = {};
    this.users = [];
    this.rooms = [];

    this.onNewRoom = (roomName, socket) => {
        console.log('NEW ROOM', roomName);

        if (this.rooms.includes(roomName)) {
            console.log('ERR ROOM EXISTS', roomName);
            socket.emit(ERR_ROOM_EXISTS);
            return;
        }

        this.rooms.push(roomName);
        this.io.sockets.emit("rooms", JSON.stringify(this.rooms));
    };

    this.onDeleteRoom = (roomName, socket) => {
        console.log('DELETE ROOM', roomName);

        this.rooms = this.rooms.filter((item) => {
            return item !== roomName;
        });

        socket.emit('rooms', JSON.stringify(this.rooms));
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
        console.log('ON GET ROOMS', this.rooms);

        socket.emit('rooms', JSON.stringify(this.rooms));
    };

    this.generateUsersArray = () => {
        return this.users.map(user => Object.values(user)[0]);
    };

    this.onConnection = socket => {
        console.log('CONNECTION');

        socket.emit('rooms', JSON.stringify(this.rooms));

        socket.on('new user', this.onNewUser);
        socket.on('disconnect', this.onDisconnect);
        socket.on('message', this.onMessage);
        socket.on('get rooms', this.onGetRooms.bind(this, socket));
        socket.on('delete room', roomName => this.onDeleteRoom.call(this, roomName, socket));
        socket.on('new room', roomName => this.onNewRoom.call(this, roomName, socket));
    };

    this.io.on('connection', this.onConnection);

    return server;
}

module.exports = Chat;
