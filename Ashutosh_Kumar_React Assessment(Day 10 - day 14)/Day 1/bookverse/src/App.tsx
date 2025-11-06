// src/App.tsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./components/BookList";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <BookList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
