const bookModel = require("../models/book.model")
const issuedBookModel = require("../models/issuedBook.model")
const userModel = require("../models/user.model")


// get all reports
async function getAllReports(req, res) {
    try {
        const totalBooks = await bookModel.countDocuments()
        const totalUsers = await userModel.countDocuments({
            role: "users"
        })
        const totalLibrarians = await userModel.countDocuments({
            role: "librarian"
        })
        const totalIssuedBooks = await issuedBookModel.countDocuments({
            status: "issued"
        })
        const totalReturnedBooks = await issuedBookModel.countDocuments({
            status: "returned"
        })
        const overDueBooks = await issuedBookModel.countDocuments({
            status: "issued",
            dueData: {
                $lt: new Date()
            }
        })
        const copyState = await bookModel.aggregrate([
            {
                $group: {
                    _id: null,
                    totalCopies: {
                        $sum: "$totalCopies"
                    }
                }
            }
        ])
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = { getAllReports }

