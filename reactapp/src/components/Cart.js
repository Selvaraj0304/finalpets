import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartActions";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>
      <Divider />
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your cart is empty 🛒
        </Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹{total}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
