const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user","admin","librarian"]
    }
}, {
    timestamps: true,
})


const userModel=mongoose.model("user",userSchema)

module.exports=userModel