const express=require("express")
const userController=require("../controller/user.controllers")

const auth=require("../middlewares/auth.middleware")
const authorize=require("../middlewares/authorize.middleware")
const {reigsterationValidator}= require("../validator/auth.validator")
const validateRequest =require("../middlewares/validateRequest.middleware")
const router=express.Router()


router.get("/get",auth,authorize("admin"),userController.getAllUsers)
router.post("/create",auth,authorize("admin"),reigsterationValidator,validateRequest,userController.addUsers)
router.delete("/delete/:userId",auth,authorize("admin"),userController?.deleteUser)

module.exports=router