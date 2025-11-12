// src/userstory1/DestinationCard.js
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DestinationCard({ name, image, price }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="card h-100 shadow-sm">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-3">From ${price}</p>
        <button
          className={`btn ${wishlisted ? 'btn-secondary' : 'btn-primary'} mt-auto`}
          onClick={() => setWishlisted((w) => !w)}
        >
          {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}

DestinationCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
