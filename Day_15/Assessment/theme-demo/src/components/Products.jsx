import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateProduct } from "../redux/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(s => s.products.items);
  const status = useSelector(s => s.products.status);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const [localPrices, setLocalPrices] = useState({});

  useEffect(() => {
    const map = {};
    products.forEach(p => map[p.id] = p.price);
    setLocalPrices(map);
  }, [products]);

  const save = (id) => {
    const updated = { ...products.find(p=>p.id===id), price: Number(localPrices[id]) };
    dispatch(updateProduct(updated));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Products</h3>
      {status === "loading" && <p>Loading...</p>}
      <div>
        {products.map(p => (
          <div key={p.id} style={{ marginBottom: 12 }}>
            <b>{p.name}</b> — $
            <input
              type="number"
              value={localPrices[p.id] ?? p.price}
              onChange={e => setLocalPrices({ ...localPrices, [p.id]: e.target.value })}
              style={{ width: 100, marginLeft: 6 }}
            />
            <button className="btn" onClick={() => save(p.id)} style={{ marginLeft: 8 }}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}
