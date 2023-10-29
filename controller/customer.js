const { validationResult } = require('express-validator')

const CustomerAccessor = require('../model/customer');

exports.postCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const custId = req.body.customerId;
    const custName = req.body.customerName;
    const segment = req.body.segment;
    const email = req.body.email;
    const newCustomer = CustomerAccessor.update(custId, custName, segment, email);
    return res.status(200).json(newCustomer);
}