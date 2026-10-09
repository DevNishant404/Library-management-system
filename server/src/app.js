const cookieParser = require("cookie-parser")
const express =require("express")
const authRouter=require("./routes/auth.routes")
const bookRouter=require("./routes/book.routes")
const categoryRouters=require("./routes/category.routes")
const userRouters=require("./routes/users.routes")
const issueBookRouters=require("./routes/issuebook.routes")
const cors=require("cors")
const app =express()





app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    credentials: true,
}))




app.use("/api/auth",authRouter)
app.use("/api/book",bookRouter)
app.use("/api/category",categoryRouters)
app.use("/api/user",userRouters)
app.use("/api/issuebook",issueBookRouters)

module.exports=app