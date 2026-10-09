"use client";

import { Button } from "@/components/ui/button";
import { getAllBorrowedBook, retunIssuedBook } from "@/src/redux/bookReducer/bookSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Buttonloader from "../../Buttonloader";
import { toast } from "react-toastify";

const IssuedBooks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allIssuedBooks, borrowingBook, isLoading } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    dispatch(getAllBorrowedBook())
      .unwrap()
      .then((res) => {
        console.log("get all issued book");
        console.log(res);
      })
      .catch((er) => {
        console.log("get all issued book error");
        console.log(er);
      });
  }, [dispatch]);


  function retunBook(issuedBookId: string) {
    console.log(issuedBookId)
    const payload = {
      issuedBookId
    }

    dispatch(retunIssuedBook(payload)).unwrap().then((res) => {
      console.log(res)
      toast.success(res.data.message)
      dispatch(getAllBorrowedBook())
    }).catch((er) => {
      console.log(er)
    })
  }

  // Loader
  if (borrowingBook) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      </div>
    );
  }

  // No data
  if (!allIssuedBooks || allIssuedBooks.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-lg text-gray-500">
          No issued books found.
        </p>
      </div>
    );
  }

  return (
    <div >
      <h1 className="mb-3 text-2xl font-semibold text-webtheme-light">
        Issued Books
      </h1>

      <div className="overflow-x-auto rounded-lg overf ">
        <table className="w-full min-w-225 text-left text-sm">
          <thead className="bg-gray-100 text-webtheme-light">
            <tr>
              <th className="px-3 py-3 border   font-semibold">
                SN.
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Book
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Borrowed By
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Email
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Issue Date
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Due Date
              </th>

              <th className="px-3 py-3 border   font-semibold">
                Status
              </th>

              <th className="px-3 py-3 border   text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y ">
            {allIssuedBooks.map((issuedBook, index) => (
              <tr
                key={issuedBook._id}
                className="hover:bg-gray-50"
              >
                {/* Number */}
                <td className="px-3 py-2 border-b ">
                  {index + 1}
                </td>

                {/* Book */}
                <td className="px-3 py-2 border-b ">
                  <div>
                    <p className="font-medium text-gray-900">
                      {issuedBook.book.bookName}
                    </p>

                    <p className="text-xs text-gray-500">
                      By {issuedBook.book.authorName}
                    </p>

                    <p className="text-xs text-gray-400">
                      ISBN: {issuedBook.book.isbn}
                    </p>
                  </div>
                </td>

                {/* User */}
                <td className="px-3 py-2 border-b ">
                  <p className="font-medium">
                    {issuedBook.user.firstName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {issuedBook.user.phone}
                  </p>
                </td>

                {/* Email */}
                <td className="px-3 py-2 border-b ">
                  {issuedBook.user.email}
                </td>

                {/* Issue Date */}
                <td className="px-3 py-2 border-b ">
                  {new Date(
                    issuedBook.issueDate
                  ).toLocaleDateString()}
                </td>

                {/* Due Date */}
                <td className="px-3 py-2 border-b ">
                  {new Date(
                    issuedBook.dueDate
                  ).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="px-3 py-2 border-b ">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${issuedBook.status === "issued"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {issuedBook.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-3 py-2 border-b text-center">
                  {isLoading ? (
                    <Buttonloader />
                  ) : (
                    <Button
                      disabled={issuedBook.status !== "issued"}
                      className="disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => retunBook(issuedBook._id)}
                    >
                      Return Book
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuedBooks;