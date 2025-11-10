import React from "react";
import PropTypes from "prop-types";

const BookCard = ({ title, author, image, onClick }) => {
  return (
    <div
      className="card m-3 shadow-sm"
      style={{ width: "16rem", cursor: "pointer" }}
      onClick={onClick}
    >
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{author}</p>
      </div>
    </div>
  );
};

// PropTypes validation
BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default BookCard;
