// src/components/BookList.tsx
import React, { useState } from "react";
import BookCard from "./BookCard";

interface Book {
  title: string;
  author: string;
  price: number;
}

const BookList: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState<string>("");

  const books: Book[] = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 499 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", price: 399 },
    { title: "1984", author: "George Orwell", price: 299 },
    { title: "Pride and Prejudice", author: "Jane Austen", price: 350 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", price: 450 },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">📚 BookVerse</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      />

      {/* Toggle Buttons */}
      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded-lg font-medium transition 
            ${viewMode === "grid" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-lg font-medium transition 
            ${viewMode === "list" ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          List View
        </button>
      </div>

      {/* Books Display */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "flex flex-col items-stretch w-full max-w-2xl"
        }`}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => (
            <BookCard key={idx} {...book} viewMode={viewMode} />
          ))
        ) : (
          <p className="text-gray-500 mt-10">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
