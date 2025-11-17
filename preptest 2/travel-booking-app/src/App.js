import Header from "./userstory1/Header";
import Footer from "./userstory1/Footer";
import DestinationCard from "./userstory1/DestinationCard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Packages from "./userstory2/Packages";
import BookingForm from "./userstory3/BookingForm";
import ErrorBoundary from "./userstory3/ErrorBoundary";

const featured = [
  { name: "Bali", image: "https://picsum.photos/400/250?1", price: 799 },
  { name: "Paris", image: "https://picsum.photos/400/250?2", price: 999 },
  { name: "Kyoto", image: "https://picsum.photos/400/250?3", price: 899 }
];

function Home() {
  return (
    <div className="container">
      <h3 className="my-3">Featured Destinations</h3>
      <div className="row g-3">
        {featured.map((d, i) => (
          <div className="col-4" key={i}>
            <DestinationCard {...d} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <nav className="p-3 bg-light">
        <Link className="me-3" to="/">Home</Link>
        <Link className="me-3" to="/packages">Packages</Link>
        <Link className="me-3" to="/book">Book Now</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route
          path="/book"
          element={
            <ErrorBoundary>
              <BookingForm />
            </ErrorBoundary>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
