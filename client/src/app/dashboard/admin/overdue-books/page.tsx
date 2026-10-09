"use client"
import { getOverDueBooks } from '@/src/redux/bookReducer/bookSlice'
import { AppDispatch } from '@/src/redux/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const page = () => {
    const dispatch=useDispatch<AppDispatch>()

    useEffect(()=>{

        dispatch(getOverDueBooks()).unwrap().then((res)=>{
            console.log("overdue books res")
            console.log(res)
        }).catch((er)=>{
            console.log("er overdue book")
            console.log(er)
        })

    },[])

  return (
    <div>page</div>
  )
}

export default page