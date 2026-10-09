const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// user register
async function register(req, res) {

    try {
        const { firstName, MiddleName, LastName, phone, email, role ="user", password } = req.body

        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with same email or phone"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({ firstName, MiddleName, LastName, phone, email, dob, qualification, role, password: hashedPassword })



        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });



        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                firstName: user.firstName,
                middleName: user.MiddleName,
                lastName: user.LastName,
                phone: user.phone,
                email: user.email,
                dob: user.dob,
                qualification: user.qualification,
                role: user.role
            }
        })
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

// login

async function login(req, res) {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user:{
                firstName:user?.firstName,
                middleName:user?.middleName,
                lastName:user?.lastName,
                phone:user?.phone,
                email:user?.email,
                role:user?.role
            }
        })

    } catch (error) {


        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"

        })

    }




}


// get current user

async function getCurrentUser(req,res) {

    try {

        const user=await userModel.findById(req.user.id).select("-password")

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }


        return res.status(200).json({
            success:true,
            user
        })


        
    } catch (error) {


        console.log(error)

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
    
}

// logout

async function logOut(req, res) {


    res.clearCookie("token")

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })

}





module.exports = { register, login, logOut, getCurrentUser }