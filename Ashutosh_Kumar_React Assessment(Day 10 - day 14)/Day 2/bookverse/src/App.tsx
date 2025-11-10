import React from "react";
import BookList from "./components/BookList";

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100 font-sans">
    <h1 className="text-3xl text-center font-bold text-blue-700 mt-6">
      📚 BookVerse
    </h1>
    <BookList />
  </div>
);

export default App;
