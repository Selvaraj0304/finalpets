import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const cartCount = useSelector((state) => state.cartItems.length);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyShop 🛍️
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
