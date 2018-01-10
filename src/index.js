import 'babel-polyfill';
import express from 'express';
import user from './api/routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import cors from 'cors';

import Chat from './chat/index';

if (process.env.MONGO_TEST_DB) {
    console.warn("TEST MODE - connecting to test database (might be down)");
    mongoose.connect('mongodb://tester:tester@80.78.218.152:27017/chatAPI');
} else {
    mongoose.connect('mongodb://localhost/chatAPI');
}

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const app = express();


const port = process.env.DBWEBB_PORT || 1338;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Fix cors
app.use(cors());

// Routes
app.use('/user', user);

let server = require('http').Server(app);
let io = require('socket.io')(server);

new Chat(io);

// Start API
server.listen(
    port,
    () => console.log(`App is listening on http://localhost:${port}`)
);



export default server;
