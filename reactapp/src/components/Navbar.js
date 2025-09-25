import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cartItems.length);

  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <h2>🛒 My Shop</h2>
      <p>Cart Items: {cartCount}</p>
    </nav>
  );
};

export default Navbar;
