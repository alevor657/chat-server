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
const REQUEST_MESSAGE_HISTORY = 'REQUEST_MESSAGE_HISTORY';
const RESPONSE_MESSAGE_HISTORY = 'RESPONSE_MESSAGE_HISTORY';
const NEW_USER = 'NEW_USER';
const USER_LEAVE = 'USER_LEAVE';

function Chat(server, params = {}) {
    this.io = socketio(server, params);
    this.sockets = {};
    this.rooms = [];

    this.messageCache = {};

    this.onNewRoom = (roomName, socket) => {
        console.log('NEW ROOM', roomName);

        if (this.rooms.includes(roomName)) {
            console.log('ERR ROOM EXISTS', roomName);
            socket.emit(ERR_ROOM_EXISTS);
            return;
        }

        this.rooms.push(roomName);
        socket.join(roomName);
        this.io.sockets.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));
    };

    this.onDeleteRoom = (roomName) => {
        console.log(DELETE_ROOM, roomName);

        this.rooms = this.rooms.filter((item) => {
            return item !== roomName;
        });

        this.io.emit(REPOPULATE_ROOMS, JSON.stringify(this.rooms));
    };

    // this.onMessage = (data) => {
    //     console.log('MESSAGE');
    //     console.log(data);

    //     data.message.trim();

    //     } else {
    //         // Save to db

    //         this.io.sockets.emit('message', data);
    //     }
    // };

    this.onMessage = (message) => {
        console.log('ON MESSAGE', message);
        let parsedMsg = JSON.parse(message);
        let room = parsedMsg.room;


        if (parsedMsg.message.substr(0, 3) === '/w ') {
            let msg = parsedMsg.message.substr(3);

            if (msg.indexOf(' ') !== -1) {
                let recipient = msg.substr(0, msg.indexOf(' '));
                let message = msg.substr(msg.indexOf(' ') + 1);

                parsedMsg.message = message;
                console.log('EMITTING PM TO', recipient);
                if (this.sockets[recipient]) {
                    this.sockets[recipient].emit(MESSAGE_OUTGOING, JSON.stringify(parsedMsg));
                }
            } else {
                // TODO:
            }
        } else {
            this.messageCache[room] = this.messageCache[room] ? [...this.messageCache[room], parsedMsg] : [parsedMsg];

            console.log('MSG CACHE FOR ROOM: ', room, this.messageCache[room]);

            delete parsedMsg.room;

            this.io.to(room).emit(MESSAGE_OUTGOING, JSON.stringify(parsedMsg));
        }
    };

    this.onRequestMessageHistory = (room, socket) => {
        console.log('ON REQUEST MESSAGE HISTORY FOR', room);

        socket.emit(RESPONSE_MESSAGE_HISTORY, JSON.stringify(this.messageCache[room] || []));
    };

    this.onNewUser = (user, socket) => {
        console.log('NEW USER', user);

        this.sockets[user] = socket;
    };

    this.onUserLeave = user => {
        console.log('USER LEFT', user);

        delete this.sockets[user];
    };

    this.onDisconnect = (socket) => {
        console.log('DISCONNECT');

        // this.users = this.users.filter(user => {
        //     return Object.keys(user)[0] !== socket.username;
        // });
        // delete this.sockets[this.username];
        // this.io.sockets.emit('update usernames', this.generateUsersArray());
        // console.log('Users', this.users);
        // console.log('Sockets nr:', Object.keys(this.sockets).length);
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

    // this.generateUsersArray = () => {
    //     return this.users.map(user => Object.values(user)[0]);
    // };

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
        socket.on(MESSAGE_INCOMING, message => this.onMessage.call(this, message));
        socket.on(REQUEST_MESSAGE_HISTORY, room  => this.onRequestMessageHistory.call(this, room, socket));
        socket.on(NEW_USER, username => this.onNewUser.call(this, username, socket));
        socket.on(USER_LEAVE, username => this.onUserLeave.call(this, username));
    };

    this.io.on('connection', this.onConnection);

    return server;
}

module.exports = Chat;
