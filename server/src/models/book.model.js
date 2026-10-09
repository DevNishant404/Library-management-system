const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    authorName: {
        type: String,
        required: true,
        trim: true
    },

    bookCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },

    coverImage: {
        type: String,
        required: true
    },

    isbn: {
        type: String,
        unique: true
    },

    publisher: {
        type: String
    },

    publishedYear: {
        type: Number
    },

    totalCopies: {
        type: Number,
        required: true,
        min: 1
    },

    availableCopies: {
        type: Number,
        required: true,
        min: 0
    },

    language: {
        type: String,
        default: "English"
    },

    status: {
        type: Boolean,
        default: true
    }
},
 {
    timestamps: true
}

)


const bookModel=mongoose.model("Book",bookSchema)

module.exports=bookModel