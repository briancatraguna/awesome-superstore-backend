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

    const existingCustomer = await CustomerAccessor.findOneByEmail(email);
    if (existingCustomer) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const custId = await CustomerAccessor.insert(name, segment, email, hashedPassword)
    return res.status(200).json({
        message: "User registered successfully.",
        customer_id: custId
    });
}
