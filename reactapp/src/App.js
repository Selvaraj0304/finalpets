import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Navbar />
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
