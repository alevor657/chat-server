import * as UserController from '../controllers/user';
import { validateBody, schemas } from '../validation/postValidation';
import passport from 'passport';
import '../passport';

const checkSignIn = passport.authenticate('local', { session: false });
const checkJWT = passport.authenticate('jwt', { session: false });

const router = require('express-promise-router')();

router.post('/signup', validateBody(schemas.signUpSchema), UserController.signUp);
router.post('/signin', validateBody(schemas.signInSchema), checkSignIn, UserController.signIn);
router.delete('/', UserController.deleteUsers);

// hiddden
router.get('/profile', checkJWT, UserController.profile);
// router.get('/profile', UserController.profile);

export default router;
