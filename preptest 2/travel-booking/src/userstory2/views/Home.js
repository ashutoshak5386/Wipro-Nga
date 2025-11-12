// src/userstory2/views/Home.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top 2 featured packages from json-server
    fetch("http://localhost:5000/packages")
      .then((r) => r.json())
      .then((data) => {
        setFeatured(data.slice(0, 2)); // only first 2 packages
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured packages:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold">Welcome</h2>
      <p className="text-muted">Find great destinations and packages.</p>

      <h4 className="mt-4 mb-3">Featured Packages</h4>

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : featured.length === 0 ? (
        <p>No featured packages found.</p>
      ) : (
        <div className="row g-3">
          {featured.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="mb-1">Price: ${p.price}</p>
                  <p className="mb-1">Nights: {p.nights}</p>
                  <p className="mb-0">Rating: {p.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary px-4"
          onClick={() => navigate("/packages")}
        >
          View All Packages
        </button>
      </div>
    </div>
  );
}
