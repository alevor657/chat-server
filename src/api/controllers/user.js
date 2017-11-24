import User from '../models/User';

export const signUp = async (req, res) => {
    console.log('====================================================================');
    const user = new User();
    const fields = req.value.body;
    const foundUser = await user.getUser(fields);

    if (foundUser) {
        return res.status(403).json({'error': "Email or username is alredy in use"});
    }

    const token = await user.registerUser(fields);

    res.status(201).json({
        token
    });
};

export const signIn = async (req, res) => {
    const token = await User.signToken(req.user);

    res.status(202).json({
        token
    });
};

export const profile = async (req, res) => {
    res.json('profile');
};

export const deleteUsers = async (req, res) => {
    await User.dropAll();
    res.json('dropped all users');
};
