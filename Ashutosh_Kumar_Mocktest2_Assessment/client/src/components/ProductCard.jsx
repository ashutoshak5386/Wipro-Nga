import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ title, price, discount }) => {
  const finalPrice = price - discount;

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '200px', margin: '10px' }}>
      <h3>{title}</h3>
      <p>Original Price: ${price}</p>
      <p>Discount: ${discount}</p>
      <p style={{ fontWeight: 'bold', color: 'green' }}>Final Price: ${finalPrice}</p>
    </div>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
};

export default ProductCard;
