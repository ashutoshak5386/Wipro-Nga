// src/components/BookCard.tsx
import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  price: number;
  viewMode: "grid" | "list";
}

const BookCard: React.FC<BookCardProps> = ({ title, author, price, viewMode }) => {
  return (
    <div
      className={`card transition-all duration-300 shadow-sm hover:shadow-lg ${
        viewMode === "grid" ? "w-60" : "w-full"
      }`}
    >
      <div className="card-body bg-white rounded-xl p-4">
        <h5 className="card-title text-lg font-semibold text-indigo-800">{title}</h5>
        <p className="card-subtitle text-gray-600 text-sm mb-2">by {author}</p>
        <p className="text-indigo-600 font-bold text-sm">₹{price}</p>
        <button className="btn btn-sm btn-outline-indigo mt-2">View Details</button>
      </div>
    </div>
  );
};

export default BookCard;
