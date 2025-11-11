import React, { useEffect, useState } from "react";
import BookStore from "../stores/BookStore";

const Home = () => {
  const [books, setBooks] = useState(BookStore.getAllBooks());

  useEffect(() => {
    const handleChange = () => setBooks(BookStore.getAllBooks());
    BookStore.addChangeListener(handleChange);
    return () => BookStore.removeChangeListener(handleChange);
  }, []);

  return (
    <div>
      <h2>Book Collection</h2>
      {books.length === 0 ? (
        <p>No books yet.</p>
      ) : (
        <ul>
          {books.map((book, idx) => (
            <li key={idx}>
              <strong>{book.title}</strong> — {book.author} (${book.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
