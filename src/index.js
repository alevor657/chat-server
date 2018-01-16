import 'babel-polyfill';
import express from 'express';
import user from './api/routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';

import Chat from './chat/index';

if (process.env.MONGO_TEST_DB) {
    mongoose.connect('mongodb://tester:tester@80.78.218.152:27017/chatAPI', function (err) {
        if (err) {
            console.log(chalk.yellow.bgRed.bold('Could not connect to test database'));
            process.exit(2);
        } else {
            console.log(chalk.green.bold('Connected to test database'));
        }
    });
} else {
    mongoose.connect('mongodb://localhost/chatAPI', function (err) {
        if (err) {
            console.log(chalk.yellow.bgRed.bold('Could not connect to local database'));
            process.exit(2);
        } else {
            console.log(chalk.green.bold('Connected to local database'));
        }
    });
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
    () => console.log(chalk.green.bold(`App is listening on http://localhost:${port}`))
);



export default server;
