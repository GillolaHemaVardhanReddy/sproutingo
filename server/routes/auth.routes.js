import express from "express";
import { activate, signin, signout, signup } from '../controllers/auth.controllers.js'
import { signinRules, signupRules, validate } from "../validators/auth.validator.js";

const router = express.Router()

// signup user and send otp to email
router.post('/signup', signupRules , validate , signup)

// activate user
router.post('/activate-account' , activate)

// signin user
router.post('/signin' , signinRules , validate ,signin)

//sigout user
router.post('/signout',signout)

export default router