"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useMemo, useState } from "react";
import { getAllBooks } from "../redux/bookReducer/bookSlice";

const useBooks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");

  const { bookList, isLoading, isFetched } = useSelector(
    (state: RootState) => state.book
  );

  useEffect(() => {
    if (!isFetched) {
      dispatch(getAllBooks());
    }
  }, [dispatch, isFetched]);

  const filteredBooks = useMemo(() => {
    return bookList.filter((book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase())
    );
  }, [bookList, search]);

  return {
    bookList: filteredBooks,
    search,
    setSearch,
    isLoading,
  };
};

export default useBooks;