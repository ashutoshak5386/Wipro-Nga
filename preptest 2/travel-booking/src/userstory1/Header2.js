import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-light py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <h3 className="m-0">Travel Booking</h3>
        <nav>
          <Link to="/home" className="text-decoration-none me-3">Home</Link>
          <Link to="/packages" className="text-decoration-none me-3">Packages</Link>
          <Link to="/contact" className="text-decoration-none me-3">Contact</Link>
          <Link to="/booking" className="text-decoration-none">Booking</Link> {/* ✅ single link */}
        </nav>
      </div>
    </header>
  );
}
