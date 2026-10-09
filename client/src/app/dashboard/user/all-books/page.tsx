"use client";

import BookGrid from "@/src/components/book/BookGrid";
import useBooks from "@/src/hooks/useBooks";
import { useEffect } from "react";

const Page = () => {

     const { isLoading, bookList, search, setSearch } = useBooks();




  return   <div>
       <div className='flex justify-center items-center flex-col p-6'>
        <h1 className='text-2xl text-webtheme-light font-bold'>Explore Our Book Collection</h1>
        <p className='text-webtheme-dark'>Browse our complete collection of books, discover new titles, and find your next great read.</p>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search book by name..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2"
      />

      <BookGrid bookList={bookList} />
    </div>
};

export default Page;