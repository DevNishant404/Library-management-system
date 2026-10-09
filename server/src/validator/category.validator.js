const {body}=require("express-validator")

const categoryValidator=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("description")
    .trim()
    .custom((value) => {
        if (!value) return true;

        const wordCount = value.split(/\s+/).length;

        if (wordCount > 150) {
            throw new Error("Description must not exceed 150 words");
        }

        return true;
    })

]

module.exports={categoryValidator}