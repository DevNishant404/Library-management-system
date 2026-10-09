require("dotenv").config()
const app=require("./src/app")
const cookieParser = require("cookie-parser")
const connectDb=require("./src/config/db/db")

const PORT=process.env.PORT

connectDb()






app.listen(PORT,()=>{
    try {

        console.log("Server is running on port",PORT)
        
    } catch (error) {
        console.log(error)
    }
})

