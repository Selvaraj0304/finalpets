import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartActions";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const products = [
  { id: 1, name: "Laptop", price: 50000, img: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D`" },
  { id: 2, name: "Mobile", price: 20000, img: "https://5.imimg.com/data5/SELLER/Default/2021/9/HR/PW/SE/32162519/vivo-mobile-phone.png" },
  { id: 3, name: "Headphones", price: 2000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D" },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.img}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ₹{product.price}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
