import React from "react";

const ExplodingChild = () => {
  throw new Error("Child component exploded!");
};

export default ExplodingChild;
