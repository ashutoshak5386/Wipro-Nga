import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AdminLogin from './pages/AdminLogin';
import UserProfile from './pages/UserProfile';
import CustomerLogin from './pages/CustomerLogin';
import StatusBar from './components/StatusBar';
import { DebugWidget } from './components/DebugWidget';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
        {/* System Status Bar - Q3 (Only visible when logged in) */}
        {isLoggedIn && <StatusBar userId={101} />}

        {/* UI Debug Widget - Q5 (Floating) */}
        <DebugWidget />

        {isLoggedIn ? (
          // Logged In View
          <>
            <header style={{ borderBottom: '2px solid #333', padding: '15px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ margin: 0 }}>ShopNow Platform</h1>
                  <p style={{ margin: '5px 0 0', color: '#666' }}>Integrated E-commerce Management System</p>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </div>
            </header>

            <nav style={{ padding: '15px 20px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
              <Link to="/products" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Products</Link>
              <Link to="/profile" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>My Profile</Link>
              <Link to="/admin" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Admin Portal</Link>
            </nav>

            <div style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="*" element={<Navigate to="/products" replace />} />
              </Routes>
            </div>
          </>
        ) : (
          // Login View - Landing Page
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 40px)',
            padding: '20px',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '48px', margin: '0 0 10px 0', color: '#333' }}>ShopNow</h1>
              <p style={{ fontSize: '18px', color: '#666' }}>Your Trusted E-commerce Platform</p>
            </div>

            <CustomerLogin onLoginSuccess={() => setIsLoggedIn(true)} />

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Test Credentials: email@test.com | password123456
              </p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
