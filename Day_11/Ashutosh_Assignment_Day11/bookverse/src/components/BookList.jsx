import React, { useState, useRef } from "react";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

const books = [
  {
    title: "1984",
    author: "George Orwell",
    image: "https://placehold.co/200x300",
    bio: "English novelist and critic, famous for dystopian works.",
    topBooks: ["Animal Farm", "Homage to Catalonia", "1984"],
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    image: "https://placehold.co/200x300",
    bio: "English writer, best known for high fantasy works.",
    topBooks: ["The Hobbit", "LOTR", "The Silmarillion"],
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://placehold.co/200x300",
    bio: "English novelist known for romantic realism.",
    topBooks: ["Emma", "Sense and Sensibility", "Mansfield Park"],
  },
];

const BookList = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const searchRef = useRef(null);

  const handleSearchFocus = () => {
    searchRef.current.focus();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 BookVerse</h2>

      <div className="d-flex justify-content-center mb-4">
        <input
          ref={searchRef}
          type="text"
          className="form-control w-50"
          placeholder="Search a book..."
        />
        <button className="btn btn-primary ms-3" onClick={handleSearchFocus}>
          Focus Search
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author}
            image={book.image}
            onClick={() => setSelectedAuthor(book)}
          />
        ))}
      </div>

      {selectedAuthor && <AuthorInfo author={selectedAuthor} />}
    </div>
  );
};

export default BookList;
