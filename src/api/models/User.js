import JWT from 'jsonwebtoken';
import UserModel from '../db/models/user';
import { JWT_SECRET } from '../constants';

export default class User {
    /**
     * Goes to database and searches for users
     * @return {obj} An object containing user
     */
    async getUser(fields) {
        const { email } = fields;

        return await UserModel.findOne({email});
    }

    /**
     * Saves user to database
     * @return {str} Token
     */
    async registerUser(fields) {
        const newUser = new UserModel(fields);

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
