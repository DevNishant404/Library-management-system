"use client"
import { RootState } from "@/src/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const BookCard = ({ book }: any) => {

    
    const router = useRouter()
    const { loogedInuserData } = useSelector((state: RootState) => state.auth)


    return (
        <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
            <div className="h-50 w-full overflow-hidden bg-gray-100">
                <img
                    src={book.coverImage}
                    alt={book.bookName}
                    className="h-full w-full object-cover hover:scale-105 duration-500 "
                />
            </div>

            <div className="p-2">
                <h2 className="mb-2 font-semibold text-webtheme-dark">
                    {book.bookName}
                </h2>
                {loogedInuserData?.role === "user" ? (
                    book.availableCopies > 0 ? (
                        <button
                            onClick={() => router.push(`/books/${book._id}`)}
                            className="w-full cursor-pointer rounded bg-webtheme-light py-1.5 text-white"
                        >
                            Borrow Now
                        </button>
                    ) : (
                        <button
                            disabled
                            className="w-full cursor-not-allowed rounded bg-gray-400 py-1.5 text-white"
                        >
                            Not Available
                        </button>
                    )
                ) :
                    <button
                        onClick={() => router.push(`/books/${book._id}`)}
                        className="w-full cursor-pointer rounded bg-webtheme-light py-1.5 text-white"
                    >View</button>
                }

            </div>
        </div>
    );
};

export default BookCard;