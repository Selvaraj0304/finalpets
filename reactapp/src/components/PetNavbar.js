import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PetNavbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pet Adoption App
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/pets" color="inherit">Pets</Button>
        <Button component={Link} to="/create" color="inherit">Add Pet</Button>
      </Toolbar>
    </AppBar>
  );
};

export default PetNavbar;
