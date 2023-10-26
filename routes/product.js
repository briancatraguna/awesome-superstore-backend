const express = require("express");
const { body } = require("express-validator");

const productController = require("../controller/product");

const router = express.Router();

router.get("/", productController.findAllProducts);

// router.post(
//   "/login",
//   [
//     body("email").trim().isEmail().normalizeEmail(),
//     body("password").trim().isLength({ min: 5 }),
//   ],
//   authController.postLogin
// );

module.exports = router;
