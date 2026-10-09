const express=require("express")
const auth=require("../middlewares/auth.middleware")
const authorize=require("../middlewares/authorize.middleware")
const reportController=require("../controller/reports.controllers")



const router=express.Router()

router.get("/",auth,authorize("admin","librarian"),reportController.getAllReports)