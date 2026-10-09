import { LoginTypes, RegisterInitialState, RegisterTypes } from "@/src/types/authType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// register user
export const register = createAsyncThunk("auth/register", async (payload: RegisterTypes, { rejectWithValue }) => {
   try {
      const res = await axios.post(`${baseURL}auth/register`, payload,{
         withCredentials:true
      })

      return {
         status: res.status,
         data: res.data
      }
   } catch (error: any) {

      return rejectWithValue({
         status: error.status,
         error: error.response.data
      })
   }
})

// login

export const login = createAsyncThunk("auth/login", async (payload: LoginTypes, { rejectWithValue }) => {
   try {
      const res = await axios.post(`${baseURL}auth/login`, payload,{
         withCredentials:true
      })

      return {
         status: res.status,
         data: res.data
      }
   } catch (error: any) {

      return rejectWithValue({
         status: error.status,
         error: error.response.data
      })
   }
})

// logout

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
   try {
      const res = await axios.post(`${baseURL}auth/logout`,{},{
         withCredentials:true
      })

      return {
         status: res.status,
         data: res.data
      }
   } catch (error: any) {

      return rejectWithValue({
         status: error.status,
         error: error.response.data
      })
   }
})


// get me
export const getMe=createAsyncThunk("auth/getMe",async(_,{rejectWithValue})=>{
const res=await axios.get(`${baseURL}auth/me`,{
   withCredentials:true
})

return{
   status:res.status,
   data:res.data
}
})


const initialState: RegisterInitialState = {
   isLoading: false,
   validationErrors: [],
   loogedInuserData:null
}


const auth = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {

      builder.addCase(register.pending, (state, action) => {
         state.isLoading = true
      }).addCase(register.fulfilled, (state, action) => {
         state.isLoading = false
      }).addCase(register.rejected, (state, action: any) => {
         state.isLoading = false
         state.validationErrors = action.payload?.error?.errors
      }).addCase(getMe.pending, (state, action) => {
         state.isLoading = true
      }).addCase(getMe.fulfilled, (state, action:any) => {
         state.isLoading = false
         state.loogedInuserData=action.payload?.data?.user
      }).addCase(getMe.rejected, (state, action: any) => {
         state.isLoading = false
      }).addCase(login.pending, (state, action) => {
         state.isLoading = true
      }).addCase(login.fulfilled, (state, action) => {
         state.isLoading = false
         state.loogedInuserData=action.payload?.data?.user
      }).addCase(login.rejected, (state, action: any) => {
         state.isLoading = false
         state.validationErrors=action?.payload?.error?.errors
      }).addCase(logout.pending, (state, action) => {
         state.isLoading = true
      }).addCase(logout.fulfilled, (state, action) => {
         state.isLoading = false
         state.loogedInuserData = null;
      }).addCase(logout.rejected, (state, action: any) => {
         state.isLoading = false
      })

   }
})


export default auth.reducer