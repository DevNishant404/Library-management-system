// book category
export interface BookCategoryType {
    _id: string,
    name: string,
    description: string,
    status: boolean,
    __v: number
}
// book type
export interface BookTypes {
    _id: string,
    bookName: string,
    description: string,
    authorName: string,
    coverImage: string,
    isbn: string,
    publisher: string,
    publishedYear: number,
    totalCopies: number,
    availableCopies: number,
    language: string,
    status: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
    bookCategory: BookCategoryType
}

export interface SingleBookType {
    _id: string,
    bookName: string,
    description: string,
    authorName: string,
    coverImage: string
    isbn: string,
    publisher: string,
    publishedYear: number,
    totalCopies: number,
    availableCopies: number,
    language: string,
    status: true,
    createdAt: string,
    updatedAt: string,
    __v: number
}


// upload book types

export interface UploadBookTypes {
    bookName: string,
    description: string,
    authorName: string,
    bookCategory: string,
    coverImage: string
    isbn: string,
    publisher: string,
    publishedYear: number | null,
    totalCopies: number | null,
    availableCopies: number | null,
    language: string,
    status: boolean,
}


// issued book user type

export interface IssuedBookUserType {
    _id: string,
    firstName: string,
    phone: number,
    email: string,
    password: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface IssuedBookType {
    _id: string,
    bookName: string,
    description: string
    authorName: string,
    bookCategory: string,
    coverImage: string
    isbn: string,
    publisher: string,
    publishedYear: number,
    totalCopies: number,
    availableCopies: number,
    language: string,
    status: true,
    createdAt: string,
    updatedAt: string,
    __v: number
}





// issued books types

export interface IssuedBooksTypes {
    _id: string,
    user: IssuedBookUserType,
    book: IssuedBookType
    dueDate: string,
    returnDate: null |string |number,
    status: string,
    issueDate: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

// book initial state

export interface BookInitialState {
    isLoading: boolean,
    bookUploading: boolean
    bookList: BookTypes[]
    isFetched: boolean
    singleBook: SingleBookType | null
    validationErrors: any
    borrowingBook: boolean
    allIssuedBooks:IssuedBooksTypes[]
    overDueBooks:any[]
    fines:any[]
}