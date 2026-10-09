import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ bookList }: any) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookList?.map((book: any) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;