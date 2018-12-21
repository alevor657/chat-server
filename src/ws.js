var socketio = require('socket.io');

// Constants. Move to a different file
const REQUEST_ROOM_NAMES = "GET_ROOMS";
const NEW_ROOM = "NEW_ROOM";
const DELETE_ROOM = "DELETE_ROOM";
const ERR_ROOM_EXISTS = "ERR_ROOM_EXISTS";
const REPOPULATE_ROOMS = "REPOPULATE_ROOMS";
const JOIN_ROOM = "JOIN_ROOM";
const LEAVE_ROOM = "LEAVE_ROOM";
const MESSAGE_INCOMING = 'MESSAGE_SEND';
const MESSAGE_OUTGOING = 'NEW_MESSAGE';


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
        this.io.sockets.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));
    };

    this.onDeleteRoom = (roomName, socket) => {
        console.log(DELETE_ROOM, roomName);

        this.rooms = this.rooms.filter((item) => {
            return item !== roomName;
        });

        socket.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));
    };

    // this.onMessage = (data) => {
    //     console.log('MESSAGE');
    //     console.log(data);

    //     data.message.trim();

    //     if (data.message.substr(0, 3) === '/w ') {
    //         let msg = data.message.substr(3);

    //         if (msg.indexOf(' ') !== -1) {
    //             let recipient = msg.substr(0, msg.indexOf(' '));
    //             let message = msg.substr(msg.indexOf(' ') + 1);

    //             data.message = message;
    //             console.log('EMITTING PM');
    //             this.sockets[recipient].emit('message', data);
    //         } else {
    //             // TODO:
    //         }
    //     } else {
    //         // Save to db

    //         this.io.sockets.emit('message', data);
    //     }
    // };

    this.onMessage = (message) => {
        console.log('ON MESSAGE', message);
        let parsedMsg = JSON.parse(message);
        let room = parsedMsg.room;

        delete parsedMsg.room;

        this.io.to(room).emit(MESSAGE_OUTGOING, JSON.stringify(parsedMsg));
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

        socket.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));
    };

    this.onJoinRoom = (roomName, socket) => {
        console.log('JOINING ROOM');

        socket.join(roomName);
    };

    this.onLeaveRoom = (roomName, socket) => {
        console.log('LEAVING ROOM');

        socket.leave(roomName);
    };

    this.generateUsersArray = () => {
        return this.users.map(user => Object.values(user)[0]);
    };

    this.onConnection = socket => {
        console.log('CONNECTION');

        socket.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));

        socket.on('new user', this.onNewUser);
        socket.on('disconnect', this.onDisconnect);
        // socket.on('message', this.onMessage);
        socket.on(REQUEST_ROOM_NAMES, this.onGetRooms.bind(this, socket));
        socket.on(DELETE_ROOM, roomName => this.onDeleteRoom.call(this, roomName, socket));
        socket.on(NEW_ROOM, roomName => this.onNewRoom.call(this, roomName, socket));
        socket.on(JOIN_ROOM, roomName => this.onJoinRoom.call(this, roomName, socket));
        socket.on(LEAVE_ROOM, roomName => this.onLeaveRoom.call(this, roomName, socket));
        socket.on(MESSAGE_INCOMING, this.onMessage);
    };

    this.io.on('connection', this.onConnection);

    return server;
}

module.exports = Chat;
