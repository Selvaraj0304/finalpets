import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartActions";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <span>{p.name} - ₹{p.price}</span>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => dispatch(addToCart(p))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
