// src/userstory2/views/Packages.js
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PackageCard({ name, price, nights, rating }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h6 className="card-title">{name}</h6>
        <p className="mb-1">Price: ${price}</p>
        <p className="mb-1">Nights: {nights}</p>
        <p className="mb-0">Rating: {rating}</p>
      </div>
    </div>
  );
}

PackageCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  nights: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default function Packages() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/packages')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);
  return (
    <div className="container my-4">
      <h4 className="mb-3">Packages</h4>
      <div className="row g-3">
        {data.map((p) => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4">
            <PackageCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}
