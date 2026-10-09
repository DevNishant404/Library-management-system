
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authReducer/authSlice"
import bookReducer from "../redux/bookReducer/bookSlice"
import bookCategoryReducer from "../redux/categoryReducer/categorySlice"
import userReducer from "../redux/userReducer/userSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    book:bookReducer,
    bookCategory:bookCategoryReducer,
    user:userReducer
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;