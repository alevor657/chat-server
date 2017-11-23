import * as UserController from '../controllers/user';
import { validateBody, schemas } from '../misc/postValidation';

const router = require('express-promise-router')();

router.post('/signup', validateBody(schemas.signUpSchema), UserController.signUp);
router.post('/signin', validateBody(schemas.signInSchema), UserController.signIn);
router.get('/profile', UserController.profile);

export default router;
