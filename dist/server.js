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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar USERNAME_MAX_LENGTH = exports.USERNAME_MAX_LENGTH = 20;\nvar USERNAME_MIN_LENGTH = exports.USERNAME_MIN_LENGTH = 3;\n\nvar EMAIL_MAX_LENGTH = exports.EMAIL_MAX_LENGTH = 100;\nvar EMAIL_MIN_LENGTH = exports.EMAIL_MIN_LENGTH = 4;\n\nvar PASSWORD_MAX_LENGTH = exports.PASSWORD_MAX_LENGTH = 20;\nvar PASSWORD_MIN_LENGTH = exports.PASSWORD_MIN_LENGTH = 3;\n\nvar JWT_SECRET = exports.JWT_SECRET = 'DEUSVULT';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/constants.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/constants.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _mongoose = __webpack_require__(2);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _bcryptjs = __webpack_require__(11);\n\nvar _bcryptjs2 = _interopRequireDefault(_bcryptjs);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar Schema = _mongoose2.default.Schema;\n\nvar userSchema = new Schema({\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    username: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    password: {\n        type: String,\n        required: true\n    }\n});\n\n// Hash passwords before save\nuserSchema.pre('save', function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {\n        var salt, hash;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n                switch (_context.prev = _context.next) {\n                    case 0:\n                        _context.prev = 0;\n                        _context.next = 3;\n                        return _bcryptjs2.default.genSalt(10);\n\n                    case 3:\n                        salt = _context.sent;\n                        _context.next = 6;\n                        return _bcryptjs2.default.hash(this.password, salt);\n\n                    case 6:\n                        hash = _context.sent;\n\n\n                        this.password = hash;\n                        next();\n                        _context.next = 14;\n                        break;\n\n                    case 11:\n                        _context.prev = 11;\n                        _context.t0 = _context['catch'](0);\n\n                        next(_context.t0);\n\n                    case 14:\n                    case 'end':\n                        return _context.stop();\n                }\n            }\n        }, _callee, this, [[0, 11]]);\n    }));\n\n    return function (_x) {\n        return _ref.apply(this, arguments);\n    };\n}());\n\nuserSchema.methods.validatePassword = function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password) {\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n            while (1) {\n                switch (_context2.prev = _context2.next) {\n                    case 0:\n                        _context2.prev = 0;\n                        _context2.next = 3;\n                        return _bcryptjs2.default.compare(password, this.password);\n\n                    case 3:\n                        return _context2.abrupt('return', _context2.sent);\n\n                    case 6:\n                        _context2.prev = 6;\n                        _context2.t0 = _context2['catch'](0);\n                        throw new Error(_context2.t0);\n\n                    case 9:\n                    case 'end':\n                        return _context2.stop();\n                }\n            }\n        }, _callee2, this, [[0, 6]]);\n    }));\n\n    return function (_x2) {\n        return _ref2.apply(this, arguments);\n    };\n}();\n\nexports.default = _mongoose2.default.model('user', userSchema);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/db/models/user.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/db/models/user.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongoose\"\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"passport\"\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\n__webpack_require__(5);\n\nvar _express = __webpack_require__(6);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _user = __webpack_require__(7);\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _morgan = __webpack_require__(18);\n\nvar _morgan2 = _interopRequireDefault(_morgan);\n\nvar _bodyParser = __webpack_require__(19);\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _mongoose = __webpack_require__(2);\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _cors = __webpack_require__(20);\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _index = __webpack_require__(21);\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nif (process.env.MONGO_TEST_DB) {\n    console.warn(\"TEST MODE - connecting to test database (might be down)\");\n    _mongoose2.default.connect('mongodb://tester:tester@80.78.218.152:27017/chatAPI');\n} else {\n    _mongoose2.default.connect('mongodb://localhost/chatAPI');\n}\n\n_mongoose2.default.Promise = global.Promise;\nvar db = _mongoose2.default.connection;\n\ndb.on('error', console.error.bind(console, 'connection error:'));\n\nvar app = (0, _express2.default)();\n\nvar port = process.env.DBWEBB_PORT || 1338;\n\n// Middleware\napp.use((0, _morgan2.default)('dev'));\napp.use(_bodyParser2.default.json());\n\n// Fix cors\napp.use((0, _cors2.default)());\n\n// Routes\napp.use('/user', _user2.default);\n\nvar server = __webpack_require__(22).Server(app);\nvar io = __webpack_require__(23)(server);\n\nnew _index2.default(io);\n\n// Start API\nserver.listen(port, function () {\n    return console.log('App is listening on http://localhost:' + port);\n});\n\nexports.default = server;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"babel-polyfill\"\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _user = __webpack_require__(8);\n\nvar UserController = _interopRequireWildcard(_user);\n\nvar _postValidation = __webpack_require__(12);\n\nvar _passport = __webpack_require__(3);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\n__webpack_require__(14);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar checkSignIn = _passport2.default.authenticate('local', { session: false });\nvar checkJWT = _passport2.default.authenticate('jwt', { session: false });\n\nvar router = __webpack_require__(17)();\n\nrouter.post('/signup', (0, _postValidation.validateBody)(_postValidation.schemas.signUpSchema), UserController.signUp);\nrouter.post('/signin', (0, _postValidation.validateBody)(_postValidation.schemas.signInSchema), checkSignIn, UserController.signIn);\nrouter.delete('/', UserController.deleteUsers);\n\n// hiddden\nrouter.get('/profile', checkJWT, UserController.profile);\n// router.get('/profile', UserController.profile);\n\nexports.default = router;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/routes/user.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/routes/user.js?");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.deleteUsers = exports.profile = exports.signIn = exports.signUp = undefined;\n\nvar _User = __webpack_require__(9);\n\nvar _User2 = _interopRequireDefault(_User);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar signUp = exports.signUp = function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n        var user, fields, foundUser, token, username, email;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n                switch (_context.prev = _context.next) {\n                    case 0:\n                        user = new _User2.default();\n                        fields = req.value.body;\n                        _context.next = 4;\n                        return user.getUser(fields);\n\n                    case 4:\n                        foundUser = _context.sent;\n\n                        if (!foundUser) {\n                            _context.next = 7;\n                            break;\n                        }\n\n                        return _context.abrupt('return', res.status(403).json({ 'error': \"Email or username is alredy in use\" }));\n\n                    case 7:\n                        _context.next = 9;\n                        return user.registerUser(fields);\n\n                    case 9:\n                        token = _context.sent;\n                        username = fields.username, email = fields.email;\n\n\n                        res.status(201).json({\n                            token: token,\n                            username: username,\n                            email: email\n                        });\n\n                    case 12:\n                    case 'end':\n                        return _context.stop();\n                }\n            }\n        }, _callee, undefined);\n    }));\n\n    return function signUp(_x, _x2) {\n        return _ref.apply(this, arguments);\n    };\n}();\n\nvar signIn = exports.signIn = function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n        var token, _req$user, email, username;\n\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n            while (1) {\n                switch (_context2.prev = _context2.next) {\n                    case 0:\n                        _context2.next = 2;\n                        return _User2.default.signToken(req.user);\n\n                    case 2:\n                        token = _context2.sent;\n                        _req$user = req.user, email = _req$user.email, username = _req$user.username;\n\n\n                        res.status(202).json({\n                            token: token,\n                            email: email,\n                            username: username\n                        });\n\n                    case 5:\n                    case 'end':\n                        return _context2.stop();\n                }\n            }\n        }, _callee2, undefined);\n    }));\n\n    return function signIn(_x3, _x4) {\n        return _ref2.apply(this, arguments);\n    };\n}();\n\nvar profile = exports.profile = function () {\n    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n            while (1) {\n                switch (_context3.prev = _context3.next) {\n                    case 0:\n                        res.json('profile');\n\n                    case 1:\n                    case 'end':\n                        return _context3.stop();\n                }\n            }\n        }, _callee3, undefined);\n    }));\n\n    return function profile(_x5, _x6) {\n        return _ref3.apply(this, arguments);\n    };\n}();\n\nvar deleteUsers = exports.deleteUsers = function () {\n    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n        return regeneratorRuntime.wrap(function _callee4$(_context4) {\n            while (1) {\n                switch (_context4.prev = _context4.next) {\n                    case 0:\n                        _context4.next = 2;\n                        return _User2.default.dropAll();\n\n                    case 2:\n                        res.json('dropped all users');\n\n                    case 3:\n                    case 'end':\n                        return _context4.stop();\n                }\n            }\n        }, _callee4, undefined);\n    }));\n\n    return function deleteUsers(_x7, _x8) {\n        return _ref4.apply(this, arguments);\n    };\n}();\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/controllers/user.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/controllers/user.js?");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _jsonwebtoken = __webpack_require__(10);\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _user = __webpack_require__(1);\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _constants = __webpack_require__(0);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar User = function () {\n    function User() {\n        _classCallCheck(this, User);\n    }\n\n    _createClass(User, [{\n        key: 'getUser',\n\n        /**\n         * Goes to database and searches for users\n         * @return {obj} An object containing user\n         */\n        value: function () {\n            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fields) {\n                var email;\n                return regeneratorRuntime.wrap(function _callee$(_context) {\n                    while (1) {\n                        switch (_context.prev = _context.next) {\n                            case 0:\n                                email = fields.email;\n                                _context.next = 3;\n                                return _user2.default.findOne({ email: email });\n\n                            case 3:\n                                return _context.abrupt('return', _context.sent);\n\n                            case 4:\n                            case 'end':\n                                return _context.stop();\n                        }\n                    }\n                }, _callee, this);\n            }));\n\n            function getUser(_x) {\n                return _ref.apply(this, arguments);\n            }\n\n            return getUser;\n        }()\n\n        /**\n         * Saves user to database\n         * @return {str} Token\n         */\n\n    }, {\n        key: 'registerUser',\n        value: function () {\n            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fields) {\n                var newUser;\n                return regeneratorRuntime.wrap(function _callee2$(_context2) {\n                    while (1) {\n                        switch (_context2.prev = _context2.next) {\n                            case 0:\n                                newUser = new _user2.default(fields);\n                                _context2.next = 3;\n                                return newUser.save();\n\n                            case 3:\n                                return _context2.abrupt('return', User.signToken(newUser));\n\n                            case 4:\n                            case 'end':\n                                return _context2.stop();\n                        }\n                    }\n                }, _callee2, this);\n            }));\n\n            function registerUser(_x2) {\n                return _ref2.apply(this, arguments);\n            }\n\n            return registerUser;\n        }()\n\n        /**\n         * Generates a token for given user\n         * @param  {obj} user A user object\n         * @return {str}      JWT token\n         */\n\n    }], [{\n        key: 'signToken',\n        value: function signToken(user) {\n            return _jsonwebtoken2.default.sign({\n                iss: 'Chatapp',\n                sub: user.id,\n                iat: new Date().getTime(), // current time\n                exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead\n            }, _constants.JWT_SECRET);\n        }\n\n        // For development\n\n    }, {\n        key: 'dropAll',\n        value: function () {\n            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n                return regeneratorRuntime.wrap(function _callee3$(_context3) {\n                    while (1) {\n                        switch (_context3.prev = _context3.next) {\n                            case 0:\n                                _context3.next = 2;\n                                return _user2.default.remove({});\n\n                            case 2:\n                            case 'end':\n                                return _context3.stop();\n                        }\n                    }\n                }, _callee3, this);\n            }));\n\n            function dropAll() {\n                return _ref3.apply(this, arguments);\n            }\n\n            return dropAll;\n        }()\n    }]);\n\n    return User;\n}();\n\nexports.default = User;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/models/User.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/models/User.js?");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"jsonwebtoken\"\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"bcryptjs\"\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.schemas = exports.validateBody = undefined;\n\nvar _joi = __webpack_require__(13);\n\nvar _joi2 = _interopRequireDefault(_joi);\n\nvar _constants = __webpack_require__(0);\n\nvar conf = _interopRequireWildcard(_constants);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar validateBody = exports.validateBody = function validateBody(schema) {\n    return function (req, res, next) {\n        var result = _joi2.default.validate(req.body, schema);\n\n        if (result.error) {\n            return res.status(400).json(result.error);\n        }\n\n        if (!req.value) {\n            req.value = {};\n        }\n\n        req.value['body'] = result.value;\n\n        next();\n    };\n};\n\nvar schemas = exports.schemas = {\n    signInSchema: _joi2.default.object().keys({\n        username: _joi2.default.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),\n        password: _joi2.default.string().required()\n    }),\n    signUpSchema: _joi2.default.object().keys({\n        email: _joi2.default.string().email().min(conf.EMAIL_MIN_LENGTH).max(conf.EMAIL_MAX_LENGTH).required(),\n        username: _joi2.default.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),\n        password: _joi2.default.string().required()\n    })\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/validation/postValidation.js\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/validation/postValidation.js?");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"joi\"\n// module id = 13\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _passport = __webpack_require__(3);\n\nvar _passport2 = _interopRequireDefault(_passport);\n\nvar _passportJwt = __webpack_require__(15);\n\nvar _passportLocal = __webpack_require__(16);\n\nvar _constants = __webpack_require__(0);\n\nvar _user = __webpack_require__(1);\n\nvar _user2 = _interopRequireDefault(_user);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n_passport2.default.use(new _passportJwt.Strategy({\n    jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),\n    secretOrKey: _constants.JWT_SECRET\n}, function () {\n    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload, done) {\n        var user;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n            while (1) {\n                switch (_context.prev = _context.next) {\n                    case 0:\n                        _context.prev = 0;\n                        _context.next = 3;\n                        return _user2.default.findById(payload.sub);\n\n                    case 3:\n                        user = _context.sent;\n\n                        if (user) {\n                            _context.next = 6;\n                            break;\n                        }\n\n                        return _context.abrupt('return', done(null, false));\n\n                    case 6:\n\n                        done(null, user);\n                        _context.next = 12;\n                        break;\n\n                    case 9:\n                        _context.prev = 9;\n                        _context.t0 = _context['catch'](0);\n\n                        done(_context.t0, false);\n\n                    case 12:\n                    case 'end':\n                        return _context.stop();\n                }\n            }\n        }, _callee, undefined, [[0, 9]]);\n    }));\n\n    return function (_x, _x2) {\n        return _ref.apply(this, arguments);\n    };\n}()));\n\n_passport2.default.use(new _passportLocal.Strategy({}, function () {\n    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(username, password, done) {\n        var user, result;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n            while (1) {\n                switch (_context2.prev = _context2.next) {\n                    case 0:\n                        _context2.prev = 0;\n                        _context2.next = 3;\n                        return _user2.default.findOne({ username: username });\n\n                    case 3:\n                        user = _context2.sent;\n\n                        if (user) {\n                            _context2.next = 6;\n                            break;\n                        }\n\n                        return _context2.abrupt('return', done(null, false));\n\n                    case 6:\n                        _context2.next = 8;\n                        return user.validatePassword(password);\n\n                    case 8:\n                        result = _context2.sent;\n\n                        if (result) {\n                            _context2.next = 11;\n                            break;\n                        }\n\n                        return _context2.abrupt('return', done(null, false));\n\n                    case 11:\n\n                        done(null, user);\n                        _context2.next = 17;\n                        break;\n\n                    case 14:\n                        _context2.prev = 14;\n                        _context2.t0 = _context2['catch'](0);\n\n                        done(_context2.t0, false);\n\n                    case 17:\n                    case 'end':\n                        return _context2.stop();\n                }\n            }\n        }, _callee2, undefined, [[0, 14]]);\n    }));\n\n    return function (_x3, _x4, _x5) {\n        return _ref2.apply(this, arguments);\n    };\n}()));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/api/passport.js\n// module id = 14\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/api/passport.js?");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"passport-jwt\"\n// module id = 15\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"passport-local\"\n// module id = 16\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-promise-router\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express-promise-router\"\n// module id = 17\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express-promise-router%22?");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"morgan\"\n// module id = 18\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = 19\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"cors\"\n// module id = 20\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar users = [];\nvar sockets = {};\nvar io = null;\n\nfunction generateUsersArray() {\n    return users.map(function (user) {\n        return Object.values(user)[0];\n    });\n}\n\nvar Chat = function () {\n    function Chat(socketio) {\n        _classCallCheck(this, Chat);\n\n        io = socketio;\n\n        this.onConnection = this.onConnection.bind(this);\n\n        io.on('connection', this.onConnection);\n    }\n\n    _createClass(Chat, [{\n        key: 'onConnection',\n        value: function onConnection(socket) {\n            console.log('CONNECTION');\n\n            socket.on('new user', this.onNewUser);\n            socket.on('disconnect', this.onDisconnect);\n            socket.on('message', this.onMessage);\n        }\n    }, {\n        key: 'onMessage',\n        value: function onMessage(data) {\n            console.log('MESSAGE');\n            console.log(data);\n\n            data.message.trim();\n\n            if (data.message.substr(0, 3) === '/w ') {\n                var msg = data.message.substr(3);\n\n                if (msg.indexOf(' ') !== -1) {\n                    var recipient = msg.substr(0, msg.indexOf(' '));\n                    var message = msg.substr(msg.indexOf(' ') + 1);\n\n                    data.message = message;\n                    console.log('EMITTING PM');\n                    sockets[recipient].emit('message', data);\n                } else {\n                    // TODO:\n                }\n            } else {\n                // Save to db\n                io.sockets.emit('message', data);\n            }\n        }\n    }, {\n        key: 'onNewUser',\n        value: function onNewUser(user) {\n            console.log('NEW USER');\n            this.username = user.username;\n            users.push(_defineProperty({}, user.username, user));\n            sockets[user.username] = this;\n            io.sockets.emit('update usernames', generateUsersArray.call(this));\n            console.log('Users: ', users);\n            console.log('Sockets nr:', Object.keys(sockets).length);\n        }\n    }, {\n        key: 'onDisconnect',\n        value: function onDisconnect() {\n            var _this = this;\n\n            console.log('DISCONNECT');\n            users = users.filter(function (user) {\n                return Object.keys(user)[0] !== _this.username;\n                // return Object.keys(user)[0] !== this.id;\n            });\n            delete sockets[this.username];\n            io.sockets.emit('update usernames', generateUsersArray.call(this));\n            console.log('Users', users);\n            console.log('Sockets nr:', Object.keys(sockets).length);\n        }\n    }]);\n\n    return Chat;\n}();\n\nexports.default = Chat;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/chat/index.js\n// module id = 21\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/chat/index.js?");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http\"\n// module id = 22\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"socket.io\"\n// module id = 23\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })
/******/ ]);