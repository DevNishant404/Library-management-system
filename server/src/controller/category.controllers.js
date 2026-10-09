const categoryModel=require("../models/category.model")
const mongoose=require("mongoose")

// add category
async function addCategory(req,res) {

    try {

        const {name,description,status}=req.body

    const existingCategory=await categoryModel.findOne({name:name.trim()})

    if(existingCategory){
        res.status(409).json({
            success:false,
            message:"This category already exists"
        })
    }

    const category=await categoryModel.create({name,description,status})

    return res.status(201).json({
        success:true,
        message:"Category added",
        category:{
            name:category.name,
            description:category.description,
            status:category.status
        }
    })
        
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
    
    
}

// get category

async function getCategory(req,res) {

    const categories=await categoryModel.find()

    res.status(200).json({
        success:false,
        message:"All categories fetched",
        categories
    })
    
}

// delete category

async function deleteCategory(req,res) {

try {
    const {categoryId}=req.params
    
    const category=await categoryModel.findByIdAndDelete(categoryId)

    if(!category){
        return res.status(404).json({
            success:false,
            message:"Category not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:"Category Deleted"
    })

} catch (error) {

    console.log(error)

    res.status(500).json({
        success:false,
        message:"Internal server error"
    })
    
} 
    
}


module.exports={addCategory,getCategory,deleteCategory}