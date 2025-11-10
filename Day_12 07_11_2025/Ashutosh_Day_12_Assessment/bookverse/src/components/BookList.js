import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withLoader from "./LoadingHOC";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="book-list fade-in">
      <h2>Available Books</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>
            <Link to={`/book/${b.id}`}>{b.title}</Link> by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withLoader(BookList);
