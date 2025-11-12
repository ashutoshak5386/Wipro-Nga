// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./userstory1/header";
// Corrected
import Header from "./userstory1/Header2";
import BookingForm from "./userstory3/BookingForm";

import Footer from "./userstory1/Footer";
import DestinationCard from "./userstory1/DestinationCard";
import Home from "./userstory2/views/Home";
import Packages from "./userstory2/views/Packages";
import Contact from "./userstory2/views/Contact";

const featured = [
  { name: "Bali", image: "https://via.placeholder.com/400x250", price: 799 },
  { name: "Paris", image: "https://via.placeholder.com/400x250", price: 999 },
  { name: "Kyoto", image: "https://via.placeholder.com/400x250", price: 899 },
];

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container my-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h4 className="mb-3">Featured Destinations</h4>
                <div className="row g-3">
                  {featured.map((d) => (
                    <div className="col-12 col-sm-6 col-md-4" key={d.name}>
                      <DestinationCard {...d} />
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<BookingForm/>}/>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
