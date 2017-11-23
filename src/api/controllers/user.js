import JWT from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET } from '../constants';

let signToken = user => {
    return JWT.sign({
        iss: 'Chatapp',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
};

export const signUp = async (req, res) => {
    const {email, password, username} = req.value.body;

    const foundUser = await User.findOne({email, username});

    if (foundUser) {
        return res.status(403).json({'error': "Email or username is alredy in use"});
    }

    const newUser = new User({email, username, password});

    await newUser.save();

    const token = signToken(newUser);

    res.status(201).json({
        token
    });
};

export const signIn = async (req, res) => {
    const token = signToken(req.user);

    res.status(202).json({
        token
    });
};

export const profile = async (req, res) => {
    console.log('profile page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    res.json('profile');
};

export const deleteUsers = async (req, res) => {
    await User.remove({});
    res.json('dropped all users');
};
