"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getMe } from '../redux/authReducer/authSlice'

const AuthInitializer = () => {
    const dispatch=useDispatch<AppDispatch>()

    const {isLoading}=useSelector((state:RootState)=>state.auth)

    useEffect(()=>{
        dispatch(getMe()).unwrap().then((res)=>{
            console.log("get me res")
            console.log(res)
        }).catch((er)=>{
            console.log("err get me")
            console.log(er)
        })
    },[])
  return null
}

export default AuthInitializer