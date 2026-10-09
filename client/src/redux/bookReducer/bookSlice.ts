import { BookInitialState } from "@/src/types/bookTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL



// upload a book

export const uploadBook = createAsyncThunk(
    "book/uploadBook",
    async (payload: any, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                if (value === null || value === undefined) {
                    return;
                }

                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            });

            const response = await axios.post(
                `${baseURL}book/create-book`,
                formData,
                {
                    withCredentials: true,
                }
            );

            return {
                status: response.status,
                data: response.data,
            };
        } catch (error: any) {
            return rejectWithValue({
                status: error?.status,
                error: error?.response?.data,
            });
        }
    }
);
// get book list
export const getAllBooks = createAsyncThunk("book/getAllBooks", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}book/get`, {
            withCredentials: true
        })

        return {
            status: response.status,
            data: response?.data
        }
    } catch (error: any) {

        return rejectWithValue({
            status: error.status,
            error: error?.response
        })
    }


})


// get book by id

export const getBookById = createAsyncThunk("book/getBookById", async (bookId: any, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${baseURL}book/get/${bookId}`)

        return {
            status: response.status,
            data: response?.data

        }
    } catch (error: any) {
        return rejectWithValue({
            status: error.status,
            error: error?.response?.data
        })

    }

})


// borrowBook

export const borrowBook = createAsyncThunk("book/borrowBook", async (payload: any, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${baseURL}issuebook`, payload, {
            withCredentials: true
        })

        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {

        return rejectWithValue({
            status: error.status,
            error: error.response.data
        })

    }




})

// get all issued book

export const getAllBorrowedBook = createAsyncThunk("book/getAllBorrowedBook", async (_, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${baseURL}issuebook`, {
            withCredentials: true
        })

        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {

        return rejectWithValue({
            status: error.status,
            error: error.response.data
        })

    }




})

// return issued book
export const retunIssuedBook = createAsyncThunk("book/retunIssuedBook", async (payload: any, { rejectWithValue }) => {
    try {

        const response = await axios.patch(`${baseURL}issuebook/return-issuedBook`, payload, {
            withCredentials: true
        })

        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {
        return rejectWithValue({
            status: error.status,
            error: error.response.data
        })
    }

})

// get over due book
export const getOverDueBooks = createAsyncThunk("book/getOverDueBooks", async (_, { rejectWithValue }) => {
    try {

        const response = await axios.get(`${baseURL}issuebook/overdue-books`, {
            withCredentials: true
        })
        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {

        return rejectWithValue({
            status: error.status,
            error: error.response.data
        })



    }

})


// get fines

export const getFines = createAsyncThunk("book/getFines", async (_, { rejectWithValue }) => {
    try {

        const response = await axios.get(`${baseURL}issuebook/fines`, {
            withCredentials: true
        })

        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {

        return rejectWithValue({
            status: error.status,
            error: error.response.data
        })

    }



})

const initialState: BookInitialState = {
    isLoading: false,
    isFetched: false,
    bookUploading: false,
    bookList: [],
    singleBook: null,
    validationErrors: [],
    borrowingBook: false,
    allIssuedBooks: [],
    overDueBooks: [],
    fines:[]
}

const book = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getAllBooks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFetched = true
            state.bookList = action?.payload?.data?.allBooks
        }).addCase(getAllBooks.rejected, (state, action) => {
            state.isLoading = false
        }).addCase(getBookById.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getBookById.fulfilled, (state, action) => {
            state.isLoading = false
            state.singleBook = action.payload?.data?.book
        }).addCase(getBookById.rejected, (state, action) => {
            state.isLoading = false
        }).addCase(uploadBook.pending, (state, action) => {
            state.bookUploading = true
        }).addCase(uploadBook.fulfilled, (state, action) => {
            state.bookUploading = false
        }).addCase(uploadBook.rejected, (state, action: any) => {
            state.bookUploading = false
            state.validationErrors = action?.payload?.error?.errors
        }).addCase(borrowBook.pending, (state, action) => {
            state.borrowingBook = true
        }).addCase(borrowBook.fulfilled, (state, action) => {
            state.borrowingBook = false
        }).addCase(borrowBook.rejected, (state, action: any) => {
            state.borrowingBook = false
        }).addCase(getAllBorrowedBook.pending, (state, action) => {
            state.borrowingBook = true
        }).addCase(getAllBorrowedBook.fulfilled, (state, action) => {
            state.borrowingBook = false
            state.allIssuedBooks = action?.payload?.data?.allIssuedBooks
        }).addCase(getAllBorrowedBook.rejected, (state, action: any) => {
            state.borrowingBook = false
        }).addCase(retunIssuedBook.pending, (state, action) => {
            state.isLoading = true
        }).addCase(retunIssuedBook.fulfilled, (state, action) => {
            state.isLoading = false
        }).addCase(retunIssuedBook.rejected, (state, action: any) => {
            state.isLoading = false
        }).addCase(getOverDueBooks.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getOverDueBooks.fulfilled, (state, action) => {
            state.isLoading = false
            state.overDueBooks = action?.payload?.data?.overDueBooks
        }).addCase(getOverDueBooks.rejected, (state, action: any) => {
            state.isLoading = false
        }).addCase(getFines.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getFines.fulfilled, (state, action) => {
            state.isLoading = false
            state.fines = action?.payload?.data?.fines
        }).addCase(getFines.rejected, (state, action: any) => {
            state.isLoading = false
        })
    }

})

export default book.reducer