import React from "react";
import ReactDOM from "react-dom";

const PortalDemo = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "lightblue",
        padding: "10px 20px",
        borderRadius: "10px",
      }}
    >
      <strong>This is rendered using a Portal!</strong>
    </div>,
    document.getElementById("portal-root")
  );
};

export default PortalDemo;
