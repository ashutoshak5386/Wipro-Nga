import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import withLoader from "./LoadingHOC";
import RenderPropsComponent from "./RenderPropsComponent";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="book-detail fade-in">
      <RenderPropsComponent render={() => (
        book ? (
          <>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
          </>
        ) : (
          <p>Loading book details...</p>
        )
      )}/>
    </div>
  );
}

export default withLoader(BookDetail);
