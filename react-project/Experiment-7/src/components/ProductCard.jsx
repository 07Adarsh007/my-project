import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

function ProductCard({ name, price, inStock }) {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <p>{inStock ? "In stock" : "Out of stock"}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default ProductCard;
