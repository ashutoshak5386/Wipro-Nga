import axios from "axios";
import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";

export default function Packages() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axios.get("http://localhost:5000/packages");
      setData(res.data);
    }
    load();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Available Packages</h3>

      <div className="mt-3">
        {data.map(pkg => (
          <PackageCard key={pkg.id} {...pkg} />
        ))}
      </div>
    </div>
  );
}
