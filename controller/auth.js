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

    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (customerFound) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const custId = await CustomerAccessor.insert(name, segment, email, hashedPassword)
    return res.status(200).json({
        message: "Customer registered successfully.",
        customer_id: custId
    });
}

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const email = req.body.email;
    const password = req.body.password;
    const customerFound = await CustomerAccessor.findOneByEmail(email);
    if (!customerFound) {
        return res.status(400).json({
            message: "Email is not registered"
        });
    }

    const passwordIsMatching = await bcrypt.compare(password, customerFound.password);
    if (!passwordIsMatching) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign(
        { customerId: customerFound.cust_id },
        process.env.SECRETKEY,
        { expiresIn: "2h" }
    );
    return res.status(200).json({
        message: "Customer logged in successfully",
        customer: {
            cust_id: customerFound.cust_id,
            cust_name: customerFound.cust_name,
            segment: customerFound.segment,
            email: customerFound.email
        },
        token: token
    })
};

exports.postSendOTP = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const customerId = req.params.customerId;
    const result = await CustomerAccessor.setAndGetOTP(customerId);
    return res.status(200).json(result);
}