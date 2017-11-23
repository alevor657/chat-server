import Joi from 'joi';
import conf from '../constants';

export const validateBody = schema => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).json(result.error);
        }

        if (!req.value) {
            req.value = {};
        }

        req.value['body'] = result.value;
        next();
    };
};

export const schemas = {
    signInSchema: Joi.object().keys({
        email: Joi.string().email().min(conf.EMAIL_MIN_LENGTH).max(conf.EMAIL_MAX_LENGTH).required(),
        password: Joi.string().required()
    }),
    signUpSchema: Joi.object().keys({
        email: Joi.string().email().min(conf.EMAIL_MIN_LENGTH).max(conf.EMAIL_MAX_LENGTH).required(),
        username: Joi.string().min(conf.USERNAME_MIN_LENGTH).max(conf.USERNAME_MAX_LENGTH).required(),
        password: Joi.string().required(),
    })
};
