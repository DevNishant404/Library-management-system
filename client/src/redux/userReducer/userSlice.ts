import { RegisterTypes } from "@/src/types/authType";
import { UsersInititalStateType } from "@/src/types/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
export const getUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseURL}user/get`, {
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

// add users
export const addUser = createAsyncThunk("user/addUser", async (payload: RegisterTypes, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseURL}user/create`, payload, {
            withCredentials: true
        })
        return {
            status: response?.status,
            data: response?.data
        }

    } catch (error: any) {
        return rejectWithValue({
            status: error?.status,
            error: error?.response?.data
        })
    }
})

// delete users

export const deleteUser=createAsyncThunk("user/deleteUser",async(userId:string|null |undefined,{rejectWithValue})=>{

    try {
         const response=await axios.delete(`${baseURL}user/delete/${userId}`,{
        withCredentials:true
    })

    return {
        status:response.status,
        data:response.data
    }
    } catch (error:any) {

        return rejectWithValue({
            status:error?.status,
            error:error?.response?.data
        })
        
    }
   
})

const initialState: UsersInititalStateType = {
    isLoading: false,
    allUsers: [],
    userAdding: false,
    validationErrors: null,
    userDeleting:false
}

const user = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.allUsers = action?.payload?.data?.users
        }).addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false
        }).addCase(addUser.pending, (state, action) => {
            state.userAdding = true
        }).addCase(addUser.fulfilled, (state, action: any) => {
            state.userAdding = false
        }).addCase(addUser.rejected, (state, action: any) => {
            state.userAdding = false
            state.validationErrors = action?.payload?.error?.errors
        }).addCase(deleteUser.pending, (state, action) => {
            state.userDeleting = true
        }).addCase(deleteUser.fulfilled, (state, action: any) => {
            state.userDeleting = false
        }).addCase(deleteUser.rejected, (state, action: any) => {
            state.userDeleting = false
        })
    }
})

export default user.reducer