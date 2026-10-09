import Link from "next/link";


import React from 'react'

const Navbar = () => {
  return (
    <div> 
      <nav className="flex items-center justify-between  px-10 py-3">

      <h1 className="text-3xl font-bold text-[#5B2501]">
        <Link href={"/"}>
        📚 BookNest
        
        </Link>
      </h1>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="rounded-lg border border-[#9F5C23] px-5 py-2 text-[#9F5C23] transition hover:bg-[#9F5C23] hover:text-white"
        >
          Login
        </Link>
      </div>
    </nav></div>
  )
}

export default Navbar

