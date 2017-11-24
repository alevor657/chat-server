import express from 'express';
import user from './api/routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/chatAPI');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const port = process.env.PORT || 8099;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/user', user);

// Start API
app.listen(
    port,
    () => console.log(`App is listening on http://localhost:${port}`)
);
