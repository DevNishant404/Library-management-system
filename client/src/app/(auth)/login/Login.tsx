"use client"

import Buttonloader from "@/src/components/Buttonloader";
import { login } from "@/src/redux/authReducer/authSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { LoginTypes } from "@/src/types/authType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const loginInitialState: LoginTypes = {
  email: "",
  password: ""
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginTypes>(loginInitialState)
  const router=useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, validationErrors } = useSelector((state: RootState) => state.auth)

  console.log(validationErrors)


  function handleOnchange(e: any) {

    const { name, value } = e.target

    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value
      }

    })
  }


  function handleSubmit(e: any) {

    e.preventDefault()

    dispatch(login(loginData)).unwrap().then((res) => {
      console.log("login response")
      console.log(res)
      router.push("/dashboard")
    }).catch((er) => {
      console.log("login error")
      console.log(er)
      if(er){
        toast.error(er?.error?.message)
      }
    })

  }


  function getFieldError(field: string) {
    return validationErrors?.find((error) => error.path === field)?.msg;
  }






  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <section className="hidden lg:flex flex-col justify-center items-center bg-[#9F5C23] text-white p-12">
        <h1 className="text-5xl font-bold"><Link href={"/"}>📚 BookNest</Link></h1>

        <p className="mt-6 max-w-md text-center text-lg leading-8">
          Welcome back! Access your library account to borrow books, manage
          your reading history, and discover new collections.
        </p>
      </section>

      {/* Right Section */}
      <section className="flex items-center justify-center bg-[#FAF7F2] px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-[#5B2501]">
            Login
          </h2>

          <p className="mt-2 text-center text-gray-500">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                onChange={handleOnchange}
                value={loginData?.email}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9F5C23]"
              />
              {
                getFieldError("email") && (
                  <p className="mt-1 text-xs text-red-500">
                    {getFieldError("email")}
                  </p>
                )
              }
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                onChange={handleOnchange}
                value={loginData?.password}
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#9F5C23]"
              />
              {
                getFieldError("password") && (
                  <p className="mt-1 text-xs text-red-500">
                    {getFieldError("password")}
                  </p>
                )
              }
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-[#9F5C23] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#9F5C23] py-3 font-semibold text-white transition hover:bg-[#5B2501]"
            >
              {
                isLoading?<Buttonloader></Buttonloader>:"Login"
              }
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#9F5C23] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;