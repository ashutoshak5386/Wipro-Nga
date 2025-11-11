// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Create a portal root dynamically
const portalRoot = document.createElement("div");
portalRoot.id = "portal-root";
document.body.appendChild(portalRoot);
