import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/PetNavbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PetListing from "./components/PetListing";
import PetDetails from "./components/PetDetails";
import PetForm from "./components/PetForm";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetListing />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/create" element={<PetForm />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
