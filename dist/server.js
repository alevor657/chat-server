/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var USERNAME_MAX_LENGTH = exports.USERNAME_MAX_LENGTH = 20;
var USERNAME_MIN_LENGTH = exports.USERNAME_MIN_LENGTH = 3;

var EMAIL_MAX_LENGTH = exports.EMAIL_MAX_LENGTH = 100;
var EMAIL_MIN_LENGTH = exports.EMAIL_MIN_LENGTH = 4;

var PASSWORD_MAX_LENGTH = exports.PASSWORD_MAX_LENGTH = 20;
var PASSWORD_MIN_LENGTH = exports.PASSWORD_MIN_LENGTH = 3;

var JWT_SECRET = exports.JWT_SECRET = 'DEUSVULT';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = __webpack_require__(11);

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash passwords before save
userSchema.pre('save', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
        var salt, hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _bcryptjs2.default.genSalt(10);

                    case 3:
                        salt = _context.sent;
                        _context.next = 6;
                        return _bcryptjs2.default.hash(this.password, salt);

                    case 6:
                        hash = _context.sent;


                        this.password = hash;
                        next();
                        _context.next = 14;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](0);

                        next(_context.t0);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 11]]);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

userSchema.methods.validatePassword = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _bcryptjs2.default.compare(password, this.password);

                    case 3:
                        return _context2.abrupt('return', _context2.sent);

                    case 6:
                        _context2.prev = 6;
                        _context2.t0 = _context2['catch'](0);
                        throw new Error(_context2.t0);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 6]]);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = _mongoose2.default.model('user', userSchema);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(5);

var _express = __webpack_require__(6);

var _express2 = _interopRequireDefault(_express);

var _user = __webpack_require__(7);

var _user2 = _interopRequireDefault(_user);

var _morgan = __webpack_require__(18);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(19);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = __webpack_require__(20);

var _cors2 = _interopRequireDefault(_cors);

var _chalk = __webpack_require__(21);

var _chalk2 = _interopRequireDefault(_chalk);

var _socketioChatServer = __webpack_require__(22);

var _socketioChatServer2 = _interopRequireDefault(_socketioChatServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.MONGO_TEST_DB) {
    _mongoose2.default.connect('mongodb://tester:tester@80.78.218.120:27017/chatAPI', function (err) {
        if (err) {
            console.log(_chalk2.default.yellow.bgRed.bold('Could not connect to test database'));
            process.exit(2);
        } else {
            console.log(_chalk2.default.green.bold('Connected to test database'));
        }
    });
} else {
    _mongoose2.default.connect('mongodb://localhost/chatAPI', function (err) {
        if (err) {
            console.log(_chalk2.default.yellow.bgRed.bold('Could not connect to local database'));
            process.exit(2);
        } else {
            console.log(_chalk2.default.green.bold('Connected to local database'));
        }
    });
}

_mongoose2.default.Promise = global.Promise;
var db = _mongoose2.default.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var app = (0, _express2.default)();

var port = process.env.DBWEBB_PORT || 1338;

// Middleware
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

// Fix cors
app.use((0, _cors2.default)());

// Routes
app.use('/user', _user2.default);

var server = __webpack_require__(23).Server(app);

// Start API
server.listen(port, function () {
    return console.log(_chalk2.default.green.bold('App is listening on http://localhost:' + port));
});

new _socketioChatServer2.default(server);

exports.default = server;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(8);

var UserController = _interopRequireWildcard(_user);

var _postValidation = __webpack_require__(12);

var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

__webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var checkSignIn = _passport2.default.authenticate('local', { session: false });
var checkJWT = _passport2.default.authenticate('jwt', { session: false });

var router = __webpack_require__(17)();

router.post('/signup', (0, _postValidation.validateBody)(_postValidation.schemas.signUpSchema), UserController.signUp);
router.post('/signin', (0, _postValidation.validateBody)(_postValidation.schemas.signInSchema), checkSignIn, UserController.signIn);
router.delete('/', UserController.deleteUsers);

// hiddden
router.get('/profile', checkJWT, UserController.profile);
// router.get('/profile', UserController.profile);

exports.default = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteUsers = exports.profile = exports.signIn = exports.signUp = undefined;

var _User = __webpack_require__(9);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signUp = exports.signUp = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user, fields, foundUser, token, username, email;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = new _User2.default();
                        fields = req.value.body;
                        _context.next = 4;
                        return user.getUser(fields);

                    case 4:
                        foundUser = _context.sent;

                        if (!foundUser) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', res.status(403).json({ 'error': "Email or username is alredy in use" }));

                    case 7:
                        _context.next = 9;
                        return user.registerUser(fields);

                    case 9:
                        token = _context.sent;
                        username = fields.username, email = fields.email;


                        res.status(201).json({
                            token: token,
                            username: username,
                            email: email
                        });

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function signUp(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var signIn = exports.signIn = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var token, _req$user, email, username;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _User2.default.signToken(req.user);

                    case 2:
                        token = _context2.sent;
                        _req$user = req.user, email = _req$user.email, username = _req$user.username;


                        res.status(202).json({
                            token: token,
                            email: email,
                            username: username
                        });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function signIn(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var profile = exports.profile = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        res.json('profile');

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function profile(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var deleteUsers = exports.deleteUsers = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _User2.default.dropAll();

                    case 2:
                        res.json('dropped all users');

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function deleteUsers(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = __webpack_require__(10);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, [{
        key: 'getUser',

        /**
         * Goes to database and searches for users
         * @return {obj} An object containing user
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fields) {
                var email;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                email = fields.email;
                                _context.next = 3;
                                return _user2.default.findOne({ email: email });

                            case 3:
                                return _context.abrupt('return', _context.sent);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUser(_x) {
                return _ref.apply(this, arguments);
            }

            return getUser;
        }()

        /**
         * Saves user to database
         * @return {str} Token
         */

    }, {
        key: 'registerUser',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fields) {
                var newUser;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                newUser = new _user2.default(fields);
                                _context2.next = 3;
                                return newUser.save();

                            case 3:
                                return _context2.abrupt('return', User.signToken(newUser));

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function registerUser(_x2) {
                return _ref2.apply(this, arguments);
            }

            return registerUser;
        }()

        /**
         * Generates a token for given user
         * @param  {obj} user A user object
         * @return {str}      JWT token
         */

    }], [{
        key: 'signToken',
        value: function signToken(user) {
            return _jsonwebtoken2.default.sign({
                iss: 'Chatapp',
                sub: user.id,
                iat: new Date().getTime(), // current time
                exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
            }, _constants.JWT_SECRET);
        }

        // For development

    }, {
        key: 'dropAll',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _user2.default.remove({});

                            case 2:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function dropAll() {
                return _ref3.apply(this, arguments);
            }

            return dropAll;
        }()
    }]);

    return User;
}();

exports.default = User;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schemas = exports.validateBody = undefined;

var _joi = __webpack_require__(13);

var _joi2 = _interopRequireDefault(_joi);

var _constants = __webpack_require__(0);

var conf = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateBody = exports.validateBody = function validateBody(schema) {
    return function (req, res, next) {
        var result = _joi2.default.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json(result.error);
        }

        if (!req.value) {
            req.value = {};
        }

        req.value['body'] = result.value;

        next();
    };
};

var schemas = exports.schemas = {
    signInSchema: _joi2.default.object().keys({
        username: _joi2.default.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),
        password: _joi2.default.string().required()
    }),
    signUpSchema: _joi2.default.object().keys({
        email: _joi2.default.string().email().min(conf.EMAIL_MIN_LENGTH).max(conf.EMAIL_MAX_LENGTH).required(),
        username: _joi2.default.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),
        password: _joi2.default.string().required()
    })
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _passport = __webpack_require__(3);

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = __webpack_require__(15);

var _passportLocal = __webpack_require__(16);

var _constants = __webpack_require__(0);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_passport2.default.use(new _passportJwt.Strategy({
    jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
    secretOrKey: _constants.JWT_SECRET
}, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload, done) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.findById(payload.sub);

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', done(null, false));

                    case 6:

                        done(null, user);
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        done(_context.t0, false);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 9]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}()));

_passport2.default.use(new _passportLocal.Strategy({}, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, password, done) {
        var user, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _user2.default.findOne({ username: username });

                    case 3:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', done(null, false));

                    case 6:
                        _context2.next = 8;
                        return user.validatePassword(password);

                    case 8:
                        result = _context2.sent;

                        if (result) {
                            _context2.next = 11;
                            break;
                        }

                        return _context2.abrupt('return', done(null, false));

                    case 11:

                        done(null, user);
                        _context2.next = 17;
                        break;

                    case 14:
                        _context2.prev = 14;
                        _context2.t0 = _context2['catch'](0);

                        done(_context2.t0, false);

                    case 17:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 14]]);
    }));

    return function (_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}()));

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("express-promise-router");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("socketio-chat-server");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);