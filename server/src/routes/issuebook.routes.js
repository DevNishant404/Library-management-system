const express = require("express")
const auth =require("../middlewares/auth.middleware")
const authorize =require("../middlewares/authorize.middleware")
const issuedBookControllers=require("../controller/issueBook.controllers")

const router=express.Router()

router.post("/",auth,authorize("user"),issuedBookControllers.issueBook)
router.get("/",auth,authorize("user","admin","librarian"),issuedBookControllers.allIssuedBook)
router.patch("/return-issuedBook",auth,authorize("librarian","admin"),issuedBookControllers.returnBook)
router.get("/overdue-books",auth,authorize("admin","librarian"),issuedBookControllers.getOverDueBooks)
router.get("/fines",auth,authorize("admin","librarian"),issuedBookControllers.getFines)


module.exports=router