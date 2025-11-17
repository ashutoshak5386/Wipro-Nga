import { useState } from "react";

export default function DestinationCard({ name, image, price }) {
  const [wish, setWish] = useState(false);

  return (
    <div className="card p-2">
      <img src={image} className="card-img-top" alt={name} />
      <h5 className="mt-2">{name}</h5>
      <p>${price}</p>

      <button
        className="btn btn-primary"
        onClick={() => setWish(!wish)}
      >
        {wish ? "Added" : "Add to Wishlist"}
      </button>
    </div>
  );
}
