import { useEffect, useState } from "react";

function withLoader(WrappedComponent) {
  return function LoaderComponent(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    if (loading) return <div className="spinner">Loading...</div>;
    return <WrappedComponent {...props} />;
  };
}

export default withLoader;
