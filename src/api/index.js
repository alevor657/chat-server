import { register, login } from './routes/auth';

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

export default router;
