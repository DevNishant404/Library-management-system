const issuedBookModel = require("../models/issuedBook.model")
const bookModel = require("../models/book.model")

//issue book

async function issueBook(req, res) {
    try {
        const { bookId } = req.body
        const userId = req.user.id

        const book = await bookModel.findById(bookId)

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is currently unavailable"
            })
        }


        const alreadyBorrowed = await issuedBookModel.findOne({
            user: userId,
            book: bookId,
            returnDate: null,
        })

        if (alreadyBorrowed) {
            return res.status(400).json({
                success: false,
                message: "You have already borrowed this book",
            })
        }

        const dueDate = new Date()

        dueDate.setDate(dueDate.getDate() + 14)

        const issuedBook = await issuedBookModel.create({
            user: userId,
            book: bookId,
            dueDate
        })

        return res.status(201).json({
            success: true,
            message: "Book issued"
        })
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}


// all Issued Book
async function allIssuedBook(res, res) {
    try {

        const allIssuedBooks = await issuedBookModel.find().populate("user book")


        return res.status(200).json({
            success: true,
            message: "Issued books fetched successfully",
            allIssuedBooks
        })


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

// book return

async function returnBook(req, res) {

    try {
        const { issuedBookId } = req.body

        const issuedBook = await issuedBookModel.findById(issuedBookId)

        if (!issuedBook) {
            return res.status(404).json({
                success: false,
                message: "Issued Book not found"
            })
        }
        if (!issuedBook.status === "returned") {
            return res.status(400).json({
                success: false,
                message: "Book already returned"
            })
        }

        const returnDate = new Date()

        let fine = 0

        if (returnDate > issuedBook.dueDate) {
            const difference = returnDate.getTime() - issuedBook.dueDate.getTime()

            const overDueDate = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            )

            fine = overDueDate * 10
        }


        issuedBook.returnDate = returnDate
        issuedBook.status = "returned"
        issuedBook.fine = fine

        if (fine > 0) {
            issuedBook.fineStatus = "unpaid"
        } else {
            issueBook.fineStatus = "none"
        }

        await issuedBook.save()

        // increase availble copy count

        await bookModel.findByIdAndUpdate(
            issuedBook.book,
            {
                $inc: {
                    availableCopies: 1
                }
            }
        )

        res.status(200).json({
            success: true,
            message: "Book returned"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}

// get over due books
async function getOverDueBooks(req, res) {

    try {
        console.log("started")

        const overDueBooks = await issuedBookModel.find({
            status: "issued",
            dueDate: { $lt: new Date() }
        }).populate("user", "firstName middleName lastName phone email")
            .populate("book", "bookName authorName bookCategory isbn publisher totalCopies availableCopies")


        return res.status(200).json({
            success: true,
            message: "Overdue books fetched",
            overDueBooks
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }

}


// get fines
async function getFines(req, res) {
    try {
        const fines = await issuedBookModel.find({
            fine: { $gt: 0 }
        }).populate("user", "firstName middleName lastName phone email password ")
            .populate("book", "bookName authorName isbn")
        return res.status(200).json({
            success: false,
            message: "Fines fetched",
            fines
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}



module.exports = { issueBook, allIssuedBook, returnBook, getOverDueBooks, getFines }