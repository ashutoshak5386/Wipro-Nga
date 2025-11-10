import React, { useRef, useState } from "react";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

interface Author {
  name: string;
  bio: string;
  topBooks: string[];
}
interface Book {
  title: string;
  author: string;
  price: number;
}

const authorsData: Record<string, Author> = {
  "J.K. Rowling": {
    name: "J.K. Rowling",
    bio: "British author best known for the Harry Potter series.",
    topBooks: ["Harry Potter 1", "Harry Potter 2", "Fantastic Beasts"],
  },
  "George R.R. Martin": {
    name: "George R.R. Martin",
    bio: "American novelist, author of A Song of Ice and Fire.",
    topBooks: ["Game of Thrones", "Clash of Kings", "Storm of Swords"],
  },
};

const books: Book[] = [
  { title: "Harry Potter", author: "J.K. Rowling", price: 499 },
  { title: "Game of Thrones", author: "George R.R. Martin", price: 699 },
];

const BookList: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => searchRef.current?.focus();
  const handleSelect = (authorName: string) => setSelectedAuthor(authorsData[authorName]);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-4">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search books..."
          className="border rounded-lg px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleFocus}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Focus Input
        </button>
      </div>

      <div className="flex flex-wrap">
        {books.map((book, i) => (
          <BookCard key={i} {...book} onSelect={handleSelect} />
        ))}
      </div>

      {selectedAuthor && <AuthorInfo author={selectedAuthor} />}
    </div>
  );
};

export default BookList;
