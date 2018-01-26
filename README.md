[![Build Status](https://travis-ci.org/alevor657/chat-server.svg?branch=master)](https://travis-ci.org/alevor657/chat-server)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/alevor657/chat-server/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-server/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/alevor657/chat-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-server/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/alevor657/chat-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/alevor657/chat-server/build-status/master)


# Chat server

[Chat client](https://github.com/alevor657/chat-client)

# Table of Contents
1. [Overview](#overview)
    - [Technological stack](#stack)
        - [express](#express)
        - [Joi](#joi)
        - [JWT](#jwt)
        - [Mongoose](#mongoose)
        - [Passport](#passport)
        - [Socket.io](#socketio)
        - [Webpack](#webpack)
        - [Morgan, chalk, socketio-chat-server](#others)
2. [Installation](#installation)
3. [Configuration](#configuration)
5. [API](#api)
6. [Testing](#testing)
    - [Code coverage](#code-coverage)
    - [Docker containers](#docker-containers)

## Overview
---
This is a JavaScript chat server, built with nodejs. It uses mongodb to store data and [socket.io](https://socket.io/) for real time messaging. It implements authentication with [JSON Web Token](https://jwt.io/). All communication between client and server happens in JSON format. It is possible to use this server with any client that can parse and send JSON and estabilish a websocket connection with server. It can be a desktop application, mobile app or a webpage.

 If you would like to use it in your own project feel free to do so.

### Stack
---
#### Express

This application uses Express js which is built on top of a vanilla node http server.
I have provided API for rsocket.ioegistering a new user and acuireing a token.

#### Joi

I use this tool to validate all incoming data when a user tries to register or authenticate. This helps me to keep all incoming data in the format i need to. For example if you try to send a request to acuire a auth token without any user credentials you will get a 400 error.

Here is a sample schema for sign in validation:

    signInSchema: Joi.object().keys({
    username: Joi.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),
    password: Joi.string().required()

This basically means that you have to send an JSON object that must contain a username and a password. Username can not be shorter than 3 symbols or longer than 20.

#### JSON Web Token

JSON Web Token allows me to issue a token to a user. To determine if a user is logged in i check the token with every incoming request. If there is no token present or a user does not exist in the database server returns 401 unauthorized error. You can learn more about JWT [here](https://jwt.io/)

#### Mongoose

Mongose is a Object Reletional Mapper for mongo databases. I use it to improve code quality and maintaiability. All database communication uses mongoose. It basically provides additional abstraction layer over mongo database. You can learn more about it [here](http://mongoosejs.com/)

#### Passport

I use passport as Express middleware to determine if server will issue a token to incoming request. It gives me an opportunity to further reduce complexity of my code and lift some of it out of my applicaton, also another abstraction layer. You can learn more about it [here](http://www.passportjs.org/)

#### Socket.io

Server uses [socket.io](https://socket.io/) to provide real-time messaging functionality. It is a further abstraction over long-polling XHR requests and websockets standard. It also serves as a polyfill for browsers that does not support websockets.

#### Webpack

I use webpack to minify all code. Minified version of the program is availiabe in the dist folder.

#### Others

##### Morgan

Server uses morgan to log output to console. You can keep track of all incoming requests and status codes for responses. As simple as that.

##### Chalk

Server uses chalk to provide colored output of the program.

##### [socketio-chat-server](https://github.com/alevor657/socketio-chat-server)
This is my own chat server that implements chat functionality. It is also availible on [npm](https://www.npmjs.com/package/socketio-chat-server).

### Installation
---
You need node installed in order to run the server. Install the latest stable version.
You will also need mongod daemon started.

    sudo servide mongod start

However the server is already up and running [here](http://80.78.218.120:1344)

You can try it out in Postman. I describe the API over [here](#api)

So, you have node and mongodb up and running. Lets install the server localy.

    git clone https://github.com/alevor657/chat-server.git
    cd chat-server
    npm install
    npm start

By default server will be listening at 127.0.0.1:1338

You are ready to go!

### Configuration
---
You can specify following envirnment variables:

    // Server will listen at DBWEBB_PORT or 1338
    export DBWEBB_PORT=

You can also specify all incoming requests valitation by modifying src/api/constants.js

Whenever you make changes to code **DO RUN**

    npm run webpack

then Ctrl + C when its done.

### API
---
The server has following API endpoints:

    METHOD: POST http://localhost:port/user/signin
    METHOD: POST http://localhost:port/user/signup

Examle data server expects for signing in:

    {
        username: 'string' // min: 3, max: 20, required
        password: 'string' required
    }

Response format:

    {
        token: 'string'
    }

Examle data server expects for signing up:

    {
        username: 'string' // min: 3, max: 20, required
        password: 'string' required
        email: 'string' min: 4, max 100, required, email regex check.
    }

Response format:

    {
        token: 'string'
    }

### Testing

In order to run the test suite do:

    npm test

You do not need a mongodb installed in order to run the suite. While running tests application will connect to my test database.

You also have a possibility to run the tests by starting up docker containers

    npm run test_latest
    npm run test_6
    npm run test_8

If something goes wrong:

    sudo docker-compose build --no-cache

#### Code coverage

You can find in in coverage/lcov-report. Open up index.html file.

#### Docker containers

In order to start application in either node6, 7 or 8 run following:

    npm run node_latest
    npm run node_6
    npm run node_8
