"use client"
import BookGrid from '@/src/components/book/BookGrid';
import useBooks from '@/src/hooks/useBooks';
import { getAllBooks } from '@/src/redux/bookReducer/bookSlice';
import { AppDispatch, RootState } from '@/src/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Books = () => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()


  const { isLoading, bookList, search, setSearch } = useBooks();


  return (
    <div className='bg-[#FAF7F2] py-10 '>
      <div className='flex justify-center items-center flex-col pt-6 '>
        <h1 className='text-2xl text-webtheme-light font-bold'>Explore Our Book Collection</h1>
        <p className='text-webtheme-dark'>Browse our complete collection of books, discover new titles, and find your next great read.</p>
      </div>

      <div className='max-w-7xl mx-auto pt-10'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book by name..."
          className="mb-6 w-full rounded-lg border bg-white  border-gray-300 px-4 py-2"
        />

        <BookGrid bookList={bookList} />
      </div>
    </div>

  )
}

export default Books