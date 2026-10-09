"use client"
import Buttonloader from "@/src/components/Buttonloader";
import { register } from "@/src/redux/authReducer/authSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { RegisterTypes } from "@/src/types/authType";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const registerInitialState: RegisterTypes = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: null,
    email: "",
    password: "",
    role: "user"
}

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { validationErrors, isLoading } = useSelector((state: RootState) => state.auth)

    console.log("validationErrors")
    console.log(validationErrors)
    const [registerData, setRegisterData] = useState<RegisterTypes>(registerInitialState)


    function handleOnchange(e: any) {

        const { name, value } = e.target

        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));

    }


    function handleSubmit(e: any) {

        e.preventDefault()

        console.log("registerData")
        console.log(registerData)

        dispatch(register(registerData)).unwrap().then((res) => {
            console.log("register response")
            console.log(res)
            if(res){
                toast.success(res?.data?.message)
            }
        }).catch((er) => {
            console.log("register error")
            console.log(er)
            if (er) {
                toast.error(er.error?.message)
            }
        })
    }


    const getFieldError = (field: string) => {
        return validationErrors.find((error) => error.path === field)?.msg;
    };



    return (
        <main className="min-h-screen grid lg:grid-cols-2">
            {/* Left Section */}
            <section className="hidden lg:flex flex-col items-center justify-center bg-[#9F5C23] text-white p-12">
                <h1 className="text-5xl font-bold">📚 BookNest</h1>

                <p className="mt-6 max-w-md text-center text-lg leading-8">
                    Join BookNest today and discover thousands of books. Borrow, read,
                    and manage your library account with ease.
                </p>
            </section>

            {/* Right Section */}
            <section className="flex items-center justify-center  py-5">
                <div className="w-full max-w-xl rounded-2xl bg-white">
                    <h2 className="text-center text-3xl font-bold text-[#5B2501]">
                        Create Account
                    </h2>

                    <p className="mt-2 text-center text-gray-500">
                        Register to access the library
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="mb-2 block font-medium">
                                    First Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    onChange={handleOnchange}
                                    value={registerData.firstName}
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                                />
                                {getFieldError("firstName") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("firstName")}
                                        </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Middle Name
                                </label>

                                <input
                                    onChange={handleOnchange}
                                    value={registerData.middleName}
                                    name="middleName"
                                    type="text"
                                    placeholder="Michael"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                                />
                                {getFieldError("middleName") && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {getFieldError("middleName")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Last Name
                                </label>

                                <input
                                    onChange={handleOnchange}
                                    value={registerData.lastName}
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                                />
                                {getFieldError("lastName") && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {getFieldError("lastName")}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Phone Number <span className="text-red-500">*</span>
                            </label>

                            <input
                                onChange={handleOnchange}
                                value={registerData.phone ?? ""}
                                name="phone"
                                type="text"
                                placeholder="9876543210"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                            />
                            {getFieldError("phone") && (
                                <p className="mt-1 text-xs text-red-500">
                                    {getFieldError("phone")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Email <span className="text-red-500">*</span>
                            </label>

                            <input
                                onChange={handleOnchange}
                                value={registerData.email}
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                            />
                            {getFieldError("email") && (
                                <p className="mt-1 text-xs text-red-500">
                                    {getFieldError("email")}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Password <span className="text-red-500">*</span>
                            </label>

                            <input
                                onChange={handleOnchange}
                                value={registerData.password}
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#9F5C23] outline-none"
                            />
                            {getFieldError("password") && (
                                <p className="mt-1 text-xs text-red-500">
                                    {getFieldError("password")}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg bg-[#9F5C23] py-3 text-white font-semibold hover:bg-[#5B2501] transition"
                        >
                            {
                                isLoading ? <Buttonloader></Buttonloader> : "Create Account"
                            }

                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#9F5C23] hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Register;