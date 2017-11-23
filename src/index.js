import express from 'express';
import user from './api/routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/chatAPI');

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
