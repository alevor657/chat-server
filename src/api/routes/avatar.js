import passport from 'passport';
import '../passport';
import { avatarUploader } from '../controllers/avatar';
import bodyParser from 'body-parser';

const checkJWT = passport.authenticate('jwt', { session: false });

const router = require('express-promise-router')();

router.post('/upload', checkJWT, bodyParser.raw({ type: 'image/jpeg'}), avatarUploader);

export default router;
