"use client";

import Buttonloader from "@/src/components/Buttonloader";
import { borrowBook, getBookById } from "@/src/redux/bookReducer/bookSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SingleBookDetails = () => {
  const params = useParams();
  const bookId = params.bookId as string;

  const dispatch = useDispatch<AppDispatch>();

  const { singleBook, isLoading, borrowingBook } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    if (bookId) {
      dispatch(getBookById(bookId))
        .unwrap()
        .then((res) => {
          console.log("single book res");
          console.log(res);
        })
        .catch((er) => {
          console.log("single book error");
          console.log(er);
        });
    }
  }, [dispatch, bookId]);




  // book borrowing

  function handleBorrowbook() {
    if (bookId) {
      const payload = {
        bookId,
      }
      dispatch(borrowBook(payload)).unwrap().then((res) => {
        console.log("res borrow book")
        console.log(res)
        toast.success(res.data.message)
        dispatch(getBookById(bookId))
      }).catch((er) => {
        console.log("borrow book errro")
        console.log(er)
        toast.error(er.error.message)
      })
    }
  }

  if (isLoading || !singleBook) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-webtheme-lightbg">
        <p className="text-webtheme-dark">Loading book...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-webtheme-lightbg py-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Main Book Information */}
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">

            {/* Cover */}
            <div className="flex justify-center">
              <div className="h-100 w-full max-w-sm overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={singleBook.coverImage}
                  alt={singleBook.bookName}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-webtheme-dark">
                {singleBook.bookName}
              </h1>

              <p className=" text-lg text-gray-600">
                by {singleBook.authorName}
              </p>

              {/* Availability */}
              <div className="mt-6">
                {singleBook.availableCopies > 0 ? (
                  <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                    {singleBook.availableCopies} copies available
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-red-100 px-4  text-sm font-medium text-red-700">
                    Currently unavailable
                  </span>
                )}
              </div>

              {/* Book Information */}
              <div className="mt-4">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">ISBN</span>
                  <span className="font-medium">{singleBook.isbn}</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Publisher</span>
                  <span className="font-medium">
                    {singleBook.publisher}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Published Year</span>
                  <span className="font-medium">
                    {singleBook.publishedYear}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium">
                    {singleBook.language}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Total Copies</span>
                  <span className="font-medium">
                    {singleBook.totalCopies}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Available Copies</span>
                  <span className="font-medium">
                    {singleBook.availableCopies}
                  </span>
                </div>
              </div>

              {/* Borrow Button */}
              <button
                onClick={handleBorrowbook}
                disabled={singleBook.availableCopies === 0 || isLoading}
                className="mt-auto w-full cursor-pointer rounded-lg bg-webtheme-light py-3 font-medium text-white transition hover:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {borrowingBook ? (
                  <Buttonloader />
                ) : singleBook.availableCopies > 0 ? (
                  "Borrow Book"
                ) : (
                  "Book Unavailable"
                )}

              </button>
            </div>
          </div>

          {/* Description */}
          <div className="border-t p-6">
            <h2 className="mb-3 text-xl font-semibold text-webtheme-dark">
              About This Book
            </h2>

            <p className="leading-7 text-gray-600">
              {singleBook.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetails;