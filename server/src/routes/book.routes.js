const express = require("express")
const multer = require("multer")
const bookController = require("../controller/book.controllers")
const validateRequest = require("../middlewares/validateRequest.middleware")
const { bookValidator } = require("../validator/book.validator")
const auth = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/create-book",auth, authorize("admin","librarian"), upload.single("coverImage"), bookValidator, validateRequest,  bookController.createBook)
router.get("/get", upload.single("coverImage"), bookController.getAllBooks)
router.get("/get/:id", upload.single("coverImage"), bookController.getBookById)


module.exports = router