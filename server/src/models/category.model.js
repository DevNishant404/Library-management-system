const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    description:{
        type:String,
        default:""
    },
    status:{
        required:true,
        type:Boolean,
        default:true
    }
},{timeStamps:true})


const categoryModel=mongoose.model("Category",categorySchema)

module.exports=categoryModel