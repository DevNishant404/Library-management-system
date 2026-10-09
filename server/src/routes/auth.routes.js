const express = require("express")
const authControllers = require("../controller/auth.controllers")
const validateRequest = require("../middlewares/validateRequest.middleware")
const { reigsterationValidator, loginValidator } = require("../validator/auth.validator")
const auth =require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/register", reigsterationValidator, validateRequest, authControllers.register)
router.post("/login", loginValidator, validateRequest, authControllers.login)
router.get("/me", auth, authControllers.getCurrentUser)
router.post("/logout", authControllers.logOut)

module.exports = router

// router.post ("/register",registerationValidator,validateRequest,authControllers.register)
// router.post("/login",loginVlidator,validateRequest, authControllers.login)
