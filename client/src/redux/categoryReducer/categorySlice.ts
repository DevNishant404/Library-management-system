import { BookCategoryInitialStateType } from "@/src/types/bookCategory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
// get book categories
export const getBookCategories = createAsyncThunk("category/getBookCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}category/get`, {
            withCredentials: true
        })
        return {
            status: response.status,
            data: response.data
        }

    } catch (error: any) {
        return rejectWithValue({
            status: error.status,
            error: error.response
        })
    }
})

// create book categories

export const createBookCategories = createAsyncThunk("category/createBookCategories", async (payload:any, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}category/create`,payload, {
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

// delete book category

export const deleteBookCategory =createAsyncThunk("category/deleteBookCategory",async(bookId:string,{rejectWithValue})=>{

    try {
            const response=await axios.delete(`${baseURL}category/delete/${bookId}`,{
        withCredentials:true,
    })

    return{
        status:response.status,
        data:response.data
    }
    } catch (error:any) {
        
        return rejectWithValue({
            status:error.status,
            error:error.response.data
        })
    }

})

const initialState:BookCategoryInitialStateType = {
    isBookCategoryLoading: false,
    isLoading:false,
    bookCategoryData:[],
    validationErrors:[],
    deletingBookCategory:false
}


const bookCategory = createSlice({
    name: "bookCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBookCategories.pending, (state, action) => {
            state.isBookCategoryLoading = true
        }).addCase(getBookCategories.fulfilled, (state, action) => {
            state.isBookCategoryLoading = false
            state.bookCategoryData=action?.payload?.data?.categories
        }).addCase(getBookCategories.rejected, (state, action) => {
            state.isBookCategoryLoading = false
        }).addCase(createBookCategories.pending, (state, action) => {
            state.isLoading = true
        }).addCase(createBookCategories.fulfilled, (state, action) => {
            state.isLoading = false
        }).addCase(createBookCategories.rejected, (state, action:any) => {
            state.isLoading = false
            state.validationErrors=action.payload.error.errors
        })

        .addCase(deleteBookCategory.pending, (state, action) => {
            state.deletingBookCategory = true
        }).addCase(deleteBookCategory.fulfilled, (state, action) => {
            state.deletingBookCategory = false
        }).addCase(deleteBookCategory.rejected, (state, action:any) => {
            state.deletingBookCategory = false
            state.validationErrors=action.payload.error.errors
        })
    }
})


export default bookCategory.reducer