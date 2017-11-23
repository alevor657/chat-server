import User from '../models/user';

export const signUp = async (req, res) => {
    const {email, password, username} = req.value.body;

    const foundUser = await User.findOne({email});

    if (foundUser) {
        return res.status(403).json({'error': "Email is alredy in use"});
    }

    const newUser = new User({email, username, password});

    await newUser.save();

    res.json({user: 'Created'});
};

export const signIn = async (req, res) => {
    res.json('login');
    console.log('signin');
};

export const profile = async (req, res) => {
    res.json('profile');
};
