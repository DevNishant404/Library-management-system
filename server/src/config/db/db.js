const mongoose=require("mongoose")


const connectionString=process.env.DB_URI



async function connectDb() {

    try {

       await mongoose.connect(connectionString)
       console.log("Database connected")
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports=connectDb