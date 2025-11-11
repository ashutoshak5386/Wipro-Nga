import React from "react";

const StatsCard = React.memo(({ title, value, lastUpdated }) => {
  console.log(`Rendered: ${title}`);
  return (
    <div className="card m-3 p-3 shadow-sm text-center">
      <h5>{title}</h5>
      <p>Value: {value}</p>
      <small>Last Updated: {lastUpdated}</small>
    </div>
  );
});

export default StatsCard;
