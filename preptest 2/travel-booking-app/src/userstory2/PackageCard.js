import PropTypes from "prop-types";

export default function PackageCard({ name, price, days }) {
  return (
    <div className="card p-3 mb-3">
      <h4>{name}</h4>
      <p>₹{price}</p>
      <p>{days} Days</p>
    </div>
  );
}

PackageCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired
};
