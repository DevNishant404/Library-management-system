const express=require("express")
const categoryController=require("../controller/category.controllers")
const auth =require('../middlewares/auth.middleware')
const authorize=require("../middlewares/authorize.middleware")
const {categoryValidator}=require("../validator/category.validator")
const validateRequest = require("../middlewares/validateRequest.middleware")


const router=express.Router()

router.post("/create",auth,authorize("admin","librarian"),categoryValidator,validateRequest,categoryController.addCategory)
router.get("/get",categoryController.getCategory)
router.delete("/delete/:categoryId",auth,authorize("admin","librarian"),categoryController.deleteCategory)

module.exports=router