const express = require("express");
const { query } = require("express-validator");

const orderController = require("../controller/orders");

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.post("/", isAuthenticated, orderController.insertOrders);

router.get(
    '/',
    isAuthenticated,
    [
        query('customerId')
            .trim()
            .isLength({max:20}),
        query('isReturned')
            .isBoolean()
    ],
    orderController.getOrdersByCustomerAndReturned
)

module.exports = router;
