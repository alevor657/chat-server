import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { JWT_SECRET } from './constants';
import User from './models/user';

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        console.log(user);

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.use(new LocalStrategy({}, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return done(null, false);
        }

        const result = await user.validatePassword(password);

        if (!result) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));
