const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const CustomerAccessor = require('../model/customer');

exports.postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const name = req.body.name;
    const segment = req.body.segment;
    const email = req.body.email;
    const password = req.body.password;

    await CustomerAccessor.upsert(name, segment, email, password)
    return res.status(200);
}
