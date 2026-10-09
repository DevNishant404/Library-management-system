const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
// get all users
async function getAllUsers(req, res,) {

    try {
        const users = await userModel.find().select("-password")

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

// add user
async function addUsers(req, res) {

    console.log("req.body")
    console.log(req.body)

    try {

        const { firstName, MiddleName, LastName, phone, email, role = "user", password } = req.body

        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { phone }
            ]
        })

        if (existingUser) {
           return res.status(409).json({
                success: false,
                message: "User already Exists with same email or phone"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({ firstName, MiddleName, LastName, phone, email, role, password: hashedPassword })

        return res.status(201).json({
            success: false,
            message: "User created successfully",
            user: {
                firstName: user?.firstName,
                middleName: user?.MiddleName,
                lastName: user?.LastName,
                phone: user?.phone,
                email: user?.user?.email,
                role: user?.role

            }

        })


    } catch (error) {

        console.log("error")
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }




}

// delete user
async function deleteUser(req, res) {

    try {

         const { userId } = req.params

    if (!userId) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }


    const user = await userModel.findByIdAndDelete(userId)

    return res.status(200).json({
        success: true,
        message: "User deleted",
        user: {
            name: user?.firstName + " " + user?.middleName + " " + user?.lastName,
            email: user?.email,
            role: user?.role,
            phone: user?.phone
        }
    })
        
    } catch (error) {

        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }

   



}


module.exports = { getAllUsers, addUsers, deleteUser }