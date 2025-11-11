import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddBookForm from "./components/AddBookForm";
import Home from "./components/Home";

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link> | <Link to="/add">Add Book</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddBookForm />} />
    </Routes>
  </Router>
);

export default App;
