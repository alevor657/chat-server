import JWT from 'jsonwebtoken';
import UserModel from '../db/models/user';
import { JWT_SECRET } from '../constants';

export default class User {
    /**
     * @param  {obj} req A request object
     */
    constructor(req) {
        const { email, username, password } = req.value.body;

        this.email = email;
        this.username = username;
        this.password = password;
    }

    /**
     * Goes to database and searches for users
     * @return {obj} An object containing user
     */
    async getUser() {
        return await UserModel.findOne({
            email: this.email,
            username: this.username
        });
    }

    /**
     * Saves user to database
     * @return {str} Token
     */
    async registerUser() {
        const newUser = new UserModel({
            email: this.email,
            username: this.username,
            password: this.password
        });

        await newUser.save();
        return User.signToken(newUser);
    }

    /**
     * Generates a token for given user
     * @param  {obj} user A user object
     * @return {str}      JWT token
     */
    static signToken(user) {
        return JWT.sign({
            iss: 'Chatapp',
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
        }, JWT_SECRET);
    }

    // For development
    static async dropAll() {
        await UserModel.remove({});
    }
}
