"use client"
import FinesComponent from '@/src/components/dashboard/FinesComponent'
import { getFines } from '@/src/redux/bookReducer/bookSlice'
import { AppDispatch } from '@/src/redux/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const page = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getFines()).unwrap().then((res) => {
            console.log("fine res")
            console.log(res)
        }).catch((er) => {
            console.log("fines error")
            console.log(er)
        })
    })
    return (
        <FinesComponent></FinesComponent>
    )
}

export default page