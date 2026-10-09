const mongoose = require("mongoose")

const issuedBook = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        default: null,
    },

    status: {
        type: String,
        enum: ["issued", "returned"],
        default: "issued",
    },
    fine:{
        type:Number,
        default:0,
        min:0
    },
    fineStatus:{
        type:String,
        enum:["none", "paid", "unpaid"],
        default:"none"
    },
    finePaidAt:{
        type:Date,
        default:null
    }
}, {
    timestamps: true,
})


const issuedBookModel = mongoose.model("IssuedBook", issuedBook)


module.exports = issuedBookModel