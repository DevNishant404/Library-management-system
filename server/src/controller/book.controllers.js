const mongoose = require("mongoose")
const { uploadFile } = require("../services/Storage.service")
const bookModel = require("../models/book.model")
const crypto = require("crypto")


// create book

async function createBook(req, res) {

    const { bookName, description, authorName, bookCategory, isbn, publisher, publishedYear, totalCopies, availableCopies, language } = req.body
    const coverImage = req.file

    console.log("coverImage")
    console.log(req.file)



    const isValidIsbn = await bookModel.findOne({ isbn })

    if (isValidIsbn) {
        return res.status(409).json({
            success: false,
            message: "Invalid ISBN number"
        })
    }

    const result = await uploadFile(coverImage.buffer.toString("base64"), crypto.randomUUID())


    console.log("result")
    console.log(result)

    const book = await bookModel.create({ bookName, description, authorName, bookCategory, isbn, publisher, publishedYear, totalCopies, availableCopies, language, coverImage: result.url })


    return res.status(201).json({
        success: true,
        message: "Book uploaded",
        book: {
            id: book._id,
            bookName: book.bookName,
            author: book.authorName
        }
    })
}


// get all books

async function getAllBooks(req, res) {

    try {
        const allBooks = await bookModel.find().populate("bookCategory")


        return res.status(200).json({
            success: true,
            message: "All books fetched",
            allBooks
        })
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }



}


// get book by id

async function getBookById(req, res) {

    try {
        const bookId = req.params.id

        const book = await bookModel.findById(bookId).populate("bookCategory")

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "No book found"
            })
        }

        return res.status(200).json({
            success: false,
            message: "Book fetched successfully",
            book
        })
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }



}




module.exports = { createBook, getAllBooks, getBookById }