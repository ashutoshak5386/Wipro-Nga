// src/userstory2/routerConfig.js
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './views/Home';
import Packages from './views/Packages';
import Contact from './views/Contact';
import './route-transitions.css';

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    document.body.classList.add('fade');
    const t = setTimeout(() => document.body.classList.remove('fade'), 300);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <Routes location={location}>
      <Route path="/home" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <Link to="/home" className="navbar-brand">Travel Booking</Link>
          <div className="navbar-nav">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/packages" className="nav-link">Packages</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
