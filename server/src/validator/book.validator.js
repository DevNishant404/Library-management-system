    const { body } = require("express-validator")

    const bookValidator = [

        body("bookName")
            .trim()
            .notEmpty()
            .withMessage("Book name is required"),

        body("description")
            .trim()
            .notEmpty()
            .withMessage("Description is required"),

        body("authorName")
            .trim()
            .notEmpty()
            .withMessage("Author name is required"),

        body("bookCategory")
            .notEmpty()
            .withMessage("Book Category is required"),
           

       

        body("totalCopies")
            .trim()
            .notEmpty()
            .withMessage("Please enter the number of total copies")
            .isInt({ min: 1 })
            .withMessage("Total copies must be atleast 1")
            .toInt(),

        body("availableCopies")
            .trim()
            .notEmpty()
            .withMessage("Please enter the number of available copies"),
    ]

    module.exports={bookValidator}

