import express from "express";
import { Activate, signin, signout, signup, signupmail } from '../controllers/auth.controllers.js'
import { signinRules, signupRules, validate } from "../validators/auth.validator.js";

const router = express.Router()

// signup user and send otp to email
router.post('/signup', signupRules , validate , signup)

// activate user
router.post('/activate-account' , Activate)

// signin user
router.post('/signin' , signinRules , validate ,signin)

//sigout user
router.get('/signout',signout)

export default router