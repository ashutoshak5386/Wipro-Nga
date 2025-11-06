// src/components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-indigo-700 px-4 shadow-md">
      <a className="navbar-brand text-xl font-bold text-white" href="#">
        📚 BookVerse
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-2">
            <a className="nav-link text-white hover:text-indigo-200" href="#">
              Home
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white hover:text-indigo-200" href="#">
              Featured
            </a>
          </li>
          <li className="nav-item mx-2">
            <a className="nav-link text-white hover:text-indigo-200" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
