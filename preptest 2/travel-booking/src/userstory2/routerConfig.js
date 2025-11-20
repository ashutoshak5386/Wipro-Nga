// src/userstory2/routerConfig.js
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './views/Home';
import Packages from './views/Packages';
import Contact from './views/Contact';
import BookingForm from '../userstory3/BookingForm';
import Header from '../userstory1/Header2';
import Footer from '../userstory1/Footer';
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
      <Route path="/booking" element={<BookingForm />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
