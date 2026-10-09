const { body } = require("express-validator")


// user register validator
const reigsterationValidator = [
    body("firstName")
        .notEmpty()
        .withMessage("First name is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email it should inclue @"),



    body("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .bail()
        .isNumeric()
        .withMessage("Phone number must contain only digits")
        .isLength({ min: 10, max: 10 }),


    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["user", "admin", "librarian"])
        .withMessage("Role must be one of: user, admin, librarian"),
]

// login validator

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
]


module.exports = { reigsterationValidator, loginValidator }