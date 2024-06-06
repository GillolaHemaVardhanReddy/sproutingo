import {check, validationResult} from 'express-validator'
import { returnError } from '../utils/error.js';
export const signupRules = [
    check('email','enter a valid email').isEmail().notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).notEmpty()
]

export const signinRules = [
    check('email','enter a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
]
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(returnError(400,errors.array()[0].msg))
    }
    next();
};