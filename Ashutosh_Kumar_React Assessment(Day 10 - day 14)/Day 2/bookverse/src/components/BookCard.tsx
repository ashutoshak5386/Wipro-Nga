import React from "react";
import PropTypes from "prop-types";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  onSelect: (author: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, price, onSelect }) => (
  <div
    onClick={() => onSelect(author)}
    className="bg-white shadow-md rounded-2xl p-4 m-3 w-64 cursor-pointer hover:scale-105 transition-transform"
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 mb-1">by {author}</p>
    <p className="text-blue-600 font-medium">₹{price}</p>
  </div>
);

BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BookCard;
