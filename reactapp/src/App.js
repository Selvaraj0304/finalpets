import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { Container, Grid } from "@mui/material";

function App() {
  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ProductList />
          </Grid>
          <Grid item xs={12} md={4}>
            <Cart />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
