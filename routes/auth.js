const express = require('express');
const {body, param} = require('express-validator');

const authController = require('../controller/auth');

const router = express.Router();

router.post(
    '/register',
    [
      body('name')
          .trim()
          .isLength({max: 100})
          .withMessage('Name is too long'),
      body('segment')
          .trim()
          .isLength({max: 1})
          .isInt(),
      body('email')
          .trim()
          .isEmail()
          .withMessage('Invalid email value')
          .normalizeEmail(),
      body('password')
          .trim()
          .isLength({min: 5})
          .withMessage('Weak password'),
    ],
    authController.postSignUp
);

router.post(
    '/login',
    [
      body('email')
          .trim()
          .isEmail()
          .normalizeEmail(),
      body('password')
          .trim()
          .isLength({min: 5}),
    ],
    authController.postLogin
);

router.post(
    '/sendOTP/:email',
    [
        param('email')
            .trim()
            .isEmail()
            .normalizeEmail(),
    ],
    authController.postSendOTP
)

module.exports = router;
